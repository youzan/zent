import * as React from 'react';
import { Component } from 'react';
import cx from 'classnames';
import debounce from 'lodash-es/debounce';

import { I18nReceiver as Receiver } from '../i18n';
import Portal from '../portal';
import Icon from '../icon';

export interface IPreviewImageProps {
  className: string;
  prefix: string;
  showRotateBtn: boolean;
  images: any[];
  index: number;
  onClose(): void;
  scaleRatio: number;
}

export default class Image extends Component<IPreviewImageProps, any> {
  state = {
    imageIndex: this.props.index || 0,
    imageStyle: {},
    rotateIndex: 0,
    scaleTag: false,
  };

  static defaultProps = {
    className: '',
    prefix: 'zent',
    showRotateBtn: true,
    images: [],
    index: 0,
    scaleRatio: 1.5,
  };

  onMaskClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  onClose = () => {
    this.props.onClose();
  };

  // 上一张
  handlePreviousAction = () => {
    const imagesNum = this.props.images.length;
    let imageIndex = this.state.imageIndex;
    imageIndex = (imageIndex - 1 + imagesNum) % imagesNum;
    this.setState({
      imageIndex,
      imageStyle: {
        transform: 'rotate(0deg)',
      },
      rotateIndex: 0,
      scaleTag: false,
    });
  };

  // 下一张
  handleNextAction = () => {
    const imagesNum = this.props.images.length;
    let imageIndex = this.state.imageIndex;
    imageIndex = (imageIndex + 1) % imagesNum;
    this.setState({
      imageIndex,
      imageStyle: {
        transform: 'rotate(0deg)',
      },
      rotateIndex: 0,
      scaleTag: false,
    });
  };

  // 旋转
  handleRotate = () => {
    const { scaleTag } = this.state;
    const { scaleRatio } = this.props;

    if (scaleRatio < 1) {
      throw new Error(
        `Invalid prop \`scaleRatio\` in previewImage, it should be greater than 1.`
      );
    }

    let rotateIndex = this.state.rotateIndex;
    const deg = 90 + rotateIndex * 90;
    rotateIndex++;

    // 旋转时，缩放样式带上
    const transformStyle = scaleTag
      ? `rotate(${deg}deg) scale(${scaleRatio})`
      : `rotate(${deg}deg) scale(1)`;

    this.setState({
      imageStyle: {
        transform: transformStyle,
        transitionDuration: '0.5s',
      },
      rotateIndex,
    });
  };

  // 缩放
  handleScale = () => {
    const { rotateIndex, scaleTag } = this.state;
    const { scaleRatio } = this.props;

    if (scaleRatio < 1) {
      throw new Error(
        `Invalid prop \`scaleRatio\` in previewImage, it should be greater than 1.`
      );
    }

    const deg = rotateIndex * 90;

    // 缩放时，旋转样式带上
    const transformStyle = scaleTag
      ? `rotate(${deg}deg) scale(1)`
      : `rotate(${deg}deg) scale(${scaleRatio})`;

    this.setState({
      imageStyle: {
        transform: transformStyle,
        transitionDuration: '0.5s',
      },
      scaleTag: !scaleTag,
    });
  };

  render() {
    const { images, prefix, showRotateBtn, className } = this.props;
    const { scaleTag, imageIndex, imageStyle } = this.state;
    const imageClassName = cx(`${prefix}-show-image`, {
      'image-is-zooming': scaleTag,
    });

    return (
      <Portal
        visible
        onClose={this.onClose}
        className={cx(`${prefix}-image-p-anchor`, className)}
        closeOnESC
        blockPageScroll
      >
        <div className={`${prefix}-image-p-backdrop`}>
          <div className={`${prefix}-image-p-wrap`}>
            <div className={`${prefix}-image-p-close`} onClick={this.onClose}>
              <Icon type="close" />
            </div>
            <Receiver componentName="PreviewImage">
              {i18n => (
                <div
                  className={`${prefix}-image-p-body`}
                  onClick={this.onMaskClick}
                >
                  {images.map((image, index) => {
                    if (index === imageIndex) {
                      return (
                        <img
                          className={imageClassName}
                          onClick={this.handleScale}
                          style={imageStyle}
                          src={image}
                          key={index}
                          alt={(i18n.alt as unknown) as string}
                        />
                      );
                    }
                    return null;
                  })}
                </div>
              )}
            </Receiver>
            <Receiver componentName="PreviewImage">
              {i18n => {
                const needPager = images.length > 1;
                const footerCxs = cx(`${prefix}-image-p-footer`, {
                  'show-rotate-btn': showRotateBtn,
                  'image-p-footer-paging': needPager,
                });
                const rotateCxs = cx(`${prefix}-image-p-action`, {
                  'rotate-action': !needPager,
                });
                return (
                  <div className={footerCxs}>
                    {needPager && (
                      <span
                        className={`${prefix}-image-p-action`}
                        onClick={this.handlePreviousAction}
                      >
                        {i18n.prev}
                      </span>
                    )}
                    {showRotateBtn && (
                      <span
                        className={rotateCxs}
                        onClick={debounce(this.handleRotate, 200)}
                      >
                        {i18n.rotate}
                      </span>
                    )}
                    {needPager && (
                      <span
                        className={`${prefix}-image-p-action`}
                        onClick={this.handleNextAction}
                      >
                        {i18n.next}
                      </span>
                    )}
                  </div>
                );
              }}
            </Receiver>
          </div>
        </div>
      </Portal>
    );
  }
}
