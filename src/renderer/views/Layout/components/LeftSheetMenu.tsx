/**
 * @description: 我的歌单：歌单菜单
 */
import { SheetMenuStyles } from '@/renderer/views/Layout/styles/SheetMenuStyles';
import React, { memo, useCallback, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import SheetMenu from '@/renderer/views/components/MenuItem/SheetMenu';
import CreateSheet from '@/renderer/views/Layout/components/CreateSheet';
import { initSheetMenu } from '@/renderer/store/actions/mainMenuActions';

function LeftSheetMenu() {
  const { sheetMenuList, isCollapseMenu } = useSelector(
    (state: RootState) => ({
      sheetMenuList: state.mainMenu.sheetMenuList,
      isCollapseMenu: state.mainMenu.isCollapseMenu,
    }),
    shallowEqual,
  );
  const [showCreateInput, setShowCreateInput] = useState(false);

  // 创建歌单回调
  const finishCreate = useCallback((success: boolean) => {
    setShowCreateInput(false);
    if (success) {
      initSheetMenu(); // 重新获取歌单菜单
    }
  }, []);

  return (
    <SheetMenuStyles>
      {!isCollapseMenu && (
        <div className="title-box">
          <div className="title">我的歌单</div>
          <i
            className="iconfont icon-jia"
            onClick={() => setShowCreateInput(true)}
          ></i>
        </div>
      )}

      <div className="sheet-menu-list">
        {/* 创建歌单入口 */}
        {showCreateInput && (
          <CreateSheet
            sheetMenuList={sheetMenuList}
            showCreateInput={showCreateInput}
            finishCreate={finishCreate}
          ></CreateSheet>
        )}

        {/* 歌单列表 */}
        {sheetMenuList.map((item) => {
          return (
            <SheetMenu
              key={item.sheetId}
              menuItemInfo={item}
              isCollapseMenu={isCollapseMenu}
            ></SheetMenu>
          );
        })}
      </div>
    </SheetMenuStyles>
  );
}

export default memo(LeftSheetMenu);
