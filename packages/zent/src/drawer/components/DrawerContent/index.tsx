import * as React from 'react';
import { useMemo, useCallback, useRef } from 'react';
import cx from 'classnames';
import { CSSTransition } from 'react-transition-group';

import { IDrawerContent } from '../../types';
import { TransitionTimeOut, StyleMap } from '../../constants';
import { renderHeader } from './Header';
import { renderFooter } from './Footer';
import { renderCloseBtn } from './CloseBtn';
import { addEventListener } from '../../../utils/component/event-handler';

const DrawerContent: React.FC<IDrawerContent> = ({
  mask,
  visible,
  title,
  children,
  footer,
  placement,
  closeBtn,
  onClose,
  onExited,
  width,
  height,
}) => {
  const refEventer = useRef<() => void>();
  const drawerEl = useRef(null);

  const onDrawerOpened = useCallback(() => {
    if (!mask) {
      refEventer.current = addEventListener(document, 'click', e => {
        if (!drawerEl.current?.contains(e.target)) {
          onClose();
        }
      });
    }
  }, [onClose, mask]);

  const onDrawerExit = useCallback(() => {
    if (!mask) {
      refEventer.current?.();
    }
  }, [mask]);

  const customWH = useMemo(() => {
    const handleNumber = data =>
      typeof data === 'number' ? `${data}px` : data;

    if ('left' === placement || 'right' === placement) {
      return { width: handleNumber(width) };
    }
    return { height: handleNumber(height) };
  }, [placement, width, height]);

  return (
    <CSSTransition
      appear
      mountOnEnter
      unmountOnExit
      in={visible}
      timeout={TransitionTimeOut}
      classNames={`zent-drawer-transition-${placement}`}
      onEntered={onDrawerOpened}
      onExit={onDrawerExit}
      onExited={onExited}
    >
      <div
        ref={drawerEl}
        className={cx('zent-drawer-content', {
          [`zent-drawer-content--transparent`]: !mask,
        })}
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
