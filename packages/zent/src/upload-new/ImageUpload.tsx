import * as React from 'react';
import AbstractUpload from './components/AbstractUpload';

export class ImageUpload extends AbstractUpload {
  protected renderTrigger(): React.ReactNode {
    return null;
  }

  render() {
    return this.renderTrigger();
  }
}

export default ImageUpload;
