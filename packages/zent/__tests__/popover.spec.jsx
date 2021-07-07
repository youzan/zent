import { Simulate } from 'react-dom/test-utils';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Button from '../src/button';
import Popover from '../src/popover';

Enzyme.configure({ adapter: new Adapter() });

beforeEach(() => {
  jest
    .spyOn(window, 'requestAnimationFrame')
    .mockImplementation(cb => setTimeout(cb, 0));
});

afterEach(() => {
  window.requestAnimationFrame.mockRestore();
});

/* eslint-disable */
const PopoverContent = Popover.Content;
const PopoverClickTrigger = Popover.Trigger.Click;
const PopoverHoverTrigger = Popover.Trigger.Hover;
const PopoverFocusTrigger = Popover.Trigger.Focus;
const PopoverBaseTrigger = Popover.Trigger.Base;
const withPopover = Popover.withPopover;
const createPlacement = Popover.Position.create;
/* eslint-enable */

const HoverContent = withPopover(({ popover }) => {
  return (
    <div>
      <div>popover content</div>
      <div>line two</div>
      <div>line three</div>
      <Button onClick={popover.close}>close</Button>
    </div>
  );
});

const simulateWithTimers = (node, event, ...arg) => {
  node.simulate(event, ...arg);
  jest.runAllTimers();
};

const simulateRawWithTimers = (node, event, ...arg) => {
  Simulate[event](node, ...arg);
  jest.runAllTimers();
};

const dispatchWithTimers = (node, event, ...arg) => {
  node.dispatchEvent(event, ...arg);
  jest.runAllTimers();
};

beforeAll(() => {
  jest.useFakeTimers();
});

describe('Popover', () => {
  it('Popover has its core function, popover :)', () => {
    let wrapper = mount(
      <Popover position={Popover.Position.BottomLeft} display="inline">
        <PopoverClickTrigger>
          <Button>click me</Button>
        </PopoverClickTrigger>
        <PopoverContent>
          <div className="first-content">popover content</div>
          <div>line two</div>
        </PopoverContent>
      </Popover>
    );
    expect(wrapper.find('PurePortal').length).toBe(0);
    simulateWithTimers(wrapper.find('button'), 'click');
    expect(wrapper.find('PurePortal').length).toBe(1);
    expect(document.querySelectorAll('.zent-popover-v2 div').length).toBe(2);
    expect(
      document.querySelectorAll('.zent-popover-v2 div')[1].textContent
    ).toBe('line two');

    // // HACK: branch window.resize (throttle)
    // wrapper
    //   .find('PopoverContent')
    //   .instance()
    //   .onWindowResize(
    //     {},
    //     {
    //       deltaX: 0,
    //       deltaY: 0,
    //     }
    //   );
    // wrapper
    //   .find('PopoverContent')
    //   .instance()
    //   .onWindowResize(
    //     {},
    //     {
    //       deltaX: 10,
    //       deltaY: 10,
    //     }
    //   );

    simulateWithTimers(wrapper.find('button'), 'click');
    expect(wrapper.find('PurePortal').length).toBe(1);

    wrapper.instance().close();
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('.first-content').length).toBe(0);
    wrapper.unmount();

    wrapper = mount(
      <Popover position={Popover.Position.RightTop} display="inline">
        <PopoverHoverTrigger
          showDelay={100}
          hideDelay={100}
          isOutSide={() => true}
        >
          <Button>hover on me</Button>
        </PopoverHoverTrigger>
        <PopoverContent>
          <HoverContent />
        </PopoverContent>
      </Popover>
    );

    expect(wrapper.find('PurePortal').length).toBe(0);

    // 快速进入又快速离开
    wrapper.find('button').simulate('mouseenter');
    expect(wrapper.find('PurePortal').length).toBe(0);
    wrapper.find('button').simulate('mouseleave');
    expect(wrapper.find('PurePortal').length).toBe(0);

    // hover 直到popup，然后window监听mousemove，判断是否离开。
    simulateWithTimers(wrapper.find('button'), 'mouseenter');
    wrapper.update();
    expect(wrapper.find('PurePortal').length).toBe(1);
    const fakeEvent = new MouseEvent('mousemove');
    dispatchWithTimers(document.body, fakeEvent);
    wrapper.unmount();

    wrapper = mount(
      <Popover
        position={Popover.Position.TopRight}
        display="inline"
        cushion={10}
      >
        <PopoverFocusTrigger>
          <input placeholder="focus on me" />
        </PopoverFocusTrigger>
        <PopoverContent>
          <div>popover content</div>
          <div>line two focus</div>
        </PopoverContent>
      </Popover>
    );

    wrapper.find('input').simulate('focus');
    wrapper.find('input').simulate('focus');
    expect(wrapper.find('PurePortal').length).toBe(1);
    wrapper.find('input').simulate('blur');
    jest.runAllTimers();
  });

  // it('Popover has children validation and position type check', () => {
  //   // NOTE: children.length === 2
  //   expect(() => {
  //     mount(
  //       <Popover position={Popover.Position.BottomLeft} display="inline">
  //         <span className="foo" />
  //       </Popover>
  //     );
  //   }).toThrow();
  //
  //   // NOTE: must have one PopoverTrigger
  //   expect(() => {
  //     mount(
  //       <Popover position={Popover.Position.BottomLeft} display="inline">
  //         <span className="foo" />
  //         <PopoverContent>
  //           <div>popover content</div>
  //           <div>line two</div>
  //         </PopoverContent>
  //       </Popover>
  //     );
  //   }).toThrow();
  //
  //   // NOTE: must have one PopoverContent
  //   expect(() => {
  //     mount(
  //       <Popover position={Popover.Position.BottomLeft} display="inline">
  //         <PopoverClickTrigger>
  //           <Button>click me</Button>
  //         </PopoverClickTrigger>
  //         <span className="foo" />
  //       </Popover>
  //     );
  //   }).toThrow();
  // });

  it('Popover can have custom className and custom placement position', () => {
    const wrapper = mount(
      <Popover position={Popover.Position.BottomLeft} className="bar">
        <PopoverClickTrigger>
          <Button>click me</Button>
        </PopoverClickTrigger>
        <PopoverContent>
          <HoverContent />
        </PopoverContent>
      </Popover>
    );
    simulateWithTimers(wrapper.find('button'), 'click');

    // popover portal still in root tail of body..
    expect(wrapper.find(PopoverClickTrigger).find('button').length).toBe(1);

    wrapper.unmount();
  });

  it('Popover have series of placement position class', () => {
    const {
      BottomLeft,
      BottomCenter,
      BottomRight,
      LeftTop,
      LeftCenter,
      LeftBottom,
      RightTop,
      RightCenter,
      RightBottom,
      TopLeft,
      TopCenter,
      TopRight,
      TopLeftInViewport,
      BottomLeftInViewport,
      AutoBottomLeft,
      AutoBottomCenter,
      AutoBottomRight,
      AutoTopLeft,
      AutoTopCenter,
      AutoTopRight,
      AutoBottomLeftInViewport,
    } = Popover.Position;
    const positionArr = [
      BottomLeft,
      BottomCenter,
      BottomRight,
      LeftTop,
      LeftCenter,
      LeftBottom,
      RightTop,
      RightCenter,
      RightBottom,
      TopLeft,
      TopCenter,
      TopRight,
      TopLeftInViewport,
      BottomLeftInViewport,
      AutoBottomLeft,
      AutoBottomCenter,
      AutoBottomRight,
      AutoTopLeft,
      AutoTopCenter,
      AutoTopRight,
      AutoBottomLeftInViewport,
    ];

    positionArr.forEach(pos => {
      const wrapper = mount(
        <Popover position={pos} display="inline">
          <PopoverClickTrigger>
            <Button>click me</Button>
          </PopoverClickTrigger>
          <PopoverContent>
            <div className=".first-content">popover content</div>
            <div>line two</div>
          </PopoverContent>
        </Popover>
      );
      simulateWithTimers(wrapper.find('button'), 'click');
      expect(wrapper.find('PurePortal').length).toBe(1);
      wrapper.unmount();
    });
  });

  it('Children of Trigger could not have string ref prop', () => {
    expect(() => {
      mount(
        <Popover position={Popover.Position.BottomLeft} display="inline">
          <PopoverClickTrigger>
            <Button ref="trigger">click me</Button>
          </PopoverClickTrigger>
          <PopoverContent>
            <div>popover content</div>
            <div>line two</div>
          </PopoverContent>
        </Popover>
      );
    }).toThrow();
  });

  it('Base Trigger HACK', () => {
    const wrapper = mount(
      <Popover position={Popover.Position.BottomLeft} display="inline">
        <PopoverBaseTrigger>
          <Button>click me</Button>
        </PopoverBaseTrigger>
        <PopoverContent>
          <div>popover content</div>
          <div>line two</div>
        </PopoverContent>
      </Popover>
    );
    simulateWithTimers(wrapper.find('button'), 'click');
    wrapper.unmount();
  });

  it('can be controlled by visible & onVisibleChange', () => {
    let visible = true;
    const changeVisible = v => (visible = v);
    const wrapper = mount(
      <Popover
        visible={visible}
        onVisibleChange={changeVisible}
        position={Popover.Position.BottomLeft}
        display="inline"
      >
        <PopoverClickTrigger>
          <Button>click me</Button>
        </PopoverClickTrigger>
        <PopoverContent>
          <div>popover content</div>
          <div>line two</div>
        </PopoverContent>
      </Popover>
    );
    expect(document.querySelector('.zent-popover-v2')).toBeTruthy();

    wrapper.setProps({
      visible: false,
    });
    jest.runAllTimers();
    expect(document.querySelector('.zent-popover-v2')).toBeFalsy();

    // console.log(wrapper.instance());
    wrapper.instance().open();
    jest.runAllTimers();
    wrapper.setProps({
      visible: true,
    });
    expect(document.querySelector('.zent-popover-v2')).toBeTruthy();

    wrapper.setProps({
      visible: false,
    });
    jest.runAllTimers();
    expect(document.querySelector('.zent-popover-v2')).toBeFalsy();
  });

  it('onBeforeXXX can return a Promise', () => {
    let p;
    const onBeforeShow = () => {
      p = new Promise(resolve => {
        resolve(2);
      });
      return p;
    };
    const wrapper = mount(
      <Popover
        onBeforeShow={onBeforeShow}
        position={Popover.Position.BottomLeft}
        display="inline"
      >
        <PopoverClickTrigger>
          <Button>click me</Button>
        </PopoverClickTrigger>
        <PopoverContent>
          <div>popover content</div>
          <div>line two</div>
        </PopoverContent>
      </Popover>
    );
    wrapper.find('button').simulate('click');
    jest.runAllTimers();

    return p.then(v => {
      expect(v).toBe(2);
      jest.runAllTimers();
      expect(document.querySelectorAll('.zent-popover-v2').length).toBe(1);

      wrapper.unmount();
      dispatchWithTimers(document.body, new MouseEvent('click'));
      expect(document.querySelectorAll('.zent-popover-v2').length).toBe(0);
    });
  });

  it('onBeforeXXX can have a callback', () => {
    const onBeforeShow = callback => {
      setTimeout(callback, 1000);
    };
    const wrapper = mount(
      <Popover
        onBeforeShow={onBeforeShow}
        position={Popover.Position.BottomLeft}
        display="inline"
      >
        <PopoverClickTrigger>
          <Button>click me</Button>
        </PopoverClickTrigger>
        <PopoverContent>
          <div>popover content</div>
          <div>line two</div>
        </PopoverContent>
      </Popover>
    );
    wrapper.find('button').simulate('click');
    jest.runAllTimers();
    expect(document.querySelectorAll('.zent-popover-v2').length).toBe(1);

    wrapper.unmount();
    dispatchWithTimers(document.body, new MouseEvent('click'));
    expect(document.querySelectorAll('.zent-popover-v2').length).toBe(0);
  });

  it('hover trigger closes on window blur', () => {
    const wrapper = mount(
      <Popover position={Popover.Position.BottomLeft}>
        <PopoverHoverTrigger>
          <Button>Hover on me</Button>
        </PopoverHoverTrigger>
        <PopoverContent>
          <div>popover content</div>
        </PopoverContent>
      </Popover>
    );

    simulateWithTimers(wrapper.find('button'), 'mouseenter');
    wrapper.update();
    expect(wrapper.find('PurePortal').length).toBe(1);

    // wont' close if target is not window
    let fakeEvent = new FocusEvent('blur');
    dispatchWithTimers(window, fakeEvent);
    expect(wrapper.find('PurePortal').length).toBe(1);

    // it's tricky to set target manually
    fakeEvent = new FocusEvent('blur');
    const evt = fakeEvent.__proto__.__proto__.__proto__; // eslint-disable-line
    const descriptor = Object.assign(
      {},
      Object.getOwnPropertyDescriptor(evt, 'target'),
      {
        get() {
          return window;
        },
      }
    );
    Object.defineProperty(evt, 'target', descriptor);

    dispatchWithTimers(window, fakeEvent);
    expect(document.querySelectorAll('.zent-popover-v2').length).toBe(0);
    wrapper.unmount();
  });

  it('can be nested', () => {
    const wrapper = mount(
      <Popover position={Popover.Position.BottomLeft} display="inline">
        <PopoverClickTrigger>
          <Button className="trigger-level-1">click me</Button>
        </PopoverClickTrigger>
        <PopoverContent>
          <div>popover content</div>
          <div className="level-1">line two</div>

          <Popover position={Popover.Position.BottomLeft} display="inline">
            <PopoverClickTrigger>
              <Button className="trigger-level-2">click me</Button>
            </PopoverClickTrigger>
            <PopoverContent>
              <div>popover content</div>
              <div className="level-2">line two</div>

              <Popover position={Popover.Position.BottomLeft} display="inline">
                <PopoverClickTrigger>
                  <Button className="trigger-level-3">click me</Button>
                </PopoverClickTrigger>
                <PopoverContent>
                  <div>popover content</div>
                  <div className="level-3">line two</div>
                </PopoverContent>
              </Popover>
            </PopoverContent>
          </Popover>
        </PopoverContent>
      </Popover>
    );

    simulateWithTimers(wrapper.find('.trigger-level-1').at(0), 'click');
    wrapper.update();
    expect(document.querySelectorAll('.zent-popover-v2').length).toBe(1);

    simulateRawWithTimers(document.querySelector('.trigger-level-2'), 'click');
    wrapper.update();
    expect(document.querySelectorAll('.zent-popover-v2').length).toBe(2);

    simulateRawWithTimers(document.querySelector('.trigger-level-3'), 'click');
    wrapper.update();
    expect(document.querySelectorAll('.zent-popover-v2').length).toBe(3);

    // dispatchWithTimers(document.body, new MouseEvent('click'));
    // wrapper.update();
    // expect(document.querySelectorAll('.zent-popover-v2').length).toBe(0);

    wrapper.unmount();
  });

  it('supports auto position', () => {
    const {
      AutoBottomLeft,
      AutoBottomRight,
      AutoBottomCenter,
      AutoTopLeft,
      AutoTopRight,
      AutoTopCenter,
    } = Popover.Position;
    const viewport = {
      left: 0,
      top: 0,
      right: 1024,
      bottom: 768,
      width: 1024,
      height: 768,
    };
    const content = {
      width: 10,
      height: 10,
    };
    const anchor = {
      left: 1020,
      top: 760,
      right: 1021,
      bottom: 761,
      width: 1,
      height: 1,
    };
    const options = {
      cushion: 0,
      anchorRect: anchor,
      containerRect: viewport,
      contentRect: content,
      relativeRect: viewport,
      anchor: {},
      container: {},
      content: {},
    };

    expect(AutoBottomLeft(options).className).toBe(
      'zent-popover-v2-position-top-right'
    );

    anchor.left = 5;
    anchor.right = 6;
    expect(AutoBottomRight(options).className).toBe(
      'zent-popover-v2-position-top-left'
    );

    anchor.left = 1020;
    anchor.right = 1021;
    expect(AutoBottomCenter(options).className).toBe(
      'zent-popover-v2-position-top-right'
    );

    anchor.left = 1;
    anchor.right = 2;
    expect(AutoBottomCenter(options).className).toBe(
      'zent-popover-v2-position-top-left'
    );

    anchor.left = 1020;
    anchor.right = 1021;
    anchor.top = 1;
    anchor.bottom = 2;
    expect(AutoTopLeft(options).className).toBe(
      'zent-popover-v2-position-bottom-right'
    );

    anchor.left = 5;
    anchor.right = 6;
    expect(AutoTopRight(options).className).toBe(
      'zent-popover-v2-position-bottom-left'
    );

    anchor.left = 1020;
    anchor.right = 1021;
    expect(AutoTopCenter(options).className).toBe(
      'zent-popover-v2-position-bottom-right'
    );

    anchor.left = 1;
    anchor.right = 2;
    expect(AutoTopCenter(options).className).toBe(
      'zent-popover-v2-position-bottom-left'
    );
  });

  it('throws if anchor has no children', () => {
    expect(() =>
      mount(
        <Popover position={Popover.Position.BottomLeft} display="inline">
          <Popover.Anchor />
          <PopoverContent>
            <div>popover content</div>
          </PopoverContent>
        </Popover>
      )
    ).toThrow(/Popover Anchor requires a child/);
  });

  it('trigger wraps number/string in a span', () => {
    const wrapper = mount(
      <Popover position={Popover.Position.BottomLeft} display="inline">
        <PopoverClickTrigger>abc</PopoverClickTrigger>
        <PopoverContent>
          <div>popover content</div>
        </PopoverContent>
      </Popover>
    );

    expect(wrapper.find('span').instance().textContent).toBe('abc');
  });

  it('has adjustPosition method', () => {
    const wrapper = mount(
      <Popover position={Popover.Position.BottomLeft} display="inline">
        <PopoverClickTrigger>abc</PopoverClickTrigger>
        <PopoverContent>
          <div>popover content</div>
        </PopoverContent>
      </Popover>
    );

    expect(() => wrapper.instance().adjustPosition()).not.toThrow();
  });
});
