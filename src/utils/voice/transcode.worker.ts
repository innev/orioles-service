
let transAudioData = {
  transcode(audioData: any) {
    const output: Float32Array = transAudioData.to16kHz(audioData);
    const pcm: DataView = transAudioData.to16BitPCM(output);
    return Array.from(new Uint8Array(pcm.buffer));
  },
  to16kHz(audioData: any) {
    const data: Float32Array = new Float32Array(audioData);
    const fitCount: number = Math.round(data.length * (16000 / 44100))
    const springFactor: number = (data.length - 1) / (fitCount - 1);
    const newData: Float32Array = new Float32Array(fitCount);

    newData[0] = data[0] || 0;
    for (let i = 1; i < fitCount - 1; i++) {
      const tmp: number = i * springFactor;
      const before: number = parseInt(Math.floor(tmp).toFixed());
      const after: number = parseInt(Math.ceil(tmp).toFixed());
      const atPoint: number = tmp - before;
      newData[i] = (data[before] || 0) + ((data[after] || 0) - (data[before] || 0)) * atPoint;
    }
    newData[fitCount - 1] = data[data.length - 1] || 0;
    return newData;
  },
  to16BitPCM(input: Float32Array) {
    const dataLength: number = input.length * (16 / 8);
    const dataBuffer: ArrayBuffer = new ArrayBuffer(dataLength);
    const dataView: DataView = new DataView(dataBuffer);
    let offset: number = 0;
    for (var i = 0; i < input.length; i++, offset += 2) {
      var s = Math.max(-1, Math.min(1, input[i] || 0));
      dataView.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true)
    }
    return dataView
  },
}

let transcode = {
  transToAudioData: function (audioDataStr: string, fromRate: number = 16000, toRate: number = 22505) {
    const outputS16: Int16Array = transcode.base64ToS16(audioDataStr);
    const output: Float32Array = transcode.transS16ToF32(outputS16);
    const outputRate: Float32Array = transcode.transSamplingRate(output, fromRate, toRate);

    return {
      data: Array.from(outputRate),
      rawAudioData: Array.from(outputS16)
    }
  },
  transSamplingRate: (data: Float32Array, fromRate: number = 44100, toRate: number = 16000): Float32Array => {
    const fitCount: number = Math.round(data.length * (toRate / fromRate));
    const newData: Float32Array = new Float32Array(fitCount);
    const springFactor: number = (data.length - 1) / (fitCount - 1);
    
    newData[0] = data[0] || 0;
    for (let i = 1; i < fitCount - 1; i++) {
      const tmp: number = i * springFactor;
      const before: number = parseInt(Math.floor(tmp).toFixed());
      const after: number = parseInt(Math.ceil(tmp).toFixed());
      const atPoint: number = tmp - before;
      newData[i] = (data[before] || 0) + ((data[after] || 0) - (data[before] || 0)) * atPoint;
    }
    newData[fitCount - 1] = data[data.length - 1] || 0
    return newData
  },
  transS16ToF32: (input: Int16Array): Float32Array => {
    const tmpData: Array<number> = [];
    for (let i = 0; i < input.length; i++) {
      const val: number = input[i] || 0;
      const value: number = val < 0 ? val / 0x8000 : val / 0x7fff;
      tmpData.push(value);
    }
    return new Float32Array(tmpData);
  },
  base64ToS16: (base64AudioData: string): Int16Array => {
    base64AudioData = atob(base64AudioData)
    const outputArray = new Uint8Array(base64AudioData.length)
    for (let i = 0; i < base64AudioData.length; ++i) {
      outputArray[i] = base64AudioData.charCodeAt(i)
    }
    return new Int16Array(new DataView(outputArray.buffer).buffer)
  },
}


export { transAudioData, transcode };

