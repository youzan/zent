import { CascaderItemSelectionState, ICascaderItem } from '../types';
import Tag from './Tag';
import Pop from '../../pop';
import { getPathValue, getPathLabel } from '../path-fns';
import { simplify } from '../simplify';

export interface ICascaderTagsProps {
  list: Array<ICascaderItem[]>;

  // 节点选中信息
  selectionMap: Map<string, CascaderItemSelectionState>;
  simplifyPaths: boolean;

  onRemove(node: ICascaderItem): void;
  renderValue?: (path: ICascaderItem[]) => React.ReactNode;
  collapse: boolean;
}

const renderTagCollapsedTrigger = function (length) {
  return (
    <span className="zent-cascader-v2-tag-collapsed-trigger">+{length}</span>
  );
};

function CascaderTagList(props: ICascaderTagsProps) {
  const { list, renderValue, selectionMap, simplifyPaths, onRemove, collapse } =
    props;
  const paths = simplifyPaths ? simplify(list, selectionMap) : list;
  const renderPaths = collapse ? paths.slice(0, 1) : paths;
  const renderCollapsePaths = paths.slice(1);

  return (
    <>
      {renderPaths.map(path => {
        const removeCallback = (e: React.MouseEvent) => {
          e.stopPropagation();
          // 即移除最后一级叶子节点的选中状态
          onRemove(path[path.length - 1]);
        };

        return (
          <Tag
            key={getPathValue(path)}
            path={path}
            onRemove={removeCallback}
            renderValue={renderValue}
          />
        );
      })}
      {collapse && renderCollapsePaths.length > 0 && (
        <Pop
          trigger="hover"
          position="auto-top-center"
          cushion={15}
          content={
            <div className="zent-cascader-v2-tag-collapsed-content">
              <div>
                {renderCollapsePaths.map((item, index) => {
                  return (
                    <span key={getPathValue(item)}>
                      {getPathLabel(item)}
                      {index === renderCollapsePaths.length - 1 ? '' : '、'}
                    </span>
                  );
                })}
              </div>
            </div>
          }
        >
          {renderTagCollapsedTrigger(renderCollapsePaths.length)}
        </Pop>
      )}
    </>
  );
}

export default CascaderTagList;
