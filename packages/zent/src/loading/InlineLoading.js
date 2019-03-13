import React from 'react';
import cx from 'classnames';

import { InlinePropTypes, InlineDefaultProps } from './props';
import useDelayed from './hooks/useDelayed';
import Icon from './components/icons';

function InlineLoading(props) {
  const {
    loading,
    delay,
    className,
    icon,
    iconSize,
    iconText,
    textPosition,
  } = props;

  const delayed = useDelayed({ loading, delay });

  if (delayed || !loading) {
    return null;
  }

  return (
    <div className={cx('zent-loading', 'zent-loading--inline', className)}>
      <Icon
        icon={icon}
        size={iconSize}
        text={iconText}
        textPosition={textPosition}
      />
    </div>
  );
}

InlineLoading.propTypes = InlinePropTypes;
InlineLoading.defaultProps = InlineDefaultProps;

export default InlineLoading;
