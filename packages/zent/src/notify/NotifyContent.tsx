import * as React from 'react';
import { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import Portal from '../portal';

const NotifyTransition = ({ children, ...props }) => (
  <CSSTransition {...props} timeout={800} classNames="notify">
    {children}
  </CSSTransition>
);

export interface INotifyContentProps {
  text?: React.ReactNode;
  close(): void;
  selector: string | HTMLElement;
  status: string;
  isIn?: boolean;
}

export default class NotifyContent extends Component<INotifyContentProps> {
  static defaultProps = {
    text: '',
    status: '',
    className: '',
  };

  onExited = () => {
    this.props.close();
  };

  render() {
    const { text, status, selector, isIn } = this.props;
    return (
      <Portal selector={selector}>
        <NotifyTransition
          appear
          unmountOnExit
          in={isIn}
          onExited={this.onExited}
        >
          <div className="zent-notify">
            <div
              className={`zent-notify-content zent-notify-content-${status}`}
            >
              {text}
            </div>
          </div>
        </NotifyTransition>
      </Portal>
    );
  }
}
