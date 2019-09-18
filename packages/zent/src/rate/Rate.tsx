import * as React from 'react';
import { Component } from 'react';
import classNames from 'classnames';
import Icon from '../icon';

import Star from './Star';
import { DisabledContext, IDisabledContext } from '../disabled';

export interface IRateProps {
  onChange?: (value: number) => void;
  value: number;
  allowClear?: boolean;
  allowHalf?: boolean;
  character?: React.ReactNode;
  className?: string;
  count: number;
  disabled?: boolean;
  style?: React.CSSProperties;
  prefix?: string;
  readOnly?: boolean;
}

export interface IRateState {
  starRefs: Array<React.RefObject<Star>>;
  cleanedValue: number | null;
  hoverValue: number | null;
}

function refArray(length: number): Array<React.RefObject<Star>> {
  const refs = [];
  for (let i = 0; i < length; i += 1) {
    refs.push(React.createRef<Star>());
  }
  return refs;
}

export class Rate extends Component<IRateProps, IRateState> {
  static defaultProps = {
    value: 0,
    count: 5,
    allowHalf: false,
    allowClear: true,
    prefix: 'zent',
    character: <Icon type="star" />,
    readOnly: false,
  };

  static contextType = DisabledContext;
  context!: IDisabledContext;

  constructor(props: IRateProps) {
    super(props);
    this.state = {
      cleanedValue: null,
      hoverValue: null,
      starRefs: refArray(props.count),
    };
  }

  onHover = (event: React.MouseEvent<HTMLLIElement>, index: number) => {
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
      hoverValue: null,
      cleanedValue: null,
    });
  };

  onClick = (event: React.MouseEvent<HTMLLIElement>, index: number) => {
    const { onChange } = this.props;
    const value = this.getStarValue(index, event.pageX);
    let isReset = false;
    if (this.props.allowClear) {
      isReset = value === this.props.value;
    }
    this.onMouseLeave();
    onChange && onChange(isReset ? 0 : value);
    this.setState({
      cleanedValue: isReset ? value : null,
    });
  };

  getStarDOM(index: number) {
    const ref = this.state.starRefs[index];
    if (!ref) {
      throw new Error(
        'Missing Star Ref, this looks like a bug of zent, please file an issue'
      );
    }
    const star = ref.current;
    if (!star) {
      throw new Error(
        'Missing Star instance, this looks like a bug of zent, please file an issue'
      );
    }
    const li = star.elRef.current;
    if (!li) {
      throw new Error(
        'Missing Star element, this looks like a bug of zent, please file an issue'
      );
    }
    return li;
  }

  getStarValue(index: number, x: number) {
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

  static getDerivedStateFromProps(
    { count }: IRateProps,
    { starRefs }: IRateState
  ): Partial<IRateState> | null {
    if (count !== starRefs.length) {
      return {
        starRefs: refArray(count),
      };
    }
    return null;
  }

  render() {
    const {
      count,
      allowHalf,
      style,
      prefix,
      disabled = this.context.value,
      className,
      character,
      value,
      readOnly,
    } = this.props;
    const { hoverValue, starRefs } = this.state;
    const stars = [];

    for (let index = 0; index < count; index++) {
      stars.push(
        <Star
          key={index}
          ref={starRefs[index]}
          index={index}
          disabled={disabled}
          prefix={prefix}
          allowHalf={allowHalf}
          value={hoverValue !== null ? hoverValue : value}
          onClick={this.onClick}
          onHover={this.onHover}
          character={character}
          readOnly={readOnly}
        />
      );
    }
    return (
      <ul
        className={classNames(
          `${prefix}-rate`,
          {
            [`${prefix}-rate-disabled`]: disabled,
            [`${prefix}-rate-readonly`]: readOnly,
          },
          className
        )}
        style={style}
        onMouseLeave={disabled || readOnly ? undefined : this.onMouseLeave}
      >
        {stars}
      </ul>
    );
  }
}

export default Rate;
