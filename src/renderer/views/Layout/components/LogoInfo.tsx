import { LogoInfoStyles } from '../styles/LogoInfoStyles';
import { useUpdateWindowPosition } from '@/renderer/hooks/useUpdateWindowPosition';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import classNames from 'classnames';

/**
 * @description: Logo区域
 */
export default function LogoInfo() {
  const { dragEleRef } = useUpdateWindowPosition({});
  const { isCollapseMenu } = useSelector(
    (state: RootState) => ({
      isCollapseMenu: state.mainMenu.isCollapseMenu,
    }),
    shallowEqual,
  );

  return (
    <LogoInfoStyles ref={dragEleRef}>
      <div
        className={classNames(
          'logo-info',
          isCollapseMenu ? 'logo-info-collapse' : '',
        )}
      >
        <img
          className={classNames('img')}
          src={require('@/renderer/assets/images/music-logo.png')}
          alt=""
        />
        {!isCollapseMenu && <span className="title">Eliauk音乐</span>}
      </div>
    </LogoInfoStyles>
  );
}
