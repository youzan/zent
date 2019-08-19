import * as React from 'react';
import { Component } from 'react';
import classnames from 'classnames';

import AnimateHeight from '../utils/component/AnimateHeight';
import Checkbox from '../checkbox';
import Loading from './components/Loading';

import createStateByProps, {
  ICreateStateByPropsParams,
} from './utils/createStateByProps';
import correctMark from './utils/correctMark';
import correctExpand from './utils/correctExpand';
import {
  ITreeData,
  TreeRootIdArray,
  ITreeRootInfoMap,
  ITreeRenderKey,
} from './utils/common';

export interface ITreeOperation {
  name: string;
  icon?: string | React.ReactNode;
  action: (data: ITreeData) => void;
  shouldRender?: (data: ITreeData) => boolean;
}

// onCheck second param to help
export interface ITreeOncheckHelpInfo {
  // which root click
  currentRoot: ITreeData;
  // all disableNode
  disabled: ITreeData[];
  // all checkedNode
  all: ITreeData[];
  // only parent or childless checkedNode
  top: ITreeData[];
  // only least child checkedNode
  bottom: ITreeData[];
}

export interface ITreeProps extends ICreateStateByPropsParams {
  render?: (data: ITreeData, isExpanded?: boolean) => React.ReactNode;
  operations?: ITreeOperation[];
  foldable?: boolean;
  onCheck?: (selected: TreeRootIdArray, info: ITreeOncheckHelpInfo) => void;
  size?: 'medium' | 'small' | 'large';
  commonStyle?: React.CSSProperties;
  onExpand?: (data: ITreeData, config: { isExpanded: boolean }) => void;
  autoExpandOnSelect?: boolean;
  onSelect?: (data: ITreeData, target: HTMLSpanElement) => void;
  prefix?: string;
}

export interface ITreeState {
  prevProps: ITreeProps;
  tree: ITreeData[];
  rootInfoMap: ITreeRootInfoMap;
  expandNode: TreeRootIdArray;
  checkedNode: TreeRootIdArray;
  disabledNode: TreeRootIdArray;
  renderKey: ITreeRenderKey;
  loadingNode: TreeRootIdArray;
}

export class Tree extends Component<ITreeProps, ITreeState> {
  static defaultProps = {
    autoExpandOnSelect: true,
    dataType: 'tree',
    foldable: true,
    checkable: false,
    size: 'medium',
    prefix: 'zent',
  };

  constructor(props: ITreeProps) {
    super(props);
    this.state = {
      prevProps: props,
      loadingNode: [],
      ...createStateByProps(props),
    };
  }

  static getDerivedStateFromProps(nextProps: ITreeProps, state: ITreeState) {
    const { prevProps } = state;

    if (nextProps === prevProps) {
      return null;
    }

    // 需要重新计算
    if (
      nextProps.data !== prevProps.data ||
      nextProps.renderKey !== prevProps.renderKey ||
      nextProps.expandAll !== prevProps.expandAll ||
      nextProps.loadMore !== prevProps.loadMore
    ) {
      const formatData = createStateByProps(nextProps);
      let { expandNode } = formatData;

      // // 只有在 loadMore 状态下，我会保持原有打开状态
      // // if (prevProps.loadMore || nextProps.loadMore) {
      // 任何情况下都做保留
      expandNode = correctExpand(state, formatData);
      // // }

      return {
        prevProps: nextProps,
        ...formatData,
        expandNode,
      };
    }

    if (nextProps.checkable) {
      const newState: Partial<ITreeState> = {};
      if (prevProps.disabledCheckedKeys !== nextProps.disabledCheckedKeys) {
        newState.disabledNode = correctMark(
          nextProps.disabledCheckedKeys,
          state.rootInfoMap
        );
      }
      if (prevProps.checkedKeys !== nextProps.checkedKeys) {
        newState.checkedNode = correctMark(
          nextProps.checkedKeys,
          state.rootInfoMap,
          newState.disabledNode || state.disabledNode
        );
        newState.checkedNode = newState.checkedNode.filter(id => {
          // 之前的并没被禁用 or 之前就被选中了,但是是禁用的
          return (
            state.disabledNode.indexOf(id) === -1 ||
            state.checkedNode.indexOf(id) > -1
          );
        });
      }
      return {
        ...newState,
        prevProps: nextProps,
      };
    }

    return {
      prevProps: nextProps,
    };
  }

  handleExpandClick(root: ITreeData, e: React.MouseEvent) {
    const { id } = this.state.renderKey;
    const { loadMore, foldable } = this.props;
    if (!foldable) {
      return;
    }

    const { loadingNode } = this.state;
    const isSwitcher = e.currentTarget.classList[0] === 'switcher';

    if (loadMore) {
      if (!root.children || root.children.length === 0) {
        e.persist();
        const nextLoadingNode: TreeRootIdArray = loadingNode.concat(root[id]);
        this.setState({ loadingNode: nextLoadingNode });
        loadMore(root)
          .then(() => {
            this.setState({
              loadingNode: nextLoadingNode.filter(x => x !== root[id]),
            });
            this.handleExpand(root, isSwitcher);
          })
          .catch(() => {
            this.setState({
              loadingNode: nextLoadingNode.filter(x => x !== root[id]),
            });
          });
        return;
      }
    }
    this.handleExpand(root, isSwitcher);
  }

  handleExpand(root: ITreeData, isSwitcher: boolean) {
    const { onExpand, autoExpandOnSelect } = this.props;
    const { expandNode } = this.state;

    if (!isSwitcher && !autoExpandOnSelect) {
      return;
    }

    const { id } = this.state.renderKey;
    const activeId = root[id];
    let newExpandNode = expandNode.slice();
    let isClose = true;

    if (expandNode.indexOf(activeId) > -1) {
      newExpandNode = expandNode.filter(expandId => expandId !== activeId);
    } else {
      isClose = false;
      newExpandNode.push(activeId);
    }

    this.setState({
      expandNode: newExpandNode,
    });

    if (onExpand) {
      onExpand(root, {
        isExpanded: !isClose,
      });
    }
  }

  handleCheckboxClick(root: ITreeData) {
    const { onCheck } = this.props;
    let { checkedNode, disabledNode, rootInfoMap, renderKey } = this.state;
    const rootId = root[renderKey.id];

    if (checkedNode.indexOf(rootId) > -1) {
      checkedNode = checkedNode.filter(id => {
        // 自己
        if (id === rootId) {
          return false;
        }

        // 如果被禁用
        if (disabledNode.indexOf(id) > -1) {
          return true;
        }

        // 父类包含了该节点
        if (rootInfoMap[id].includes.indexOf(rootId) > -1) {
          return false;
        }

        // 他的子类
        if (rootInfoMap[rootId].includes.indexOf(id) > -1) {
          return false;
        }

        return true;
      });
    } else {
      checkedNode = correctMark(
        [rootId, ...checkedNode],
        rootInfoMap,
        disabledNode
      );
    }

    /**
     * all 所有选中节点
     * disabled 所有
     */
    const helperInfo: ITreeOncheckHelpInfo = {
      currentRoot: root,
      disabled: disabledNode.map(id => rootInfoMap[id].root),
      all: [],
      top: [],
      bottom: [],
    };
    checkedNode.forEach(id => {
      helperInfo.all.push(rootInfoMap[id].root);

      // top
      if (
        !rootInfoMap[id].parentId ||
        checkedNode.indexOf(
          rootInfoMap[rootInfoMap[id].parentId as string].id
        ) === -1
      ) {
        helperInfo.top.push(rootInfoMap[id].root);
      }

      // bottom
      if (
        rootInfoMap[id].includes.length === 1 ||
        rootInfoMap[id].includes.every(
          child => checkedNode.indexOf(child) === -1
        )
      ) {
        helperInfo.bottom.push(rootInfoMap[id].root);
      }
    });

    onCheck && onCheck(checkedNode, helperInfo);
  }

  renderSwitcher(root: ITreeData) {
    return (
      <i
        className="switcher"
        onClick={e => {
          this.handleExpandClick(root, e);
        }}
      />
    );
  }

  renderContent(root: ITreeData, isExpanded: boolean) {
    const {
      rootInfoMap,
      renderKey: { id, title },
    } = this.state;
    const { render, onSelect } = this.props;
    return (
      <span
        className="content"
        onClick={e => {
          onSelect && onSelect(root, e.currentTarget);

          if (rootInfoMap[root[id]].isParent) {
            this.handleExpandClick(root, e);
          }
        }}
      >
        {render ? render(root, isExpanded) : root[title]}
      </span>
    );
  }

  renderCheckbox(root: ITreeData) {
    const { checkable } = this.props;
    const { checkedNode, disabledNode, rootInfoMap, renderKey } = this.state;

    if (!checkable) {
      return null;
    }

    const rootId = root[renderKey.id];
    const checked = checkedNode.indexOf(rootId) > -1;
    const countChild = rootInfoMap[rootId].includes.filter(
      id => disabledNode.indexOf(id) === -1
    );
    const halfChecked = !!(
      !checked &&
      countChild.length &&
      countChild.some(id => checkedNode.indexOf(id) > -1)
    );

    return (
      <Checkbox
        onChange={this.handleCheckboxClick.bind(this, root)}
        checked={checked}
        disabled={disabledNode.indexOf(rootId) > -1}
        indeterminate={halfChecked}
        width={root[renderKey.title]}
      />
    );
  }

  renderOperations(root: ITreeData, isExpanded: boolean) {
    const { id } = this.state.renderKey;
    const opts = this.props.operations;

    if (opts) {
      const optNodes = opts.map(opt => {
        const shouldRender = opt.shouldRender || (() => true);
        return (
          shouldRender(root) && (
            <span
              key={`${opt.name}-${root[id]}`}
              onClick={opt.action.bind(null, root, isExpanded)}
              className="opt"
            >
              {typeof opt.icon === 'string' ? (
                <i className={opt.icon} />
              ) : (
                opt.icon
              )}{' '}
              {opt.name}
            </span>
          )
        );
      });
      return <div className="operation">{optNodes}</div>;
    }

    return null;
  }

  renderTreeNodes(roots: ITreeData[]) {
    const {
      expandNode,
      loadingNode,
      rootInfoMap,
      renderKey: { id, children },
    } = this.state;
    const { prefix } = this.props;
    if (roots && roots.length > 0) {
      return roots.map(root => {
        const rootId = root[id];
        const isShowChildren = expandNode.indexOf(rootId) > -1;
        const barClassName = classnames(`${prefix}-tree-bar`, {
          off: !isShowChildren,
        });

        return (
          <li key={rootId}>
            <div className={barClassName}>
              {rootInfoMap[rootId].isParent ? this.renderSwitcher(root) : null}
              <div className="zent-tree-node">
                {this.renderCheckbox(root)}
                {loadingNode.indexOf(rootId) > -1 ? <Loading /> : null}
                {this.renderContent(root, isShowChildren)}
                {this.renderOperations(root, isShowChildren)}
              </div>
            </div>
            {root[children] && root[children].length > 0 && (
              <AnimateHeight
                appear
                duration={200}
                height={isShowChildren ? 'auto' : 0}
              >
                <ul key={`ul-${rootId}`} className={`${prefix}-tree-child`}>
                  {this.renderTreeNodes(root[children])}
                </ul>
              </AnimateHeight>
            )}
          </li>
        );
      });
    }

    return null;
  }

  render() {
    const { commonStyle, prefix, size } = this.props;
    const { tree } = this.state;
    const classNames = classnames(`${prefix}-tree`, {
      [`${prefix}-tree-${size}`]: size !== 'medium',
    });

    return (
      <ul className={classNames} style={commonStyle}>
        {this.renderTreeNodes(tree)}
      </ul>
    );
  }
}

export default Tree;
