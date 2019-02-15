import React from 'react';
import has from 'lodash/has';
import cx from 'classnames';

import { BlockPropTypes, BlockDefaultProps } from './props';
import LoadingMask from '../LoadingMask';
import useDelayed from '../hooks/useDelayed';

function BlockLoading(props) {
  const height = getHeight(props);
  const {
    loading,
    delay,
    className,
    children,
    icon,
    iconSize,
    iconText,
    textPosition,
  } = props;
  const hasChildren = !!children;
  const delayed = useDelayed({ loading, delay });

  if (delayed || !loading) {
    return hasChildren ? <>{children}</> : null;
  }

  return (
    <div
      className={cx('zent-loading', 'zent-loading--block', className, {
        'zent-loading--has-children': hasChildren,
      })}
      style={{ height }}
    >
      {children}
      <LoadingMask
        icon={icon}
        size={iconSize}
        text={iconText}
        textPosition={textPosition}
      />
    </div>
  );
}

function getHeight(props) {
  // 没有包裹内容时设置一个默认高度，有包裹内容时默认撑满内容高度
  const hasHeightProp = has(props, 'height');
  const { children } = props;

  if (!children && !hasHeightProp) {
    return 160;
  }

  if (children && !hasHeightProp) {
    return 'initial';
  }

  return props.height;
}

BlockLoading.propTypes = BlockPropTypes;
BlockLoading.defaultProps = BlockDefaultProps;

export default BlockLoading;
