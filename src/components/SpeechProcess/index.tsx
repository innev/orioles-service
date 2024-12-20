import { actionInfoTips } from '@/components/ModalMethod';
import { Spin } from '@/components/iv-ui';
import { isAbsolutePath } from '@/utils';
import { request } from '@/utils/request';
import { typeItem } from '@/utils/voiceType';
import { useEffect, useMemo, useState } from 'react';
import { IModuleNode, ISpeechDialogue, ISpeechText, ISpeechWord } from '../iv-ui/typings/DBook';
import EvaluationOption from './EvaluationOption';
import Word from './Word';

export default ({ src, data }: { src?: string; data?: IModuleNode }) => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [evalUpdate, setEvalUpdate] = useState<Boolean>(false);
  const [nodeData, setNodeData] = useState<IModuleNode>();
  const [evalList, setEvalList] = useState<IModuleNode>();
  const [evalType, setEvalType] = useState<string>();
  const [wordIdex, setWordIdex] = useState(0)
  const [recordType, setRecordType] = useState('')

  useEffect(() => {
    if(src) {
      src = src.startsWith('https://') ? src.replace('https://', 'http://') : src;
      request({ url: isAbsolutePath(src) ? src : `/${src}`, success: (data: IModuleNode) => {
        setNodeData(data);
        setEvalList(data);
        setLoading(true);
      }});
    } else {
      setLoading(true);
    }
  }, [src]);

  const reset = (type?: string) => {
    let newType: string = data ? typeItem(data, type) : type ? type : '';
    if (newType === 'text') setRecordType('wholestory');
    else setRecordType('');
    setEvalType(newType);
    setWordIdex(0);
  };

  /*
  const changeEvents = (grade: any) => {
    let list = typeList(evalList[evalType])?.filter(item => item.eval_type === evalType)
    const resultItem = grade?.xml_result ? grade?.xml_result[list[0].question_type]?.rec_paper[list[0].result_type] : null
    const wordList = parseSentence(evalList[evalType], resultItem?.sentence)
    const total_score = resultItem?.total_score
    //每个字的情况
    if (wordList)
      setEvalList(
        updateText(evalList, evalType, recordType, wordIdex, wordList)
      )
    //总分
    if (total_score)
      setEvalList(
        updateScore(evalList, evalType, recordType, wordIdex, Math.round(total_score * 10) / 10)
      )
    setLoading(false);
  }

  const errorEvents = (code: string) => {
    actionInfoTips({
      text: codeMessage[code] || '评测失败，请重试',
      okText: '知道了',
      okButtonProps: {
        size: 'large',
        className: "w100 lh26 text-color-white background backg-record bdrs100 b1F-not"
      },
    })
    setLoading(false)
    setEvalUpdate(!evalUpdate)
  }
  */

  const mediaFail = () => {
    let html = <div className="mt-40 mb-22">
      <img className="mt12 w76" src={require('@/assets/images/microphone.png')} />
      <i className="iconfont iconyuyinshuohua fs48 text-color-secondary" ></i>
      <div className="fs20 mt20 text-color-heading">抱歉，未检测到麦克风</div>
      <div className="fs14 lh30 text-color-extra">建议检查设备或故障</div>
    </div>
    actionInfoTips({
      text: html,
      okText: '确定',
      okButtonProps: {
        size: 'large',
        className: "w100 lh26 text-color-white background backg-record bdrs100 b1F-not"
      },
    })
  }

//   const { audioData, clickAudio, clickStop } = useEvaluation({
//     text: textReturn(evalList[evalType], recordType, wordIdex, evalType),
//     business: {
//       category: findThisItem(evalList[evalType], evalType)?.question_type,
//       ent: evalList[evalType][0]?.en ? 'en_vip' : 'cn_vip'
//     },
//     voicetype: 'ise',
//     changeEvents,
//     errorEvents,
//     mediaFail,
//     loadingEvent: setLoading
//   })
// 
//   useEffect(() => {
//     setEvalList(
//       updateAudio(evalList, evalType, recordType, wordIdex, audioData)
//     )
//   }, [audioData])

  const updateState = (type: string, value: any) => {
    if (type === 'wordIdex')
      setWordIdex(value)
    if (type === 'recordType')
      setRecordType(value)
  }
  
  const speechRander = useMemo(() => {
    if(!nodeData) return null;
    
    return Object.keys(nodeData).map((key: string, idx: number) => {
      const speechs: Array<ISpeechWord | ISpeechDialogue | ISpeechText> = nodeData[key as keyof typeof nodeData] as Array<ISpeechWord | ISpeechDialogue | ISpeechText>;
      
      switch(key) {
        case "word": return <Word key={`${key}_${idx}`} speechs={speechs as Array<ISpeechWord>} />;
        // case "dialogue": return <Dialogue data={evalList} evalType={evalType} wordIdex={wordIdex} updateState={updateState} />;
        // case "text": return <Text data={evalList} evalType={evalType} wordIdex={wordIdex} updateState={updateState} recordType={recordType} />;
        default: return null;
      }
    });
  }, [nodeData]);


  return (
    <Spin spinning={loading}>
      <div className="h-full w-full" >
        {/* <div className="tc p24 catalogTabs">
          {
            evalList[evalType] &&
            typeList(evalList[evalType])?.map((v, i) => {
              if (evalList[v.eval_type]?.length > 0) {
                return <div
                  key={v.eval_type + i}
                  // className={classNames("pointer ib w120 h40 fs20 b2F-record text-primary", {
                  //   'background text-color-white': evalType === v.eval_type
                  // })}
                  className={classNames("pointer ib w120 h40 fs20 b2F-record text-primary")}
                  onClick={() => reset(v.eval_type)}
                >{v.name}</div>
              }
            })}
        </div> */}
        {speechRander}



        <div className="absolute bottom-0 translate-x-1/2 left-1/2 hidden">
          {/* /* 底部播放音频和录音部分 */}
          <EvaluationOption
            evalUpdate={evalUpdate}
            data={evalList}
            evalType={evalType}
            wordIdex={wordIdex}
            // clickAudio={clickAudio}
            // clickStop={clickStop}
            recordType={recordType}
            updateState={updateState}
            reset={reset}
          />
        </div>
      </div>
    </Spin>
  )
};