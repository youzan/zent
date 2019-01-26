import * as React from 'react';
import { Component } from 'react';
import * as PropTypes from 'prop-types';

export interface IESCToCloseWrapperProps {
  onClose(): void;
  visible?: boolean;
}

/*
  Not exported in index.js.

  Provides an HOC component for ESC to close functionality, useful in some cases.
*/
export default function withESCToClose<P extends { visible?: boolean }>(
  Closable: React.ComponentType<P>
) {
  return class ESCToCloseWrapper extends Component<
    IESCToCloseWrapperProps & P
  > {
    static propTypes = {
      visible: PropTypes.bool.isRequired,
      onClose: PropTypes.func.isRequired,
    };

    onKeyUp = (evt: KeyboardEvent) => {
      if (evt.keyCode === 27) {
        this.props.onClose();
      }
    };

    on() {
      document.body.addEventListener('keyup', this.onKeyUp, true);
    }

    off() {
      document.body.removeEventListener('keyup', this.onKeyUp, true);
    }

    componentDidMount() {
      if (this.props.visible) {
        this.on();
      }
    }

    componentWillUnmount() {
      if (this.props.visible) {
        this.off();
      }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.visible !== this.props.visible) {
        if (nextProps.visible) {
          this.on();
        } else {
          this.off();
        }
      }
    }

    render() {
      const { onClose, ...props } = this.props;
      return <Closable {...props as P} />;
    }
  };
}
