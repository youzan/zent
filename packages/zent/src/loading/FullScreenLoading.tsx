import * as React from 'react';
import cx from 'classnames';
import isUndefined from 'lodash-es/isUndefined';

import PurePortal from '../portal/PurePortal';
import useDelayed from './hooks/useDelayed';
import { IFullScreenLoadingProps, FullScreenDefaultProps } from './props';
import LoadingMask from './components/LoadingMask';

const NO_STYLE = {};

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

  const style = isUndefined(zIndex) ? NO_STYLE : { zIndex };

  return (
    <PurePortal selector={document.body} append withNonScrollable>
      <div
        className={cx('zent-loading', 'zent-loading--fullscreen', className)}
        style={style}
      >
        <LoadingMask
          icon={icon}
          size={iconSize}
          text={iconText}
          textPosition={textPosition}
        />
      </div>
    </PurePortal>
  );
}

FullScreenLoading.defaultProps = FullScreenDefaultProps;

export default FullScreenLoading;
