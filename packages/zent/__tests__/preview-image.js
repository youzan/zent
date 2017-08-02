import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import previewImage from 'preview-image';
import Image from 'preview-image/Image';
import previewImageFunc from 'preview-image/previewImage';

describe('previewImage render', () => {
  it('should open a portal when called', () => {
    const imgArr = [
      'https://img.yzcdn.cn/public_files/2016/11/18/fcb387f397b06e1aa5b2612ed8219f66.jpg',
      'https://img.yzcdn.cn/public_files/2016/11/18/2b17c476d42610fb8574dae6a04b4c19.jpeg',
      'https://img.yzcdn.cn/public_files/2016/11/15/b7b6192acffa551d4d0185ce3c9589ab.jpeg'
    ];

    previewImage({
      images: imgArr,
      showRotateBtn: true,
      index: 0
    });
    expect(document.querySelectorAll('.zent-portal').length).toBe(1);
    expect(document.querySelectorAll('.zent-image-p-anchor').length).toBe(1);
    expect(document.querySelectorAll('.zent-show-image').length).toBe(1);

    const wrapper = new ReactWrapper(
      document.querySelector('.zent-image-p-close'),
      true
    );
    wrapper.simulate('click');
    jest.runAllTimers();
    expect(document.querySelectorAll('.zent-portal').length).toBe(0);
  });

  it('test Image component event', () => {
    const imgArr = [
      'https://img.yzcdn.cn/public_files/2016/11/18/fcb387f397b06e1aa5b2612ed8219f66.jpg',
      'https://img.yzcdn.cn/public_files/2016/11/18/2b17c476d42610fb8574dae6a04b4c19.jpeg',
      'https://img.yzcdn.cn/public_files/2016/11/15/b7b6192acffa551d4d0185ce3c9589ab.jpeg'
    ];

    const wrapper = mount(
      <Image images={imgArr} showRotateBtn index={0} onClose={() => {}} />
    );

    const props = wrapper.props();
    expect(props.images.length).toBe(3);
    expect(props.showRotateBtn).toBe(true);
    expect(props.index).toBe(0);

    const ImageDom = wrapper.find('Image');

    const event = {
      target: 1,
      currentTarget: 1
    };

    expect(ImageDom.node.onMaskClick(event)).toBe(undefined);
    expect(ImageDom.node.onClose()).toBe(undefined);
    expect(ImageDom.node.handleNextAction()).toBe(undefined);
    expect(ImageDom.node.handlePreviousAction()).toBe(undefined);
    expect(ImageDom.node.handleRotate()).toBe(undefined);
  });

  it('check Image branch', () => {
    const imgArr = [
      'https://img.yzcdn.cn/public_files/2016/11/18/fcb387f397b06e1aa5b2612ed8219f66.jpg',
      'https://img.yzcdn.cn/public_files/2016/11/18/2b17c476d42610fb8574dae6a04b4c19.jpeg',
      'https://img.yzcdn.cn/public_files/2016/11/15/b7b6192acffa551d4d0185ce3c9589ab.jpeg'
    ];

    const wrapper = mount(
      <Image
        images={imgArr}
        showRotateBtn={false}
        index={0}
        onClose={() => {}}
      />
    );

    const ImageDom = wrapper.find('Image');

    const event = {
      target: 0,
      currentTarget: 1
    };

    ImageDom.node.onMaskClick(event);

    const imgArr1 = [
      'https://img.yzcdn.cn/public_files/2016/11/18/fcb387f397b06e1aa5b2612ed8219f66.jpg'
    ];

    const wrapper1 = mount(
      <Image images={imgArr1} showRotateBtn index={0} onClose={() => {}} />
    );
    const ImageDom1 = wrapper1.find('Image');
    expect(ImageDom1.node.props.showRotateBtn).toBe(true);

    const wrapper2 = mount(
      <Image
        images={imgArr1}
        showRotateBtn={false}
        index={0}
        onClose={() => {}}
      />
    );
    const ImageDom2 = wrapper2.find('Image');
    expect(ImageDom2.node.props.showRotateBtn).toBe(false);
  });

  it('check class ImagePreview', () => {
    const imgArr = [
      'https://img.yzcdn.cn/public_files/2016/11/18/fcb387f397b06e1aa5b2612ed8219f66.jpg',
      'https://img.yzcdn.cn/public_files/2016/11/18/2b17c476d42610fb8574dae6a04b4c19.jpeg',
      'https://img.yzcdn.cn/public_files/2016/11/15/b7b6192acffa551d4d0185ce3c9589ab.jpeg'
    ];

    previewImageFunc({
      images: imgArr,
      showRotateBtn: true,
      index: 0
    });
  });
});
