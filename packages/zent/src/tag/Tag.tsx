import * as React from 'react';
import cx from 'classnames';
import Icon from '../icon';

const PRESET_COLOR = {
  red: true,
  green: true,
  yellow: true,
  blue: true,
  grey: true,
};

export interface ITagProps {
  theme?: keyof typeof PRESET_COLOR;
  outline?: boolean;
  rounded?: boolean;
  closable?: boolean;
  onClose?: React.MouseEventHandler<HTMLElement>;
  style?: React.CSSProperties;
  closeButtonStyle?: React.CSSProperties;
  className?: string;
  visible?: boolean;
  children?: React.ReactNode;
}

export const Tag = React.forwardRef<HTMLDivElement, ITagProps>(
  (
    {
      theme = 'red',
      outline,
      rounded = true,
      closable,
      children,
      className,
      style,
      onClose,
      closeButtonStyle,
      visible = true,
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
          className,
          {
            'zent-tag-rounded': rounded,
            'zent-tag-closable': closable,
          }
        )}
        style={style}
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
