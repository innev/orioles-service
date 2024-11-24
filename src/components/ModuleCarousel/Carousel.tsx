import { useState } from 'react';
import styles from "./carousel.module.css";

const Carousel = ({ list }: { list: Array<string> }) => {
  const [isLoad, setIsLoad] = useState<Boolean>(true);
  const onLoad = () => {
    setIsLoad(false);
  }
  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marquee}>
        {list && list.map(src => <img alt="图片" key={src} src={`/${src}`} onLoad={onLoad} />)}
      </div>
    </div>
  )
}

export default Carousel;