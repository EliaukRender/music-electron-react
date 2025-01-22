import { memo, useCallback, useEffect, useState } from 'react';
import { MusicHomeStyles } from '@/renderer/views/MusicHome/styles/MusicHomeStyles';
import { MusicHomeSortList } from '@/renderer/constant';
import classNames from 'classnames';
import { Outlet, useNavigate } from 'react-router-dom';

/**
 * @description: 音乐馆入口
 */
const MusicHome = memo(() => {
  const [curCategoryId, setCurCategoryId] = useState(1); // 当前选中的分类
  const [isNavigated, setIsNavigated] = useState(false);
  const navigate = useNavigate();

  /**
   * todo 播放器宽度达到屏幕宽度的70%时开始动态更新padding值
   */

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

  return (
    <MusicHomeStyles>
      <div className="music-home">
        <div className="main-title">音乐馆</div>
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
