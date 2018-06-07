import React, { Component, PureComponent } from 'react';
import Checkbox from 'checkbox';
import isEqual from 'lodash/isEqual';
import get from 'lodash/get';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import AnimateHeight from 'utils/component/AnimateHeight';

import Loading from '../components/Loading';

const PROP_KEY = {
  id: 'id',
  title: 'title',
  children: 'children',
  parentId: 'parentId',
};

export default class Tree extends (PureComponent || Component) {
  propKey = PROP_KEY;

  static propTypes = {
    dataType: PropTypes.oneOf(['plain', 'tree']),
    data: PropTypes.arrayOf(PropTypes.object),
    isRoot: PropTypes.func,
    loadMore: PropTypes.func,
    foldable: PropTypes.bool,
    checkable: PropTypes.bool,
    controlled: PropTypes.bool,
    autoExpandOnSelect: PropTypes.bool,
    defaultCheckedKeys: PropTypes.arrayOf(PropTypes.any),
    disabledCheckedKeys: PropTypes.arrayOf(PropTypes.any),
    onCheck: PropTypes.func,
    onExpand: PropTypes.func,
    onSelect: PropTypes.func,
    size: PropTypes.oneOf(['large', 'medium', 'small']),
    operations: PropTypes.arrayOf(PropTypes.object),
    render: PropTypes.func,
    prefix: PropTypes.string,
    props: PropTypes.object,
  };

  static defaultProps = {
    autoExpandOnSelect: true,
    dataType: 'tree',
    foldable: true,
    checkable: false,
    controlled: false,
    size: 'medium',
    prefix: 'zent',
    props: PROP_KEY,
  };

  constructor(props) {
    super(props);
    const {
      tree,
      treeMap,
      checkMap,
      expandNode,
      checkedNode,
      disabledNode,
      halfCheckNode,
    } = this.formatDataByProp(props);

    this.state = {
      treeMap,
      expandNode,
      tree,
      checkMap,
      checkedNode,
      disabledNode,
      halfCheckNode,
      loadingNode: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.data, this.props.data)) {
      const formatData = this.formatDataByProp(nextProps);
      let nextExpandNode = formatData.expandNode;

      // 只有在 loadMore 状态下，我会保持原有打开状态
      if (this.props.loadMore || nextProps.loadMore) {
        const { expandNode, tree } = this.state;

        nextExpandNode = this.filterExpandNode(
          {
            tree,
            expandNode,
          },
          formatData
        );
      }

      this.setState({
        treeMap: formatData.treeMap,
        tree: formatData.tree,
        expandNode: nextExpandNode,
        checkMap: formatData.checkMap,
        checkedNode: formatData.checkedNode,
        disabledNode: formatData.disabledNode,
        halfCheckNode: formatData.halfCheckNode,
      });
      return;
    }

    if (
      nextProps.checkable &&
      (!isEqual(this.props.defaultCheckedKeys, nextProps.defaultCheckedKeys) ||
        !isEqual(
          this.props.disabledCheckedKeys,
          nextProps.disabledCheckedKeys
        ) ||
        this.props.controlled !== nextProps.controlled)
    ) {
      const { checkedNode, disabledNode, halfCheckNode } = this.formatCheckInfo(
        {
          defaultCheckedKeys: nextProps.defaultCheckedKeys,
          disabledCheckedKeys: nextProps.disabledCheckedKeys,
          checkMap: this.state.checkMap,
          tree: this.state.tree,
          checkable: nextProps.checkable,
          controlled: nextProps.controlled,
        }
      );

      this.setState({
        checkedNode,
        disabledNode,
        halfCheckNode,
      });
    }
  }

  formatDataByProp({
    data,
    isRoot,
    props,
    dataType,
    isExpandAll,
    loadMore,
    checkable,
    controlled,
    disabledCheckedKeys = [],
    defaultCheckedKeys = [],
  }) {
    this.propKey = Object.assign({}, PROP_KEY, props);
    const { children, parentId, id } = this.propKey;
    const treeMap = {};
    const expandNode = [];
    const checkMap = {};
    let roots = [];

    if (dataType === 'plain') {
      const map = {};
      const orderRecord = [];

      data.forEach((node, index) => {
        if (!node.isLeaf) {
          node[children] = [];
        }

        map[node[id]] = node;
        orderRecord[index] = node[id];
      });

      orderRecord.forEach(key => {
        const node = map[key];
        const isRootNode =
          (isRoot && isRoot(node)) ||
          node[parentId] === 0 ||
          node[parentId] === undefined ||
          node[parentId] === '0';

        if (isRootNode) {
          roots.push(node);
        } else if (map[node[parentId]]) {
          // 防止只删除父节点没有子节点的情况
          map[node[parentId]][children].push(node);
        }
      });
    } else if (dataType === 'tree') {
      roots = data;
    } else {
      // console.error(`The dataType should be declared as plain/tree, but your dataType is ${dataType}, Please check your config.`)
    }

    this.collector({
      isExpandAll,
      loadMore,
      tree: roots,
      parentPath: [],
      exPandCb: rootId => {
        expandNode.push(rootId);
      },
      mapCb: (rootId, path) => {
        treeMap[rootId] = path;
      },
      checkCb: (pId, cId) => {
        if (!checkable) {
          return;
        }

        if (checkMap[cId]) {
          checkMap[cId].unshift(cId);
        } else {
          checkMap[cId] = [cId];
        }

        if (pId !== undefined) {
          checkMap[pId] = checkMap[pId] || [];
          checkMap[pId].push(...checkMap[cId]);
        }
      },
    });

    const { checkedNode, disabledNode, halfCheckNode } = this.formatCheckInfo({
      tree: roots,
      checkMap,
      checkable,
      controlled,
      disabledCheckedKeys,
      defaultCheckedKeys,
    });

    return {
      treeMap,
      expandNode,
      checkMap,
      tree: roots,
      checkedNode,
      disabledNode,
      halfCheckNode,
    };
  }

  formatCheckInfo({
    defaultCheckedKeys,
    disabledCheckedKeys,
    checkMap,
    tree,
    checkable,
    controlled,
  }) {
    let checkedNode = [];
    let disabledNode = [];
    let halfCheckNode = [];

    if (checkable) {
      if (!controlled) {
        const realChecked = [
          ...new Set(
            defaultCheckedKeys.reduce((total, rootId) => {
              return total.concat(checkMap[rootId]);
            }, [])
          ),
        ];
        const realDisabled = [
          ...new Set(
            disabledCheckedKeys.reduce((total, rootId) => {
              return total.concat(checkMap[rootId]);
            }, [])
          ),
        ];

        const correntCheck = this.correctCheckInfo({
          checkMap,
          tree,
          checkedNode: realChecked,
          disabledNode: realDisabled,
          isInital: true,
        });

        checkedNode = correntCheck.checkedNode;
        disabledNode = correntCheck.disabledNode;
        halfCheckNode = correntCheck.halfCheckNode;
      } else {
        checkedNode = defaultCheckedKeys;
        disabledNode = disabledCheckedKeys;
      }
    }

    return {
      checkedNode,
      disabledNode,
      halfCheckNode,
    };
  }

  collector({
    isExpandAll,
    loadMore,
    tree,
    parentPath,
    exPandCb,
    mapCb,
    checkCb,
    parentId,
  }) {
    const { children, id } = this.propKey;

    tree.forEach((item, index) => {
      let currentPath = parentPath.concat(index);
      mapCb(item[id], currentPath);

      if (
        this.isParentNode(item, loadMore) &&
        (item.expand || (item.expand === undefined && isExpandAll))
      ) {
        exPandCb(item[id]);
      }

      if (item[children]) {
        this.collector({
          isExpandAll,
          tree: item[children],
          parentPath: currentPath,
          exPandCb,
          mapCb,
          checkCb,
          parentId: item[id],
        });
      }

      checkCb(parentId, item[id]);
    });
  }

  filterExpandNode(current, next) {
    const { id, children } = this.propKey;
    const { tree: cTree, expandNode: cExpandNode } = current;
    const { tree: nTree, treeMap: nTreeMap, expandNode: nExpandNode } = next;

    Object.values(nTreeMap).forEach(path => {
      const nPath = path.join(`.${children}.`);
      const cItem = get(cTree, nPath);
      const nItem = get(nTree, nPath);
      const nId = nItem[id];

      // 如果是续费成员 cItem[id] === nId
      // 当前打开存在，下个打开不存在
      if (
        cItem &&
        cItem[id] === nId &&
        cExpandNode.indexOf(nId) > -1 &&
        nExpandNode.indexOf(nId) === -1
      ) {
        nExpandNode.push(nId);
      }
    });
    return [...nExpandNode];
  }

  isParentNode(root, loadMore) {
    // loadMore 的 parent children 边界有点模糊
    const { children } = this.propKey;
    return !!(
      !root.isLeaf &&
      (loadMore || (root[children] && root[children].length > 0))
    );
  }

  correctCheckInfo({ checkedNode, disabledNode, tree, isInital }) {
    const { id, children } = this.propKey;
    const tempParentCheckdMap = {};
    const tempDisabled = disabledNode;
    const tempHalfCheck = [];
    let tempChecked = checkedNode;

    tree.forEach(item => {
      shouldNodeCheck(item);
    });

    function shouldNodeCheck(root, pId) {
      const rootId = root[id];
      const rootChildren = root[children];

      if (
        (isInital || tempChecked.indexOf(rootId) === -1) &&
        rootChildren &&
        rootChildren.length
      ) {
        const childLength = rootChildren.length;
        const rootCount = (tempParentCheckdMap[rootId] = {
          checkedCount: 0,
          disabledCount: 0,
          validCheckedCount: 0,
        });

        rootChildren.forEach(child => {
          shouldNodeCheck(child, rootId);
        });

        const validCheckedLength = childLength - rootCount.disabledCount;
        const validCheckedCount = rootCount.validCheckedCount;

        if (validCheckedCount) {
          if (validCheckedCount === validCheckedLength) {
            tempChecked.push(rootId);
          } else {
            tempHalfCheck.push(rootId);
          }
        } else {
          tempChecked = tempChecked.filter(cid => cid !== rootId);
        }

        if (
          rootCount.disabledCount === childLength &&
          tempDisabled.indexOf(rootId) === -1
        ) {
          tempDisabled.push(rootId);
        }
      }

      if (pId) {
        if (tempChecked.indexOf(rootId) > -1) {
          tempParentCheckdMap[pId].checkedCount++;

          if (tempDisabled.indexOf(rootId) === -1) {
            tempParentCheckdMap[pId].validCheckedCount++;
          }
        }

        if (tempDisabled.indexOf(rootId) > -1) {
          tempParentCheckdMap[pId].disabledCount++;
        }
      }
    }

    return {
      checkedNode: tempChecked,
      disabledNode: tempDisabled,
      halfCheckNode: tempHalfCheck,
    };
  }

  handleExpandClick(root, e) {
    const { id } = this.propKey;
    const { loadMore, foldable } = this.props;
    if (!foldable) {
      return;
    }

    const { loadingNode } = this.state;
    const isSwitcher = e.currentTarget.classList[0] === 'switcher';

    if (loadMore) {
      if (!root.children || root.children.length === 0) {
        e.persist();
        const nextLoadingNode = [root[id], ...loadingNode];
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

  handleExpand(root, isSwitcher) {
    const { onExpand, autoExpandOnSelect } = this.props;
    const { expandNode } = this.state;

    if (!isSwitcher && !autoExpandOnSelect) {
      return;
    }

    const { id } = this.propKey;
    const activeId = root[id];
    let newExpandNode = expandNode;
    let isClose = true;

    if (expandNode.indexOf(activeId) > -1) {
      newExpandNode = expandNode.filter(expandId => expandId !== activeId);
    } else {
      isClose = false;
      newExpandNode.push(activeId);
    }

    this.setState({
      expandNode: [...newExpandNode],
    });

    if (onExpand) {
      onExpand(root, {
        isExpanded: !isClose,
      });
    }
  }

  handleCheckboxClick(root) {
    const { onCheck, controlled } = this.props;
    const rootId = root[this.propKey.id];
    let { checkedNode, disabledNode, tree, checkMap } = this.state;

    // 受控模式
    if (controlled) {
      if (checkedNode.indexOf(rootId) > -1) {
        checkedNode = checkedNode.filter(id => id !== rootId);
      } else {
        checkedNode = checkedNode.concat(rootId);
      }
      onCheck && onCheck([...checkedNode]);

      // zent 模式
    } else {
      if (checkedNode.indexOf(rootId) > -1) {
        checkedNode = checkedNode.filter(id => {
          return (
            disabledNode.indexOf(id) > -1 ||
            (checkMap[id].indexOf(rootId) === -1 &&
              checkMap[rootId].indexOf(id) === -1)
          );
        });
      } else {
        checkedNode = [
          ...new Set([
            ...checkedNode,
            ...checkMap[rootId].filter(id => disabledNode.indexOf(id) === -1),
          ]),
        ];
      }

      const checkInfo = this.correctCheckInfo({
        checkedNode,
        disabledNode,
        tree,
        checkMap,
      });

      this.setState({
        ...checkInfo,
      });

      onCheck && onCheck([...checkInfo.checkedNode]);
    }
  }

  renderSwitcher(root, isParent) {
    if (isParent) {
      return (
        <i
          className="switcher"
          onClick={e => {
            this.handleExpandClick(root, e);
          }}
        />
      );
    }

    return null;
  }

  renderContent(root, isParent, isExpanded) {
    const { title } = this.propKey;
    const { render, onSelect } = this.props;
    return (
      <span
        className="content"
        onClick={e => {
          onSelect && onSelect(root, e.currentTarget);

          if (isParent) {
            this.handleExpandClick(root, e);
          }
        }}
      >
        {render ? render(root, isExpanded) : root[title]}
      </span>
    );
  }

  renderCheckbox(root) {
    const { checkable } = this.props;
    const { checkedNode, disabledNode, halfCheckNode } = this.state;

    if (!checkable) {
      return null;
    }

    const rootId = root[this.propKey.id];

    return (
      <Checkbox
        onChange={this.handleCheckboxClick.bind(this, root)}
        checked={checkedNode.indexOf(rootId) > -1}
        disabled={disabledNode.indexOf(rootId) > -1}
        indeterminate={halfCheckNode.indexOf(rootId) > -1}
      />
    );
  }

  renderOperations(root, isExpanded) {
    const { id } = this.propKey;
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
  }

  renderTreeNodes(roots) {
    const { id, children } = this.propKey;
    const { expandNode, loadingNode } = this.state;
    const { loadMore, prefix } = this.props;
    if (roots && roots.length > 0) {
      return roots.map(root => {
        const isShowChildren = expandNode.indexOf(root[id]) > -1;
        const barClassName = classnames(`${prefix}-tree-bar`, {
          off: !isShowChildren,
        });
        const isParent = this.isParentNode(root, loadMore);
        return (
          <li key={root[id]}>
            <div className={barClassName}>
              {this.renderSwitcher(root, isParent)}
              <div className="zent-tree-node">
                {this.renderCheckbox(root)}
                {loadingNode.indexOf(root[id]) > -1 ? <Loading /> : null}
                {this.renderContent(root, isParent, isShowChildren)}
                {this.renderOperations(root, isShowChildren)}
              </div>
            </div>
            {root[children] &&
              root[children].length > 0 && (
                <AnimateHeight
                  appear
                  duration={200}
                  height={isShowChildren ? 'auto' : 0}
                >
                  <ul key={`ul-${root[id]}`} className={`${prefix}-tree-child`}>
                    {this.renderTreeNodes(root[children])}
                  </ul>
                </AnimateHeight>
              )}
          </li>
        );
      });
    }
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
