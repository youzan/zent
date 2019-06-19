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
  prefix?: string;
}

export class BlockHeader extends Component<IBlockHeaderProps> {
  static defaultProps = {
    prefix: 'zent',
    className: '',
    position: 'top-right',
  };

  private renderTitle() {
    const { title, prefix } = this.props;
    return (
      <div className={`${prefix}-block-header__title`}>
        <h3>{title}</h3>
      </div>
    );
  }

  private renderTooltip() {
    const { tooltip, position, prefix } = this.props;
    return (
      <div className={`${prefix}-block-header__pop`}>
        <Pop
          trigger="hover"
          centerArrow
          position={position}
          content={
            <div className={`${prefix}-block-header__tooltip`}>{tooltip}</div>
          }
          wrapperClassName={`${prefix}-block-header__tooltip-trigger`}
        >
          <Icon type="help-circle" />
        </Pop>
      </div>
    );
  }

  private renderLeftContent() {
    const { leftContent, prefix } = this.props;
    return (
      <div
        className={cx(
          `${prefix}-block-header__content`,
          `${prefix}-block-header__content-left`
        )}
      >
        {leftContent}
      </div>
    );
  }

  private renderRightContent() {
    const { rightContent, prefix } = this.props;
    return (
      <div
        className={cx(
          `${prefix}-block-header__content`,
          `${prefix}-block-header__content-right`
        )}
      >
        {rightContent}
      </div>
    );
  }

  render() {
    const {
      prefix,
      leftContent,
      rightContent,
      tooltip,
      className,
    } = this.props;
    return (
      <div className={cx(`${prefix}-block-header`, className)}>
        {this.renderTitle()}
        {tooltip && this.renderTooltip()}
        {leftContent && this.renderLeftContent()}
        {rightContent && this.renderRightContent()}
      </div>
    );
  }
}

export default BlockHeader;
