import * as React from 'react';
import { ReactNode, CSSProperties } from 'react';
import cx from 'classnames';
import { Icon } from '../icon';
import { NoticePositions, getContainer, remove } from './Container';
import { NoticeContext } from './Wrap';
import { isElement } from 'react-is';

export interface INoticeProps {
  title: string;
  className?: string;
  style?: CSSProperties;
  type?: 'info' | 'success' | 'warning' | 'error';
  closable?: boolean;
  onClose?: () => void;
  autoClose?: boolean;
  timeout?: number;
  children?: ReactNode;
  position?: NoticePositions;
}

function renderIcon(
  type: 'info' | 'success' | 'warning' | 'error' | undefined
) {
  switch (type) {
    case 'info':
      return (
        <Icon
          className="zent-notice-icon zent-notice-icon-info"
          type="info-circle"
        />
      );
    case 'success':
      return (
        <Icon
          className="zent-notice-icon zent-notice-icon-success"
          type="check-circle"
        />
      );
    case 'warning':
      return (
        <Icon
          className="zent-notice-icon zent-notice-icon-warning"
          type="warning"
        />
      );
    case 'error':
      return (
        <Icon
          className="zent-notice-icon zent-notice-icon-error"
          type="error-circle"
        />
      );
    default:
      return null;
  }
}

export function Notice({
  children,
  title,
  type,
  closable = true,
  onClose,
  className,
  style,
}: INoticeProps) {
  const ctx = React.useContext(NoticeContext);
  const onCloseClick = React.useCallback(() => {
    ctx && ctx.onClose();
    onClose && onClose();
  }, [ctx, onClose]);
  return (
    <div
      className={cx(
        'zent-notice',
        { 'zent-notice-with-icon': !!type },
        className
      )}
      style={style}
    >
      {renderIcon(type)}
      <div className="zent-notice-title">{title}</div>
      {closable ? (
        <Icon
          type="close"
          className="zent-notice-close"
          onClick={onCloseClick}
        />
      ) : null}
      <div className="zent-notice-content">{children}</div>
    </div>
  );
}

Notice.push = function push(node: ReactNode) {
  let position: NoticePositions = 'right-top';
  if (isElement(node) && node.props) {
    position = node.props.position || position;
  }
  const container = getContainer(position);
  return container.push(node);
};

Notice.close = remove;

export default Notice;
