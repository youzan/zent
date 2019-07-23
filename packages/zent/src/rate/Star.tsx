import * as React from 'react';
import { Component } from 'react';

export interface IRateStarProps {
  prefix?: string;
  value: number;
  allowHalf?: boolean;
  disabled?: boolean;
  character?: React.ReactNode;
  onHover(e: React.MouseEvent<HTMLLIElement>, index: number): void;
  onClick(e: React.MouseEvent<HTMLLIElement>, index: number): void;
  index: number;
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
    const { prefix, index, value, allowHalf } = this.props;
    const starValue = index + 1;
    let className = `${prefix}-rate-star`;
    if (allowHalf && value + 0.5 === starValue) {
      className += ` ${prefix}-rate-star-half ${prefix}-rate-star-active`;
    } else {
      className +=
        starValue <= value
          ? ` ${prefix}-rate-star-full`
          : ` ${prefix}-rate-star-zero`;
    }
    return className;
  }

  render() {
    const { onHover, onClick } = this;
    const { disabled, prefix, character } = this.props;
    return (
      <li
        ref={this.elRef}
        className={this.getClassName()}
        onClick={disabled ? undefined : onClick}
        onMouseMove={disabled ? undefined : onHover}
      >
        <div className={`${prefix}-rate-star-first`}>{character}</div>
        <div className={`${prefix}-rate-star-second`}>{character}</div>
      </li>
    );
  }
}
