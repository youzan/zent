import { forwardRef, useMemo, useRef } from 'react';
import cx from 'classnames';
import { AlertTypes } from '../types';
import Icon, { IconType } from '../../icon';
import InlineLoading from '../../loading/InlineLoading';
import { IAlertProps } from '../Alert';

const iconTypeMap: {
  [key in Exclude<AlertTypes, 'hint'>]: IconType;
} = {
  info: 'info-circle',
  warning: 'warning',
  success: 'check-circle',
  error: 'error-circle',
};

type IAlertItemProps = Omit<IAlertProps, 'outline' | 'closed'> & {
  onAlertItemClose?: () => void;
  classItemName?: string;
};

export const AlertItem = forwardRef<HTMLDivElement, IAlertItemProps>(
  (props, ref) => {
    const {
      extraContent,
      classItemName,
      title,
      description,
      children,
      loading,
      type,
      closable,
      closeContent,
      onAlertItemClose,
    } = props;

    const propsRef = useRef<IAlertItemProps>(props);
    propsRef.current = props;

    const renderContent = useMemo(() => {
      return children ? (
        children
      ) : (
        <>
          {title && <h3 className="zent-alert-item-content__title">{title}</h3>}
          {description && (
            <p className="zent-alert-item-content__description">
              {description}
            </p>
          )}
        </>
      );
    }, [children, description, title]);

    const renderCloseNode = useMemo(() => {
      const { onClose } = propsRef.current;
      return closable ? (
        <div
          className="zent-alert-item-close-wrapper"
          onClick={e => {
            onClose?.();
            onAlertItemClose && onAlertItemClose();
            e.stopPropagation();
          }}
        >
          {closeContent ?? (
            <Icon type="close" className="zent-alert-item-close-btn" />
          )}
        </div>
      ) : null;
    }, [closable, closeContent, onAlertItemClose]);

    const renderIcon = useMemo(() => {
      if (loading) {
        return (
          <InlineLoading
            className="zent-alert-item-icon"
            loading
            icon="circle"
            iconSize={16}
          />
        );
      }

      if (type in iconTypeMap) {
        return (
          <Icon className="zent-alert-item-icon" type={iconTypeMap[type]} />
        );
      }

      return null;
    }, [loading, type]);

    return (
      <div className={cx('zent-alert-item', classItemName)} ref={ref}>
        {renderIcon}
        <div className="zent-alert-item-content">{renderContent}</div>
        {extraContent && (
          <div className="zent-alert-item-extra-content">{extraContent}</div>
        )}
        {renderCloseNode}
      </div>
    );
  }
);

AlertItem.displayName = 'AlertItem';

export default AlertItem;
