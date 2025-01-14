import { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * @description: 元素显示与隐藏动画hook
 */
export const useEleFadeInOut = (duration = 0.2) => {
  const fadeInOutRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fadeInOutRef.current && gsap.set(fadeInOutRef.current, { opacity: 0 });
  }, []);

  // 显示目标元素
  const fadeInAnimation = useCallback(() => {
    fadeInOutRef.current &&
      gsap.to(fadeInOutRef.current, { opacity: 1, duration: 0.2 });
    console.log(fadeInOutRef.current);
  }, [duration]);

  // 隐藏目标元素
  const fadeOutAnimation = useCallback(() => {
    console.log('fadeOutAnimation');
    fadeInOutRef.current &&
      gsap.to(fadeInOutRef.current, { opacity: 0, duration: 0.2 });
  }, [duration]);

  return {
    fadeInOutRef, // 目标元素ref
    fadeInAnimation,
    fadeOutAnimation,
  };
};
