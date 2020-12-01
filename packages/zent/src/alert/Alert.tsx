import cx from 'classnames';
import { PureComponent } from 'react';

import { AlertTypes } from './types';
import AlertItem from './components/AlertItem';
import { PartialRequired } from '../utils/types';
import omit from '../utils/omit';

interface IAlertRenderProps {
  type?: AlertTypes;
  loading?: boolean;
  outline?: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
  extraContent?: React.ReactNode;
  closable?: boolean;
  closed?: boolean;
  onClose?: () => void;
  closeContent?: React.ReactNode;
}

export interface IAlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    IAlertRenderProps {}

interface IAlertState {
  closed: boolean;
}

type IAlertRequiredProps = PartialRequired<
  IAlertProps,
  'type' | 'loading' | 'outline' | 'closable'
>;
type IAlertRenderRequiredProps = PartialRequired<
  IAlertRenderProps,
  'outline' | 'closed' | 'onClose'
>;
const OmitChildProp = ['outline', 'closed', 'onClose'] as const;
const OmitDivAttr = [
  'title',
  'description',
  'loading',
  'closable',
  'closed',
  'onClose',
  'closeContent',
  'extraContent',
] as const;

export class Alert extends PureComponent<IAlertProps, IAlertState> {
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
    return 'closed' in this.props;
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
    if (!this.isControlled) {
      this.setState({
        closed: true,
      });
    }
    this.props.onClose && this.props.onClose();
  };

  render() {
    if (this.closed) {
      return null;
    }

    const { className, type, outline, ...restDivAttrs } = omit(
      this.props as IAlertRequiredProps,
      OmitDivAttr
    );
    const restProps = omit(
      this.props as IAlertRenderRequiredProps,
      OmitChildProp
    );

    const containerCls = cx(
      'zent-alert',
      `zent-alert-style-${type}`,
      className,
      {
        ['zent-alert-outline']: outline,
      }
    );

    return (
      <div className={containerCls} {...restDivAttrs}>
        <AlertItem {...restProps} onAlertItemClose={this.onCloseHandler}>
          {this.props.children}
        </AlertItem>
      </div>
    );
  }
}

export default Alert;
