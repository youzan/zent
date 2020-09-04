import * as React from 'react';
import { useMemo } from 'react';
import cx from 'classnames';
import { CSSTransition } from 'react-transition-group';

import Icon from '../../icon';
import { IDrawerContent } from '../types';
import { TransitionTimeOut, StyleMap } from '../constants';

const DrawerContent: React.FC<IDrawerContent> = ({
  mask,
  visible,
  title,
  children,
  footer,
  placement,
  height,
  width,
  closeBtn,
  onClose,
  onEntered,
  onExited,
}) => {
  const Header = useMemo(() => {
    if (!title) {
      return null;
    }

    return (
      <div className="drawer-header">
        {typeof title === 'number' || typeof title === 'string' ? (
          <span className="drawer-header__title">{title}</span>
        ) : (
          title
        )}
      </div>
    );
  }, [title]);

  const Footer = useMemo(
    () => footer && <div className="drawer-footer">{footer}</div>,
    [footer]
  );

  const CloseBtn = useMemo(() => {
    if (!closeBtn) {
      return null;
    }

    return (
      <div onClick={onClose} className="drawer-close">
        {true === closeBtn ? <Icon type="close" /> : closeBtn}
      </div>
    );
  }, [closeBtn, onClose]);

  const customWH = useMemo(() => {
    if ('left' === placement || 'right' === placement) {
      return { width };
    }
    return { height };
  }, [placement, height, width]);

  return (
    <CSSTransition
      appear
      mountOnEnter
      unmountOnExit
      in={visible}
      timeout={TransitionTimeOut}
      classNames={`drawer-transition-${placement}`}
      onEntered={onEntered}
      onExited={onExited}
    >
      <div
        className={cx('drawer-content', {
          [`drawer-content--transparent-${placement}`]: !mask,
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
        {CloseBtn}
        {Header}
        <div className="drawer-body">{children}</div>
        {Footer}
      </div>
    </CSSTransition>
  );
};

export default DrawerContent;
