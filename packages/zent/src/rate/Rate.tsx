import * as React from 'react';
import { PureComponent } from 'react';
import * as ReactDOM from 'react-dom';
import classNames from 'classnames';
import Icon from '../icon';

import Star from './Star';

export interface IRateProps {
  onChange?: (value: number) => void;
  value?: number;
  allowClear?: boolean;
  allowHalf?: boolean;
  character?: React.ReactNode;
  className?: string;
  count?: number;
  disabled?: boolean;
  style?: React.CSSProperties;
  prefix?: string;
}

export interface IRateState {
  cleanedValue: number | null;
  hoverValue?: number;
}

export class Rate extends PureComponent<IRateProps, IRateState> {
  static defaultProps = {
    value: 0,
    count: 5,
    allowHalf: false,
    allowClear: true,
    style: {},
    prefix: 'zent',
    character: <Icon type="star" />,
  };

  rate: HTMLUListElement | null = null;
  stars: {
    [key: number]: Star;
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
    this.onMouseLeave();
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
      const starEle = this.getStarDOM(index) as HTMLLIElement;
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

export default Rate;
