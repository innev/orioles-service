// import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Tooltip } from '../iv-ui';

const closewin = () => {
  if (navigator.userAgent.indexOf("Firefox") !== -1 || navigator.userAgent.indexOf("Chrome") !== -1) {
    window.location.href = "about:blank";
  } else {
    window.opener = null;
    window.open("", "_self");
  }
  window.close();
};

export default ({ type, code, origin = 'cloud', goBack = '' }: { type?: string; code?: string; origin?: string; goBack?: string; }) => {
  // const router = useRouter();
  const [volumePrecent, setVolumePrecent] = useState(0);
  const [volumeShow, setVolumeShow] = useState<Boolean>(false);

  useEffect(() => {
    window.addEventListener('volumeUpdate', volumeMessage)
    return () => {
      window.removeEventListener('volumeUpdate', volumeMessage)
    }
  }, [])

  const volumeMessage = (e: any) =>{
    setVolumePrecent(e.detail.volume);
  }

  return (
    <div className="flex flex-col">
      <Link href={goBack}>
        {/* <Tooltip text="返回" iconType="fanhui" onClick={() => router.back()} /> */}
        <Tooltip text="返回" iconType="fanhui" />
      </Link>
      <Tooltip text="全屏" iconType="quanping" />
      {/* <Tooltip text="退出全屏" iconType="tuichuquanping" /> */}
      <Tooltip text="音量" iconType={volumePrecent === 0 ? "jingyin" : "yinliangda"} onClick={() => setVolumeShow(!volumeShow)}/>
      <Tooltip text="帮助" iconType="yiwen" />
      <Tooltip text="编辑" iconType="bianji" />
      <Tooltip text="退出" iconType="tuichu" onClick={closewin} />
    </div>
  )
};