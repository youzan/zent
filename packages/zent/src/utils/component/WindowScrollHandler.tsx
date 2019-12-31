import * as React from 'react';
import { WindowEventHandler } from './WindowEventHandler';
import { runOnceInNextFrame } from '../nextFrame';

const OPTIONS = {
  passive: true,
};

export interface IWindowScrollHandler {
  onScroll: (event: UIEvent) => void;
  options?: AddEventListenerOptions;
}

export class WindowScrollHandler extends React.Component<IWindowScrollHandler> {
  onScroll = runOnceInNextFrame((evt: UIEvent) => {
    this.props.onScroll(evt);
  });

  componentWillUnmount() {
    this.onScroll.cancel();
  }

  render() {
    return (
      <WindowEventHandler
        eventName="scroll"
        listener={this.onScroll}
        options={{ ...OPTIONS, ...this.props.options }}
      />
    );
  }
}
