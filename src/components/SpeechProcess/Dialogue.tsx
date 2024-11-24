import { classNames } from '@/utils/classNames';
import { RightScore } from './Score';

export default ({ data, evalType, wordIdex, updateState }: { data: any, evalType: any, wordIdex: any, updateState: any }) => {
  return (
    <>
      {
        data[evalType] &&
        data[evalType][0]?.en && (

          <div className="flex1 h-full flex flex-col pb24 pr overflow-hidden">

            <div className="flex1 flex flex-col pt12 pb24 overflow-hidden">

              <div className="flex1 w-full overflow-auto pt20 pb20 mauto bsdb background-color-white catalogcont">

                {
                  data[evalType]?.map((item: any, i: number) => (
                    <div
                      // className={classNames("pr flex family px48 pt10 pb10", 'background-color-primary-opacity3' : item.id === data[evalType][wordIdex].id)}
                      className={classNames("pr flex family px48 pt10 pb10")}
                      key={item.id}
                      onClick={() => updateState('wordIdex', i)}
                    >
                      <div className="flex1 lh36 pr">

                        <div className={classNames("fs24 smil-text text-color-record-miss pr")}>
                          {
                            item.textList?.map((text: any, idex: number) => (
                              <span
                                key={text.name + idex}
                                // className={classNames({
                                //   'text-color-record-sure': text.dp_message === '0',
                                //   'text-color-record-miss': text.dp_message === '16'
                                // })}
                              >{text.name}</span>
                            ))
                          }

                        </div>
                        <div className="fs16 text-color-secondary">
                          {item.cn}
                        </div>
                      </div>
                      <RightScore item={item} isShow={true} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

      {/* {data[evalType] && !data[evalType][0]?.en && (
        <Word
          data={data}
          evalType={evalType}
          wordIdex={wordIdex}
          updateState={updateState}
        />
      )} */}
    </>
  )
};