import * as React from 'react';

import { ICascaderItem } from '../types';
import Icon from '../../icon';

export interface ICascaderTagProps {
  items: ICascaderItem[];
  onRemove(e: React.MouseEvent): void;
  renderValue?: (items: ICascaderItem[]) => React.ReactNode;
}

function CascaderTag(props: ICascaderTagProps) {
  const { items, renderValue, onRemove } = props;

  return (
    <div className="zent-cascader--tag">
      {renderValue(items)}
      <Icon
        type="close"
        className="zent-cascader--tag-close"
        onClick={onRemove}
      />
    </div>
  );
}

export default CascaderTag;
