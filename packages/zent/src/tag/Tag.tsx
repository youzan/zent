import cx from 'classnames';
import { forwardRef } from 'react';
import Icon from '../icon';

const PRESET_COLOR = {
  red: true,
  green: true,
  yellow: true,
  blue: true,
  grey: true,
};

export interface ITagProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: keyof typeof PRESET_COLOR;
  outline?: boolean;
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
      theme = 'grey',
      outline,
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
    const colorPart = PRESET_COLOR[theme] ? `-${theme}` : '';
    const outlinePart = outline ? '-outline' : '';
    return (
      <div
        ref={ref}
        className={cx(
          'zent-tag',
          `zent-tag-style${colorPart}${outlinePart}`,
          `zent-tag-size-${size}`,
          className,
          {
            'zent-tag-rounded': rounded,
            'zent-tag-closable': closable,
          }
        )}
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
