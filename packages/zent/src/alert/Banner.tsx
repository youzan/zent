import { FC, useMemo } from 'react';
import cx from 'classnames';
import { IAlertProps, Alert } from './Alert';

export type BannerCloseIconColor = 'grey' | 'white';

const BannerCloseIconColorMap: Record<BannerCloseIconColor, string> = {
  grey: '#999',
  white: '#fff',
} as const;

export type IBannerProps = Omit<IAlertProps, 'title'> & {
  backgroundImage: string;
};

export const Banner: FC<IBannerProps> = ({
  backgroundImage,
  closeIconColor,
  style = {},
  className,
  ...resetProps
}) => {
  const bannerStyle = useMemo(() => {
    if (!backgroundImage) return style;
    return {
      ...style,
      backgroundImage: `url(${backgroundImage})`,
    };
  }, [style, backgroundImage]);

  const bannerClassName = cx('zent-alert--banner', className);

  return (
    <Alert
      {...resetProps}
      icon={null}
      style={bannerStyle}
      className={bannerClassName}
      closeIconColor={BannerCloseIconColorMap[closeIconColor] || closeIconColor}
    />
  );
};
