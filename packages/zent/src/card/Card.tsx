import { Component } from 'react';
import cx from 'classnames';
import Placeholder from '../placeholder';
import isNil from '../utils/isNil';

export type CardSize = 'large' | 'small';

export interface ICardProps {
  type?: 'normal' | 'nested';
  title?: React.ReactNode;
  action?: React.ReactNode;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  loading?: boolean;
  className?: string;
  size?: CardSize;
  bordered?: boolean;
  leftExtra?: React.ReactNode;
  rightExtra?: React.ReactNode;
  bottomExtra?: React.ReactNode;
}

export class Card extends Component<ICardProps> {
  static defaultProps = {
    type: 'normal',
    style: {},
    bodyStyle: {},
    loading: false,
    className: '',
    size: 'large',
    bordered: true,
  };

  render() {
    const {
      title,
      action,
      type,
      loading,
      style,
      children,
      className,
      bodyStyle,
      bordered,
      size,
      leftExtra,
      rightExtra,
      bottomExtra,
    } = this.props;

    const isValidTitle = !isNil(title);
    const isValidAction = !isNil(action);

    if (size === 'small') {
      return (
        <div
          className={cx('zent-card', 'zent-card--small', className, {
            'zent-card--borderless': !bordered,
          })}
          style={style}
        >
          {leftExtra && (
            <div className="zent-card__left-extra">{leftExtra}</div>
          )}
          <div className="zent-card__content">
            {isValidTitle && <div className="zent-card-header">{title}</div>}
            <div className="zent-card-body" style={bodyStyle}>
              {loading ? <Placeholder.TextBlock rows={1} /> : children}
            </div>
            {bottomExtra && (
              <div className="zent-card__bottom-extra">{bottomExtra}</div>
            )}
          </div>
          {rightExtra && (
            <div className="zent-card__right-extra">{rightExtra}</div>
          )}
        </div>
      );
    }

    return (
      <div
        className={cx('zent-card', className, {
          'zent-card--normal': type === 'normal',
          'zent-card--nested': type === 'nested',
          'zent-card--borderless': !bordered,
        })}
        style={style}
      >
        {(isValidTitle || isValidAction) && (
          <div className="zent-card-header">
            {isValidTitle && (
              <h3 className="zent-card-header__title">{title}</h3>
            )}
            {isValidAction && (
              <div className="zent-card-header__action">{action}</div>
            )}
          </div>
        )}
        <div className="zent-card-body" style={bodyStyle}>
          {loading ? <Placeholder.TextBlock rows={5} /> : children}
        </div>
      </div>
    );
  }
}

export default Card;
