import cx from 'classnames';

import { IInlineLoadingProps } from './props';
import useDelayed from './hooks/useDelayed';
import Icon from './components/icons';

export function InlineLoading(props: IInlineLoadingProps) {
  const {
    loading = false,
    delay = 0,
    className,
    icon = 'circle',
    iconSize,
    iconText,
    textPosition = 'bottom',
    colorPreset = 'primary',
    textSize,
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
        colorPreset={colorPreset}
        textSize={textSize}
      />
    </div>
  );
}

export default InlineLoading;
