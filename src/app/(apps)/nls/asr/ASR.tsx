'use client'

import { RecordIcon } from '@/components/iv-ui/icons';
import useMediaRecorder from '@/hooks/useMediaRecorder';
import { audioReader, transcriptions, localWhisper } from '@/utils';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export default () => {
  const [message, setMessage] = useState<string>('');
  const { startOrStop, audioBlob, audioBlobUrl, recording } = useMediaRecorder();
  const { t } = useTranslation('common');

  // 处理blob文件
  useEffect(() => {
    if (audioBlob && audioBlob instanceof Blob) {
      // 后端处理
      localWhisper(audioBlob)
        .then(res => setMessage(res.data))
        .catch((err: Error) => console.error('转换为 base64 字符串时发生错误。', err));

      // // 前端直接请求
      // audioReader(audioBlob)
      //   .then((base64Data: string) => transcriptions(base64Data))
      //   .then(({ data }) => setMessage(data))
      //   .catch((err: Error) => console.error('转换为 base64 字符串时发生错误。', err));
    }
  }, [audioBlob]);

  // 处理blobURL
  // useEffect(() => {
  //   if (audioBlobUrl && audioBlobUrl != '') {
  //     playBlobUrl(audioBlobUrl, setMessage);
  //   }
  // }, [audioBlobUrl]);

  const handlerRun = async (e: any) => {
    e.preventDefault();
    startOrStop();
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center py-2">
      <main className="mt-12 flex w-full flex-1 flex-col items-center justify-center px-4 text-center sm:mt-20">
        <h1 className="max-w-[708px] text-4xl font-bold text-slate-900 sm:text-6xl">{t('page_asr_title')}</h1>
        <div>{t('page_asr_description')}</div>
        <button
          key="recorder-button"
          className="mt-24 sm:mt-10 inline-flex justify-center text-center rounded-xl bg-blue-600 px-8 py-2 font-medium text-white hover:bg-blue-600/80"
          onMouseDown={handlerRun}
          onMouseUp={handlerRun}
        >
          {recording ? <RecordIcon>{t('page_asr_recording')}</RecordIcon> : t('page_asr_start_record')}
        </button>
        
        <div key="recorder-message" className="w-full mt-4 hover:text-blue-600 hover:border-blue-600">
          <p className="text-xl text-center cursor-pointer">{message}</p>
        </div>
      </main>
    </div>
  );
};