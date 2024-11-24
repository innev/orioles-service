// const WORKER_ENABLED: string = !!(global === global.window && global.URL && global.Blob && global.Worker);

export type TCommond = 'init' | 'record' | 'exportWAV' | 'getBuffer' | 'clear';

export interface IAudioContext {
    sampleRate: number,
    numChannels: number
};

export interface IMessage {
    command: TCommond,
    data?: Array<Float32Array> | Blob,
    buffer?: Array<any>,
    type?: string,
    config?: IAudioContext
};



export default class InlineWorker {
    private functionBody: any;
    // self = self || {};

    constructor() {
        // if (WORKER_ENABLED) {
        //     functionBody = func.toString().trim().match(
        //       /^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/
        //     )[1];
        // 
        //     return new global.Worker(global.URL.createObjectURL(
        //       new global.Blob([ functionBody ], { type: "text/javascript" })
        //     ));
        //   }
    }

    public postMessage(data: IMessage){
        this.onmessage({ data });
    }

    protected onmessage({ data }: { data: IMessage }) {

    }
  
    // this.self = self;
    // this.self.postMessage = postMessage;
  
    // setTimeout(func.bind(self, self), 0);
};