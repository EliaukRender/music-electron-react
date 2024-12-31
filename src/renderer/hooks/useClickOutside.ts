import { useEffect, useRef, useState } from 'react';

/**
 * @description: 判断点击事件是否发生在元素内部/外部
 * @param needWatch 是否需要监听  true-监听  false-移除监听
 */
export const useClickOutside = ({
  needWatch = true,
}: {
  needWatch: boolean;
}) => {
  const clickOutSideRef = useRef<HTMLDivElement | null>(null);
  const [isClickOutside, setIsClickOutside] = useState(false);

  useEffect(() => {
    const handleClick = (event: any) => {
      if (
        clickOutSideRef.current &&
        event?.target &&
        clickOutSideRef.current.contains(event?.target)
      ) {
        setIsClickOutside(false);
        console.log('内部');
      } else {
        console.log('外部');
        setIsClickOutside(true);
      }
    };

    setTimeout(() => {
      needWatch && document.addEventListener('click', handleClick);
    }, 50);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [needWatch]);

  return {
    clickOutSideRef,
    isClickOutside,
  };
};