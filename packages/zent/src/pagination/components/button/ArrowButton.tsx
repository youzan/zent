import { Component } from 'react';
import cx from 'classnames';
import { Optional } from 'utility-types';

import Button, { IButtonProps } from '../../../button';
import Pop, { IPopProps } from '../../../pop';
import Icon from '../../../icon';

export interface IPaginationArrowButtonProps {
  direction: 'left' | 'right';
  double?: boolean;
  active?: boolean;
  bordered?: boolean;
  disabled?: boolean;
  disabledHelp?: IPopProps;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

interface IPaginationDoubleArrowButtonState {
  showArrow: boolean;
  prevActive: boolean;
}

const DEFAULT_DISABLED_POP_PROPS: Optional<IPopProps, 'content' | 'type'> = {
  position: 'top-right',
  trigger: 'hover',
  centerArrow: true,
};

export class ArrowButton extends Component<
  IPaginationArrowButtonProps & Partial<IButtonProps>
> {
  static defaultProps = {
    double: false,
    active: false,
    bordered: true,
  };

  render() {
    const { direction, double, active, bordered, disabledHelp, ...rest } =
      this.props;

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

    let Arrow = null as unknown as React.FC<React.PropsWithChildren<unknown>>;
    if (direction === 'left') {
      Arrow = LeftArrow;
    } else if (direction === 'right') {
      Arrow = RightArrow;
    }

    const btn = (
      <Button
        {...rest}
        className={cx(
          'zent-pagination-arrow-button',
          'zent-pagination-button--layout',
          {
            'zent-pagination-page-button--no-border': !bordered,
          }
        )}
      >
        <Arrow />
      </Button>
    );

    if (disabledHelp && rest.disabled) {
      const popProps = { ...DEFAULT_DISABLED_POP_PROPS, ...disabledHelp };

      if (popProps.trigger === 'hover') {
        // Required when using disabled elements as Pop's children
        popProps.fixMouseEventsOnDisabledChildren = true;
      }
      return <Pop {...popProps}>{btn}</Pop>;
    }

    return btn;
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
    let Arrow = null as unknown as React.FC<React.PropsWithChildren<unknown>>;
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
          'zent-pagination-button--layout',
          {
            'zent-pagination-arrow-button--double-active': isActive,
            'zent-pagination-page-button--no-border': !bordered,
          }
        )}
        {...rest}
        onMouseOver={active ? undefined : this.onMouseOver}
        onMouseLeave={active ? undefined : this.onMouseOut}
      >
        {isActive ? (
          <Arrow />
        ) : (
          <Icon type="more" className="zent-pagination-more" />
        )}
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
  return <Icon type="left" className="zent-pagination-arrow" />;
}

function RightArrow() {
  return <Icon type="right" className="zent-pagination-arrow" />;
}

function LeftDoubleArrow() {
  return <Icon type="double-last" className="zent-pagination-arrow" />;
}

function RightDoubleArrow() {
  return <Icon type="double-next" className="zent-pagination-arrow" />;
}

export default ArrowButton;
