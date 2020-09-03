import * as React from 'react';
import { CSSTransition } from 'react-transition-group';

import { IDrawerBackdrop } from '../types';
import { TransitionTimeOut } from '../constants';

const DrawerBackdrop: React.FC<IDrawerBackdrop> = ({
  mask,
  maskClosable,
  visible,
  onClose,
}) => {
  const onMaskClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mask && maskClosable) {
      onClose(e);
    }
  };

  return (
    <CSSTransition
      appear
      mountOnEnter
      unmountOnExit
      in={visible && mask}
      timeout={TransitionTimeOut}
      classNames="drawer-transition__backdrop"
    >
      <div className="drawer-backdrop" onClick={onMaskClick} />
    </CSSTransition>
  );
};

export default DrawerBackdrop;
