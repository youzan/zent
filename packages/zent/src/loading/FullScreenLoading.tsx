import cx from 'classnames';

import useDelayed from './hooks/useDelayed';
import { IFullScreenLoadingProps } from './props';
import LoadingMask from './components/LoadingMask';
import { Portal } from '../portal';

const NO_STYLE: React.CSSProperties = {};
// 展示背景时的默认尺寸
const DEFAULT_ICON_SIZE_BG = 24;
const DEFAULT_TEXT_SIZE_BG = 14;
// 无背景时的默认尺寸
const DEFAULT_ICON_SIZE = 32;
const DEFAULT_TEXT_SIZE = 20;

export function FullScreenLoading(props: IFullScreenLoadingProps) {
  const {
    loading = false,
    delay = 0,
    className,
    icon = 'circle',
    iconSize: size,
    iconText,
    textPosition = 'bottom',
    zIndex,
    colorPreset = 'primary',
    showBackground,
    textSize: fontSize,
  } = props;
  const delayed = useDelayed({ loading, delay });
  const iconSize =
    size || showBackground ? DEFAULT_ICON_SIZE_BG : DEFAULT_ICON_SIZE;
  const textSize =
    fontSize || showBackground ? DEFAULT_TEXT_SIZE_BG : DEFAULT_TEXT_SIZE;

  if (delayed || !loading) {
    return null;
  }

  const style = typeof zIndex === 'number' ? { zIndex } : NO_STYLE;

  return (
    <Portal
      className={cx('zent-loading', 'zent-loading--fullscreen', className, {
        'zent-loading--show-background': showBackground,
      })}
      style={style}
      blockPageScroll
    >
      <LoadingMask
        icon={icon}
        size={iconSize}
        text={iconText}
        textPosition={textPosition}
        colorPreset={colorPreset}
        textSize={textSize}
      />
    </Portal>
  );
}

export default FullScreenLoading;
