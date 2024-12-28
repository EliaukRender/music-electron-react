/**
 * @description: 动画描述： 一开始隐藏，
 * @param
 * @return
 */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useEleFadeInOut = (duration = 0.2) => {
  const fadeInOutRef = useRef<HTMLElement | HTMLDivElement | null>(null);

  useEffect(() => {
    fadeInOutRef.current && gsap.set(fadeInOutRef.current, { opacity: 0 });
  });

  // 出现
  const fadeInAnimation = () => {
    gsap.to(fadeInOutRef.current, { opacity: 1, duration });
  };

  // 隐藏
  const fadeOutAnimation = () => {
    gsap.to(fadeInOutRef.current, { opacity: 0, duration });
  };

  return {
    fadeInOutRef,
    fadeInAnimation,
    fadeOutAnimation,
  };
};
