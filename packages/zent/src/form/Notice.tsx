import cx from 'classnames';

export interface IFormNoticeProps {
  className?: string;
  style?: React.CSSProperties;
}

export const FormNotice: React.FC<IFormNoticeProps> = ({
  className,
  style,
  children,
}) => (
  <div className={cx('zent-form-notice', className)} style={style}>
    {children}
  </div>
);
