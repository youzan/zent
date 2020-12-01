import { Component, ReactNode } from 'react';
import cx from 'classnames';
import Pop, { PopPositions } from '../pop';
import Icon from '../icon';

export interface IBlockHeaderProps {
  title: ReactNode;
  type?: 'ribbon' | 'minimum';
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
    type: 'ribbon',
  };

  private renderTitle() {
    const { title, type } = this.props;
    return (
      <div
        className={cx('zent-block-header__title', {
          'zent-block-header__title-ribbon': type === 'ribbon',
        })}
      >
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
        >
          <Icon
            className="zent-block-header__pop-help-icon"
            type="help-circle"
          />
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
    const { leftContent, rightContent, tooltip, className, type } = this.props;
    return (
      <div
        className={cx('zent-block-header', className, {
          'zent-block-header-ribbon': type === 'ribbon',
          'zent-block-header-minimum': type === 'minimum',
        })}
      >
        {this.renderTitle()}
        {tooltip && this.renderTooltip()}
        {leftContent && this.renderLeftContent()}
        {rightContent && this.renderRightContent()}
      </div>
    );
  }
}

export default BlockHeader;
