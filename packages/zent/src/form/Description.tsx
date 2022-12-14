import cx from 'classnames';

export interface IFormDescriptionProps {
  className?: string;
  style?: React.CSSProperties;
}

export const FormDescription: React.FunctionComponent<
  React.PropsWithChildren<IFormDescriptionProps>
> = ({ children, className, style }) => (
  <div className={cx('zent-form-description', className)} style={style}>
    {children}
  </div>
);
