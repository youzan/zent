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
  readOnly?: boolean;
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
    const { prefix, index, value, allowHalf, readOnly } = this.props;
    const starValue = index + 1;
    const isFull = starValue <= value;
    const isZero = starValue > Math.ceil(value);
    const isHalf = allowHalf && value + 0.5 === starValue;
    const isPart =
      readOnly && starValue > value && starValue === Math.ceil(value);
    return cx(`${prefix}-rate-star`, {
      [`${prefix}-rate-star-full`]: isFull,
      [`${prefix}-rate-star-zero`]: isZero,
      [`${prefix}-rate-star-half`]: isHalf,
      [`${prefix}-rate-star-part`]: isPart,
    });
  }

  getFloatValue = () => {
    const { value } = this.props;
    return `${(value * 100) % 100}%`;
  };

  render() {
    const { onHover, onClick } = this;
    const { disabled, prefix, character, readOnly } = this.props;
    const disableEdit = disabled || readOnly;
    return (
      <li
        ref={this.elRef}
        className={this.getClassName()}
        onClick={disableEdit ? undefined : onClick}
        onMouseMove={disableEdit ? undefined : onHover}
      >
        <div
          className={`${prefix}-rate-star-first`}
          style={readOnly ? { width: this.getFloatValue() } : undefined}
        >
          {character}
        </div>
        <div className={`${prefix}-rate-star-second`}>{character}</div>
      </li>
    );
  }
}
