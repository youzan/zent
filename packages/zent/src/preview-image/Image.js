import React, { Component } from 'react';
import Portal from 'portal';
import Icon from 'icon';
import cx from 'classnames';
import PropTypes from 'prop-types';

// 有关闭按钮的时候同时具有ESC关闭的行为
const { withNonScrollable, withESCToClose } = Portal;
const ImagePortal = withNonScrollable(Portal);
const ImagePortalESCToClose = withESCToClose(ImagePortal);

export default class Image extends Component {
  state = {
    imageIndex: this.props.index || 0,
    imageStyle: {},
    rotateIndex: 0
  };

  static propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    showRotateBtn: PropTypes.bool,
    images: PropTypes.array,
    index: PropTypes.number
  };

  static defaultProps = {
    className: '',
    prefix: 'zent',
    showRotateBtn: true,
    images: [],
    index: 0
  };

  onMaskClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  onClose = () => {
    this.props.onClose();
  };

  handleRotate = () => {
    let rotateIndex = this.state.rotateIndex;
    let deg = 90 + rotateIndex * 90;
    rotateIndex++;
    this.setState({
      imageStyle: {
        transform: `rotate(${deg}deg)`,
        transitionDuration: '0.5s'
      },
      rotateIndex
    });
  };

  handlePreviousAction = () => {
    const imagesNum = this.props.images.length;
    let imageIndex = this.state.imageIndex;
    imageIndex = (imageIndex - 1 + imagesNum) % imagesNum;
    this.setState({
      imageIndex,
      imageStyle: {
        transform: 'rotate(0deg)'
      },
      rotateIndex: 0
    });
  };

  handleNextAction = () => {
    const imagesNum = this.props.images.length;
    let imageIndex = this.state.imageIndex;
    imageIndex = (imageIndex + 1) % imagesNum;
    this.setState({
      imageIndex,
      imageStyle: {
        transform: 'rotate(0deg)'
      },
      rotateIndex: 0
    });
  };

  render() {
    const { images, prefix, showRotateBtn, className } = this.props;

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
            <div className={`${prefix}-image-p-body`}>
              {images.map((image, index) => {
                if (index === this.state.imageIndex) {
                  return (
                    <img
                      className={`${prefix}-show-image`}
                      style={this.state.imageStyle}
                      src={image}
                      key={index}
                      alt="图片下载失败"
                    />
                  );
                }
                return null;
              })}
            </div>
            {images.length > 1
              ? <div
                  className={`${prefix}-image-p-footer image-p-footer-paging ${showRotateBtn
                    ? 'show-rotate-btn'
                    : ''}`}
                >
                  <span
                    className={`${prefix}-image-p-action`}
                    onClick={this.handlePreviousAction}
                  >
                    上一张
                  </span>
                  {showRotateBtn &&
                    <span
                      className={`${prefix}-image-p-action`}
                      onClick={this.handleRotate}
                    >
                      翻转
                    </span>}
                  <span
                    className={`${prefix}-image-p-action`}
                    onClick={this.handleNextAction}
                  >
                    下一张
                  </span>
                </div>
              : <div
                  className={`${prefix}-image-p-footer ${showRotateBtn
                    ? 'show-rotate-btn'
                    : ''}`}
                >
                  {showRotateBtn &&
                    <span
                      className={`${prefix}-image-p-action rotate-action`}
                      onClick={this.handleRotate}
                    >
                      翻转
                    </span>}
                </div>}
          </div>
        </div>
      </ImagePortalESCToClose>
    );
  }
}
