import { generateUUID } from '@/utils';

type TaskType = "tts" | "asr" | "ts";

// 浏览器目前只能支持webm
// export type DefaultMimie = "audio/webm;codecs=pcm" | "audio/webm;codecs=opus" | "audio/wav;codecs=opus" | "audio/mp3;codecs=opus";
export type DefaultMimie = "audio/webm;codecs=pcm" | "audio/webm;codecs=opus" | "audio/wav" | "audio/mp3";
// 语音识别仅支持两种采样率
export type DefaultBits = 16000 | 8000;

export const recorderPCM: { mimeType: DefaultMimie, audioBitsPerSecond: DefaultBits } = {
    mimeType: 'audio/webm;codecs=pcm',
    audioBitsPerSecond: 16000
};

export const recorderMP3: { mimeType: DefaultMimie, audioBitsPerSecond: DefaultBits } = {
    mimeType: 'audio/mp3',
    audioBitsPerSecond: 16000
};

export const recorderWAV: { mimeType: DefaultMimie, audioBitsPerSecond: DefaultBits } = {
    mimeType: 'audio/wav',
    audioBitsPerSecond: 16000
};



export type SpeakerVoiceEn = 'harry' | 'eric' | 'emily' | 'luna' | 'luca' | 'wendy' | 'william' | 'olivia';
export type SpeakerVoiceUs = 'ava' | 'annie' | 'abby' | 'andy' | 'brian' | 'eva' | 'donna' | 'cally' | 'cindy' | 'beth' | 'betty';
export type SpeakerVoiceCn = 'zhimiao_emo' | 'zhimi_emo' | 'zhiyan_emo' | 'zhibei_emo' | 'zhitian_emo';

/**
 * @example
 * {
 *  speaker: '知妙_多情感',
 *  voice: "zhimiao_emo",
 *  format: "wav",
 *  sample_rate: 16000,
 *  volume: 100,
 *  speech_rate: -500,
 *  pitch_rate: 0,
 *  emotion: 'gentle',
 *  enable_subtitle: false,
 * }
 */
export interface ISpeaker {
    speaker?: string,
    voice: SpeakerVoiceEn | SpeakerVoiceUs | SpeakerVoiceCn,
    format?: string,
    sample_rate?: number,
    volume?: number,
    speech_rate?: number,
    pitch_rate?: number,
    emotion?: string,
    enable_subtitle?: boolean,
}

interface ITTSPayload extends ISpeaker {
    appkey?: string,
    text: string
}

interface IASRPayload {
    appkey?: string,
    format: string,
    sample_rate: number,
    enable_intermediate_result?: boolean,
    enable_punctuation_predition?: boolean,
    enable_inverse_text_normalization?: boolean
}

interface INLSContext {
    sdk: {
        name: string,
        version: string,
        language: string
    }
}

export interface INLSHeader {
    namespace?: string,
    name?: string,
    message_id: string,
    task_id: string,
    status_text?: string,
    status?: number,
    appkey?: string
}

interface INLSRequest {
    header: INLSHeader,
    payload: ITTSPayload | IASRPayload | {},
    context: INLSContext
}

interface INLSStartOptions {
    onData: Function,
    onMessage?: Function,
    onclose?: Function
}

interface INLSNnamespace {
    namespace: string,
    name: { [key: string]: string }
}

export interface INLSConfig {
    url: string,
    token: string,
    appkey: string,
    binaryType?: BinaryType
}

export const REQUEST_EVENTS: { [key: string]: INLSNnamespace } = {
    tts: { // 语音合成
        namespace: "SpeechSynthesizer",
        name: {
            start: "StartSynthesis"
        }
    },
    asr: { // 语音识别
        namespace: "SpeechRecognizer",
        name: {
            start: "StartRecognition",
            stop: "StopRecognition"
        }
    }
};

export const COMMON_RESPONSE_EVENTS = {
    META: "MetaInfo",
    FAILED: "TaskFailed",
};

export const TTS_RESPONSE_EVENTS = {
    COMPLETED: "SynthesisCompleted"
};

export const ASR_RESPONSE_EVENTS = {
    STARTED: "RecognitionStarted",
    RESULT_CHANGED: "RecognitionResultChanged",
    COMPLETED: "RecognitionCompleted"
};

export const sleep = (waitTimeInMs: number) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
// 设置每100毫秒读取3200字节
const CHUNK_SIZE = 3200;
const INTERVAL_MS = 100;

export default class NLSClient {

    private _debug: boolean = true;

    private _config: INLSConfig;
    private _ws: WebSocket | null = null;
    private _buffer: ArrayBuffer = new ArrayBuffer(0);
    private _blob: Blob = new Blob([], { type: 'audio/mpeg' });
    private _taskId: string = '';
    private _taskType: TaskType;

    private _isConnected: boolean = false;

    constructor(config: INLSConfig, taskType: TaskType = 'tts') {
        this._taskType = taskType;
        this._config = config;
    }

    private connect = (config: INLSConfig): WebSocket => {
        if (this._ws instanceof WebSocket && this._isConnected) {
            return this._ws;
        } else {
            const _ws: WebSocket = new WebSocket(config.url + "?token=" + config.token);
            _ws.binaryType = config.binaryType || 'blob';
            return _ws;
        }
    };

    private onError = (event: Event, callback: Function) => {
        console.error("WebSocket error:", event);

        this.close();
        this._taskId = '';
        this._isConnected = false;
        callback && callback(event);
    };

    private onOpen = (event: Event, callback: Function) => {
        this._debug && console.debug("WebSocket open:", event);

        this._taskId = this.uuid();
        this._buffer = new ArrayBuffer(0);
        this._isConnected = true;
        callback && callback(event);
    };

    protected combinData = (chunk: ArrayBuffer) => {
        // 将新数据追加到原有的 ArrayBuffer 中
        var tmp = new Uint8Array(this._buffer.byteLength + chunk.byteLength);
        tmp.set(new Uint8Array(this._buffer), 0);
        tmp.set(new Uint8Array(chunk), this._buffer.byteLength);
        this._buffer = tmp.buffer;
    }

    public start = ({ onData, onMessage, onclose }: INLSStartOptions) => {
        this._ws = this.connect(this._config);

        if (typeof onData !== 'function') {
            throw new Error("expect function ondata")
        }

        this._ws.onmessage = (event: MessageEvent) => {
            const { data } = event;
            if (data instanceof Blob) {
                this._debug && console.debug("WebSocket on blob data:", data);

                this._blob = new Blob([this._blob, data], { type: 'audio/mpeg' });
            } else if (data instanceof ArrayBuffer) {
                this._debug && console.debug("WebSocket on arraybuffer data:", data);

                this.combinData(data as ArrayBuffer);
            } else {
                const response = JSON.parse(data);
                const { status, name, status_text, ...other } = response.header;
                switch (name) {
                    // 语音合成事件
                    case TTS_RESPONSE_EVENTS.COMPLETED:
                        this._debug && console.debug(`Message: ${name}, Status: ${status}`);

                        onData && onData(this._config.binaryType === "arraybuffer" ? this._buffer : this._blob);
                        this.close();
                        break;

                    // 语音识别事件
                    case ASR_RESPONSE_EVENTS.COMPLETED:
                        this._debug && console.debug(`Message: ${name}, Status: ${status}`);

                        onData && onData(response.payload);
                        this.close();
                        break;
                    case ASR_RESPONSE_EVENTS.RESULT_CHANGED:
                        this._debug && console.debug(`Message: ${name}, Status: ${status}`);

                        onData && onData(response.payload);
                        break;

                    // 通用事件
                    case COMMON_RESPONSE_EVENTS.FAILED:
                        console.error(`Message: ${name}, Status: ${status}`, status_text);

                        this.close();
                        break;
                    case COMMON_RESPONSE_EVENTS.META:
                    default:
                        this._debug && console.debug(`Message: ${name}, Status: ${status}`, other);

                        onMessage && onMessage(response.header);
                        break;
                }
            }
        };

        this._ws.onclose = (event: CloseEvent) => {
            this._debug && console.debug("WebSocket close:", event);

            onclose && onclose();
        };

        return new Promise((resolve, reject) => {
            if (this._ws) {
                this._ws.onopen = event => this.onOpen(event, resolve);
                this._ws.onerror = event => this.onError(event, reject);
            }
        });
    }

    public sendText = (text?: string, speaker?: ISpeaker) => {
        if (!this._ws) return;
        this._debug || console.info(`WebSocket send [${this._taskType}] message.`);
        this._debug && console.debug(`WebSocket send [${this._taskType}] message:`, text);

        this._ws.send(this.conbineCommand(text, speaker));
    }

    /**
     * 发送音频数据
     * 阿里云对发送速率有限制：8000采样率情况下，3200byte字节/ 200ms，16000采样率情况下，3200byte字节/100ms
     * @param {Blob} data 
     */
    public sendAudioBlob = async (data: Blob) => {
        if (!this._ws) return;
        console.group('Send audio blob');

        console.info(`WebSocket send audio data`, data);

        const start = performance.now();
        let sentBytes = 0;

        // 每100ms发送一部分数据
        await new Promise(resolve => {
            const intervalId = setInterval(() => {
                const remainingBytes = data.size - sentBytes;
                const chunkSize = Math.min(3200, remainingBytes);
                const chunk = data.slice(sentBytes, sentBytes + chunkSize);

                console.info(`WebSocket sent ${chunk.size} bytes`);
                this._ws && this._ws.send(chunk);

                sentBytes += chunkSize;
                if (sentBytes >= data.size) {
                    clearInterval(intervalId);
                    resolve(true);
                }
            }, 100);
        });

        // 计算发送速率
        const duration = performance.now() - start;
        const bytesPerSecond = (data.size / duration) * 1000;
        console.info(`WebSocket sent ${data.size} bytes in ${duration} ms (${bytesPerSecond} bytes/second)`);
        console.groupEnd();

        sleep(100);
        this.stopAudio();
    }

    public sendAudioBuffer = (data: Blob) => {
        if (!this._ws) return;
        console.group('Send audio arraybuffer');

        console.info(`WebSocket send audio data`, data);

        const reader = new FileReader();
        // 当读取完成后发送数据
        reader.onload = () => {
            this._ws && this._ws.send(reader.result as ArrayBuffer);
        }

        // 定时读取Blob数据并发送
        const start = performance.now();
        let offset = 0;
        const readChunk = () => {
            if (offset >= data.size) {
                // 计算发送速率
                const duration = performance.now() - start;
                const bytesPerSecond = (data.size / duration) * 1000;
                console.info(`WebSocket sent ${data.size} bytes in ${duration} ms (${bytesPerSecond} bytes/second)`);
                console.groupEnd();

                setTimeout(this.stopAudio, INTERVAL_MS);
            } else {
                const chunk: Blob = data.slice(offset, offset + CHUNK_SIZE);
                reader.readAsArrayBuffer(chunk);
                offset += CHUNK_SIZE;
                console.info(`WebSocket sent ${chunk.size} bytes`);
                setTimeout(readChunk, INTERVAL_MS);
            }
        };
        // 开始读取和发送数据
        readChunk();
    }

    public send = (data: any) => {
        sleep(20);
        this._ws && this._ws.send(data);
    }

    public stopAudio = () => {
        if (!this._ws) return;
        console.info(`WebSocket stop recognition[${this._taskType}] message.`, this._ws.readyState);

        // _asr_stop_ 为自定义关键字，遇到则发送[停止上传录音指令(StopRecognition)]
        this._ws.send(this.conbineCommand('_asr_stop_'));
    }

    public close = (code?: number, reason?: string) => {
        if (!this._ws) return;
        console.info("WebSocket set close");

        this._ws.close(code, reason);
    }

    public uuid = () => {
        return generateUUID().split("-").join("");
    };

    public generateStartPayload = (text: string = "", speaker?: ISpeaker): ITTSPayload | IASRPayload => {
        if (this._taskType === "tts") {
            return {
                // speaker: '知妙_多情感',
                voice: "zhimiao_emo",
                format: "wav",
                sample_rate: 16000,
                volume: 100,
                speech_rate: -500,
                pitch_rate: 0,
                emotion: 'gentle',
                enable_subtitle: false,
                ...speaker,
                text
            };
        } else if (this._taskType === "asr") {
            return {
                format: "pcm",
                sample_rate: 16000,
                enable_intermediate_result: true,
                enable_punctuation_predition: true,
                enable_inverse_text_normalization: true
            }
        } else {
            throw new Error("NLS Type error!");
        }
    }

    public conbineCommand = (text?: string, speaker?: ISpeaker) => {
        const { namespace, name } = REQUEST_EVENTS[this._taskType] || {};
        const command: INLSRequest = {
            header: {
                message_id: this.uuid(),
                task_id: this._taskId,
                namespace,
                name: name?.[text === '_asr_stop_' ? 'stop' : 'start'] || '',
                appkey: this._config.appkey
            },
            payload: text === '_asr_stop_' ? {} : this.generateStartPayload(text, speaker),
            context: this.defaultContext()
        };

        return JSON.stringify(command);
    }

    public defaultContext() {
        return {
            sdk: {
                name: "nls-nodejs-sdk",
                version: "0.0.1",
                language: "nodejs"
            }
        }
    }
}