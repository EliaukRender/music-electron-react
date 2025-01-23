import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CarouselRecommendStyles } from '@/renderer/views/MusicHome/styles/CarouselRecommendStyles';
import { motion, useAnimationControls } from 'framer-motion';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import classNames from 'classnames';
import { useResizeObserve } from '@/renderer/hooks/useResizeObserve';

interface IProps {
  sheetList: any[];
}

/**
 * @description: 音乐馆--精选--推荐歌单（轮播歌单形式）
 */
const CarouselRecommend = memo(({ sheetList = [] }: IProps) => {
  const controls = useAnimationControls();
  const carouseRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin); // 注册插件
  }, []);

  /**
   * 计算图片的高度
   */
  const WIDTH_HEIGHT_RADIO = 1.4; // 宽高比
  const [imageHeight, setImageHeight] = useState(180);
  const computeImageHeight = useCallback(() => {
    if (!carouseRef.current) return;
    const imageWidth = Math.ceil(
      carouseRef.current.clientWidth / EVERY_GROUP_COUNT,
    );
    // console.log('imageWidth', imageWidth);
    setImageHeight((imageWidth - 20) / WIDTH_HEIGHT_RADIO); // 20是padding-right
  }, []);

  useResizeObserve(carouseRef, computeImageHeight);

  /**
   * 鼠标进入轮播区域
   */
  const onMouseEnter = useCallback(() => {
    controls.start({
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    });
  }, [controls]);

  /**
   * 鼠标离开轮播区域
   */
  const onMouseLeave = useCallback(() => {
    controls.start({
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    });
  }, [controls]);

  const EVERY_GROUP_COUNT = 3; // 3张图一组
  const [isScrolling, setIsScrolling] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1); // 当前是第几个轮播（3个一组）

  /**
   * 指示器数量（一共有几组轮播）
   */
  const pointerList = useMemo(() => {
    const num = Math.ceil(sheetList.length / EVERY_GROUP_COUNT);
    const list: any[] = [];
    for (let i = 1; i <= num; i++) {
      list.push({
        index: i,
      });
    }
    return list;
  }, [sheetList?.length]);

  /**
   * 处理滚动
   */
  const handleScroll = useCallback((scrollToValue: number) => {
    gsap.to(carouseRef.current, {
      scrollTo: { x: scrollToValue },
      duration: 0.5,
      ease: 'power2.inOut',
      onStart: () => onStart(), // 动画开始
      onComplete: () => onComplete(), // 动画结束
    });

    function onStart() {
      setIsScrolling(true);
    }

    function onComplete() {
      setIsScrolling(false);
    }
  }, []);

  /**
   * 点击下一页
   */
  const handleNext = useCallback(() => {
    if (isScrolling) return;
    if (!carouseRef.current) return;
    // 已经是最后一页
    if (currentIndex === pointerList.length) {
      setCurrentIndex(() => {
        handleScroll(0);
        return 1;
      });
    } else {
      setCurrentIndex((prevState) => {
        const newIndex = prevState + 1;
        handleScroll(carouseRef.current!.clientWidth * prevState);
        return newIndex;
      });
    }
  }, [currentIndex, handleScroll, isScrolling, pointerList.length]);

  /**
   * 点击上一页
   */
  const handlePre = useCallback(() => {
    if (isScrolling) return;
    if (!carouseRef.current) return;
    // 已经是第一页
    if (currentIndex === 1) {
      setCurrentIndex(() => {
        handleScroll(
          carouseRef.current!.clientWidth * (pointerList.length - 1),
        );
        return pointerList.length;
      });
    } else {
      setCurrentIndex((prevState) => {
        console.log('preState', prevState);
        const newIndex = prevState - 1;
        handleScroll(carouseRef.current!.clientWidth * (newIndex - 1));
        return newIndex;
      });
    }
  }, [currentIndex, handleScroll, isScrolling, pointerList.length]);

  /**
   * 初次渲染时计算一次
   */
  useEffect(() => {
    computeImageHeight();
  }, [computeImageHeight]);

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
              <img
                className="image"
                src={item.sheetImage}
                style={{
                  height: `${imageHeight}px`,
                }}
                alt=""
              />
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

      {/* 指示器 */}
      <div className="pointer-list">
        {pointerList.map((item, index) => {
          return (
            <div
              key={item.index}
              className={classNames(
                'pointer',
                item.index === currentIndex ? 'pointer-active' : '',
              )}
            ></div>
          );
        })}
      </div>
    </CarouselRecommendStyles>
  );
});

CarouselRecommend.displayName = 'CarouselRecommend';

export default CarouselRecommend;
