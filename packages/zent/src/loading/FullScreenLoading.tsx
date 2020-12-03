import cx from 'classnames';

import useDelayed from './hooks/useDelayed';
import { IFullScreenLoadingProps } from './props';
import LoadingMask from './components/LoadingMask';
import { Portal } from '../portal';

const NO_STYLE: React.CSSProperties = {};

export function FullScreenLoading(props: IFullScreenLoadingProps) {
  const {
    loading = false,
    delay = 0,
    className,
    icon = 'youzan',
    iconSize,
    iconText,
    textPosition = 'bottom',
    zIndex,
    colorPreset = 'primary',
  } = props;
  const delayed = useDelayed({ loading, delay });

  if (delayed || !loading) {
    return null;
  }

  const style = typeof zIndex === 'number' ? { zIndex } : NO_STYLE;

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
        colorPreset={colorPreset}
      />
    </Portal>
  );
}

export default FullScreenLoading;
