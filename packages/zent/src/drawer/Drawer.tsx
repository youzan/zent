import cx from 'classnames';

import Portal from '../portal';
import DrawerBackdrop from './components/DrawerBackdrop';
import DrawerContent from './components/DrawerContent';
import { DrawerProps } from './types';
import { useDrawerExiting } from './hooks/useDrawerExiting';

export const Drawer: React.FC<DrawerProps> = ({
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
  const width = 'width' in rest ? rest.width : '45%';
  const height = 'height' in rest ? rest.height : '45%';
  const { exiting, onExited } = useDrawerExiting(visible);

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
  closeBtn: true,
};

export default Drawer;
