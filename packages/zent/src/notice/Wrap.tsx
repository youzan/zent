import * as React from 'react';
import { CSSTransition, Transition } from 'react-transition-group';

export interface INoticeWrapProps {
  id: number;
  onExited(id: number): void;
}

export interface INoticeWrapState {
  entered: boolean;
  show: boolean;
}

const EXIT_COLLAPSE: React.CSSProperties = {
  height: 0,
  transition: 'height .1s ease',
};

export default class NoticeWrap extends React.Component<
  INoticeWrapProps,
  INoticeWrapState
> {
  state: INoticeWrapState = {
    entered: false,
    show: true,
  };

  private onEntered = () => {
    this.setState({
      entered: true,
    });
  };

  private onExited = () => {
    const { onExited, id } = this.props;
    onExited(id);
  };

  leave() {
    this.setState({
      show: false,
    });
  }

  render() {
    const { children, id, onExited, ...props } = this.props;
    const { entered, show } = this.state;
    return (
      <Transition {...props} timeout={100}>
        {state => (
          <CSSTransition
            in={show}
            timeout={entered ? 160 : 100}
            onEntered={this.onEntered}
            onExited={this.onExited}
          >
            <div
              style={
                state === 'exiting' || state === 'exited'
                  ? EXIT_COLLAPSE
                  : undefined
              }
            >
              {children}
            </div>
          </CSSTransition>
        )}
      </Transition>
    );
  }
}
