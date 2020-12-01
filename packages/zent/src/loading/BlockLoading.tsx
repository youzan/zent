import cx from 'classnames';

import { IBlockLoadingProps } from './props';
import LoadingMask from './components/LoadingMask';
import useDelayed from './hooks/useDelayed';

export function BlockLoading(props: IBlockLoadingProps) {
  const height = getHeight(props);
  const {
    loading = false,
    delay = 0,
    className,
    children,
    icon = 'youzan',
    iconSize,
    iconText,
    textPosition = 'bottom',
    colorPreset = 'primary',
  } = props;
  const hasChildren = !!children;
  const delayed = useDelayed({ loading, delay });
  const showMask = !delayed && loading;

  if (!showMask && !hasChildren) {
    return null;
  }

  return (
    <div
      className={cx('zent-loading', 'zent-loading--block', className, {
        'zent-loading--has-children': hasChildren,
      })}
      style={{ height }}
    >
      {children}
      {showMask && (
        <LoadingMask
          icon={icon}
          size={iconSize}
          text={iconText}
          textPosition={textPosition}
          colorPreset={colorPreset}
        />
      )}
    </div>
  );
}

function getHeight(props: IBlockLoadingProps) {
  // 没有包裹内容时设置一个默认高度，有包裹内容时默认撑满内容高度
  const hasHeightProp = props.hasOwnProperty('height');
  const { children } = props;

  if (!children && !hasHeightProp) {
    return 160;
  }

  if (children && !hasHeightProp) {
    return 'initial';
  }

  return props.height;
}

export default BlockLoading;
