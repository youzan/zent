import { memo, useCallback } from 'react';
import type { ISelectItem, ISelectCommonProps } from './Select';
import Icon from '../icon';

export interface ISelectTagProps<Item extends ISelectItem> {
  item: Item;
  onRemove(item: Item): void;
  renderValue?: ISelectCommonProps<Item>['renderValue'];
}

function SelectTag<Item extends ISelectItem>({
  item,
  onRemove,
  renderValue,
}: ISelectTagProps<Item>) {
  const onClick = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.stopPropagation();
      onRemove(item);
    },
    [onRemove, item]
  );

  return (
    <div className="zent-select-v2-tag">
      {renderValue ? (
        renderValue(item)
      ) : (
        <span className="zent-select-v2-tag-text">{item.text}</span>
      )}
      <Icon
        type="close"
        className="zent-select-v2-tag-close"
        onClick={onClick}
      />
    </div>
  );
}

export default memo(SelectTag);
