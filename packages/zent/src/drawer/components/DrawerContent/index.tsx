import * as React from 'react';
import { useMemo } from 'react';
import cx from 'classnames';
import { CSSTransition } from 'react-transition-group';

import { IDrawerContent } from '../../types';
import { TransitionTimeOut, StyleMap } from '../../constants';
import { renderHeader } from './Header';
import { renderFooter } from './Footer';
import { renderCloseBtn } from './CloseBtn';

const DrawerContent: React.FC<IDrawerContent> = ({
  mask,
  visible,
  title,
  children,
  footer,
  placement,
  closeBtn,
  onClose,
  onEntered,
  onExited,
  onExit,
  width,
  height,
}) => {
  const customWH = useMemo(() => {
    const handleNumber = data =>
      typeof data === 'number' ? `${data}px` : data;

    if (('left' === placement || 'right' === placement) && width) {
      return { width: handleNumber(width) };
    }
    if (height) {
      return { height: handleNumber(height) };
    }
    return {};
  }, [placement, width, height]);

  return (
    <CSSTransition
      appear
      mountOnEnter
      unmountOnExit
      in={visible}
      timeout={TransitionTimeOut}
      classNames={`zent-drawer-transition-${placement}`}
      onEntered={onEntered}
      onExit={onExit}
      onExited={onExited}
    >
      <div
        className={cx('zent-drawer-content', {
          [`zent-drawer-content--transparent`]: !mask,
        })}
        onClick={e => {
          if (!mask) {
            e.nativeEvent.stopImmediatePropagation();
          }
        }}
        style={{
          ...StyleMap[placement],
          ...customWH,
        }}
      >
        {renderCloseBtn(closeBtn, onClose)}
        {renderHeader(title)}
        <div className="zent-drawer-body">{children}</div>
        {renderFooter(footer)}
      </div>
    </CSSTransition>
  );
};

export default DrawerContent;
