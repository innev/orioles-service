// import InlineWorker from 'inline-worker';
import InlineWorker, { IAudioContext, IMessage } from '../InlineWorker';

class TranWAVWorker extends InlineWorker {

  private recLength: number = 0;
  private recBuffers: Array<any> = [];
  private sampleRate: number = 0;
  private numChannels: number = 0;

  private interleave(inputL: Float32Array, inputR: Float32Array): Float32Array {
    const length: number = inputL.length + inputR.length;
    const result: Float32Array = new Float32Array(length);
    let index = 0, inputIndex = 0;

    while (index < length) {
      result[index++] = inputL[inputIndex] || 0;
      result[index++] = inputR[inputIndex] || 0;
      inputIndex++;
    }
    return result;
  }

  private getBuffer() {
    const buffers: Array<Float32Array> = [];
    for (let channel = 0; channel < this.numChannels; channel++) {
      buffers.push(this.mergeBuffers(this.recBuffers[channel], this.recLength));
    }
    this.postMessage({ command: 'getBuffer', data: buffers });
  }

  private clear() {
    this.recLength = 0;
    this.recBuffers = [];
    this.initBuffers();
  }


  private initBuffers() {
    for (let channel = 0; channel < this.numChannels; channel++) {
      this.recBuffers[channel] = [];
    }
  }

  private mergeBuffers(recBuffers: any, recLength: number): Float32Array {
    const result: Float32Array = new Float32Array(recLength);
    let offset: number = 0;
    for (let i = 0; i < recBuffers.length; i++) {
      result.set(recBuffers[i], offset);
      offset += recBuffers[i].length;
    }
    return result;
  }


  private init(config?: IAudioContext) {
    this.sampleRate = config?.sampleRate || 0;
    this.numChannels = config?.numChannels || 0;
    this.initBuffers();
  }

  private record(inputBuffer?: Array<any>) {
    if(inputBuffer) {
      for (let channel = 0; channel < this.numChannels; channel++) {
        this.recBuffers[channel].push(inputBuffer[channel]);
      }
      this.recLength += inputBuffer[0].length;
    }
  }

  private exportWAV(type: string = '') {
    let buffers: Array<Float32Array> = [];
    for (let channel: number = 0; channel < this.numChannels; channel++) {
      buffers.push(this.mergeBuffers(this.recBuffers[channel], this.recLength));
    }
    let interleaved;
    if (this.numChannels === 2) {
      interleaved = this.interleave(buffers[0] || new Float32Array(0), buffers[1] || new Float32Array(0));
    } else {
      interleaved = buffers[0];
    }

    let dataview = this.encodeWAV(interleaved);

    let audioBlob = new Blob([dataview], { type });
    self.postMessage({ command: 'exportWAV', data: audioBlob });
  }

  private floatTo16BitPCM(output: any, offset: any, input: any) {
    for (let i = 0; i < input.length; i++, offset += 2) {
      let s = Math.max(-1, Math.min(1, input[i]));
      output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
  }

  private writeString(view: any, offset: any, string: any) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  private encodeWAV(samples: any) {
    let buffer = new ArrayBuffer(44 + samples.length * 2);
    let view = new DataView(buffer);
    /* RIFF identifier */
    this.writeString(view, 0, 'RIFF');
    /* RIFF chunk length */
    view.setUint32(4, 36 + samples.length * 2, true);
    /* RIFF type */
    this.writeString(view, 8, 'WAVE');
    /* format chunk identifier */
    this.writeString(view, 12, 'fmt ');
    /* format chunk length */
    view.setUint32(16, 16, true);
    /* sample format (raw) */
    view.setUint16(20, 1, true);
    /* channel count */
    view.setUint16(22, this.numChannels, true);
    /* sample rate */
    view.setUint32(24, this.sampleRate, true);
    /* byte rate (sample rate * block align) */
    view.setUint32(28, this.sampleRate * 4, true);
    /* block align (channel count * bytes per sample) */
    view.setUint16(32, this.numChannels * 2, true);
    /* bits per sample */
    view.setUint16(34, 16, true);
    /* data chunk identifier */
    this.writeString(view, 36, 'data');
    /* data chunk length */
    view.setUint32(40, samples.length * 2, true);

    this.floatTo16BitPCM(view, 44, samples);

    return view;
  }

  protected onmessage({ data }: { data: IMessage }) {
    switch (data.command) {
      case 'init':
        this.init(data.config);
        break;
      case 'record':
        this.record(data.buffer);
        break;
      case 'exportWAV':
        this.exportWAV(data.type);
        break;
      case 'getBuffer':
        this.getBuffer();
        break;
      case 'clear':
        this.clear();
        break;
    }
  }
}

export const tranWAV = new TranWAVWorker();

/*
export const tranWAV = new InlineWorker(function (self) {
  let recLength = 0,
    recBuffers: Array<any> = [],
    sampleRate: number = 0,
    numChannels: number = 0;

  self.onmessage = function (e: any) {
    switch (e.data.command) {
      case 'init':
        init(e.data.config);
        break;
      case 'record':
        record(e.data.buffer);
        break;
      case 'exportWAV':
        exportWAV(e.data.type);
        break;
      case 'getBuffer':
        getBuffer();
        break;
      case 'clear':
        clear();
        break;
    }
  };

  function init(config: any) {
    sampleRate = config.sampleRate;
    numChannels = config.numChannels;
    initBuffers();
  }

  function record(inputBuffer: any) {

    for (var channel = 0; channel < numChannels; channel++) {
      recBuffers[channel].push(inputBuffer[channel]);
    }
    recLength += inputBuffer[0].length;
  }

  function exportWAV(type: any) {
    let buffers = [];
    for (let channel = 0; channel < numChannels; channel++) {
      buffers.push(mergeBuffers(recBuffers[channel], recLength));
    }
    let interleaved;
    if (numChannels === 2) {
      interleaved = interleave(buffers[0], buffers[1]);
    } else {
      interleaved = buffers[0];
    }

    let dataview = encodeWAV(interleaved);

    let audioBlob = new Blob([dataview], { type: type });
    self.postMessage({ command: 'exportWAV', data: audioBlob });
  }

  function getBuffer() {
    let buffers = [];
    for (let channel = 0; channel < numChannels; channel++) {
      buffers.push(mergeBuffers(recBuffers[channel], recLength));
    }
    self.postMessage({ command: 'getBuffer', data: buffers });
  }

  function clear() {
    recLength = 0;
    recBuffers = [];
    initBuffers();
  }

  function initBuffers() {
    for (let channel = 0; channel < numChannels; channel++) {
      recBuffers[channel] = [];
    }
  }

  function mergeBuffers(recBuffers: any, recLength: any) {
    let result = new Float32Array(recLength);
    let offset = 0;
    for (let i = 0; i < recBuffers.length; i++) {
      result.set(recBuffers[i], offset);
      offset += recBuffers[i].length;
    }
    return result;
  }

  function interleave(inputL: any, inputR: any) {
    let length = inputL.length + inputR.length;
    let result = new Float32Array(length);

    let index = 0,
      inputIndex = 0;

    while (index < length) {
      result[index++] = inputL[inputIndex];
      result[index++] = inputR[inputIndex];
      inputIndex++;
    }
    return result;
  }

  function floatTo16BitPCM(output: any, offset: any, input: any) {
    for (let i = 0; i < input.length; i++, offset += 2) {
      let s = Math.max(-1, Math.min(1, input[i]));
      output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
  }

  function writeString(view: any, offset: any, string: any) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  function encodeWAV(samples: any) {

    let buffer = new ArrayBuffer(44 + samples.length * 2);
    let view = new DataView(buffer);

    // RIFF identifier
    writeString(view, 0, 'RIFF');
    // RIFF chunk length
    view.setUint32(4, 36 + samples.length * 2, true);
    // RIFF type
    writeString(view, 8, 'WAVE');
    // format chunk identifier
    writeString(view, 12, 'fmt ');
    // format chunk length
    view.setUint32(16, 16, true);
    // sample format (raw)
    view.setUint16(20, 1, true);
    // channel count
    view.setUint16(22, numChannels, true);
    // sample rate
    view.setUint32(24, sampleRate, true);
    // byte rate (sample rate * block align)
    view.setUint32(28, sampleRate * 4, true);
    // block align (channel count * bytes per sample)
    view.setUint16(32, numChannels * 2, true);
    // bits per sample
    view.setUint16(34, 16, true);
    // data chunk identifier
    writeString(view, 36, 'data');
    // data chunk length
    view.setUint32(40, samples.length * 2, true);

    floatTo16BitPCM(view, 44, samples);
    return view;
  }
});
*/