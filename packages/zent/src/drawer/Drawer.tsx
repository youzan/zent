import * as React from 'react';
import { useEffect, useCallback, useRef } from 'react';
import Portal from '../portal';

import DrawerBackdrop from './components/DrawerBackdrop';
import DrawerContent from './components/DrawerContent';
import { IDrawerProps } from './types';
import useDrawerExiting from './hooks/useDrawerExiting';
import { addEventListener } from '../utils/component/event-handler';

export const Drawer: React.FC<IDrawerProps> = ({
  onClose,
  title,
  children,
  className,
  visible,
  maskClosable,
  closeOnESC,
  mask,
  footer,
}) => {
  const { exiting, onExited } = useDrawerExiting(visible);
  const ref = useRef<() => void>();

  const onOpened = useCallback(() => {
    if (!mask) {
      ref.current = addEventListener(document, 'click', e => {
        onClose(e);
      });
    }
  }, [onClose, mask]);

  useEffect(() => {
    return () => {
      if (!visible) {
        ref.current?.();
      }
    };
  });

  return (
    <Portal
      visible={visible || exiting}
      onClose={onClose}
      closeOnESC={closeOnESC}
      blockPageScroll={mask}
    >
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
        className={className}
        onClose={onClose}
        onEntered={onOpened}
        onExited={onExited}
      >
        {children}
      </DrawerContent>
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
};

export default Drawer;
