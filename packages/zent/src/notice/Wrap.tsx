import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import { isElement } from 'react-is';
import nextFrame from '../utils/nextFrame';
import { instanceMap } from './Container';

export interface INoticeWrapProps {
  id: number;
  onExited(id: number): void;
}

export interface INoticeWrapState {
  entered: boolean;
  show: boolean;
}

export interface INoticeContext {
  onClose(): void;
}

export const NoticeContext = React.createContext<INoticeContext | null>(null);

NoticeContext.displayName = 'ZentNoticeContext';

const classNames: CSSTransition.CSSTransitionClassNames = {
  appear: 'zent-notice-animation-enter',
  appearActive: 'zent-notice-animation-enter-active',
  appearDone: 'zent-notice-animation-enter-done',
  enter: 'zent-notice-animation-enter',
  enterActive: 'zent-notice-animation-enter-active',
  enterDone: 'zent-notice-animation-enter-done',
  exit: 'zent-notice-animation-exit',
  exitActive: 'zent-notice-animation-exit-active',
  exitDone: 'zent-notice-animation-exit-done',
};

export default class NoticeWrap extends React.Component<
  INoticeWrapProps,
  INoticeWrapState
> {
  private elementRef = React.createRef<HTMLDivElement>();

  state: INoticeWrapState = {
    entered: false,
    show: false,
  };

  private timer = 0;
  private ctx: INoticeContext = {
    onClose: () => {
      this.leave();
    },
  };

  private onEntered = () => {
    this.setState({
      entered: true,
    });
  };

  private onExited = () => {
    const el = this.elementRef.current!;
    el.style.height = `${el.clientHeight}px`;
    nextFrame(() => (el.style.height = '0'));
    setTimeout(() => {
      const { onExited, id } = this.props;
      onExited(id);
    }, 200);
  };

  leave() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.setState({
      show: false,
    });
  }

  componentDidMount() {
    this.setState({
      show: true,
    });
    const { children } = this.props;
    if (isElement(children) && children.props) {
      const {
        autoClose = true,
        closable = true,
        timeout = 4500,
      } = children.props;
      if (closable && autoClose) {
        this.timer = setTimeout(() => this.leave(), timeout) as any;
      }
    }
  }

  componentWillUnmount() {
    const { id } = this.props;
    instanceMap.delete(id);
  }

  render() {
    const { children } = this.props;
    const { entered, show } = this.state;
    return (
      <NoticeContext.Provider value={this.ctx}>
        <CSSTransition
          in={show}
          timeout={entered ? 160 : 100}
          onEntered={this.onEntered}
          onExited={this.onExited}
          classNames={classNames}
        >
          <div ref={this.elementRef} className="zent-notice-animation">
            {children}
          </div>
        </CSSTransition>
      </NoticeContext.Provider>
    );
  }
}
