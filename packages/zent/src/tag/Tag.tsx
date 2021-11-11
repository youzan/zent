import cx from 'classnames';
import { forwardRef } from 'react';
import Icon from '../icon';

export interface ITagProps extends React.HTMLAttributes<HTMLDivElement> {
  rounded?: boolean;
  closable?: boolean;
  onClose?: React.MouseEventHandler<HTMLElement>;
  style?: React.CSSProperties;
  closeButtonStyle?: React.CSSProperties;
  visible?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const Tag = forwardRef<HTMLDivElement, ITagProps>(
  (
    {
      size = 'small',
      rounded = true,
      closable,
      children,
      className,
      onClose,
      closeButtonStyle,
      visible = true,
      ...rest
    },
    ref
  ) => {
    if (!visible) {
      return null;
    }
    return (
      <div
        ref={ref}
        className={cx('zent-tag', `zent-tag-size-${size}`, className, {
          'zent-tag-rounded': rounded,
          'zent-tag-closable': closable,
        })}
        {...rest}
      >
        <div className="zent-tag-content">{children}</div>
        {closable ? (
          <Icon
            type="close"
            className="zent-tag-close-btn"
            onClick={onClose}
            style={closeButtonStyle}
          />
        ) : null}
      </div>
    );
  }
);

Tag.displayName = 'ZentTag';

export default Tag;
