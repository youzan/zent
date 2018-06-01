import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Star extends PureComponent {
  static propTypes = {
    value: PropTypes.number,
    index: PropTypes.number,
    prefix: PropTypes.string,
    allowHalf: PropTypes.bool,
    disabled: PropTypes.bool,
    onHover: PropTypes.func,
    onClick: PropTypes.func,
    character: PropTypes.node,
  };

  onHover = e => {
    const { onHover, index } = this.props;
    onHover(e, index);
  };

  onClick = e => {
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
        className={this.getClassName()}
        onClick={disabled ? null : onClick}
        onMouseMove={disabled ? null : onHover}
      >
        <div className={`${prefix}-rate-star-first`}>{character}</div>
        <div className={`${prefix}-rate-star-second`}>{character}</div>
      </li>
    );
  }
}
