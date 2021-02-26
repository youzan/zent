interface IOptopns {
  disabled: boolean;
  onMouseEnter: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onMouseLeave: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}
/**
 * Why fixTooltipOnDisabledChildren?
 * Mouse events don't trigger on disabled button
 * https://github.com/youzan/zent/issues/142
 *
 * Workaround
 * 1. Wrap the disabled button/input in another element.
 * 2. Add {pointer-events: none} style to the disabled button/input.
 */
export const renderCompatibleChildren = (
  children: React.ReactElement,
  { disabled, onMouseEnter, onMouseLeave }: IOptopns
) => {
  return disabled ? (
    <span
      className="zent-btn-disabled-wrapper"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </span>
  ) : (
    children
  );
};
