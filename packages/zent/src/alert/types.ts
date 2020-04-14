export interface IAlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
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

export type AlertTypes = 'info' | 'success' | 'warning' | 'error';
