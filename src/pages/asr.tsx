import RecordIcon from '@/components/icons/Record';
import HomeLayout from '@/components/layouts/HomeLayout';
import useMediaRecorder from '@/hooks/useMediaRecorder';
import { audioReader, transcriptions } from '@/utils';
import { ReactNode, useEffect, useState } from 'react';

const AsrPage = () => {
  const [message, setMessage] = useState<string>('');
  const { startOrStop, audioBlob, audioBlobUrl, recording } = useMediaRecorder();

  // 处理blob文件
  useEffect(() => {
    if (audioBlob && audioBlob instanceof Blob) {
      // localWhisper(audioBlob); // 后端处理

      // 前端直接请求
      audioReader(audioBlob)
        .then((base64Data: string) => transcriptions(base64Data))
        .then(({ data }) => setMessage(data))
        .catch((err: Error) => console.error('转换为 base64 字符串时发生错误。', err));
    }
  }, [audioBlob]);

  // 处理blobURL
  useEffect(() => {
    if (audioBlobUrl && audioBlobUrl != '') {
      // playBlobUrl(audioBlobUrl, setMessage);
    }
  }, [audioBlobUrl]);

  const handlerRun = async (e: any) => {
    e.preventDefault();
    startOrStop();
  }

  return [
    <button
      key="recorder-button"
      className="mt-24 sm:mt-10 inline-flex justify-center w-full text-center rounded-xl bg-blue-600 px-8 py-2 font-medium text-white hover:bg-blue-600/80"
      onMouseDown={handlerRun}
      onMouseUp={handlerRun}
    >
      {recording ? <RecordIcon>正在录音...</RecordIcon> : '开始录音'}
    </button>,

    <div key="recorder-message" className="w-full mt-4 hover:text-blue-600 hover:border-blue-600">
      <p className="text-xl text-center cursor-pointer">{message}</p>
    </div>
  ];
};

AsrPage.getLayout = (page: ReactNode) => <HomeLayout>{page}</HomeLayout>;
export default AsrPage;