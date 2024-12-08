import { getAliNlSToken } from "@/service/aliyun";
import NLSClient, { INLSConfig, SpeakerVoiceCn, SpeakerVoiceEn, SpeakerVoiceUs } from "@/utils/NLSClient";
import { useState } from "react";

export default () => {
    const [audioBlobUrl, setAudioBlobUrl] = useState<string>();
    const [loading, setLoading] = useState<Boolean>(false);
    const [target, setTarget] = useState<HTMLElement>();
    
    const sendText = async (text: string, voice: SpeakerVoiceUs | SpeakerVoiceEn | SpeakerVoiceCn = 'zhimiao_emo', _target?: HTMLElement) => {
        const config: INLSConfig = await getAliNlSToken() as INLSConfig;
        const nls = new NLSClient(config, 'tts');
        _target && setTarget(_target);

        await nls.start({
            onData: async (data: Blob | ArrayBuffer) => {
                if (data instanceof Blob) {
                    setAudioBlobUrl(URL.createObjectURL(data));
                } else if (data instanceof ArrayBuffer) {
                    console.info("数据类型不正确");
                } else {
                    console.warn("数据类型不正确");
                }
            },
            onclose: () => setLoading(false)
        });

        nls.sendText(text, { voice, speech_rate: 0 });
    };

    return { sendText, loading, audioBlobUrl, target }
};