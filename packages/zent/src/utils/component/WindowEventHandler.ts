import { Component } from 'react';

export interface IWindowEventHandlerProps<K extends keyof WindowEventMap> {
  eventName: K;
  callback(ev: WindowEventMap[K]): void;
  useCapture?: boolean;
}

export default class WindowEventHandler<
  K extends keyof WindowEventMap
> extends Component<IWindowEventHandlerProps<K>> {
  static defaultProps = {
    useCapture: false,
  };

  componentDidMount() {
    const { eventName, callback, useCapture } = this.props;
    window.addEventListener(eventName, callback, useCapture);
  }

  componentWillUnmount() {
    const { eventName, callback, useCapture } = this.props;
    window.removeEventListener(eventName, callback, useCapture);
  }

  render() {
    return null;
  }
}
