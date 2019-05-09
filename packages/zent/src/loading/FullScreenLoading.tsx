import * as React from 'react';
import cx from 'classnames';
import isNumber from 'lodash-es/isNumber';

import useDelayed from './hooks/useDelayed';
import { IFullScreenLoadingProps, FullScreenDefaultProps } from './props';
import LoadingMask from './components/LoadingMask';
import { Portal } from '../portal';

const NO_STYLE: React.CSSProperties = {};

export function FullScreenLoading(props: IFullScreenLoadingProps) {
  const {
    loading,
    delay,
    className,
    icon,
    iconSize,
    iconText,
    textPosition,
    zIndex,
  } = props;
  const delayed = useDelayed({ loading, delay });

  if (delayed || !loading) {
    return null;
  }

  const style = isNumber(zIndex) ? { zIndex } : NO_STYLE;

  return (
    <Portal
      className={cx('zent-loading', 'zent-loading--fullscreen', className)}
      style={style}
      blockPageScroll
    >
      <LoadingMask
        icon={icon}
        size={iconSize}
        text={iconText}
        textPosition={textPosition}
      />
    </Portal>
  );
}

FullScreenLoading.defaultProps = FullScreenDefaultProps;

export default FullScreenLoading;
