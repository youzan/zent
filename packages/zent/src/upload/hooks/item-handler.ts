import { useCallback } from 'react';

import { IUploadItemProps, IUploadFileItem } from '../types';
import { useEventCallbackRef } from '../../utils/hooks/useEventCallbackRef';

export function useItemHandler<UPLOAD_ITEM extends IUploadFileItem>(
  props: IUploadItemProps<UPLOAD_ITEM>
) {
  const { item, onDelete, onRetry } = props;
  const onDeleteRef = useEventCallbackRef(onDelete);
  const onRetryRef = useEventCallbackRef(onRetry);

  const deleteHandler = useCallback<React.MouseEventHandler>(
    e => {
      e.stopPropagation();
      onDeleteRef.current?.(item);
    },
    [item, onDeleteRef]
  );

  const retryHandler = useCallback<React.MouseEventHandler>(
    e => {
      e.stopPropagation();
      onRetryRef.current?.(item);
    },
    [item, onRetryRef]
  );

  return {
    deleteHandler,
    retryHandler,
  };
}
