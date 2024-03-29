import cx from 'classnames';
import { forwardRef, useContext } from 'react';

import { DisabledContext } from '../disabled';

export interface ILinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  disabled?: boolean;
  weak?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, ILinkProps>((props, ref) => {
  const disabledContext = useContext(DisabledContext);
  const {
    className,
    disabled = disabledContext.value,
    weak = false,
    onClick,
    ...rest
  } = props;

  return (
    <a
      {...rest}
      className={cx(className, 'zent-link', {
        'zent-link--disabled': disabled,
        'zent-link--weak': weak,
      })}
      ref={ref}
      onClick={disabled ? preventOpenLink : onClick}
    />
  );
});

Link.displayName = 'Link';

function preventOpenLink(
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
) {
  event.preventDefault();
  event.stopPropagation();
}
