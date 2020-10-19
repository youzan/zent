import * as React from 'react';
import { useCallback, useRef } from 'react';
import cx from 'classnames';

import Portal from '../portal';
import DrawerBackdrop from './components/DrawerBackdrop';
import DrawerContent from './components/DrawerContent';
import { DrawerPropsType } from './types';
import { useDrawerExiting } from './hooks/useDrawerExiting';
import { addEventListener } from '../utils/component/event-handler';

export const Drawer: React.FC<DrawerPropsType> = ({
  onClose,
  title,
  children,
  className,
  visible,
  maskClosable,
  closeOnESC,
  mask,
  footer,
  placement,
  closeBtn,
  ...rest
}) => {
  const width = 'width' in rest ? rest.width : null;
  const height = 'height' in rest ? rest.height : null;
  const { exiting, onExited } = useDrawerExiting(visible);
  const ref = useRef<() => void>();

  const onDrawerOpened = useCallback(() => {
    if (!mask) {
      ref.current = addEventListener(document, 'click', onClose);
    }
  }, [onClose, mask]);

  const onDrawerExit = useCallback(() => {
    if (!mask) {
      ref.current?.();
    }
  }, [mask]);

  return (
    <Portal
      visible={visible || exiting}
      onClose={onClose}
      closeOnESC={closeOnESC}
      blockPageScroll={mask}
    >
      <div className={cx({ [className]: !!className })}>
        <DrawerBackdrop
          mask={mask}
          maskClosable={maskClosable}
          visible={visible}
          onClose={onClose}
        />
        <DrawerContent
          mask={mask}
          visible={visible}
          title={title}
          footer={footer}
          onClose={onClose}
          onEntered={onDrawerOpened}
          onExit={onDrawerExit}
          onExited={onExited}
          placement={placement}
          width={width}
          height={height}
          closeBtn={closeBtn}
        >
          {children}
        </DrawerContent>
      </div>
    </Portal>
  );
};

Drawer.defaultProps = {
  className: '',
  visible: false,
  maskClosable: false,
  closeOnESC: true,
  mask: true,
  footer: null,
  title: null,
  onClose: () => {},
  placement: 'right',
  width: '45%',
  height: '45%',
  closeBtn: true,
};

export default Drawer;
