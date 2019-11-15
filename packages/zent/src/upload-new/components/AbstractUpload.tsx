import * as React from 'react';
import { IUploadErrorMessageConfigMap, IUploadProps } from '../types';

abstract class AbstractUpload extends React.PureComponent<IUploadProps> {
  protected abstract renderTrigger(): React.ReactNode;

  notifyErrorMessage<Key extends keyof IUploadErrorMessageConfigMap>(
    configName: Key,
    data: IUploadErrorMessageConfigMap[Key]
  ) {}

  render() {
    return null;
  }
}

export default AbstractUpload;
