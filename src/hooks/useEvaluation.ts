// import IatRecorder from '@/utils/voice/iatRecorder';
// import IseRecorder from '@/utils/voice/iseRecorder';
// import TTSRecorder from '@/utils/voice/ttsRecorder';
import { useEffect, useState } from 'react';

interface IUseEvaluation {
  text: string,
  business: object,
  voicetype: string,
  changeEvents: Function,
  errorEvents: Function,
  mediaFail: Function,
  loadingEvent: Function
}

/**
  * 科大讯飞语音组件，ise-语音测评，tts-语音合成，iat-语音听写
  * @param {string} text - 非必传，文本，ise和tts中必传，iat中可不传
  * @param {object} business - 必传，设置参数
  * @param {string} voicetype - 必传，调用语音api类型，ise-语音测评，tts-语音合成，iat-语音听写
  * @param {string} changeEvents - 非必传，结果变化返回方法
  * @param {function} errorEvent - 非必传，错误结果返回方法
  * @param {function} mediaFail - 非必传，无法获取麦克风时提示方法，ise和iat中必传，tts中可不传
  * @param {function} loadingEvent - 非必传，展示loading方法
*/
export default ({ text = '', business = {}, voicetype, changeEvents, errorEvents, mediaFail, loadingEvent }: IUseEvaluation ) => {
  const [audioData, setAudioData] = useState(null)  //保存录音的音频

  useEffect(() => {
    setAudioData(null)
  }, [text])

  /*
  const normalRecorder = voicetype === 'ise'
    ? new IseRecorder({ text, business })
    : voicetype === 'tts'
      ? new TTSRecorder({ text, business })
      : voicetype === 'iat' ? new IatRecorder({ business }) : null;


  // 状态的改变
  normalRecorder.onWillStatusChange = function (oldStatus, status) { }


  // 监听识别结果的变化
  normalRecorder.onTextChange = function (result) {
    loadingEvent && loadingEvent(false)
    changeEvents && changeEvents(result)
  }

  // 错误结果返回
  normalRecorder.onErrorText = function (code) {
    errorEvents && errorEvents(code)
  }

  //麦克风请求失败
  normalRecorder.getMediaFaiChange = function (error) {
    mediaFail && mediaFail()
  }

  const clickAudio = () => {
    if (['ing'].indexOf(normalRecorder.status) > -1) {
      loadingEvent && loadingEvent(true)
      normalRecorder.exportWAV && normalRecorder.exportWAV(function (blob) {
        // ise，返回评测音频
        var url = URL.createObjectURL(blob);
        if (url) setAudioData(url)
      })
      normalRecorder.clearTranWAV && normalRecorder.clearTranWAV()
      normalRecorder.stop()
    } else {
      normalRecorder.start()
    }
  }

  const clickStop = () => {
    normalRecorder.clearRecorder && normalRecorder.clearRecorder()
  }

  return { audioData, clickAudio, clickStop };
  */
 return {};
};