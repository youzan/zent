import * as React from 'react';
import { Component } from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';

import Button from '../../../button';

const XML_NS = 'http://www.w3.org/2000/svg';

export default class ArrowButton extends Component<any, any> {
  static propTypes = {
    direction: PropTypes.oneOf(['left', 'right']).isRequired,
    double: PropTypes.bool,
    active: PropTypes.bool,
    bordered: PropTypes.bool,
  };

  static defaultProps = {
    double: false,
    active: false,
    bordered: true,
  };

  render() {
    const { direction, double, active, bordered, ...rest } = this.props;

    if (double) {
      return (
        <DoubleArrowButton
          direction={direction}
          active={active}
          bordered={bordered}
          {...rest}
        />
      );
    }

    let Arrow = null;
    if (direction === 'left') {
      Arrow = LeftArrow;
    } else if (direction === 'right') {
      Arrow = RightArrow;
    }

    return (
      <Button
        {...rest}
        type={bordered ? 'secondary' : 'default'}
        className={cx('zent-pagination-arrow-button', {
          'zent-pagination-page-button--no-border': !bordered,
        })}
      >
        <Arrow />
      </Button>
    );
  }
}

class DoubleArrowButton extends Component<any, any> {
  state = {
    showArrow: false,
  };

  render() {
    const { direction, active, bordered, ...rest } = this.props;
    const { showArrow } = this.state;
    let Arrow = null;
    if (direction === 'left') {
      Arrow = LeftDoubleArrow;
    } else if (direction === 'right') {
      Arrow = RightDoubleArrow;
    }

    const isActive = showArrow;

    return (
      <Button
        className={cx(
          'zent-pagination-arrow-button',
          'zent-pagination-arrow-button--double',
          {
            'zent-pagination-arrow-button--double-active': isActive,
            'zent-pagination-page-button--no-border': !bordered,
          }
        )}
        {...rest}
        onMouseOver={active ? undefined : this.onMouseOver}
        onMouseLeave={active ? undefined : this.onMouseOut}
      >
        {isActive ? <Arrow /> : '...'}
      </Button>
    );
  }

  componentWillReceiveProps(nextProps) {
    const { active } = nextProps;
    if (active !== this.props.active) {
      this.setState({
        showArrow: active,
      });
    }
  }

  onMouseOver = () => {
    this.setState({
      showArrow: true,
    });
  };

  onMouseOut = () => {
    this.setState({
      showArrow: false,
    });
  };
}

function LeftArrow() {
  return (
    <svg width="9" height="14" xmlns={XML_NS} className="zent-pagination-arrow">
      <path
        d="M8 1L1.78 7 8 13"
        strokeWidth={2}
        fill="none"
        fillRule="evenodd"
      />
    </svg>
  );
}

function RightArrow() {
  return (
    <svg width="9" height="14" xmlns={XML_NS} className="zent-pagination-arrow">
      <path
        d="M1 1l6.22 6L1 13"
        strokeWidth={2}
        fill="none"
        fillRule="evenodd"
      />
    </svg>
  );
}

function LeftDoubleArrow() {
  return (
    <svg
      width="15"
      height="14"
      xmlns={XML_NS}
      className="zent-pagination-arrow"
    >
      <g strokeWidth={2} fill="none" fillRule="evenodd">
        <path d="M8 1L1.78 7 8 13" />
        <path d="M14 1L7.78 7 14 13" />
      </g>
    </svg>
  );
}

function RightDoubleArrow() {
  return (
    <svg
      width="15"
      height="14"
      xmlns={XML_NS}
      className="zent-pagination-arrow"
    >
      <g strokeWidth={2} fill="none" fillRule="evenodd">
        <path d="M7 1l6.22 6L7 13" />
        <path d="M1 1l6.22 6L1 13" />
      </g>
    </svg>
  );
}
