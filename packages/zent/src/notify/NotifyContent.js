import React, { PureComponent } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import Portal from 'portal';

const NotifyTransition = ({ children, ...props }) => (
  <CSSTransition {...props} timeout={800} classNames="notify">
    {children}
  </CSSTransition>
);
export default class NotifyContent extends PureComponent {
  static propTypes = {
    text: PropTypes.any,
    status: PropTypes.string,
  };

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
          <div className={`zent-notify`}>
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
