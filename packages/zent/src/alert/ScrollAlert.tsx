import * as React from 'react';
import { Children, ReactNode } from 'react';
import cx from 'classnames';
import AlertItem from './AlertItem';
import { IScrollAlertProps } from './types';

function setStyle(target: HTMLElement, styles: object) {
  const { style } = target;
  Object.keys(styles).forEach(attribute => {
    style[attribute] = styles[attribute];
  });
}

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

// 滚动动画的时长
const DEFAULT_DURATION = 600;
interface IState {
  items: ReactNode;
  activeIndex: number;
}
export class ScrollAlert extends React.Component<IScrollAlertProps, IState> {
  static defaultProps = {
    type: 'info',
    loading: false,
    scrollInterval: 5,
  };

  // activeIndex: 当前视图中的子节点索引
  state = { items: null, activeIndex: 0 };
  containerRef = React.createRef<HTMLDivElement>();
  firstChildRef = React.createRef<HTMLDivElement>();
  //当前视图中的子节点索引
  scrollIndex = 0;
  // 动画状态
  animationStatus = true;
  // 循环事件id
  intervalId: any;

  // 滚动container高度为第一个子节点的高度
  get containerHeight() {
    return this.firstChildRef.current?.offsetHeight;
  }

  componentDidMount() {
    this.setState({
      items: this.props.children,
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
      if (!this.animationStatus) return;

      // 滚动到最后一个节点时，重置为初始位置
      if (this.scrollIndex === this.renderItem.length - 1) {
        this.resetChildren();
      }

      // 滚动递增
      ++this.scrollIndex;
      setStyle(this.containerRef.current, {
        transform: `translateY(-${this.containerHeight * this.scrollIndex}px)`,
        'transition-duration': `${DEFAULT_DURATION}ms`,
        'transition-timing-function': 'ease-in-out',
      });

      // 设置当前节点的索引
      this.setState({ activeIndex: this.scrollIndex });
    }, scrollInterval * 1000);
  };

  // 鼠标移入，动画暂停
  stopScroll = () => {
    this.animationStatus = false;
  };

  // 鼠标移出，动画继续
  continueScroll = () => {
    this.animationStatus = true;
  };

  /**
   * 重置节点为0
   */
  resetChildren = () => {
    setStyle(this.containerRef.current, {
      transform: 'translateY(0px)',
      'transition-duration': '0ms',
      'transition-timing-function': 'ease-in-out',
    });
    this.scrollIndex = 0;
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
    const deleteItems = items.length && items.filter((_, i) => index !== i);

    // items只有一个元素时不滚动
    if (deleteItems && deleteItems.length === 1) {
      clearInterval(this.intervalId);
      this.resetChildren();
    }
    this.setState({ items: deleteItems });
    onClose && onClose(index);
  };

  // 实际dom中需要渲染的子节点
  get renderItem() {
    const { outline, children, ...restItemProps } = this.props;
    const { items } = this.state;
    const extendChildren = cloneChildren(items || children);
    const length = Children.count(extendChildren);

    return length
      ? Children.map(extendChildren, (item: React.ReactElement, index) => {
          const props = Object.assign({}, restItemProps, { ...item.props });
          return (
            <AlertItem
              className={cx({
                'active-item': index === this.scrollIndex,
                'vartual-item': index === 0 && this.scrollIndex === length - 1,
              })}
              {...props}
              key={index}
              onClose={() => this.onCloseItemHandler(index)}
              scrollRef={!index ? this.firstChildRef : null}
            />
          );
        })
      : [];
  }

  render() {
    const { className, outline, type } = this.props;

    const scrollCls = cx(
      'zent-scroll-alert',
      `zent-alert-style-${type}`,
      className,
      {
        ['zent-alert-outline']: outline,
      }
    );

    const renderItem = this.renderItem;
    return renderItem.length > 0 ? (
      <div className={scrollCls}>
        <div
          className="scroll-container"
          ref={this.containerRef}
          style={{ height: this.containerHeight }}
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
