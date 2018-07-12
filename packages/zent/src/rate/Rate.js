import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from 'icon';

import Star from './Star';

export default class Rate extends PureComponent {
  static propTypes = {
    disabled: PropTypes.bool,
    value: PropTypes.number,
    count: PropTypes.number,
    allowHalf: PropTypes.bool,
    allowClear: PropTypes.bool,
    style: PropTypes.object,
    prefix: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    character: PropTypes.node,
  };

  static defaultProps = {
    value: 0,
    count: 5,
    allowHalf: false,
    allowClear: true,
    style: {},
    prefix: 'zent',
    character: <Icon type="star" />,
  };

  constructor(props) {
    super(props);
    this.stars = {};

    this.state = {
      cleanedValue: null,
    };
  }

  onHover = (event, index) => {
    const hoverValue = this.getStarValue(index, event.pageX);
    const { cleanedValue } = this.state;
    if (hoverValue !== cleanedValue) {
      this.setState({
        hoverValue,
        cleanedValue: null,
      });
    }
  };

  onMouseLeave = () => {
    this.setState({
      hoverValue: undefined,
      cleanedValue: null,
    });
  };

  onClick = (event, index) => {
    const value = this.getStarValue(index, event.pageX);
    let isReset = false;
    if (this.props.allowClear) {
      isReset = value === this.props.value;
    }
    this.onMouseLeave(true);
    this.props.onChange(isReset ? 0 : value);
    this.setState({
      cleanedValue: isReset ? value : null,
    });
  };

  getStarDOM(index) {
    return ReactDOM.findDOMNode(this.stars[index]);
  }

  getStarValue(index, x) {
    let value = index + 1;
    if (this.props.allowHalf) {
      const starEle = this.getStarDOM(index);
      const leftDis = starEle.getBoundingClientRect().left;
      const width = starEle.clientWidth;
      if (x - leftDis < width / 2) {
        value -= 0.5;
      }
    }
    return value;
  }

  saveRef = index => node => {
    this.stars[index] = node;
  };

  saveRate = node => {
    this.rate = node;
  };

  render() {
    const {
      count,
      allowHalf,
      style,
      prefix,
      disabled,
      className,
      character,
      value,
    } = this.props;
    const { hoverValue } = this.state;
    const stars = [];
    const disabledClass = disabled ? `${prefix}-rate-disabled` : '';

    for (let index = 0; index < count; index++) {
      stars.push(
        <Star
          ref={this.saveRef(index)}
          index={index}
          disabled={disabled}
          prefix={prefix}
          allowHalf={allowHalf}
          value={hoverValue === undefined ? value : hoverValue}
          onClick={this.onClick}
          onHover={this.onHover}
          key={index}
          character={character}
        />
      );
    }
    return (
      <ul
        className={classNames(`${prefix}-rate`, disabledClass, className)}
        style={style}
        onMouseLeave={disabled ? null : this.onMouseLeave}
        ref={this.saveRate}
      >
        {stars}
      </ul>
    );
  }
}
