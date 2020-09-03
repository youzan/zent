import * as React from 'react';
import { useMemo } from 'react';
import cx from 'classnames';
import Icon from '../../icon';
import { CSSTransition } from 'react-transition-group';

import { IDrawerContent } from '../types';
import { TransitionTimeOut } from '../constants';

const DrawerContent: React.FC<IDrawerContent> = ({
  mask,
  visible,
  title,
  className,
  onClose,
  children,
  footer,
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

  return (
    <CSSTransition
      appear
      mountOnEnter
      unmountOnExit
      in={visible}
      timeout={TransitionTimeOut}
      classNames="drawer-transition"
      onEntered={onEntered}
      onExited={onExited}
    >
      <div
        className={cx('drawer-content', {
          [className]: !!className,
          ['drawer-content--transparent']: !mask,
        })}
        onClick={e => {
          if (!mask) {
            e.nativeEvent.stopImmediatePropagation();
          }
        }}
      >
        {Header}
        <div
          className={cx('drawer-body', {
            'drawer-body--pt': !!title,
            'drawer-body--pb': !!footer,
          })}
        >
          {children}
        </div>
        {Footer}
      </div>
    </CSSTransition>
  );
};

export default DrawerContent;
