import * as React from 'react';
import cx from 'classnames';
import { IAlertProps } from './types';
import AlertItem from './AlertItem';

interface IAlertState {
  closed: boolean;
}

export class Alert extends React.PureComponent<IAlertProps, IAlertState> {
  static highlightClassName = 'zent-alert-content__highlight';

  static defaultProps = {
    type: 'info',
    loading: false,
    outline: false,
    closable: false,
  };

  state: IAlertState = {
    closed: false,
  };

  /**
   * 判断组件是否受控
   */
  private get isControlled() {
    const { closed } = this.props;
    const hasClosed = closed !== undefined;
    return hasClosed;
  }

  /**
   * 关闭状态
   */
  private get closed() {
    return this.isControlled ? this.props.closed : this.state.closed;
  }

  /**
   * 关闭回调函数
   */
  private onCloseHandler = () => {
    this.setState({
      closed: true,
    });
    this.props.onClose && this.props.onClose();
  };

  render() {
    if (this.closed) {
      return null;
    }

    const { className, outline, ...restDivAttrs } = this.props;
    const { type } = restDivAttrs;
    const containerCls = cx(
      'zent-alert',
      `zent-alert-style-${type}`,
      className,
      {
        ['zent-alert-outline']: outline,
      }
    );

    return (
      <div className={containerCls}>
        <AlertItem {...restDivAttrs} onClose={this.onCloseHandler}>
          {this.props.children}
        </AlertItem>
      </div>
    );
  }
}

export default Alert;
