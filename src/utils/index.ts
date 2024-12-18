// @ts-nocheck
/**
 * @description: 节流
 */
export function throttle(
  callback: (any) => void,
  wait: number,
  immediate = false,
) {
  let timeout: number;
  let lastExecuted = 0;

  return function (...args: any) {
    const now = Date.now();
    // 立即执行回调，或者等待指定时间
    if (immediate && now - lastExecuted >= wait) {
      callback.apply(this, args);
      lastExecuted = now;
      return;
    }

    // 使用 setTimeout 延迟执行回调
    if (!timeout) {
      timeout = setTimeout(
        () => {
          // 在冷却时间结束后，执行回调
          if (!immediate) {
            callback.apply(this, args);
          }
          timeout = null;
        },
        wait - (now - lastExecuted),
      );
    }
  };
}
