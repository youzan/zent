import * as React from 'react';
import AbstractUpload from './components/AbstractUpload';

export class Upload extends AbstractUpload {
  protected renderTrigger(): React.ReactNode {
    return null;
  }
}

export default Upload;
