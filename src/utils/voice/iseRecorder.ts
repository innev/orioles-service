
// 1. websocket连接：判断浏览器是否兼容，获取websocket url并连接，这里为了方便本地生成websocket url
// 2. 获取浏览器录音权限：判断浏览器是否兼容，获取浏览器录音权限，
// 3. js获取浏览器录音数据
// 4. 将录音数据处理为文档要求的数据格式：采样率16k或8K、位长16bit、单声道；该操作属于纯数据处理，使用webWork处理
// 5. 根据要求（采用base64编码，每次发送音频间隔40ms，每次发送音频字节数1280B）将处理后的数据通过websocket传给服务器，
// 6. 实时接收websocket返回的数据并进行处理

//语音测评
import parser from 'fast-xml-parser';
// import { Base64 } from './base64js.js'
// import './base64js.js';
import IRecorder from './IRecorder';
import { transAudioData } from './transcode.worker';
import { tranWAV } from './tranWAV.worker';
import { APPID, getWebSocketUrl } from './websocket';

interface ICallback {
  getBuffer: Array<any>,
  exportWAV: Array<any>
}

export default class IseRecorder {
  private text: string;
  private business: object;
  private appId: string;

  private audioData: Array<any>;
  private audioContext: any;
  private status: string;
  
  private webSocket?: WebSocket;
  private onTextChange?: Function;
  private onWillStatusChange?: Function;
  private scriptProcessor?: any;
  
  private mediaSource?: any;
  private getMediaFaiChange?: any;
  private handlerInterval?: any;
  private onErrorText?: any;
  
  constructor({ text, business, appId }: IRecorder) {
    this.text = text;
    this.business = business || {};
    this.appId = appId || APPID;

    // 记录音频数据
    this.audioData = [];
    // 麦克风对象
    this.audioContext = null;
    this.status = 'null';
  }

  config = {
    bufferLen: 0,
    numChannels: 1,
    mimeType: 'audio/wav',
    callback: null
  };
  
  callbacks: ICallback = {
    getBuffer: [],
    exportWAV: []
  };

  // 修改录音评测状态
  private setStatus(status: string): void {
    this.onWillStatusChange && this.status !== status && this.onWillStatusChange(this.status, status);
    this.status = status;
  }
  private setResultText(setResultXml = '', audioData = ''): void {
    this.onTextChange && this.onTextChange(setResultXml || '', audioData || '')
  }
  // 连接websocket
  private connectWebSocket(): Promise<Boolean> {
    if (APPID === 'APPID' || !APPID) {
      alert('请填写APPID、APISecret、APIKey，可从控制台-我的应用-语音评测（流式版）页面获取。')
      return Promise.reject(false);
    }

    return getWebSocketUrl('ise').then((url: string) => {
      if ('WebSocket' in window) {
        this.webSocket = new WebSocket(url);
      // } else if ('MozWebSocket' in window) {
      //   this.webSocket = new MozWebSocket(url)
      } else {
        alert('浏览器不支持WebSocket')
        return false;
      }
      
      this.setStatus('init');
      this.webSocket.onopen = () => {
        this.setStatus('ing');
        // 重新开始录音
        setTimeout(() => {
          this.webSocketSend();
        }, 500);
      };
      
      this.webSocket.onmessage = e => {
        this.result(e.data);
      };

      this.webSocket.onerror = e => {
        this.recorderStop();
      };

      this.webSocket.onclose = e => {
        this.recorderStop();
      };

      return true;
    })
  }

  // 初始化浏览器录音
  private recorderInit() {
    // navigator.getUserMedia =
    //   navigator.getUserMedia ||
    //   navigator.webkitGetUserMedia ||
    //   navigator.mozGetUserMedia ||
    //   navigator.msGetUserMedia

    // 创建音频环境
    try {
      // this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
      this.audioContext = new window.AudioContext()
      this.audioContext.resume()
      if (!this.audioContext) {
        alert('浏览器不支持webAudioApi相关接口')
        return
      }
    } catch (e) {
      if (!this.audioContext) {
        alert('浏览器不支持webAudioApi相关接口')
        return
      }
    }

    // 获取浏览器录音权限
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: false})
        .then(stream => getMediaSuccess(stream))
        .catch(e => getMediaFail(e));

    // } else if (navigator.getUserMedia) {
    //   navigator.getUserMedia({ audio: true, video: false },
    //     stream => getMediaSuccess(stream),
    //     e => getMediaFail(e)
    //   );
    } else {
      if (navigator.userAgent.toLowerCase().match(/chrome/) && location.origin.indexOf('https://') < 0) {
        alert('chrome下获取浏览器录音功能，因为安全性问题，需要在localhost或127.0.0.1或https下才能获取权限')
      } else {
        alert('无法获取浏览器录音功能，请升级浏览器或使用chrome')
      }
      this.audioContext && this.audioContext.close()
      return
    }
    
    // 获取浏览器录音权限成功的回调
    let getMediaSuccess = (stream: any) => {
      console.log('getMediaSuccess')
      // 创建一个用于通过JavaScript直接处理音频
      this.scriptProcessor = this.audioContext.createScriptProcessor(0, 1, 1)
      this.scriptProcessor.onaudioprocess = (e: any) => {
        // 去处理音频数据
        if (this.status === 'ing') {
          this.transToAudioData(e.inputBuffer.getChannelData(0))

          let buffer = []
          buffer.push(e.inputBuffer.getChannelData(0));
          tranWAV.postMessage({ command: 'record', buffer });
        }
      }
      // 创建一个新的MediaStreamAudioSourceNode 对象，使来自MediaStream的音频可以被播放和操作
      this.mediaSource = this.audioContext.createMediaStreamSource(stream)
      // 连接
      this.mediaSource.connect(this.scriptProcessor)
      this.scriptProcessor.connect(this.audioContext.destination)
      this.connectWebSocket()

      tranWAV.postMessage({
        command: 'init',
        config: {
          sampleRate: this.audioContext.sampleRate,
          numChannels: this.config.numChannels
        }
      });

      // 需要修复这个地方
      // tranWAV.onmessage = (e: any) => {
      //   let cb = this.callbacks[e.data.command as keyof typeof this.callbacks].pop();
      //   if (typeof cb == 'function') {
      //       cb(e.data.data);
      //   }
      // };
    }

    let getMediaFail = (e: any) => {
      this.getMediaFaiChange && this.getMediaFaiChange(e)
      // alert('请求麦克风失败')
      this.audioContext && this.audioContext.close()
      this.audioContext = undefined
      // 关闭websocket
      if (this.webSocket && this.webSocket.readyState === 1) {
        this.webSocket.close()
      }
    }
  }
  //处理音频数据
  transToAudioData(audioData: any) {
    let data = transAudioData.transcode(audioData);
    this.audioData = this.audioData.concat(data)
  }
  recorderStart() {
    if (!this.audioContext) {
      this.recorderInit()
    } else {
      this.audioContext.resume()
      this.connectWebSocket()
    }
  }
  // 暂停录音
  recorderStop() {
    // safari下suspend后再次resume录音内容将是空白，设置safari下不做suspend
    if (!(/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent))){
      this.audioContext && this.audioContext.suspend()
    }
    this.setStatus('end')
  }
  //到导出wav格式音频
  exportWAV(cb: any, mimeType: any) {
    mimeType = mimeType || this.config.mimeType;
    cb = cb || this.config.callback;
    if (!cb) throw new Error('Callback not set');
    this.callbacks.exportWAV.push(cb);
    tranWAV.postMessage({
      command: 'exportWAV',
      type: mimeType
    });
  }
  // 对处理后的音频数据进行base64编码
  toBase64(buffer: any) {
    const bytes: Uint8Array = new Uint8Array(buffer);
    let binary = '';
    // const size: number = bytes ? bytes.length : 0;
    // for (let i = 0; i < size; i++) {
    //     binary += String.fromCharCode(bytes?.[i]);
    // }
    bytes.forEach(byte => {
      binary += String.fromCharCode(byte);
    });
    return window.btoa(binary);
  }
  // 向webSocket发送数据
  webSocketSend() {
    if (this.webSocket?.readyState !== 1) {
      return
    }
    let audioData = this.audioData.splice(0, 1280)
    var params = {
      common: {
        app_id: this.appId,
      },
      business: {
        category: 'read_sentence', // read_syllable/单字朗读，汉语专有 read_word/词语朗读  read_sentence/句子朗读 https://www.xfyun.cn/doc/Ise/IseAPI.html#%E6%8E%A5%E5%8F%A3%E8%B0%83%E7%94%A8%E6%B5%81%E7%A8%8B
        rstcd: 'utf8',
        group: 'pupil',
        sub: 'ise',
        ent: 'cn_vip',
        tte: 'utf-8',
        cmd: 'ssb',
        auf: 'audio/L16;rate=16000',
        aus: 1,
        aue: 'raw',
        ise_unite: '1',
        extra_ability: 'syll_phone_err_msg',
        text: '\uFEFF' + (this.text),
        ...this.business
      },
      data: {
        status: 0,
        encoding: 'raw',
        data_type: 1,
        data: this.toBase64(audioData),
      },
    }
    this.webSocket.send(JSON.stringify(params))
    this.handlerInterval = setInterval(() => {
      // websocket未连接
      if (this.webSocket?.readyState !== 1) {
        this.audioData = []
        clearInterval(this.handlerInterval)
        return
      }
      // 最后一帧
      if (this.audioData.length === 0) {
        if (this.status === 'end') {
          this.webSocket.send(
            JSON.stringify({
              business: {
                cmd: 'auw',
                aus: 4,
                aue: 'raw'
              },
              data: {
                status: 2,
                encoding: 'raw',
                data_type: 1,
                data: '',
              },
            })
          )
          this.audioData = []
          clearInterval(this.handlerInterval)
        }
        return false
      }
      audioData = this.audioData.splice(0, 1280)
      // 中间帧
      this.webSocket.send(
        JSON.stringify({
          business: {
            cmd: 'auw',
            aus: 2,
            aue: 'raw'
          },
          data: {
            status: 1,
            encoding: 'raw',
            data_type: 1,
            data: this.toBase64(audioData),
          },
        })
      )
    }, 40)
  }
  result(resultData: any) {
    // 识别结束
    let jsonData = JSON.parse(resultData)
    if (jsonData.data && jsonData.data.data) {
      // let data = Base64.decode(jsonData.data.data)
      let data = window.atob(jsonData.data.data);
      let grade = parser.parse(data, {
        attributeNamePrefix: '',
        ignoreAttributes: false
      })
      this.setResultText(grade)
    }
    if (jsonData.code === 0 && jsonData.data.status === 2) {
      this.webSocket?.close()
    }
    if (jsonData.code !== 0) {
      this.webSocket?.close()
      this.onErrorText && this.onErrorText(jsonData.code)
      console.log(`${jsonData.code}:${jsonData.message}`)
    }
  }
  clearTranWAV() {
    tranWAV.postMessage({ command: 'clear' })
  }
  clearRecorder() {
    this.audioContext = null
    this.setResultText()
  }
  start() {
    this.recorderStart()
    this.setResultText()
  }
  stop() {
    this.recorderStop()
  }
};