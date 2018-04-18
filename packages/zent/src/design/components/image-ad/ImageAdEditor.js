import React from 'react';
import Radio from 'radio';
import Icon from 'icon';
import { Droppable } from 'react-beautiful-dnd';
import createObjectURL from 'utils/createObjectURL';
import findIndex from 'lodash/findIndex';
import isEmpty from 'lodash/isEmpty';

import { DesignEditor, ControlGroup } from '../../editor/DesignEditor';
import {
  IMAGE_SIZE,
  IMAGE_AD_LIMIT,
  IMAGE_AD_ENTRY_UUID_KEY,
  IMAGE_AD_DND_TYPE,
} from './constants';
import { ImageEntry, createEmptyImageEntry } from './ImageEntry';

const RadioGroup = Radio.Group;

export default class ImageAdEditor extends DesignEditor {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      localImage: '',
    };
  }

  render() {
    const { prefix, showError, validation, value } = this.props;
    const { localImage } = this.state;
    const imageErrors = validation.images;
    const allowAddImage = this.isAddImageEntryAllowed();

    return (
      <div className={`${prefix}-design-component-image-ad-editor`}>
        <ControlGroup
          label="显示大小:"
          showError={showError || this.getMetaProperty('size', 'touched')}
          error={validation.size}
        >
          <RadioGroup value={value.size} onChange={this.onInputChange}>
            <Radio name="size" value={IMAGE_SIZE.LARGE}>
              大图
            </Radio>
            <Radio name="size" value={IMAGE_SIZE.SMALL}>
              小图
            </Radio>
          </RadioGroup>
        </ControlGroup>
        <Droppable
          droppableId={`${prefix}-design-component-image-ad-editor__entry-list`}
          type={IMAGE_AD_DND_TYPE}
          direction="vertical"
        >
          {(provided, snapshot) => {
            return (
              <ul
                ref={provided.innerRef}
                className={`${prefix}-design-component-image-ad-editor__entry-list`}
              >
                {value.images.map(img => {
                  const imageId = img[IMAGE_AD_ENTRY_UUID_KEY];

                  return (
                    <li
                      key={imageId}
                      className={`${prefix}-design-component-image-ad-editor__entry`}
                    >
                      <ImageEntry
                        prefix={prefix}
                        imageId={imageId}
                        imageUrl={img.imageUrl}
                        linkTitle={img.linkTitle}
                        linkUrl={img.linkUrl}
                        onChange={this.onImageEntryChange(imageId)}
                        error={
                          showError && imageErrors ? imageErrors[imageId] : ''
                        }
                      />
                      {!snapshot.isDraggingOver && (
                        <Icon
                          type="close-circle"
                          className={`${prefix}-design-component-image-ad-editor__entry-close-btn`}
                          onClick={this.removeImageEntry(imageId)}
                        />
                      )}
                      {!snapshot.isDraggingOver &&
                        allowAddImage && (
                          <Icon
                            type="plus"
                            className={`${prefix}-design-component-image-ad-editor__entry-prepend-btn`}
                            onClick={this.prependImageEntry(imageId)}
                          />
                        )}
                      {!snapshot.isDraggingOver &&
                        allowAddImage && (
                          <Icon
                            type="plus"
                            className={`${prefix}-design-component-image-ad-editor__entry-append-btn`}
                            onClick={this.appendImageEntry(imageId)}
                          />
                        )}
                    </li>
                  );
                })}
                {provided.placeholder}
              </ul>
            );
          }}
        </Droppable>
        {allowAddImage && (
          <a
            className={`${prefix}-design-component-image-ad-editor__add-entry-btn`}
          >
            <b>+</b>添加一个广告
            <input
              type="file"
              accept="image/gif, image/jpeg, image/png"
              title=""
              value={localImage}
              onChange={this.onAddImageEntry}
            />
          </a>
        )}
        <div className={`${prefix}-design-component-image-ad-editor__hint`}>
          最多添加 {IMAGE_AD_LIMIT} 个广告，拖动选中的图片广告可对其排序
        </div>
      </div>
    );
  }

  onAddImageEntry = evt => {
    const {
      target: { files },
    } = evt;
    const imageUrl = createObjectURL(files[0]);
    const { value, onChange } = this.props;

    onChange({
      images: value.images.concat(createEmptyImageEntry({ imageUrl })),
    });
  };

  removeImageEntry = id => () => {
    const {
      value: { images },
      onChange,
    } = this.props;

    onChange({
      images: images.filter(img => img[IMAGE_AD_ENTRY_UUID_KEY] !== id),
    });
  };

  prependImageEntry = id => () => {
    const {
      value: { images },
      onChange,
    } = this.props;
    const index = findIndex(images, img => img[IMAGE_AD_ENTRY_UUID_KEY] === id);
    if (index !== -1) {
      const newImages = images.slice();
      newImages.splice(index, 0, createEmptyImageEntry());

      onChange({
        images: newImages,
      });
    }
  };

  appendImageEntry = id => () => {
    const {
      value: { images },
      onChange,
    } = this.props;
    const index = findIndex(images, img => img[IMAGE_AD_ENTRY_UUID_KEY] === id);
    if (index !== -1) {
      const newImages = images.slice();
      newImages.splice(index + 1, 0, createEmptyImageEntry());

      onChange({
        images: newImages,
      });
    }
  };

  onImageEntryChange = id => delta => {
    const {
      value: { images },
      onChange,
    } = this.props;
    onChange({
      images: images.map(img => {
        if (img[IMAGE_AD_ENTRY_UUID_KEY] !== id) {
          return img;
        }

        return {
          ...img,
          ...delta,
        };
      }),
    });
  };

  isAddImageEntryAllowed() {
    const {
      value: { images },
    } = this.props;

    return images.length < IMAGE_AD_LIMIT;
  }

  shouldHandleDragEnd(type) {
    return type === IMAGE_AD_DND_TYPE;
  }

  onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside
    if (!destination) {
      return;
    }

    const { value, onChange } = this.props;
    const newValue = {
      ...value,
      images: this.reorder(value.images, source.index, destination.index),
    };

    onChange(newValue);
  }

  static designType = 'image-ad';
  static designDescription = (
    <span>
      图片<br />广告
    </span>
  );

  static getInitialValue() {
    return {
      size: IMAGE_SIZE.SMALL,
      images: [],
    };
  }

  static validate(value) {
    return new Promise(resolve => {
      const errors = {};

      errors.images = value.images.reduce((imageErrors, img) => {
        if (!img.imageUrl) {
          imageErrors[img[IMAGE_AD_ENTRY_UUID_KEY]] = '请选择广告图片';
        }
        return imageErrors;
      }, {});

      // 如果没有错误就删除这个 key
      if (isEmpty(errors.images)) {
        delete errors.images;
      }

      resolve(errors);
    });
  }
}
