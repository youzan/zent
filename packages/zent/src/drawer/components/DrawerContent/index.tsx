import { useMemo, useCallback, useRef } from 'react';
import cx from 'classnames';
import { CSSTransition } from 'react-transition-group';

import { DrawerContentProps } from '../../types';
import { TransitionTimeOut, StyleMap } from '../../constants';
import { renderHeader } from './Header';
import { renderFooter } from './Footer';
import { renderCloseBtn } from './CloseBtn';
import { addEventListener } from '../../../utils/component/event-handler';

const DrawerContent: React.FC<DrawerContentProps> = ({
  mask,
  visible,
  title,
  children,
  footer,
  placement,
  closeBtn,
  onClose,
  onExited,
  ...rest
}) => {
  const width = 'width' in rest && rest.width;
  const height = 'height' in rest && rest.height;
  const unsubscribePageClickRef = useRef<() => void>();
  const drawerEl = useRef<HTMLDivElement>();

  const onDrawerOpened = useCallback(() => {
    if (!mask) {
      unsubscribePageClickRef.current = addEventListener(
        document,
        'click',
        e => {
          const target = e.target as HTMLDivElement;
          /**
           * `document.contains(target)`：兼容冒泡事件到达时，e.target已被移除于dom树中的场景
           * https://github.com/youzan/zent/issues/1608
           */
          if (
            document.contains(target) &&
            !drawerEl.current?.contains(target)
          ) {
            onClose();
          }
        }
      );
    }
  }, [onClose, mask]);

  const onDrawerExit = useCallback(() => {
    if (!mask) {
      unsubscribePageClickRef.current?.();
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
