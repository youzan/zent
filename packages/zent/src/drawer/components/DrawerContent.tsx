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
  onClose,
  onEntered,
  onExited,
}) => {
  const Header = useMemo(() => {
    const classNamePrefix = 'drawer-header';
    return (
      title && (
        <div className={classNamePrefix}>
          <span className={`${classNamePrefix}__title`}>{title}</span>
          <span onClick={onClose} className={`${classNamePrefix}__icon--close`}>
            <Icon type="close" />
          </span>
        </div>
      )
    );
  }, [title, onClose]);

  const Footer = useMemo(
    () => footer && <div className="drawer-footer">{footer}</div>,
    [footer]
  );

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
        {Header}
        <div className="drawer-body">{children}</div>
        {Footer}
      </div>
    </CSSTransition>
  );
};

export default DrawerContent;
