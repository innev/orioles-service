import { classNames } from "@/utils/classNames";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { DModule } from "../iv-ui/typings/DBook";
import Carousel from "./Carousel";
import styles from "./index.module.css";

export default ({ modules = [], route }: { modules: Array<DModule>; route: string }) => {
  const [activeIdx, setActiveIdx] = useState<Number>(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      const newWidth = document.body.clientWidth * 0.5;
      setWidth(newWidth);
    };

    // 在组件挂载后获取并设置样式
    updateWidth();

    // 监听窗口大小变化，动态更新样式
    window.addEventListener('resize', updateWidth);

    // 组件卸载时移除事件监听器
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  useEffect(() => {
    setActiveIdx(0);
  }, [modules]);

  return (
    <>
      {modules.map((item, idex) => {
        return item.hide || (
          <div
            key={item.id}
            className={classNames("relative flex-[2_2_0%] cursor-pointer",
              styles.module_shadow,
              idex === modules.length - 1 && idex !== activeIdx ? 'flex-[3_3_0%]' : '',
              idex !== modules.length - 1 && idex === activeIdx ? 'flex-[4_4_0%]' : '',
              idex === modules.length - 1 && idex === activeIdx ? 'flex-[5_5_0%]' : ''
            )}
            style={{ background: item.background }}
            onMouseEnter={() => setActiveIdx(idex)}
          >
            <Link href={`${route}/${item.id}`}>
              <div className={classNames('text-center absolute top-1/2 left-1/2', idex === activeIdx ? styles.module_item_active : styles.module_item)}>
                <i className={classNames('iconfont', item.icon, 'text-5xl bg-white rounded-3xl')}></i>
                <p className={classNames('absolute text-2xl text-white left-1/2', styles.module_item_p)}>{item.name}</p>
                <div className={classNames('text-center absolute top-1/2', idex === activeIdx ? styles.carousel_item_active : styles.carousel_item)} style={{ width, maxWidth: '500px' }}>
                  <Carousel list={item.banners || []} />
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
};