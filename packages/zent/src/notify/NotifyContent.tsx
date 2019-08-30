import * as React from 'react';
import { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import Portal from '../portal';
import Icon from '../icon';

const NotifyTransition = ({ children, ...props }) => (
  <CSSTransition {...props} timeout={800} classNames="notify">
    {children}
  </CSSTransition>
);

const ICON_TYPE = {
  success: 'check-circle',
  warn: 'warning',
  error: 'close-circle',
};

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
              <Icon
                className="zent-notify-content-icon"
                type={ICON_TYPE[status]}
              />
              <div>{text}</div>
            </div>
          </div>
        </NotifyTransition>
      </Portal>
    );
  }
}
