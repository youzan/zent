import * as React from 'react';
import { Component } from 'react';
import * as keycode from 'keycode';

export interface IESCToCloseWrapperProps {
  onClose(e: KeyboardEvent): void;
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
    onKeyUp = (evt: KeyboardEvent) => {
      if (keycode(evt) === 'esc') {
        this.props.onClose(evt);
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
