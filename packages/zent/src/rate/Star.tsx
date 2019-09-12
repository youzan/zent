import * as React from 'react';
import { Component } from 'react';
import cx from 'classnames';

export interface IRateStarProps {
  prefix?: string;
  value: number;
  allowHalf?: boolean;
  disabled?: boolean;
  character?: React.ReactNode;
  onHover(e: React.MouseEvent<HTMLLIElement>, index: number): void;
  onClick(e: React.MouseEvent<HTMLLIElement>, index: number): void;
  index: number;
  readonly?: boolean;
}

export default class Star extends Component<IRateStarProps> {
  elRef = React.createRef<HTMLLIElement>();

  onHover = (e: React.MouseEvent<HTMLLIElement>) => {
    const { onHover, index } = this.props;
    onHover(e, index);
  };

  onClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const { onClick, index } = this.props;
    onClick(e, index);
  };

  getClassName() {
    const { prefix, index, value, allowHalf, readonly } = this.props;
    const starValue = index + 1;
    const starClass = `${prefix}-rate-star`;
    if (readonly) {
      return starValue <= value
        ? cx(
            starClass,
            `${prefix}-rate-star-readonly`,
            `${prefix}-rate-star-full`
          )
        : starValue > Math.ceil(value)
        ? cx(
            starClass,
            `${prefix}-rate-star-readonly`,
            `${prefix}-rate-star-zero`
          )
        : cx(
            starClass,
            `${prefix}-rate-star-readonly`,
            `${prefix}-rate-star-half`
          );
    }
    if (allowHalf && value + 0.5 === starValue) {
      return cx(
        starClass,
        `${prefix}-rate-star-half`,
        `${prefix}-rate-star-active`
      );
    } else {
      return starValue <= value
        ? cx(starClass, `${prefix}-rate-star-full`)
        : cx(starClass, `${prefix}-rate-star-zero`);
    }
  }

  getFloatValue = () => {
    const { value } = this.props;
    return `${Math.floor((value * 10) % 10) * 10}%`;
  };

  render() {
    const { onHover, onClick } = this;
    const { disabled, prefix, character, readonly } = this.props;
    const allowEdit = disabled || readonly;
    return (
      <li
        ref={this.elRef}
        className={this.getClassName()}
        onClick={allowEdit ? undefined : onClick}
        onMouseMove={allowEdit ? undefined : onHover}
      >
        <div
          className={`${prefix}-rate-star-first`}
          style={readonly ? { width: this.getFloatValue() } : undefined}
        >
          {character}
        </div>
        <div className={`${prefix}-rate-star-second`}>{character}</div>
      </li>
    );
  }
}
