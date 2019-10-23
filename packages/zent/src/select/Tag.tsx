import * as React from 'react';
import { ISelectItem } from './Select';

export interface ISelectTagProps<Item extends ISelectItem> {
  item: Item;
  onRemove(item: Item): void;
}

function SelectTag<Item extends ISelectItem>({
  item,
  onRemove,
}: ISelectTagProps<Item>) {
  return (
    <div className="zent-select-tag">
      {item.text}
      <svg
        className="zent-select-tag-close"
        width="10px"
        height="10px"
        viewBox="0 0 10 10"
        onClick={e => {
          e.stopPropagation();
          onRemove(item);
        }}
      >
        <path d="M7.62233645,1.78870551 L8.2115921,2.37796116 L5.58870551,4.99970551 L8.2115921,7.62233645 L7.62233645,8.2115921 L4.99970551,5.58870551 L2.37796116,8.2115921 L1.78870551,7.62233645 L4.41070551,4.99970551 L1.78870551,2.37796116 L2.37796116,1.78870551 L4.99970551,4.41070551 L7.62233645,1.78870551 Z" />
      </svg>
    </div>
  );
}

export default React.memo(SelectTag);
