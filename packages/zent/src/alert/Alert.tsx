import * as React from 'react';
import cx from 'classnames';
import { AlertTypes } from './types';
import noop from 'lodash-es/noop';
import Icon, { IconType } from '../icon';
import InlineLoading from '../loading/InlineLoading';

export interface IAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: AlertTypes;
  loading?: boolean;
  rounded?: boolean;
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
    children,
    closeContent,
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

  const containerCls = cx(`zent-alert`, className, {
    [`zent-${styleClassMap[type]}`]: styleClassMap[type],
    [`zent-alert-border-rounded`]: rounded,
  });

  const closeButton = React.useMemo(() => {
    const closeNode = closeContent ? (
      closeContent
    ) : (
      <Icon type="close" className="zent-alert-close-btn" />
    );

    return (
      closable && (
        <div className="zent-alert-close-wrapper" onClick={closeHandler}>
          {closeNode}
        </div>
      )
    );
  }, [closable]);

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

  return (
    <div className={containerCls} {...restDivAttrs}>
      {alertIcon}
      <div className={`zent-alert-content`}>{children}</div>
      <div className={`zent-alert-extra-content`}>{extraContent}</div>
      {closeButton}
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
