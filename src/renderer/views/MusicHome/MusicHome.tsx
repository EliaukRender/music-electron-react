import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { MusicHomeStyles } from '@/renderer/views/MusicHome/styles/MusicHomeStyles';
import { MusicHomeSortList } from '@/renderer/constant';
import classNames from 'classnames';
import { Outlet, useNavigate } from 'react-router-dom';
import { useContainerPadding } from '@/renderer/hooks/useContainerPadding';
import { useListenerEleScroll } from '@/renderer/hooks/useListenerEleScroll';

/**
 * @description: 音乐馆入口
 */
const MusicHome = memo(() => {
  const { containerRef } = useContainerPadding(); // 计算页面两侧的padding值
  const { scrollTop } = useListenerEleScroll(containerRef); // 监听元素的scroll事件
  const [curCategoryId, setCurCategoryId] = useState(1); // 当前选中的分类
  const [isNavigated, setIsNavigated] = useState(false);
  const navigate = useNavigate();
  const TITLE_HEIGHT = 45;

  /**
   * 切换分类
   */
  const changeCategory = useCallback(
    (item: any) => {
      setCurCategoryId(item.id);
      navigate(item.routePath);
    },
    [navigate],
  );

  /**
   * 默认进入第一个分类
   */
  useEffect(() => {
    if (isNavigated) return;
    navigate(MusicHomeSortList[0].routePath);
    setIsNavigated(true);
  }, [isNavigated, navigate]);

  /**
   * 监听页面滚动，控制category-list区域吸顶显示
   */
  const stickyCategory = useMemo<boolean>(() => {
    return scrollTop >= TITLE_HEIGHT;
  }, [scrollTop]);

  return (
    <MusicHomeStyles ref={containerRef}>
      <div className="music-home">
        <div
          className="main-title"
          style={{
            height: `${TITLE_HEIGHT}px`,
            lineHeight: `${TITLE_HEIGHT}px`,
          }}
        >
          音乐馆
        </div>
        <div className="body">
          {/* 分类列表 */}
          <div className="category-list">
            {MusicHomeSortList.map((item, index) => {
              return (
                <div
                  key={index}
                  className={classNames(
                    'item',
                    curCategoryId === item.id ? 'item-selected' : '',
                  )}
                  onClick={() => {
                    changeCategory(item);
                  }}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
          {/* 内容显示区域 */}
          <div className="content">
            {/* 路由占位 */}
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </MusicHomeStyles>
  );
});

export default MusicHome;
