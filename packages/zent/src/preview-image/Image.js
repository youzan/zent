import React, { Component } from 'react';
import Portal from 'portal';
import Icon from 'icon';
import cx from 'classnames';
import PropTypes from 'prop-types';

import { I18nReceiver as Receiver } from 'i18n';
import { PreviewImage as I18nDefault } from 'i18n/default';

// 有关闭按钮的时候同时具有ESC关闭的行为
const { withNonScrollable, withESCToClose } = Portal;
const ImagePortalESCToClose = withESCToClose(withNonScrollable(Portal));

export default class Image extends Component {
  state = {
    imageIndex: this.props.index || 0,
    imageStyle: {},
    rotateIndex: 0,
    scaleTag: 0,
  };

  static propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    showRotateBtn: PropTypes.bool,
    images: PropTypes.array,
    index: PropTypes.number,
  };

  static defaultProps = {
    className: '',
    prefix: 'zent',
    showRotateBtn: true,
    images: [],
    index: 0,
  };

  static contextTypes = {
    zentI18n: PropTypes.object,
  };

  onMaskClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  onClose = () => {
    this.props.onClose();
  };

  // 旋转
  handleRotate = () => {
    let rotateIndex = this.state.rotateIndex;
    let deg = 90 + rotateIndex * 90;

    console.log(rotateIndex);
    console.log(deg);

    rotateIndex++;

    this.setState({
      imageStyle: {
        transform: `rotate(${deg}deg)`,
        transitionDuration: '0.5s',
      },
      rotateIndex,
      scaleTag: 0,
    });
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
      scaleTag: 0,
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
      scaleTag: 0,
    });
  };

  // 放大缩小
  handleScale = () => {
    const { rotateIndex, scaleTag } = this.state;
    let deg = rotateIndex * 90;
    const transformStyle =
      scaleTag === 0
        ? `rotate(${deg}deg) scale(1.2)`
        : `rotate(${deg}deg) scale(1)`;

    this.setState({
      imageStyle: {
        transform: transformStyle,
        transitionDuration: '0.5s',
      },
      scaleTag: (scaleTag + 1) % 2,
    });
  };

  render() {
    const { images, prefix, showRotateBtn, className } = this.props;
    const { scaleTag, imageIndex, imageStyle } = this.state;
    const imageClassName = cx(`${prefix}-show-image`, {
      'image-is-zooming': scaleTag === 1,
    });

    return (
      <ImagePortalESCToClose
        visible
        onClose={this.onClose}
        className={cx(`${prefix}-image-p-anchor`, className)}
      >
        <div className={`${prefix}-image-p-backdrop`}>
          <div className={`${prefix}-image-p-wrap`} onClick={this.onMaskClick}>
            <div className={`${prefix}-image-p-close`} onClick={this.onClose}>
              <Icon type="close" />
            </div>
            <Receiver defaultI18n={I18nDefault} componentName="PreviewImage">
              {i18n => (
                <div className={`${prefix}-image-p-body`}>
                  {images.map((image, index) => {
                    if (index === imageIndex) {
                      return (
                        <img
                          className={imageClassName}
                          onClick={this.handleScale}
                          style={imageStyle}
                          src={image}
                          key={index}
                          alt={i18n.alt}
                        />
                      );
                    }
                    return null;
                  })}
                </div>
              )}
            </Receiver>
            <Receiver defaultI18n={I18nDefault} componentName="PreviewImage">
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
                      <span className={rotateCxs} onClick={this.handleRotate}>
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
      </ImagePortalESCToClose>
    );
  }
}
