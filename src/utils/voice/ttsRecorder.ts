import { encodeWAV } from './download';
import IRecorder from './IRecorder';
import { transcode } from './transcode.worker';
import { APPID, getWebSocketUrl } from './websocket';

//语音合成
export default class TTSRecorder {
  private text: string;
  private business: any;
  private appId: string;

  private audioData: Array<any>;
  private rawAudioData: Array<any>;
  private audioDataOffset: number;
  private status: string;
  private onWillStatusChange: any;
  private ttsWS?: any;
  private playTimeout: any;
  private onErrorText: any;
  private onTextChange: any;
  private audioContext: any;
  private bufferSource: any;

  constructor({ text, business, appId }: IRecorder) {
    this.text = text;
    this.business = business || {};
    this.appId = appId || APPID;

    //记录音频数据
    this.audioData = []
    this.rawAudioData = []
    this.audioDataOffset = 0
    //状态
    this.status = 'init'
  }
  // 修改录音听写状态
  setStatus(status: string) {
    this.onWillStatusChange && this.onWillStatusChange(this.status, status)
    this.status = status
  }
  
  // 连接websocket
  connectWebSocket() {
    this.setStatus('ing')
    return getWebSocketUrl('tts').then(url => {
      if ('WebSocket' in window) {
        this.ttsWS = new WebSocket(url)
      // } else if ('MozWebSocket' in window) {
      //   ttsWS = new MozWebSocket(url)
      } else {
        alert('浏览器不支持WebSocket')
        return
      }
      this.ttsWS.onopen = () => {
        this.webSocketSend()
        this.playTimeout = setTimeout(() => {
          this.audioPlay()
        }, 1000)
      }
      this.ttsWS.onmessage = (e: any) => {
        this.result(e.data)
      }
      this.ttsWS.onerror = () => {
        clearTimeout(this.playTimeout)
        this.setStatus('errorTTS')
        alert('WebSocket报错，请f12查看详情')
        console.error(`详情查看：${encodeURI(url.replace('wss:', 'https:'))}`)
      }
      this.ttsWS.onclose = (e: any) => {
        console.log(e)
      }
    })
  }
  // 处理音频数据
  transToAudioData(audioData: any) {
    let data = transcode.transToAudioData(audioData);
    this.audioData = this.audioData.concat(data.data)
    this.rawAudioData = this.rawAudioData.concat(data.rawAudioData)
  }
  // websocket发送数据
  webSocketSend() {
    if (this.ttsWS.readyState !== 1) {
      return
    }
    var params = {
      common: {
        app_id: this.appId, // APPID
      },
      business: {
        aue: 'raw',
        auf: 'audio/L16;rate=16000',
        bgs: 1,
        ...this.business
      },
      data: {
        status: 2,
        text: this.encodeText(
          this.text,
          this.business.tte === 'unicode' ? 'base64&utf16le' : ''
        )
      },
    }
    this.ttsWS.send(JSON.stringify(params))
  }
  encodeText(text: any, encoding: string): any {
    switch (encoding) {
      case 'utf16le': {
        let buf = new ArrayBuffer(text.length * 4)
        let bufView = new Uint16Array(buf)
        for (let i = 0, strlen = text.length; i < strlen; i++) {
          bufView[i] = text.charCodeAt(i)
        }
        return buf
      }
      case 'buffer2Base64': {
        let binary = ''
        let bytes = new Uint8Array(text)
        // let len = bytes.byteLength
        // for (let i = 0; i < len; i++) {
        //   binary += String.fromCharCode(bytes[i])
        // }
        bytes.forEach(byte => {
          binary += String.fromCharCode(byte)
        });

        return window.btoa(binary)
      }
      case 'base64&utf16le': {
        return this.encodeText(this.encodeText(text, 'utf16le'), 'buffer2Base64')
      }
      default: {
        // return Base64.encode(text);
        return window.btoa(text);
      }
    }
  }
  // websocket接收数据的处理
  result(resultData: any) {
    let jsonData = JSON.parse(resultData)
    // 合成失败
    if (jsonData.code !== 0) {
      alert(`合成失败: ${jsonData.code}:${jsonData.message}`)
      console.error(`${jsonData.code}:${jsonData.message}`)
      this.resetAudio()
      this.onErrorText && this.onErrorText(jsonData.code)
      return
    }
    this.transToAudioData(jsonData.data.audio);

    if (jsonData.code === 0 && jsonData.data.status === 2) {
      this.ttsWS.close()
      //生成wav音频文件，二进制文件链接
      let wavData = encodeWAV(new DataView(new Int16Array(this.rawAudioData).buffer), 16000 || 44100, 1, 16 || 16)
      let blob = new Blob([wavData], {
        type: 'audio/wav',
      })
      this.onTextChange && this.onTextChange(window.URL.createObjectURL(blob))
    }
  }
  // 重置音频数据
  resetAudio() {
    this.audioStop()
    this.setStatus('init')
    this.audioDataOffset = 0
    this.audioData = []
    this.rawAudioData = []
    this.ttsWS && this.ttsWS.close()
    clearTimeout(this.playTimeout)
  }
  // 音频初始化
  audioInit() {
    let AudioContext = window.AudioContext;
    if (AudioContext) {
      this.audioContext = new AudioContext()
      this.audioContext.resume()
      this.audioDataOffset = 0
    }
  }
  // 音频播放
  audioPlay() {
    this.setStatus('play')
    let audioData = this.audioData.slice(this.audioDataOffset)
    this.audioDataOffset += audioData.length
    if (audioData.length === 0) return
    let audioBuffer = this.audioContext.createBuffer(1, audioData.length, 22050)
    let nowBuffering = audioBuffer.getChannelData(0)
    if (audioBuffer.copyToChannel) {
      audioBuffer.copyToChannel(new Float32Array(audioData), 0, 0)
    } else {
      for (let i = 0; i < audioData.length; i++) {
        nowBuffering[i] = audioData[i]
      }
    }
    let bufferSource = this.bufferSource = this.audioContext.createBufferSource()
    bufferSource.buffer = audioBuffer
    bufferSource.connect(this.audioContext.destination)
    bufferSource.start()
    bufferSource.onended = () => {
      if (this.status !== 'play') {
        return
      }
      if (this.audioDataOffset < this.audioData.length) {
        this.audioPlay()
      } else {
        this.audioStop()
      }
    }
  }
  // 音频播放结束
  audioStop() {
    this.setStatus('endPlay')
    clearTimeout(this.playTimeout)
    this.audioDataOffset = 0
    if (this.bufferSource) {
      try {
        this.bufferSource.stop()
      } catch (e) {
        console.log(e)
      }
    }
  }
  start() {
    if (this.audioData.length) {
      this.audioPlay()
    } else {
      if (!this.audioContext) {
        this.audioInit()
      }
      if (!this.audioContext) {
        alert('该浏览器不支持webAudioApi相关接口')
        return
      }
      this.connectWebSocket()
    }
  }
  stop() {
    this.audioStop()
  }
  clearRecorder() {
    this.audioContext = null
    this.resetAudio()
  }
};



/**
 * 使用案例如下：
 * import useStores from '@common/hooks/useStores'
   import useEvaluation from '@common/hooks/useEvaluation'

   const changeEvents = (result) => { }

   const errorEvents = code => {
    actionInfoTips({
      text: codeMessage[code] || '评测失败，请重试',
      okText: i18n.t('know_the'),
      okButtonProps: {
        size: 'large',
        className: "w100 lh26 text-color-white background backg-record bdrs100 b1F-not"
      },
    })
    setLoading(false)
    setEvalUpdate(!evalUpdate)
  }

   const { clickAudio, clickStop } = useEvaluation({
     text: '盼望着，盼望着，东风来了，春天的脚步近了。一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。小草偷偷地从土里钻出来，嫩嫩的，绿绿的。',
     business: {
       speed: 50,  //语速
       volume: 50,  //音量
       pitch: 50,  //高音
       vcn: 'xiaoyan',  //发音人
       tte: 'UTF8',  //文本编码格式
     },
     voicetype: 'tts',
     changeEvents: changeEvents,
     errorEvents: errorEvents,
     loadingEvent: setLoading
   })
 */

