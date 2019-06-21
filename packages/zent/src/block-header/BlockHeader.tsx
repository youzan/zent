import * as React from 'react';
import { Component, ReactNode } from 'react';
import cx from 'classnames';
import Pop, { PopPositions } from '../pop';
import Icon from '../icon';

export interface IBlockHeaderProps {
  title: string;
  className?: string;
  tooltip?: ReactNode;
  position?: PopPositions;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
}

export class BlockHeader extends Component<IBlockHeaderProps> {
  static defaultProps = {
    className: '',
    position: 'top-right',
  };

  private renderTitle() {
    const { title } = this.props;
    return (
      <div className="zent-block-header__title">
        <h3>{title}</h3>
      </div>
    );
  }

  private renderTooltip() {
    const { tooltip, position } = this.props;
    return (
      <div className="zent-block-header__pop">
        <Pop
          trigger="hover"
          centerArrow
          position={position}
          content={<div className="zent-block-header__tooltip">{tooltip}</div>}
          wrapperClassName="zent-block-header__tooltip-trigger"
        >
          <Icon type="help-circle" />
        </Pop>
      </div>
    );
  }

  private renderLeftContent() {
    const { leftContent } = this.props;
    return (
      <div
        className={cx(
          'zent-block-header__content',
          'zent-block-header__content-left'
        )}
      >
        {leftContent}
      </div>
    );
  }

  private renderRightContent() {
    const { rightContent } = this.props;
    return (
      <div
        className={cx(
          'zent-block-header__content',
          'zent-block-header__content-right'
        )}
      >
        {rightContent}
      </div>
    );
  }

  render() {
    const { leftContent, rightContent, tooltip, className } = this.props;
    return (
      <div className={cx('zent-block-header', className)}>
        {this.renderTitle()}
        {tooltip && this.renderTooltip()}
        {leftContent && this.renderLeftContent()}
        {rightContent && this.renderRightContent()}
      </div>
    );
  }
}

export default BlockHeader;
