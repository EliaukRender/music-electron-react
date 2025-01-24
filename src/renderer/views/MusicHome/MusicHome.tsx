import { memo, useCallback, useEffect, useState } from 'react';
import { MusicHomeStyles } from '@/renderer/views/MusicHome/styles/MusicHomeStyles';
import { MusicHomeSortList } from '@/renderer/constant';
import classNames from 'classnames';
import { Outlet, useNavigate } from 'react-router-dom';
import { useContainerPadding } from '@/renderer/hooks/useContainerPadding';
import { useListenerEleScroll } from '@/renderer/hooks/useListenerEleScroll';
import gsap from 'gsap';

/**
 * @description: 音乐馆入口
 */
const MusicHome = memo(() => {
  const { containerRef } = useContainerPadding(); // 计算页面两侧的padding值
  const { scrollTop } = useListenerEleScroll(containerRef);
  const [curCategoryId, setCurCategoryId] = useState(1); // 当前选中的分类
  const [isNavigated, setIsNavigated] = useState(false);
  const navigate = useNavigate();
  const [titleHeight, setTitleHeight] = useState(45); // 高度45px

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
   * 监听页面滚动，控制title区域显示隐藏
   */
  useEffect(() => {
    if (scrollTop > titleHeight) {
      // setTitleHeight(0);
    } else {
      // setTitleHeight(45);
    }
  }, [scrollTop, titleHeight]);

  return (
    <MusicHomeStyles ref={containerRef}>
      <div className="music-home">
        <div
          className="main-title"
          style={{
            height: `${titleHeight}px`,
            lineHeight: `${titleHeight}px`,
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
                  key={item.id}
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
