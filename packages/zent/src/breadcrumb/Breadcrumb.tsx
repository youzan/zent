import { Component, createRef } from 'react';
import cx from 'classnames';

import Item, { IBreadcrumbItemProps } from './Item';
import Icon from '../icon';

const MIN_FOLD_COUNT = 2;
const MOVE_ICON_WIDTH = 24;
const BREADCRUMB_ITEM_MARGIN_RIGHT = 24;
const MOVING_DURATION = 200;

export interface IBreadcrumbProps {
  breads: IBreadcrumbItemProps[];
  className: string;
  maxItemCount?: number;
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

  getOverflowStatus = () => {
    const { contentStyleLeft } = this.state;
    if (!this.breadcrumbRef.current || !this.contentRef.current) return;
    const breadcrumbEle = this.breadcrumbRef.current;
    const contentEle = this.contentRef.current;
    const breadcrumbWidth = breadcrumbEle.getBoundingClientRect().width;
    const contentWidth = contentEle.getBoundingClientRect().width;

    if (contentStyleLeft < 0) {
      this.setState({ overflowLeft: true });
    } else {
      this.setState({ overflowLeft: false });
    }

    if (breadcrumbWidth - contentStyleLeft < contentWidth) {
      this.setState({ overflowRight: true });
    } else {
      this.setState({ overflowRight: false });
    }
  };

  componentDidMount = () => {
    this.getOverflowStatus();
  };

  handleClickMoveLeft = () => {
    const { contentStyleLeft } = this.state;
    if (this.isMoving) return;
    this.isMoving = true;
    const breadcrumbEle = this.breadcrumbRef.current;
    const contentEle = this.contentRef.current;
    const breadcrumbLeft = breadcrumbEle.getBoundingClientRect().left;

    let moveStep = 0;
    for (let i = contentEle.childElementCount - 1; i >= 0; i--) {
      const childNode = contentEle.children.item(i);
      const childLeft = childNode.getBoundingClientRect().left;
      if (childLeft < breadcrumbLeft) {
        moveStep = breadcrumbLeft - childLeft + MOVE_ICON_WIDTH;
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
    const breadcrumbEle = this.breadcrumbRef.current;
    const contentEle = this.contentRef.current;
    const breadcrumbWidth = breadcrumbEle.getBoundingClientRect().width;
    const contentWidth = contentEle.getBoundingClientRect().width;
    const breadcrumbLeft = breadcrumbEle.getBoundingClientRect().left;

    let moveStep = 0;
    for (let i = 0; i < contentEle.childElementCount; i++) {
      const childNode = contentEle.children.item(i);
      const childLeft = childNode.getBoundingClientRect().left;
      const childWidth = childNode.getBoundingClientRect().width;
      if (
        childLeft + childWidth - BREADCRUMB_ITEM_MARGIN_RIGHT >
        breadcrumbLeft + breadcrumbWidth
      ) {
        moveStep =
          childLeft +
          childWidth -
          (breadcrumbLeft + breadcrumbWidth) +
          MOVE_ICON_WIDTH -
          BREADCRUMB_ITEM_MARGIN_RIGHT;
        break;
      }
    }

    const offsetWidth = contentWidth - breadcrumbWidth;
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

  getFoldItems = () => {
    const { isFolded } = this.state;
    const { maxItemCount, breads } = this.props;
    if (!maxItemCount || maxItemCount < MIN_FOLD_COUNT) return breads;
    if (!isFolded || breads?.length <= maxItemCount) return breads;
    const result = [...breads];
    result.splice(1, breads.length - maxItemCount, {
      name: '...',
      className: 'zent-breadcrumb__fold',
      onClick: () => this.setState({ isFolded: false }),
    });
    return result;
  };

  render() {
    const { className, children = null } = this.props;
    const { overflowLeft, overflowRight, contentStyleLeft } = this.state;

    const breadList = this.getFoldItems();

    return (
      <div
        className={cx('zent-breadcrumb', className, {
          'zent-breadcrumb--overflow-left': overflowLeft,
          'zent-breadcrumb--overflow-right': overflowRight,
        })}
        ref={this.breadcrumbRef}
      >
        {overflowLeft && (
          <Icon
            type="left"
            className="zent-breadcrumb__move-left"
            onClick={this.handleClickMoveLeft}
          />
        )}
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
        {overflowRight && (
          <Icon
            type="right"
            className="zent-breadcrumb__move-right"
            onClick={this.handleClickMoveRight}
          />
        )}
      </div>
    );
  }
}

export default Breadcrumb;
