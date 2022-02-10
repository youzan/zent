import cx from 'classnames';
import { forwardRef } from 'react';
import Tag, { ITagProps } from './Tag';

export interface ISelectTagProps
  extends Omit<
    ITagProps,
    'closable' | 'closeButtonStyle' | 'onChange' | 'size' | 'theme' | 'outline'
  > {
  selected?: boolean;
  onChange?: (selected: boolean) => void;
}

export const SelectTag = forwardRef<HTMLDivElement, ISelectTagProps>(
  ({ className, children, selected, onChange, ...rest }, ref) => {
    const handleClick = (_e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      onChange?.(!selected);
    };
    return (
      <Tag
        className={cx('zent-select-tag', className, {
          'zent-select-tag-selected': selected,
        })}
        ref={ref}
        onClick={handleClick}
        outline
        {...rest}
      >
        {children}
      </Tag>
    );
  }
);

SelectTag.displayName = 'ZentSelectTag';

export default SelectTag;
