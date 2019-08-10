import * as React from 'react';
import cx from 'classnames';
import { AlertTypes } from './types';
import noop from 'lodash-es/noop';
import Icon, { IconType } from '../icon';
import InlineLoading from '../loading/InlineLoading';
import { Omit } from 'utility-types';

export interface IAlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  type?: AlertTypes;
  loading?: boolean;
  rounded?: boolean;
  outline?: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
  extraContent?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
  closeContent?: React.ReactNode;
}

const styleClassMap: {
  [key in AlertTypes]: string;
} = {
  info: 'alert-style-info',
  warning: 'alert-style-warning',
  success: 'alert-style-success',
  error: 'alert-style-error',
};

const iconTypeMap: {
  [key in AlertTypes]: IconType;
} = {
  info: 'info-circle',
  warning: 'warning',
  success: 'check-circle',
  error: 'error-circle',
};

export const Alert: React.FC<IAlertProps> = props => {
  const {
    onClose,
    type,
    loading,
    extraContent,
    rounded,
    className,
    closable,
    closeContent,
    title,
    description,
    children,
    ...restDivAttrs
  } = props;
  const [closed, setClosed] = React.useState(false);

  const mounted = React.useRef(false);

  const closeHandler = React.useCallback(() => {
    setClosed(true);
  }, [setClosed]);

  React.useEffect(() => {
    if (mounted.current && closed) {
      onClose();
    } else {
      mounted.current = true;
    }
  }, [closed]);

  // 显示内容
  const content = React.useMemo(() => {
    return children ? (
      children
    ) : (
      <>
        {title && <h3 className="zent-alert-content__title">{title}</h3>}
        {description && (
          <p className="zent-alert-content__description">{description}</p>
        )}
      </>
    );
  }, [title, description, children]);

  // 关闭按钮内容
  const closeNode = React.useMemo(() => {
    const closeButton = closeContent ? (
      closeContent
    ) : (
      <Icon type="close" className="zent-alert-close-btn" />
    );

    return (
      closable && (
        <div className="zent-alert-close-wrapper" onClick={closeHandler}>
          {closeButton}
        </div>
      )
    );
  }, [closable, closeContent]);

  // 左侧图标
  const alertIcon = React.useMemo(() => {
    return loading ? (
      <InlineLoading
        className="zent-alert-icon"
        loading
        icon="circle"
        iconSize={16}
      />
    ) : (
      <Icon className="zent-alert-icon" type={iconTypeMap[type]} />
    );
  }, [type, loading]);

  if (closed) {
    return null;
  }

  const containerCls = cx('zent-alert', className, {
    [`zent-${styleClassMap[type]}`]: styleClassMap[type],
    ['zent-alert-border-rounded']: rounded,
  });

  return (
    <div className={containerCls} {...restDivAttrs}>
      {alertIcon}
      <div className="zent-alert-content">{content}</div>
      <div className="zent-alert-extra-content">{extraContent}</div>
      {closeNode}
    </div>
  );
};

Alert.defaultProps = {
  type: 'info',
  closable: false,
  rounded: true,
  className: '',
  onClose: noop,
};

export default Alert;
