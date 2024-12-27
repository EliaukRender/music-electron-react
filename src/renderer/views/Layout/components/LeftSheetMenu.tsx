/**
 * @description: 我的歌单：歌单菜单
 */
import { SheetMenuStyles } from '@/renderer/views/Layout/styles/SheetMenuStyles';
import { memo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import SheetMenu from '@/renderer/views/components/MenuItem/SheetMenu';

function LeftSheetMenu() {
  const { sheetMenuList } = useSelector(
    (state: RootState) => ({
      sheetMenuList: state.mainMenu.sheetMenuList,
    }),
    shallowEqual,
  );

  return (
    <SheetMenuStyles>
      <div className="title-box">
        <div className="title">我的歌单</div>
        <i className="iconfont icon-jia"></i>
      </div>
      <div>
        {sheetMenuList.map((item) => {
          return <SheetMenu key={item.sheetId} menuItemInfo={item}></SheetMenu>;
        })}
      </div>
    </SheetMenuStyles>
  );
}

export default memo(LeftSheetMenu);
