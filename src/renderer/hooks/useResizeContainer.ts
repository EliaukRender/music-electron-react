import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * @description: 控制页面的左右padding值，防止页面尺寸过大时引起的页面中布局问题
 */
export const useResizeContainer = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [paddingValue, setPaddingValue] = useState(30); // 初始值30px
  const location = useLocation();

  /**
   * 计算padding的方法
   */
  const resizeHandler = useCallback(() => {
    if (!containerRef.current) return;
    const value = containerRef.current.clientWidth - window.screen.width * 0.5; // 计算差值
    if (value > 0) {
      setPaddingValue((prevState) => 30 + value * 0.25);
    } else {
      setPaddingValue(30);
    }
    containerRef.current.style.paddingLeft = `${paddingValue}px`;
    containerRef.current.style.paddingRight = `${paddingValue}px`;
  }, [paddingValue]);

  /**
   *  监听页面尺寸变化
   */
  useEffect(() => {
    resizeHandler();
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [resizeHandler]);

  return {
    containerRef,
  };
};
