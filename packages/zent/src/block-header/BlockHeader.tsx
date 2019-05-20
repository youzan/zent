import * as React from 'react';
import { Component, ReactNode } from 'react';
import cx from 'classnames';
import Pop, { PopPositions } from '../pop';
import Icon from '../icon';

export interface IBlockHeaderProps {
  className?: string;
  title: string;
  tooltip?: ReactNode;
  content: ReactNode;
  childAlign?: 'left' | 'right';
  position: PopPositions;
  prefix: string;
}

export class BlockHeader extends Component<IBlockHeaderProps> {
  static defaultProps = {
    prefix: 'zent',
    className: '',
    childAlign: 'left',
    position: 'top-right',
    tooltip: '',
    content: '',
  };

  render() {
    const {
      prefix,
      content,
      title,
      tooltip,
      childAlign,
      position,
      className,
      children,
    } = this.props;
    return (
      <div className={cx(`${prefix}-block-header`, className)}>
        {title && (
          <div className={`${prefix}-block-header__left`}>
            <h3>{title}</h3>
          </div>
        )}
        <div className={`${prefix}-block-header__pop`}>
          {tooltip && (
            <Pop
              trigger="hover"
              centerArrow
              position={position}
              content={
                <div className={`${prefix}-block-header__tooltip`}>
                  {tooltip}
                </div>
              }
            >
              <Icon type="help-circle" />
            </Pop>
          )}
        </div>
        <div
          className={cx(`${prefix}-block-header__content`, {
            [`${prefix}-block-header__content-right`]: childAlign === 'right',
          })}
        >
          {content && content}
          {children && children}
        </div>
      </div>
    );
  }
}

export default BlockHeader;
