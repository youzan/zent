import * as React from 'react';

import { ICascaderItem } from '../types';
import Icon from '../../icon';

export interface ICascaderTagProps {
  path: ICascaderItem[];
  onRemove(e: React.MouseEvent): void;
  renderValue?: (path: ICascaderItem[]) => React.ReactNode;
}

function CascaderTag(props: ICascaderTagProps) {
  const { path, renderValue, onRemove } = props;

  return (
    <div className="zent-cascader--tag">
      {renderValue(path)}
      <Icon
        type="close"
        className="zent-cascader--tag-close"
        onClick={onRemove}
      />
    </div>
  );
}

export default CascaderTag;
