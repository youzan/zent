import { Component } from 'react';
import cx from 'classnames';
import debounce from '../utils/debounce';

import { I18nReceiver as Receiver, II18nLocalePreviewImage } from '../i18n';
import Portal from '../portal';
import Icon from '../icon';

const TRANSITION_DURATION = 500; // ms

export interface IPreviewImageProps {
  className: string;
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
        transitionDuration: `${TRANSITION_DURATION}ms`,
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
        transitionDuration: `${TRANSITION_DURATION}ms`,
      },
      scaleTag: !scaleTag,
    });
  };

  render() {
    const { images, showRotateBtn, className } = this.props;
    const { scaleTag, imageIndex, imageStyle } = this.state;
    const imageClassName = cx('zent-image-p-show-image', {
      'zent-image-p-is-zooming': scaleTag,
    });

    return (
      <Portal
        visible
        onClose={this.onClose}
        className={cx('zent-image-p-anchor', className)}
        closeOnESC
        blockPageScroll
      >
        <div className="zent-image-p-backdrop">
          <div className="zent-image-p-wrap">
            <div className="zent-image-p-close" onClick={this.onClose}>
              <Icon type="close" />
            </div>
            <Receiver componentName="PreviewImage">
              {(i18n: II18nLocalePreviewImage) => (
                <div className="zent-image-p-body" onClick={this.onMaskClick}>
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
            <Receiver componentName="PreviewImage">
              {(i18n: II18nLocalePreviewImage) => {
                const needPager = images.length > 1;
                const footerCxs = cx('zent-image-p-footer', {
                  'zent-image-p-show-rotate-btn': showRotateBtn,
                  'zent-image-p-footer-paging': needPager,
                });
                const rotateCxs = cx('zent-image-p-action', {
                  'zent-image-p-rotate-action': !needPager,
                });
                return (
                  <div className={footerCxs}>
                    {needPager && (
                      <span
                        className="zent-image-p-action"
                        onClick={this.handlePreviousAction}
                      >
                        {i18n.prev}
                      </span>
                    )}
                    {showRotateBtn && (
                      <span
                        className={rotateCxs}
                        onClick={debounce(
                          this.handleRotate,
                          TRANSITION_DURATION,
                          { immediate: true }
                        )}
                      >
                        {i18n.rotate}
                      </span>
                    )}
                    {needPager && (
                      <span
                        className="zent-image-p-action"
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
