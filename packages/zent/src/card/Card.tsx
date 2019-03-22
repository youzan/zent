import * as React from 'react';
import { Component } from 'react';
import isNil from 'lodash-es/isNil';
import cx from 'classnames';
import Placeholder from '../placeholder';

export interface ICardProps {
  type?: 'normal' | 'nested';
  title?: React.ReactNode;
  action?: React.ReactNode;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  loading?: boolean;
  className?: string;
  prefix?: string;
}

export class Card extends Component<ICardProps> {
  static defaultProps = {
    type: 'normal',
    style: {},
    bodyStyle: {},
    loading: false,
    className: '',
    prefix: 'zent',
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
      prefix,
    } = this.props;

    const isValidTitle = !isNil(title);
    const isValidAction = !isNil(action);

    return (
      <div
        className={cx(`${prefix}-card`, className, {
          [`${prefix}-card--normal`]: type === 'normal',
          [`${prefix}-card--nested`]: type === 'nested',
        })}
        style={style}
      >
        {(isValidTitle || isValidAction) && (
          <div className={`${prefix}-card-header`}>
            {isValidTitle && (
              <h3 className={`${prefix}-card-header__title`}>{title}</h3>
            )}
            {isValidAction && (
              <div className={`${prefix}-card-header__action`}>{action}</div>
            )}
          </div>
        )}
        <div className={`${prefix}-card-body`} style={bodyStyle}>
          {loading ? <Placeholder.TextBlock rows={5} /> : children}
        </div>
      </div>
    );
  }
}

export default Card;
