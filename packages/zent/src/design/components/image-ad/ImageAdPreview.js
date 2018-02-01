import React, { Component } from 'react';
import cx from 'classnames';
import isEmpty from 'lodash/isEmpty';

import { IMAGE_SIZE, IMAGE_AD_ENTRY_UUID_KEY } from './constants';

export default class ImageAdPreview extends Component {
  render() {
    const { value, prefix } = this.props;
    const { size, images } = value;

    if (isEmpty(images)) {
      return (
        <div
          className={cx(
            `${prefix}-design-component-image-ad-preview`,
            `${prefix}-design-component-image-ad-preview--no-data`
          )}
        >
          点击编辑图片广告
        </div>
      );
    }

    return (
      <div
        className={cx(`${prefix}-design-component-image-ad-preview`, {
          [`${prefix}-design-component-image-ad-preview--large`]:
            size === IMAGE_SIZE.LARGE,
          [`${prefix}-design-component-image-ad-preview--small`]:
            size === IMAGE_SIZE.SMALL,
        })}
      >
        {images.map(img => {
          const id = img[IMAGE_AD_ENTRY_UUID_KEY];
          // eslint-disable-next-line
          const url = img.linkUrl || 'javascript:void(0);';
          const title = img.linkTitle;

          return (
            <a
              key={id}
              className={`${prefix}-design-component-image-ad-preview__image`}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className={`${prefix}-design-component-image-ad-preview__image-img`}
              >
                <img src={img.imageUrl} alt={title} />
                {title && (
                  <div
                    className={`${prefix}-design-component-image-ad-preview__image-title`}
                  >
                    {title}
                  </div>
                )}
              </div>
            </a>
          );
        })}
      </div>
    );
  }
}
