import React from 'react';
import { mount } from 'enzyme';
import { Simulate } from 'react-dom/test-utils';
import Pop from 'pop';
import Button from 'button';

let contentId = 1;
let headerId = 2;

function findContent() {
  return document.querySelectorAll(`.zent-pop-content-${contentId}`);
}

// function findHeader() {
//   return document.querySelectorAll(`.zent-pop-header-${headerId}`);
// }

const content = () => {
  contentId++;
  return (
    <div className={`zent-pop-content-${contentId}`}>
      <a>我在测试</a>
      <div>
        <input />
      </div>
    </div>
  );
};

const header = () => {
  headerId++;
  return (
    <div className={`zent-pop-header-${headerId}`}>
      <span />
    </div>
  );
};

const addClick = jest.fn();

describe('Pop', () => {
  it('Regular Pop has 3 kind of trigger', () => {
    ['click', 'hover', 'focus'].forEach(trigger => {
      const wrapper = mount(
        <Pop content={content()} trigger={trigger} position="bottom-center">
          {trigger !== 'focus' ? (
            <Button onClick={addClick}>{trigger}</Button>
          ) : (
            <input placeholder="focus" onChange={() => true} />
          )}
        </Pop>
      );
      expect(wrapper.find('Portal').length).toBe(0);
      expect(wrapper.find('Popover').prop('display')).toBe('inline-block');
    });
  });

  it('Position prop of Pop have type-check and default with TopCenter', () => {
    let wrapper;
    expect(() => {
      wrapper = mount(
        <Pop content={content()} trigger={'click'}>
          <Button onClick={addClick}>click</Button>
        </Pop>
      );
    }).not.toThrow();
    expect(wrapper.prop('position')).toBe('top-center');
  });

  it('Pop can have custom prefix, className, and block switch, meanwhile content and header pass through prop', () => {
    const wrapper = mount(
      <Pop
        content={content()}
        trigger={'click'}
        prefix="foo"
        className="quux"
        wrapperClassName="bar"
        block
        header={header()}
      >
        <Button onClick={addClick}>click</Button>
      </Pop>
    );
    expect(wrapper.find('Popover div').hasClass('foo-pop-wrapper')).toBe(true);
    expect(wrapper.find('Popover div').hasClass('bar')).toBe(true);
    expect(wrapper.find('Popover').prop('display')).toBe('block');

    wrapper.find('button').simulate('click');
    expect(document.querySelector('.foo-pop.quux')).toBeTruthy();
  });

  it('Pop has its core function, powered by zent-popover, the content of popover has onConfirm and onCancel switches', () => {
    // with both onConfirm and onCancel undefined, content will be rendered as null
    let wrapper = mount(
      <Pop
        content={content()}
        trigger={'click'}
        className="bar11"
        block
        header={header()}
      >
        <Button>click</Button>
      </Pop>
    );
    wrapper.find('button').simulate('click');
    expect(document.querySelectorAll('.bar11').length).toBe(1);

    const confirmMock = jest.fn();
    const cancelMock = jest.fn();
    wrapper = mount(
      <Pop
        trigger={'click'}
        block
        onConfirm={confirmMock}
        onCancel={cancelMock}
        content={content()}
      >
        <Button>click</Button>
      </Pop>
    );
    wrapper.find('button').simulate('click');
    expect(findContent().length).toBe(1);
    let btn = document.querySelectorAll('.zent-pop-buttons button');
    expect(btn.length).toBe(2);
    expect(btn[0].textContent).toBe('确定');
    expect(btn[1].textContent).toBe('取消');
    Simulate.click(btn[0]);
    jest.runAllTimers();
    expect(confirmMock.mock.calls.length).toBe(1);
    expect(findContent().length).toBe(0);

    wrapper = mount(
      <Pop
        trigger={'click'}
        block
        onConfirm={confirmMock}
        onCancel={cancelMock}
        content={content()}
      >
        <Button>click</Button>
      </Pop>
    );
    wrapper.find('button').simulate('click');
    expect(findContent().length).toBe(1);
    btn = document.querySelectorAll('.zent-pop-buttons button');
    expect(btn.length).toBe(2);
    Simulate.click(btn[1]);
    jest.runAllTimers();
    expect(cancelMock.mock.calls.length).toBe(1);
    expect(findContent().length).toBe(0);
  });

  it('Pop with NoneTrigger', () => {
    let visible = false;
    /* eslint-disable */
    const close = () => {
      wrapper.setProps({ visible: false });
    };
    const open = () => {
      wrapper.setProps({ visible: true });
    };
    /* eslint-enable */
    let wrapper = mount(
      <Pop
        content={
          <Button className="zent-pop-inner-button" onClick={close}>
            内部关闭
          </Button>
        }
        trigger="none"
        header="trigger is none"
        visible={visible}
      >
        <Button onClick={open}>打开(none)</Button>
      </Pop>
    );
    wrapper.find('button').simulate('click');
    expect(wrapper.find('Portal').length).toBe(1);
    expect(document.querySelectorAll('.zent-pop-inner-button').length).toBe(1);
    Simulate.click(document.querySelector('.zent-pop-inner-button'));
    jest.runAllTimers();
    expect(wrapper.find('Portal').length).toBe(0);

    // HACK: initial with truthy visible;
    visible = true;
    wrapper = mount(
      <Pop
        content={
          <Button className="zent-pop-inner-button" onClick={close}>
            内部关闭
          </Button>
        }
        trigger="none"
        header="trigger is none"
        visible={visible}
      >
        <Button onClick={open}>打开(none)</Button>
      </Pop>
    );
    wrapper.setProps({
      visible: false
    });
  });

  it('always center arrow at center', () => {
    const test = position => {
      const wrapper = mount(
        <Pop
          content={content()}
          position={position}
          trigger={'click'}
          centerArrow
        >
          <Button>click</Button>
        </Pop>
      );
      wrapper.find('button').simulate('click');
      jest.runAllTimers();
      expect(findContent().length).toBe(1);
      expect(
        document.querySelector(`.zent-popover-position-${position}`)
      ).toBeTruthy();
    };

    [
      'top-left',
      'top-center',
      'top-right',
      'right-top',
      'right-center',
      'right-bottom',
      'bottom-left',
      'bottom-center',
      'bottom-right',
      'left-top',
      'left-center',
      'left-bottom'
    ].forEach(test);
  });

  it('onConfirm/onCancel can be async(callback)', () => {
    let b = 1;
    const onCancel = function(close) {
      setTimeout(() => {
        expect(b).toBe(1);
        b++;
        close();
      }, 100);
    };

    let visible = false;
    const wrapper = mount(
      <Pop
        visible={visible}
        onVisibleChange={v => {
          visible = v;
        }}
        content={content()}
        onCancel={onCancel}
      >
        <a>click</a>
      </Pop>
    );

    wrapper.setProps({
      visible: true
    });
    jest.runAllTimers();

    Simulate.click(document.querySelector('.zent-btn-primary').nextSibling);
    jest.runAllTimers();
    expect(b).toBe(2);
  });

  it('onConfirm/onCancel can be async(Promise)', () => {
    const onConfirm = jest.fn();
    let a = 1;
    onConfirm.mockReturnValueOnce(
      new Promise(resolve => {
        setTimeout(() => {
          expect(a).toBe(1);
          a++;
          resolve();
        }, 100);
      })
    );

    let visible = false;
    const wrapper = mount(
      <Pop
        visible={visible}
        onVisibleChange={v => {
          visible = v;
        }}
        content={content()}
        onConfirm={onConfirm}
      >
        <a>click</a>
      </Pop>
    );

    wrapper.setProps({
      visible: true
    });
    jest.runAllTimers();

    document.querySelector('.zent-btn-primary').click();
    jest.runAllTimers();
    expect(a).toBe(2);
  });

  it('records unmount', () => {
    let wrapper = mount(
      <Pop
        content={content()}
        trigger={'click'}
        className="bar11"
        block
        header={header()}
      >
        <Button>click</Button>
      </Pop>
    );
    const instance = wrapper.instance();
    wrapper.unmount();
    expect(instance.isUnmounted).toBe(true);
  });

  it('has adjustPosition and getWrappedPopover method', () => {
    let wrapper = mount(
      <Pop
        content={content()}
        trigger={'click'}
        className="bar11"
        block
        header={header()}
      >
        <Button>click</Button>
      </Pop>
    );
    expect(() => wrapper.instance().adjustPosition()).not.toThrow();
    expect(() => wrapper.instance().getWrappedPopover()).not.toThrow();
    wrapper.unmount();
  });
});
