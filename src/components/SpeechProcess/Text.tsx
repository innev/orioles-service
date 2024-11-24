import { classNames } from '@/utils/classNames';
import { RightScore, TopScore } from './Score';

export default ({ data, evalType, wordIdex, updateState, recordType }: { data: any, evalType: any, wordIdex: any, updateState: any, recordType: any }) => {
  
  const resultText = (text: any, type: string) =>{
    if(recordType === 'wholestory'){
      return text?.all_dp_message === type
    }else if(recordType === 'paragraph'){
      return text?.dp_message === type
    }else{
      return false
    }
  }

  return (
    <>
      <TopScore item={data} isShow={recordType === 'wholestory'} />

      <div className="flex1 h-full flex flex-col pb24 pr overflow-hidden">

        <div className="flex1 flex flex-col pt12 pb24 overflow-hidden">

          <div className="flex1 w-full overflow-auto pt20 pb20 mauto bsdb background-color-white catalogcont">

            {
              data[evalType]?.map((item: any, i: number) => (
                <div
                  // className={classNames("pr flex family px48", {
                  //   'background-color-primary-opacity3 pt20 pb20': recordType != 'wholestory' && item.id === data[evalType][wordIdex].id
                  // })}
                  className={classNames("pr flex family px48")}
                  key={item.id}
                  onClick={() => { if (recordType != 'wholestory') updateState('wordIdex', i) }}
                >
                  <div className="flex1 lh40 pr">

                    <div className={classNames("fs24 smil-text text-color-record-miss pr text-indent")}>

                      {
                        item.textList?.map((text: any, idex: number) => (
                          // <span key={text?.name + idex} className={classNames({
                          //   'text-color-record-sure': resultText(text, "0"),
                          //   'text-color-record-miss': resultText(text, "16")
                          // })}>
                          <span key={text?.name + idex}>
                            {text?.name}
                          </span>
                        ))}

                    </div>
                    {item?.en && (
                      <div className="fs16 text-color-secondary">{item?.cn}</div>
                    )}
                  </div>

                  <RightScore item={item} isShow={recordType && recordType != 'wholestory'} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  )
};