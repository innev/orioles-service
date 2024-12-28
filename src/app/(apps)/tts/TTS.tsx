'use client'

import LoadingDots from '@/components/iv-ui/LoadingDots';
import { NLS_SERVICE } from '@/service';
import { get_ } from '@/utils/fetch';
import NLSClient, { INLSConfig } from '@/utils/NLSClient';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export default () => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("迢迢牵牛星，皎皎河汉女。");
  const [audioUrl, setAudioUrl] = useState<string>('');
  const { t } = useTranslation('common');

  useEffect(() => {
    if (audioUrl && audioUrl !== '') {
      const audio = new Audio();
      audio.src = audioUrl;
      audio.oncanplay = () => {
        console.info("开始播放");
        audio.play()
      };
      audio.onerror = err => {
        if (audio.currentSrc.lastIndexOf("stop") !== -1) {
          console.info("音频停止");
        } else {
          console.error("音频播放错误，请检查音频文件是否正确", err);
        }
      };
    }
  }, [audioUrl]);

  const _execute_ = async (e: any) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    
    const config: INLSConfig = await get_(NLS_SERVICE.ALI_TOKEN);
    const nls = new NLSClient(config, 'tts');
    await nls.start({
      onData: async (data: Blob | ArrayBuffer) => {
        if (data instanceof Blob) {
          setAudioUrl(URL.createObjectURL(data));
        } else if (data instanceof ArrayBuffer) {
          console.info("数据类型不正确");
        } else {
          console.warn("数据类型不正确");
        }
      },
      onclose: () => setLoading(false)
    });

    nls.sendText(text);
  };

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center py-2">
      <main className="mt-12 flex w-full flex-1 flex-col items-center justify-center px-4 text-center sm:mt-20">
        <h1 className="max-w-[708px] text-4xl font-bold text-slate-900 sm:text-6xl">
          {t('page_tts_title')}
        </h1>
        <div className="w-full max-w-xl">
          <textarea
            onChange={e => setText(e.target.value)}
            rows={6}
            value={text}
            className="my-5 w-full rounded shadow border-black focus:border-black focus:ring-black"
            placeholder={t('page_tts_input_placeholder')}
          />
          <button
            className="mt-8 rounded-xl bg-black px-8 py-2 font-medium text-white hover:bg-black/80 sm:mt-10"
            onClick={_execute_}
            disabled={loading}
          >
            {loading ? <LoadingDots color="white" style="large" /> : t('page_tts_run')}
          </button>
        </div>
      </main>
    </div>
  )
};