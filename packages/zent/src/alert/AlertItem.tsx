import { Component } from 'react';

export interface IAlertItemProps {
  closable?: boolean;
  closeContent?: React.ReactNode;
  extraContent?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  onClose?: () => void;
}

export class AlertItem extends Component<IAlertItemProps> {
  render() {
    return null;
  }
}

export default AlertItem;
