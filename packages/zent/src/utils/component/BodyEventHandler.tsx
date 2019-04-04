import * as React from 'react';

export interface IBodyEventHandlerProps<
  K extends keyof HTMLBodyElementEventMap
> {
  eventName: K;
  useCapture?: boolean;
  callback(e: HTMLBodyElementEventMap[K]): void;
}

export class BodyEventHandler<
  K extends keyof HTMLBodyElementEventMap
> extends React.Component<IBodyEventHandlerProps<K>> {
  handler = (e: HTMLBodyElementEventMap[K]) => {
    this.props.callback(e);
  };

  componentDidMount() {
    const { eventName, useCapture } = this.props;
    document.body.addEventListener(eventName, this.handler, useCapture);
  }

  componentWillUnmount() {
    const { eventName, useCapture } = this.props;
    document.body.removeEventListener(eventName, this.handler, useCapture);
  }

  render() {
    return null;
  }
}
