// import SquareGrid from '@/components/SquareGrid';
import useTextToSpeech from '@/hooks/useTextToSpeech';
import { isArray, playBlobUrl } from '@/utils';
import { SpeakerVoiceCn, SpeakerVoiceEn, SpeakerVoiceUs } from '@/utils/NLSClient';
import { useEffect } from 'react';
import { ISpeechWord } from '../iv-ui/typings/DBook';
// import { AllScore } from './Score';

const EnRender = ({ data, voice }: { data: ISpeechWord; voice: SpeakerVoiceUs | SpeakerVoiceEn | SpeakerVoiceCn }) => {
  const { sendText, audioBlobUrl, target } = useTextToSpeech();

  useEffect(() => {
    if (audioBlobUrl && audioBlobUrl != '') {
      playBlobUrl(audioBlobUrl, console.log, target);
    }
  }, [audioBlobUrl]);

  const texts: Array<string> = isArray(data.cn) ? data.cn as Array<string> : [ data.cn as string ];
  
  return (
    <div className="w-full text-left border-b border-stone-300 py-4 px-6">
      <div key="data-en" className="inline-block text-6xl font-times text-color-record-miss">
        {data?.star ? <span className='text-red-600'>*</span> : null}
        <a className='cursor-pointer smil-text' onClick={evn => sendText(data.en as string, voice, evn.currentTarget)}>{data.en}</a>
      </div>

      {data.ps && data.ps != "" && data.ps != "//" ? <div key="data-ps" className="w-full m-4">
        <span className='text-2xl font-ipa text-gray-500'>{data.ps}</span>
      </div> : null}

      <div key="data-cn" className="w-full m-4">
        {texts.map((el, idx) => {
          return (
            <div key={`${data.id}_${idx}`} className="text-2xl font-word text-blue-500">
              <span className="mr16">{el?.substring(0, el?.lastIndexOf('.') + 1)}</span>
              <span className='text-primary'>{el?.substring(el?.lastIndexOf('.') + 1)}</span>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default ({ speechs = [] }: { speechs: Array<ISpeechWord> }) => {
  return (
    <div className="h-full w-full">
      <div className="px-6 py-5 m-auto bg-white">
        {speechs.map((wordItem: ISpeechWord) => {
          switch (wordItem.lang) {
            /**
             * 英语： 单词
             */
            case "en": return <EnRender key={wordItem.id} data={wordItem} voice={wordItem?.voice || "luna"} />;
            /**
             * 语文： 生字/词语
             */
            // case "cn": return <SquareGrid item={wordItem} type={evalType === 'word' ? "tian" : "meter"} />;
          }

          // <AllScore item={wordItem} />
        })}
      </div>
    </div>
  )
};