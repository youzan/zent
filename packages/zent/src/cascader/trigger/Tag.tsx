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
    <div className="zent-cascader-v2--tag">
      <span
        title={renderValue(path) as string}
        className="zent-cascader-v2--tag--path"
      >
        {renderValue(path)}
      </span>
      <Icon
        type="close"
        className="zent-cascader-v2--tag-close"
        onClick={onRemove}
      />
    </div>
  );
}

export default CascaderTag;
