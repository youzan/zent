import * as React from 'react';
import { Component } from 'react';
import cx from 'classnames';

import Button, { IButtonProps } from '../../../button';

const XML_NS = 'http://www.w3.org/2000/svg';

export interface IPaginationArrowButtonProps {
  direction: 'left' | 'right';
  double?: boolean;
  active?: boolean;
  bordered?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

interface IPaginationDoubleArrowButtonState {
  showArrow: boolean;
  prevActive: boolean;
}

export class ArrowButton extends Component<
  IPaginationArrowButtonProps & Partial<IButtonProps>
> {
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

    let Arrow = (null as unknown) as React.FC;
    if (direction === 'left') {
      Arrow = LeftArrow;
    } else if (direction === 'right') {
      Arrow = RightArrow;
    }

    return (
      <Button
        {...rest}
        className={cx('zent-pagination-arrow-button', {
          'zent-pagination-page-button--no-border': !bordered,
        })}
      >
        <Arrow />
      </Button>
    );
  }
}

class DoubleArrowButton extends Component<
  IPaginationArrowButtonProps & Partial<IButtonProps>,
  IPaginationDoubleArrowButtonState
> {
  static defaultProps = {
    double: false,
    active: false,
    bordered: true,
  };

  state = {
    showArrow: false,
    prevActive: false,
  };

  render() {
    const { direction, active, bordered, double: _, ...rest } = this.props;
    const { showArrow } = this.state;
    let Arrow = (null as unknown) as React.FC;
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

  static getDerivedStateFromProps(
    props: IPaginationArrowButtonProps & Partial<IButtonProps>,
    state: IPaginationDoubleArrowButtonState
  ) {
    const { active } = props;
    const stateDiff = {
      prevActive: active,
      showArrow: state.showArrow,
    } as IPaginationDoubleArrowButtonState;

    if (active !== state.prevActive) {
      stateDiff.showArrow = !!active;
    }

    return stateDiff;
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

export default ArrowButton;
