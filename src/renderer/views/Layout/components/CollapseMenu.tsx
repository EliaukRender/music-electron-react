import { memo } from 'react';
import { CollapseMenuStyles } from '@/renderer/views/Layout/styles/CollapseMenuStyles';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import { setIsCollapseMenu } from '@/renderer/store/modules/mainMenuReducer';

/**
 * @description: 折叠菜单
 */
const CollapseMenu = memo((props) => {
  const dispatch = useDispatch();
  const { isCollapseMenu } = useSelector(
    (state: RootState) => ({
      isCollapseMenu: state.mainMenu.isCollapseMenu,
    }),
    shallowEqual,
  );

  const handleCollapseMenu = () => {
    dispatch(setIsCollapseMenu(!isCollapseMenu));
  };

  return (
    <CollapseMenuStyles>
      <i
        className={`iconfont icon-${isCollapseMenu ? 'zhankai' : 'zhediecaidan'}`}
        onClick={handleCollapseMenu}
      ></i>
    </CollapseMenuStyles>
  );
});

export default CollapseMenu;