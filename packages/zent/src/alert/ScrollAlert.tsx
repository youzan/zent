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
function cloneChildren(children: React.ReactNode) {
  const length = Children.count(children);

  const clonedChildren = new Array(length);
  Children.forEach(children, (child, index) => {
    clonedChildren[index] = child;
    if (index === 0) {
      clonedChildren[length] = child;
    }
  });

  return length > 1 ? clonedChildren : children;
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
  items: ReactNode;
  activeIndex: number;
  transitionDuration: number;
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

  state = {
    items: null,
    // 当前视图中的子节点索引
    activeIndex: 0,
    transitionDuration: 600,
  };

  containerRef = React.createRef<HTMLDivElement>();
  firstChildRef = React.createRef<HTMLDivElement>();
  //当前视图中的子节点索引
  scrollIndex = 0;
  // 动画状态
  pauseAnimation = false;
  // 循环事件id
  intervalId: any;

  // 滚动container高度为第一个子节点的高度
  get containerHeight() {
    return this.firstChildRef.current?.offsetHeight || 0;
  }

  componentDidMount() {
    this.setState({
      items: this.props.children ?? [],
    });

    this.scrollHandler();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  /**
   * 节点滚动事件
   */
  scrollHandler = () => {
    const { scrollInterval } = this.props;

    this.intervalId = setInterval(() => {
      if (this.pauseAnimation) return;

      // 滚动到最后一个节点时，重置为初始位置
      if (this.scrollIndex === this.renderItem.length - 1) {
        this.resetChildren();
      }
      // 滚动递增
      ++this.scrollIndex;

      this.setState({
        activeIndex: this.scrollIndex,
        transitionDuration: 600,
      });
    }, scrollInterval);
  };

  // 鼠标移入，动画暂停
  stopScroll = () => {
    this.pauseAnimation = true;
  };

  // 鼠标移出，动画继续
  continueScroll = () => {
    this.pauseAnimation = false;
  };

  /**
   * 重置节点为0
   */
  resetChildren = () => {
    this.scrollIndex = 0;
    this.setState({
      transitionDuration: 0,
      activeIndex: 0,
    });
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

    // items只有一个元素时不滚动
    if (afterDeleteItems.length === 1) {
      clearInterval(this.intervalId);
      this.resetChildren();
    } else if (afterDeleteItems.length === 0) {
      onClose?.();
    }
    this.setState({ items: afterDeleteItems });
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
    const { items } = this.state;
    const childArray = Children.toArray(items || children);

    // children类型校验
    const alertItem = childArray.reduce<any[]>(
      (alertItemArray, child: React.ReactElement<any>) => {
        const type = child.type;
        if (kindOf(type, AlertItemPub)) {
          alertItemArray.push(child);
        }
        return alertItemArray;
      },
      []
    );

    const extendChildren = cloneChildren(alertItem);
    const length = Children.count(extendChildren);

    return length
      ? Children.map(extendChildren, (item: React.ReactElement, index) => {
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
              ref={!index ? this.firstChildRef : null}
            />
          );
        })
      : [];
  }

  render() {
    if (this.props.closed) {
      return null;
    }

    const { className, outline, type, ...restDivAttrs } = omit(
      this.props as IScrollAlertInnerProps,
      OmitDivAttr
    );

    const { activeIndex, transitionDuration } = this.state;
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
          ref={this.containerRef}
          style={{
            height: this.containerHeight,
            transform: `translateY(-${this.containerHeight * activeIndex}px)`,
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
