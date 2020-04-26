import * as React from 'react';

export interface IAlertItemProps {
  closable?: boolean;
  closeContent?: React.ReactNode;
  extraContent?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  onClose?: () => void;
}
export const AlertItem: React.FunctionComponent<IAlertItemProps> = () => {
  return null;
};

export default AlertItem;
