import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { CarouselRecommendStyles } from '@/renderer/views/MusicHome/styles/CarouselRecommendStyles';
import { motion, useAnimationControls } from 'framer-motion';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

interface IProps {
  sheetList: any[];
}

/**
 * @description: 音乐馆--精选--推荐歌单（轮播歌单形式）
 */
const CarouselRecommend = memo(({ sheetList }: IProps) => {
  const controls = useAnimationControls();
  const carouseRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin); // 注册插件
  }, []);

  // 鼠标进入
  const onMouseEnter = useCallback(() => {
    controls.start({
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    });
  }, [controls]);

  // 鼠标离开
  const onMouseLeave = useCallback(() => {
    controls.start({
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    });
  }, [controls]);

  /**
   * 处理滚动
   */
  const [isScrolling, setIsScrolling] = useState(false);
  const [isScrollStart, setIsScrollStart] = useState(true); // 滚动到最左边
  const [isScrollEnd, setIsScrollEnd] = useState(true); // 滚动到最右边
  const [currentIndex, setCurrentIndex] = useState(1); // 当前是第几个轮播（3个一组）
  const handleScroll = useCallback(
    (scrollToValue: number) => {
      gsap.to(carouseRef.current, {
        scrollTo: { x: scrollToValue },
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => onComplete(),
      });

      function onComplete() {
        if (!carouseRef.current) return;
        const { scrollLeft, clientWidth } = carouseRef.current;
        if (scrollLeft === 0) {
          setIsScrollStart(true);
        }
        if (scrollLeft / clientWidth === sheetList.length / 3) {
          setIsScrollEnd(true);
        }
      }
    },
    [sheetList?.length],
  );

  /**
   * 左滚动
   */
  const handlePre = useCallback(() => {
    handleScroll(-(carouseRef.current?.clientWidth || 0));
  }, [handleScroll]);

  /**
   * 右滚动
   */
  const handleNext = useCallback(() => {
    handleScroll(carouseRef.current?.clientWidth || 0);
  }, [handleScroll]);

  return (
    <CarouselRecommendStyles
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={() => onMouseLeave()}
    >
      {/* 歌单列表 */}
      <div className="carouse-recommend" ref={carouseRef}>
        {sheetList?.map((item, index) => {
          return (
            <div key={index} className="sheet-item">
              <img className="image" src={item.sheetImage} alt="" />
            </div>
          );
        })}
      </div>
      {/* 左、右切换按钮 */}
      <motion.div
        className="next"
        initial={{ opacity: 0 }}
        animate={controls}
        onClick={handleNext}
      >
        <RightOutlined />
      </motion.div>
      <motion.div
        className="prev"
        initial={{ opacity: 0 }}
        animate={controls}
        onClick={handlePre}
      >
        <LeftOutlined />
      </motion.div>
    </CarouselRecommendStyles>
  );
});

export default CarouselRecommend;
