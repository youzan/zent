import React, { Component, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from 'icon';

import Star from './Star';

export default class Rate extends (PureComponent || Component) {
  static propTypes = {
    disabled: PropTypes.bool,
    value: PropTypes.number,
    defaultValue: PropTypes.number,
    count: PropTypes.number,
    allowHalf: PropTypes.bool,
    allowClear: PropTypes.bool,
    style: PropTypes.object,
    prefix: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
    character: PropTypes.node,
    tabIndex: PropTypes.number,
  };

  static defaultProps = {
    defaultValue: 0,
    count: 5,
    allowHalf: false,
    allowClear: true,
    style: {},
    prefix: 'zent',
    character: <Icon type="star" />,
    tabIndex: 0,
  };

  constructor(props) {
    super(props);
    let value = props.value;
    if (value === undefined) {
      value = props.defaultValue;
    }

    this.stars = {};

    this.state = {
      value,
      cleanedValue: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      let value = nextProps.value;
      if (value === undefined) {
        value = nextProps.defaultValue;
      }
      this.setState({
        value,
      });
    }
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
      isReset = value === this.state.value;
    }
    this.onMouseLeave(true);
    this.changeValue(isReset ? 0 : value);
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

  changeValue(value) {
    if (!('value' in this.props)) {
      this.setState({
        value,
      });
    }
    this.props.onChange(value);
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
      tabIndex,
    } = this.props;
    const { value, hoverValue } = this.state;
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
        tabIndex={disabled ? -1 : tabIndex}
        ref={this.saveRate}
      >
        {stars}
      </ul>
    );
  }
}
