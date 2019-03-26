import React, { PureComponent } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

const defaultTimeout = 300; // ms

export default function animatedClosable(Origin) {
  return class Animated extends PureComponent {
    static propTypes = {
      open: PropTypes.bool,
      timeout: PropTypes.number,
      animated: PropTypes.bool,
      animationClassName: PropTypes.string,
    };

    static defaultProps = {
      animated: true,
    };
    constructor(props, context) {
      super(props, context);

      if (props.refClose) {
        props.refClose(this.close);
      }

      this.state = {
        open: !!props.open,
        closing: false,
      };

      this.timeoutNum = null;
    }

    componentWillReceiveProps(nextProps) {
      // When trying to open and the current state is closed or closing
      if (nextProps.open && (!this.state.open || this.state.closing)) {
        this.open();
        // When trying to close and the current state is open
      } else if (!nextProps.open && nextProps.open !== this.state.open) {
        this.close();
      }
    }

    componentWillUnmount() {
      if (this.timeoutNum) {
        clearTimeout(this.timeoutNum);
      }
    }

    open = () => {
      if (this.timeoutNum) {
        clearTimeout(this.timeoutNum);
        this.timeoutNum = null;
      }
      this.setState({
        open: true,
        closing: false,
      });
    };

    /**
     * Usage:
     *  close(timeout, callback)
     *  close(callback) // with default timeout
     */
    close = (arg0, arg1) => {
      let callback;
      let timeout = this.props.timeout || defaultTimeout;
      if (typeof arg0 === 'function') {
        callback = arg0;
      } else if (typeof arg0 === 'number') {
        timeout = +arg0;
        callback = arg1;
      }
      if (this.timeoutNum !== null) return;

      this.setState({
        closing: true,
      });

      this.timeoutNum = setTimeout(() => {
        this.setState(
          {
            open: false,
          },
          () => {
            this.timeoutNum = null;
            callback && callback();
          }
        );
      }, timeout);
    };

    renderWrapper() {
      if (!this.props.animated) {
        return this.props.children;
      }

      const { animation, animationClassName } = this.props;

      const Animation = animation || CSSTransition;

      return (
        <Animation
          appear
          unmountOnExit
          in={this.state.open && !this.state.closing}
          timeout={this.props.timeout || defaultTimeout}
          classNames={animationClassName || ''}
        >
          {React.Children.only(this.props.children)}
        </Animation>
      );
    }

    render() {
      return (
        <Origin
          {...this.props}
          visible={this.state.open}
          closing={this.state.closing}
        >
          {this.renderWrapper()}
        </Origin>
      );
    }
  };
}
