import React from 'react';
import cx from 'classnames';
import PurePortal from 'portal/PurePortal';
import withNonScrollable from 'portal/withNonScrollable';
import isUndefined from 'lodash/isUndefined';

import useDelayed from '../hooks/useDelayed';
import { FullScreenPropTypes, FullScreenDefaultProps } from './props';
import LoadingMask from '../LoadingMask';

const NO_STYLE = {};

const NonScrollablePurePortal = withNonScrollable(PurePortal);

function FullScreenLoading(props) {
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
    <NonScrollablePurePortal selector={document.body} append>
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
    </NonScrollablePurePortal>
  );
}

FullScreenLoading.propTypes = FullScreenPropTypes;
FullScreenLoading.defaultProps = FullScreenDefaultProps;

export default FullScreenLoading;
