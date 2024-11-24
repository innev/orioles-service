// import u706 from '@/assets/images/u706.png';
import { classNames } from '@/utils/classNames';
import { scoreBackList, scoreList } from '@/utils/voiceType';

export const RightScore = ({ item, isShow = true }: { item: any; isShow: Boolean }) => {
  const getBackg = (item: any) => {
    let list: Array<any> = scoreBackList.filter(el => el.minScore <= item?.totalScore && item?.totalScore < el.maxScore)
    return list.length > 0 ? list[0].background : null
  }

  return (
    <>
      {
        (!!item?.totalScore || item?.totalScore === 0) && isShow && (
          <div
            className={classNames("pr w80 h36 fs24 lh36 text-color-white bdrs20 pl18 bsdb ml20")}
            style={{ background: `${getBackg(item)}` }}
          >
            <i className="iconfont iconxingxing start fs20" />
            {Math.floor(item.totalScore)}
            <span className="fs16">分</span>
          </div>
        )
      }
    </>
  )
}

export const TopScore = ({ item, isShow = true}: { item: any; isShow: Boolean }) => {
  return (
    <>
      {
        isShow &&
        (item?.totalAllScore || item?.totalAllScore === 0) && (
          <div
            className="w165 ps tc"
            style={{ right: '50px', top: '32px', zIndex: '100' }}
          >
            {/* <img src={u706} /> */}

            <div
              className="text-color-white fs40 h40 lh36 ps half-center topF50 leftF50"
              style={{ wordBreak: 'keep-all' }}
            >
              {item?.totalAllScore}<span className="fs16">分</span>
            </div>
          </div>
        )
      }
    </>
  )
}

export const AllScore = ({ item }: { item: any }) => {
  return (
    <>
      {
        (item?.totalScore || item?.totalScore === 0) && (
          <div
            className="w-full h-full ps top left tc flex flex-col justify-center items-center z2"
            style={{ background: 'rgba(0,0,0,0.6)' }}
          >

            <div className="fs120 text-color-white lh96">
              {Math.floor(item?.totalScore)}
              <span className="fs32">分</span>
            </div>

            <div>
              {scoreList?.map((score, i) => (
                <i
                  key={score.minScore + i}
                  // className={classNames("iconfont iconxingxing text-color-extra fs60", {
                  //   'iconcolor-star': score.minScore <= item?.totalScore,
                  //   'mr52': i != scoreList.length - 1
                  // })}
                  className={classNames("iconfont iconxingxing text-color-extra fs60")}
                />
              ))}
            </div>
          </div>
        )
      }
    </>
  )
}
