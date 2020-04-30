import * as React from 'react';
import { Children, ReactNode } from 'react';
import cx from 'classnames';
import AlertItem from './components/AlertItem';
import { AlertItem as AlertItemPub } from './AlertItem';
import { AlertTypes } from './types';
import { PartialRequired } from '../utils/types';
import kindOf from '../utils/kindOf';
import omit from '../utils/omit';
/**
 * 为满足动画的无缝衔接
 * 在原子节点后增加第一个子节点
 */
function cloneChildren(children: ReactNode): ReactNode[] {
  const length = Children.count(children);

  const clonedChildren: ReactNode[] = new Array(length);
  Children.forEach(children, (child, index) => {
    clonedChildren[index] = child;
    if (index === 0) {
      clonedChildren[length] = child;
    }
  });

  return length > 1 ? clonedChildren : [children];
}

/**
 * 根据props的children，获取有效的渲染节点
 * @param children props的子节点
 */
function getRenderChildrenFromProps(children: ReactNode) {
  const childArray = Children.toArray(children);

  // children类型校验
  const items = childArray.reduce<any[]>(
    (alertItemArray, child: React.ReactElement<any>) => {
      const type = child.type;
      if (kindOf(type, AlertItemPub)) {
        alertItemArray.push(child);
      }
      return alertItemArray;
    },
    []
  );

  const renderItems = cloneChildren(items);
  return { items, preChildren: children, renderItems };
}

export interface IScrollAlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  type?: AlertTypes;
  outline?: boolean;
  loading?: boolean;
  scrollInterval?: number;
  onClose?: () => void;
  closed?: boolean;
}
interface IState {
  items: ReactNode[];
  renderItems: ReactNode[];
  preChildren: ReactNode;
  transitionDuration: number;
  containerHeight: number;
}
type IScrollAlertInnerProps = PartialRequired<
  IScrollAlertProps,
  'loading' | 'scrollInterval' | 'onClose' | 'closed'
>;
const OmitDivAttr = ['loading', 'scrollInterval', 'onClose', 'closed'] as const;

export class ScrollAlert extends React.Component<IScrollAlertProps, IState> {
  static defaultProps = {
    type: 'info',
    loading: false,
    scrollInterval: 5000,
  };

  state: IState = {
    items: [],
    renderItems: [],
    preChildren: null,
    transitionDuration: 0,
    containerHeight: 0,
  };

  //当前视图中的子节点索引
  scrollIndex = 0;
  // timeout事件id
  timeoutId: any;
  // 第一个子节点的高度
  firstChildHeight = 0;

  static getDerivedStateFromProps(
    nextProps: IScrollAlertProps,
    { preChildren }: IState
  ) {
    if (nextProps.children !== preChildren) {
      return getRenderChildrenFromProps(nextProps.children);
    }
    return null;
  }

  componentDidMount() {
    this.setContanierHeight();
    this.scrollHandler();
  }

  componentDidUpdate() {
    this.setContanierHeight();
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  // 设置滚动容器高度
  setContanierHeight = () => {
    if (this.firstChildHeight !== this.state.containerHeight) {
      this.setState({
        containerHeight: this.firstChildHeight,
      });
    }
  };

  /**
   * 节点滚动事件
   */
  scrollHandler = () => {
    const { scrollInterval } = this.props;
    const { renderItems } = this.state;
    const length = renderItems.length;

    this.timeoutId = setTimeout(() => {
      // 空节点、一个节点均不产生动画
      if (length <= 1) return;

      // 滚动递增
      ++this.scrollIndex;
      this.setState({
        transitionDuration: 600,
      });

      // 滚动到最后一个节点时，重置为初始位置
      if (this.scrollIndex === length - 1) {
        setTimeout(this.resetChildren, 600);
      }
      this.scrollHandler();
    }, scrollInterval);
  };

  // 鼠标移入，动画暂停
  stopScroll = () => {
    this.clearTimer();
  };

  // 鼠标移出，动画继续
  continueScroll = () => {
    this.scrollHandler();
  };

  /**
   * 重置节点为0
   */
  resetChildren = () => {
    this.scrollIndex = 0;
    this.setState({
      transitionDuration: 0,
    });
  };

  /**
   * 清除timeout
   */
  clearTimer = () => {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  };

  /**
   * 关闭回调函数
   */
  private onCloseItemHandler = index => {
    const { onClose } = this.props;
    const { items } = this.state;

    // 点击虚拟（最后一个）节点时，实际索引为0
    if (index === items.length) {
      index = 0;
      this.resetChildren();
    }
    // 删除items元素
    const afterDeleteItems = items.filter((_, i) => index !== i);

    // items只有一个元素时
    if (afterDeleteItems.length === 1) {
      this.resetChildren();
    }
    // 删除所有节点时，清除timeout并触发close回调
    else if (afterDeleteItems.length === 0) {
      onClose?.();
    }

    this.setState({
      items: afterDeleteItems,
      renderItems: cloneChildren(afterDeleteItems),
    });
  };

  onFirstChildRef = itemInstance => {
    this.firstChildHeight = itemInstance?.offsetHeight || 0;
  };

  // 实际dom中需要渲染的子节点
  get renderItem() {
    const {
      outline,
      children,
      onClose,
      className,
      ...restItemProps
    } = this.props;
    const { renderItems } = this.state;
    const length = renderItems.length;

    return Children.map(renderItems, (item: React.ReactElement, index) => {
      const props = Object.assign({}, restItemProps, { ...item.props });
      return (
        <AlertItem
          classItemName={cx({
            'zent-alert-scroll-active-item': index === this.scrollIndex,
            'zent-alert-scroll-virtual-item':
              index === 0 && this.scrollIndex === length - 1,
          })}
          {...props}
          key={index}
          onAlertItemClose={() => this.onCloseItemHandler(index)}
          ref={!index ? this.onFirstChildRef : undefined}
        />
      );
    });
  }

  render() {
    if (this.props.closed) {
      return null;
    }

    const { className, outline, type, ...restDivAttrs } = omit(
      this.props as IScrollAlertInnerProps,
      OmitDivAttr
    );

    const { transitionDuration, containerHeight } = this.state;
    const renderItem = this.renderItem;

    const scrollCls = cx(
      'zent-alert-scroll',
      `zent-alert-style-${type}`,
      className,
      {
        ['zent-alert-scroll-outline']: outline,
      }
    );

    return renderItem.length > 0 ? (
      <div className={scrollCls} {...restDivAttrs}>
        <div
          className="zent-alert-scroll-container"
          style={{
            height: containerHeight,
            transform: `translateY(-${containerHeight * this.scrollIndex}px)`,
            transitionDuration: `${transitionDuration}ms`,
          }}
          onMouseEnter={this.stopScroll}
          onMouseLeave={this.continueScroll}
        >
          {renderItem}
        </div>
      </div>
    ) : null;
  }
}

export default ScrollAlert;
