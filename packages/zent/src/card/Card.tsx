import { Component } from 'react';
import cx from 'classnames';
import Placeholder from '../placeholder';
import isNil from '../utils/isNil';

export interface ICardProps {
  type?: 'normal' | 'nested';
  title?: React.ReactNode;
  action?: React.ReactNode;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  loading?: boolean;
  className?: string;
}

export class Card extends Component<ICardProps> {
  static defaultProps = {
    type: 'normal',
    style: {},
    bodyStyle: {},
    loading: false,
    className: '',
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
    } = this.props;

    const isValidTitle = !isNil(title);
    const isValidAction = !isNil(action);

    return (
      <div
        className={cx('zent-card', className, {
          'zent-card--normal': type === 'normal',
          'zent-card--nested': type === 'nested',
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
