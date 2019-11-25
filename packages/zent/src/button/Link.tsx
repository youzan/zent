import * as React from 'react';
import cx from 'classnames';

export interface ILinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  disabled?: boolean;
}

export const Link = React.forwardRef<HTMLAnchorElement, ILinkProps>(
  (props, ref) => {
    const { className, disabled = false, onClick, ...rest } = props;

    return (
      <a
        {...rest}
        className={cx(className, 'zent-link', {
          'zent-link__disabled': disabled,
        })}
        ref={ref}
        onClick={disabled ? preventOpenLink : onClick}
      />
    );
  }
);

function preventOpenLink(
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
) {
  event.preventDefault();
  event.stopPropagation();
}

export default Link;
