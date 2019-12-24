import * as React from 'react';

import { IUploadItemProps, IUploadFileItem } from '../types';

export function useItemHandler<UPLOAD_ITEM extends IUploadFileItem>(
  props: IUploadItemProps<UPLOAD_ITEM>
) {
  const { item, onDelete, onRetry } = props;

  const deleteHandler = React.useCallback<React.MouseEventHandler>(
    e => {
      e.stopPropagation();
      onDelete(item);
    },
    [item, onDelete]
  );

  const retryHandler = React.useCallback<React.MouseEventHandler>(
    e => {
      e.stopPropagation();
      onRetry(item);
    },
    [item, onRetry]
  );

  return {
    deleteHandler,
    retryHandler,
  };
}
