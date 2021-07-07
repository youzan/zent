import Enzyme, { mount } from 'enzyme';
import { Simulate } from 'react-dom/test-utils';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import previewImage from '../src/preview-image';
import Image from '../src/preview-image/Image';
import previewImageFunc from '../src/preview-image/previewImage';

Enzyme.configure({ adapter: new Adapter() });

const imgArr = [
  'https://img.yzcdn.cn/public_files/2016/11/18/fcb387f397b06e1aa5b2612ed8219f66.jpg',
  'https://img.yzcdn.cn/public_files/2016/11/18/2b17c476d42610fb8574dae6a04b4c19.jpeg',
  'https://img.yzcdn.cn/public_files/2016/11/15/b7b6192acffa551d4d0185ce3c9589ab.jpeg',
];

describe('previewImage render', () => {
  it('should open a portal when called', () => {
    previewImage({
      images: imgArr,
      showRotateBtn: true,
      index: 0,
    });
    expect(document.querySelectorAll('.zent-image-p-anchor').length).toBe(1);
    expect(document.querySelectorAll('.zent-image-p-show-image').length).toBe(
      1
    );

    Simulate.click(document.querySelector('.zent-image-p-close'));

    jest.runAllTimers();
    expect(document.querySelectorAll('.zent-portal').length).toBe(0);
  });

  it('test Image component event', () => {
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
      currentTarget: 1,
    };

    expect(ImageDom.instance().onMaskClick(event)).toBe(undefined);
    expect(ImageDom.instance().onClose()).toBe(undefined);
    expect(ImageDom.instance().handleNextAction()).toBe(undefined);
    expect(ImageDom.instance().handlePreviousAction()).toBe(undefined);
    expect(ImageDom.instance().handleRotate()).toBe(undefined);
  });

  it('check Image branch', () => {
    const wrapper = mount(
      <Image
        images={imgArr}
        showRotateBtn={false}
        index={0}
        onClose={() => {}}
      />
    );
    wrapper.instance().handleScale();

    const ImageDom = wrapper.find('Image');

    const event = {
      target: 0,
      currentTarget: 1,
    };

    ImageDom.instance().onMaskClick(event);

    const imgArr1 = [
      'https://img.yzcdn.cn/public_files/2016/11/18/fcb387f397b06e1aa5b2612ed8219f66.jpg',
    ];

    const wrapper1 = mount(
      <Image images={imgArr1} showRotateBtn index={0} onClose={() => {}} />
    );
    const ImageDom1 = wrapper1.find('Image');
    expect(ImageDom1.instance().props.showRotateBtn).toBe(true);

    const wrapper2 = mount(
      <Image
        images={imgArr1}
        showRotateBtn={false}
        index={0}
        onClose={() => {}}
      />
    );
    const ImageDom2 = wrapper2.find('Image');
    expect(ImageDom2.instance().props.showRotateBtn).toBe(false);
  });

  it('check class ImagePreview', () => {
    previewImageFunc({
      images: imgArr,
      showRotateBtn: true,
      index: 0,
    });
  });
});
