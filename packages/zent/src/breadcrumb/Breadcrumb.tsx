import { Component, createRef, CSSProperties } from 'react';
import cx from 'classnames';
import { WindowResizeHandler } from '../utils/component/WindowResizeHandler';
import Item, { IBreadcrumbItemProps } from './Item';
import Icon from '../icon';
import isEqual from '../utils/isEqual';

const MIN_FOLD_COUNT = 2;
const MOVE_ICON_WIDTH = 24;
const BREADCRUMB_ITEM_MARGIN_RIGHT = 24;
const MOVING_DURATION = 200;

export interface IBreadcrumbProps {
  breads: IBreadcrumbItemProps[];
  className: string;
  maxItemCount?: number;
  style?: CSSProperties;
}

export interface IBreadcrumbState {
  isFolded: boolean;
  overflowLeft: boolean;
  overflowRight: boolean;
  contentStyleLeft: number;
}

export class Breadcrumb extends Component<IBreadcrumbProps, IBreadcrumbState> {
  static defaultProps = {
    className: '',
    breads: [],
  };

  state = {
    isFolded: true,
    overflowLeft: false,
    overflowRight: false,
    contentStyleLeft: 0,
  };

  breadcrumbRef = createRef<HTMLDivElement>();
  contentRef = createRef<HTMLDivElement>();
  isMoving = false;

  static Item = Item;

  get breadcrumbWidth() {
    const breadcrumbEle = this.breadcrumbRef.current;
    return breadcrumbEle?.getBoundingClientRect().width;
  }

  get breadcrumbLeft() {
    const breadcrumbEle = this.breadcrumbRef.current;
    return breadcrumbEle?.getBoundingClientRect().left;
  }

  get contentWidth() {
    const contentEle = this.contentRef.current;
    return contentEle?.getBoundingClientRect().width;
  }

  getOverflowStatus = () => {
    const { contentStyleLeft } = this.state;
    if (!this.breadcrumbWidth || !this.contentWidth) return;

    if (contentStyleLeft < 0) {
      this.setState({ overflowLeft: true });
    } else {
      this.setState({ overflowLeft: false });
    }

    if (this.breadcrumbWidth - contentStyleLeft < this.contentWidth) {
      this.setState({ overflowRight: true });
    } else {
      this.setState({ overflowRight: false });
    }
  };

  componentDidMount = () => {
    this.getOverflowStatus();
  };

  componentDidUpdate = (prevProps: IBreadcrumbProps) => {
    if (!isEqual(this.props.breads, prevProps.breads)) {
      this.getOverflowStatus();
    }
  };

  handleClickMoveLeft = () => {
    const { contentStyleLeft } = this.state;
    if (this.isMoving) return;
    this.isMoving = true;
    const contentEle = this.contentRef.current;

    let moveStep = 0;
    for (let i = contentEle.childElementCount - 1; i >= 0; i--) {
      const childNode = contentEle.children.item(i);
      const childLeft = childNode.getBoundingClientRect().left;
      if (childLeft < this.breadcrumbLeft) {
        moveStep = this.breadcrumbLeft - childLeft + MOVE_ICON_WIDTH;
        break;
      }
    }
    const nextLeft =
      contentStyleLeft + moveStep < 0 ? contentStyleLeft + moveStep : 0;
    this.setState({ contentStyleLeft: nextLeft }, () => {
      this.getOverflowStatus();
      setTimeout(() => {
        this.isMoving = false;
      }, MOVING_DURATION);
    });
  };

  handleClickMoveRight = () => {
    const { contentStyleLeft } = this.state;
    if (this.isMoving) return;
    this.isMoving = true;
    const contentEle = this.contentRef.current;

    let moveStep = 0;
    for (let i = 0; i < contentEle.childElementCount; i++) {
      const childNode = contentEle.children.item(i);
      const childLeft = childNode.getBoundingClientRect().left;
      const childWidth = childNode.getBoundingClientRect().width;
      if (childLeft + childWidth > this.breadcrumbLeft + this.breadcrumbWidth) {
        moveStep =
          childLeft +
          childWidth -
          (this.breadcrumbLeft + this.breadcrumbWidth) +
          MOVE_ICON_WIDTH -
          BREADCRUMB_ITEM_MARGIN_RIGHT;
        break;
      }
    }

    const offsetWidth = this.contentWidth - this.breadcrumbWidth;
    const nextLeft =
      Math.abs(contentStyleLeft - moveStep) > offsetWidth
        ? -offsetWidth
        : contentStyleLeft - moveStep;
    this.setState({ contentStyleLeft: nextLeft }, () => {
      this.getOverflowStatus();
      setTimeout(() => {
        this.isMoving = false;
      }, MOVING_DURATION);
    });
  };

  unfoldBreads = () => {
    this.setState({ isFolded: false }, () => {
      this.getOverflowStatus();
    });
  };

  getFoldItems = () => {
    const { isFolded } = this.state;
    const { maxItemCount, breads } = this.props;
    if (!maxItemCount || maxItemCount < MIN_FOLD_COUNT) return breads;
    if (!isFolded || breads?.length <= maxItemCount) return breads;
    const result = [...breads];
    result.splice(1, breads.length - maxItemCount, {
      name: '...',
      className: 'zent-breadcrumb__fold',
      onClick: this.unfoldBreads,
    });
    return result;
  };

  render() {
    const { className, children = null, style } = this.props;
    const { overflowLeft, overflowRight, contentStyleLeft } = this.state;

    const breadList = this.getFoldItems();
    const hasChildren = children || (breadList && breadList.length > 0);

    return (
      <div
        className={cx('zent-breadcrumb', className, {
          'zent-breadcrumb--overflow-left': overflowLeft,
          'zent-breadcrumb--overflow-right': overflowRight,
        })}
        ref={this.breadcrumbRef}
        style={style}
      >
        {overflowLeft && (
          <Icon
            type="left"
            className="zent-breadcrumb__move-left"
            onClick={this.handleClickMoveLeft}
          />
        )}
        {hasChildren && (
          <div
            className="zent-breadcrumb__content"
            style={{ left: `${contentStyleLeft}px` }}
            ref={this.contentRef}
          >
            {children}
            {breadList &&
              breadList.length > 0 &&
              breadList.map((item, index) => {
                return <Item {...item} key={index} />;
              })}
          </div>
        )}
        {overflowRight && (
          <Icon
            type="right"
            className="zent-breadcrumb__move-right"
            onClick={this.handleClickMoveRight}
          />
        )}
        <WindowResizeHandler onResize={this.getOverflowStatus} />
      </div>
    );
  }
}

export default Breadcrumb;
