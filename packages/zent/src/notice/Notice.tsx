import * as React from 'react';
import { ReactNode, CSSProperties } from 'react';
import { IconType } from '../icon';
import { NoticePositions, getContainer, remove } from './Container';

export interface INoticeProps {
  title: string;
  className?: string;
  style?: CSSProperties;
  icon?: IconType;
  closable?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseTimeout?: number;
  children?: ReactNode;
  position?: NoticePositions;
}

export function Notice({ children }: INoticeProps) {
  return <div className="zent-notice">{children}</div>;
}

Notice.push = function push(
  node: ReactNode,
  position: NoticePositions = 'right-top'
) {
  const container = getContainer(position);
  return container.append(node);
};

Notice.close = remove;

export default Notice;
