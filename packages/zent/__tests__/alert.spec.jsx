import Enzyme, { mount, shallow } from 'enzyme';
import { Alert, ScrollAlert, AlertItem } from '../src/alert';
import { Prompt } from '../src/prompt';
import { Banner } from '../src/banner';
import Icon from '../src/icon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import InlineLoading from '../src/loading/InlineLoading';

Enzyme.configure({ adapter: new Adapter() });

describe('Alert', () => {
  it('render children into content', () => {
    const wrapper = mount(
      <Alert>
        <span>foobar</span>
      </Alert>
    );
    expect(
      wrapper.containsMatchingElement(
        <div className="zent-alert-item-content">
          <span>foobar</span>
        </div>
      )
    ).toBe(true);
  });

  it('render title and description into content', () => {
    const wrapper = mount(<Alert title="title" description="description" />);
    expect(
      wrapper.containsMatchingElement(
        <div className="zent-alert-item-content">
          <>
            <h3 className="zent-alert-item-content__title">title</h3>
            <p className="zent-alert-item-content__description">description</p>
          </>
        </div>
      )
    ).toBe(true);
  });

  it('can have custom className', () => {
    const wrapper = mount(<Alert className="foobar" />);
    expect(wrapper.find('.zent-alert.foobar').length).toBe(1);
  });

  it('default type is info', () => {
    const wrapper = mount(
      <Alert>
        <span>foobar</span>
      </Alert>
    );
    expect(wrapper.find('.zent-alert-style-info').length).toBe(1);
  });

  it('has five different style type', () => {
    const infoWrapper = mount(<Alert type="info" />);
    expect(infoWrapper.find('.zent-alert-style-info').length).toBe(1);

    const successWrapper = mount(<Alert type="success" />);
    expect(successWrapper.find('.zent-alert-style-success').length).toBe(1);

    const warningWrapper = mount(<Alert type="warning" />);
    expect(warningWrapper.find('.zent-alert-style-warning').length).toBe(1);

    const errorWrapper = mount(<Alert type="error" />);
    expect(errorWrapper.find('.zent-alert-style-error').length).toBe(1);

    const hintWrapper = mount(<Alert type="hint" />);
    expect(hintWrapper.find('.zent-alert-style-hint').length).toBe(1);
  });

  it('loading mode use inline loading component as style icon', () => {
    const wrapper = mount(<Alert loading />);
    expect(wrapper.find(InlineLoading).length).toBe(1);
  });

  it('can has outline mode', () => {
    const wrapper = mount(<Alert outline />);
    expect(wrapper.find('.zent-alert.zent-alert-outline').length).toBe(1);
  });

  it('can has extraContent', () => {
    const wrapper = mount(<Alert extraContent={<div>extra-content</div>} />);
    expect(
      wrapper.containsMatchingElement(
        <div className="zent-alert-item-extra-content">
          <div>extra-content</div>
        </div>
      )
    ).toBe(true);
  });

  it('have default close icon', () => {
    const wrapper = mount(
      <Alert closable>
        <span>foobar</span>
      </Alert>
    );
    expect(
      wrapper.find('.zent-alert-item-close-wrapper').find(Icon).length
    ).toBe(1);
  });

  it('can have custom close trigger content', () => {
    const wrapper = mount(
      <Alert closable closeContent={<a>close</a>}>
        <span>foobar</span>
      </Alert>
    );
    expect(
      wrapper
        .find('.zent-alert-item-close-wrapper')
        .containsMatchingElement(<a>close</a>)
    ).toBe(true);
  });

  it('alert progress', () => {
    const wrapper = mount(
      <Alert progress={40}>
        <span>foobar</span>
      </Alert>
    );
    expect(wrapper.find('.zent-alert__progress').exists()).toBe(true);
  });

  it('have onClose callback', () => {
    const onClose = jest.fn();
    const wrapper = mount(<Alert closable onClose={onClose} />);
    wrapper.find('.zent-alert-item-close-wrapper').simulate('click');
    expect(onClose.mock.calls.length).toBe(1);
  });

  it('can controlled by closed prop', () => {
    const wrapper = mount(<Alert closable closed />);
    expect(wrapper.getDOMNode()).toBe(null);
  });
});

describe('ScrollAlert', () => {
  it('scroll alert render children', () => {
    const wrapper = mount(
      <ScrollAlert>
        <AlertItem>
          <span>foobar</span>
        </AlertItem>
      </ScrollAlert>
    );
    expect(
      wrapper.containsMatchingElement(
        <div className="zent-alert-item-content">
          <span>foobar</span>
        </div>
      )
    ).toBe(true);

    wrapper.unmount();
  });

  it('scroll alert container', () => {
    const wrapper = mount(
      <ScrollAlert>
        <AlertItem>
          <span>foobar</span>
        </AlertItem>
      </ScrollAlert>
    );
    expect(wrapper.find('.zent-alert-scroll-container').length).toBe(1);
  });

  it('scroll alert scroll items', () => {
    const wrapper = mount(
      <ScrollAlert>
        <AlertItem>
          <span>foobar1</span>
        </AlertItem>
        <AlertItem>
          <span>foobar2</span>
        </AlertItem>
      </ScrollAlert>
    );
    expect(wrapper.find('.zent-alert-item').length).toBe(3);
  });

  it('scroll alert has not children', () => {
    const wrapper = mount(<ScrollAlert />);
    expect(wrapper.getDOMNode()).toBe(null);
  });

  it('scroll alert loading property', () => {
    const wrapper = mount(
      <ScrollAlert loading>
        <AlertItem>foobar</AlertItem>
      </ScrollAlert>
    );
    expect(wrapper.find(InlineLoading).length).toBe(1);
  });

  it('default type is info', () => {
    const wrapper = mount(
      <ScrollAlert>
        <AlertItem>foobar</AlertItem>
      </ScrollAlert>
    );
    expect(wrapper.find('.zent-alert-style-info').length).toBe(1);
  });

  it('different style type', () => {
    const infoWrapper = mount(
      <ScrollAlert type="info">
        <AlertItem>foobar</AlertItem>
      </ScrollAlert>
    );
    expect(infoWrapper.find('.zent-alert-style-info').length).toBe(1);

    const successWrapper = mount(
      <ScrollAlert type="success">
        <AlertItem>foobar</AlertItem>
      </ScrollAlert>
    );
    expect(successWrapper.find('.zent-alert-style-success').length).toBe(1);

    const warningWrapper = mount(
      <ScrollAlert type="warning">
        <AlertItem>foobar</AlertItem>
      </ScrollAlert>
    );
    expect(warningWrapper.find('.zent-alert-style-warning').length).toBe(1);

    const errorWrapper = mount(
      <ScrollAlert type="error">
        <AlertItem>foobar</AlertItem>
      </ScrollAlert>
    );
    expect(errorWrapper.find('.zent-alert-style-error').length).toBe(1);

    const hintWrapper = mount(
      <ScrollAlert type="hint">
        <AlertItem>foobar</AlertItem>
      </ScrollAlert>
    );
    expect(hintWrapper.find('.zent-alert-style-hint').length).toBe(1);
  });

  it('scroll alert onClose callback, item onClose callback', () => {
    const onClose = jest.fn();
    const onCloseItem = jest.fn();
    const wrapper = mount(
      <ScrollAlert onClose={onClose}>
        <AlertItem closable onClose={onCloseItem}>
          foobar1
        </AlertItem>
        <AlertItem closable>foobar2</AlertItem>
      </ScrollAlert>
    );
    wrapper.find('.zent-alert-item-close-wrapper').at(0).simulate('click');
    expect(onCloseItem.mock.calls.length).toBe(1);
    expect(onClose.mock.calls.length).toBe(0);

    wrapper.find('.zent-alert-item-close-wrapper').at(0).simulate('click');

    expect(onClose.mock.calls.length).toBe(1);
  });

  it('scroll alert closed property', () => {
    const wrapper = mount(
      <ScrollAlert closed>
        <AlertItem>foobar1</AlertItem>
        <AlertItem closable>foobar2</AlertItem>
      </ScrollAlert>
    );

    expect(wrapper.find('.zent-alert-item').length).toBe(0);
  });

  it('scroll alert interval property', () => {
    const wrapper = mount(
      <ScrollAlert scrollInterval={3}>
        <AlertItem>foobar1</AlertItem>
        <AlertItem>foobar2</AlertItem>
      </ScrollAlert>
    );

    expect(
      wrapper
        .find('.zent-alert-item')
        .at(0)
        .hasClass('zent-alert-scroll-active-item')
    ).toBe(true);

    setTimeout(() => {
      expect(
        wrapper
          .find('.zent-alert-item')
          .at(1)
          .hasClass('zent-alert-scroll-active-item')
      ).toBe(true);
    }, 3000);

    jest.clearAllTimers();
  });

  it('scroll alert mouse events', () => {
    const wrapper = mount(
      <ScrollAlert>
        <AlertItem>foobar1</AlertItem>
        <AlertItem>foobar2</AlertItem>
      </ScrollAlert>
    );

    expect(
      wrapper
        .find('.zent-alert-item')
        .at(0)
        .hasClass('zent-alert-scroll-active-item')
    ).toBe(true);

    wrapper.update();

    wrapper.find('.zent-alert-scroll-container').simulate('mouseEnter');
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    expect(
      wrapper
        .find('.zent-alert-item')
        .at(0)
        .hasClass('zent-alert-scroll-active-item')
    ).toBe(true);

    wrapper.find('.zent-alert-scroll-container').simulate('mouseLeave');
    setTimeout(() => {
      expect(
        wrapper
          .find('.zent-alert-item')
          .at(1)
          .hasClass('zent-alert-scroll-active-item')
      ).toBe(true);
    }, 5000);

    jest.clearAllTimers();
  });

  it('scroll alert item close function', () => {
    const wrapper = mount(
      <ScrollAlert>
        <AlertItem closable>foobar1</AlertItem>
        <AlertItem closable>foobar2</AlertItem>
        <AlertItem closable>foobar3</AlertItem>
      </ScrollAlert>
    );
    expect(wrapper.find('.zent-alert-item').length).toBe(4);

    // 最后一个虚拟节点
    wrapper.find('.zent-alert-item-close-wrapper').at(3).simulate('click');

    expect(wrapper.find('.zent-alert-item').length).toBe(3);

    wrapper.find('.zent-alert-item-close-wrapper').at(1).simulate('click');
    expect(wrapper.find('.zent-alert-item').length).toBe(1);

    wrapper.find('.zent-alert-item-close-wrapper').at(0).simulate('click');
    expect(wrapper.find('.zent-alert-item').length).toBe(0);
  });

  it('scroll alert scroll to last-child, reset items', () => {
    jest.useFakeTimers();

    const wrapper = mount(
      <ScrollAlert>
        <AlertItem closable>foobar1</AlertItem>
        <AlertItem closable>foobar2</AlertItem>
      </ScrollAlert>
    );

    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();

    expect(
      wrapper
        .find('.zent-alert-scroll-active-item')
        .containsMatchingElement(<div>foobar1</div>)
    ).toBe(true);
  });

  it(' other node in scroll alert', () => {
    const wrapper = mount(
      <ScrollAlert>
        <AlertItem>
          <span>foobar1</span>
        </AlertItem>
        <div>
          <span>foobar1</span>
        </div>
      </ScrollAlert>
    );
    expect(wrapper.find('.zent-alert-item').length).toBe(1);
  });

  it('scroll alert item is null', () => {
    const wrapper = mount(<AlertItem />);
    expect(wrapper.getDOMNode()).toBe(null);
  });

  it('update props children', () => {
    const children = ['1', '2', '3'];
    const wrapper = mount(
      <ScrollAlert>
        {children.map(item => (
          <AlertItem key={item}>{item}</AlertItem>
        ))}
      </ScrollAlert>
    );

    wrapper.setProps({ children: ['4'] });
    expect(wrapper.state().activeIndex).toBe(0);
  });
});

describe('Banner And Prompt', () => {
  const IMG =
    'https://img01.yzcdn.cn/upload_files/2021/11/25/FtAGwcqfZIngtd1uXYIuIND58IeU.png';
  it('render children into Banner', () => {
    const wrapper1 = shallow(
      <Banner backgroundImage={IMG}>
        <span>Banner</span>
      </Banner>
    );
    const wrapper2 = shallow(
      <Banner style={{ fontSize: '14px' }}>
        <span>Banner</span>
      </Banner>
    );
    expect(wrapper1.find('.zent-banner').length).toBe(1);
    expect(wrapper2.find('.zent-banner').length).toBe(1);
    expect(wrapper2.find('.zent-banner').props().style.fontSize).toBe('14px');
  });
  it('render children into Prompt', () => {
    const wrapper1 = mount(
      <Prompt type="weakHint" extraContent={<span>extra</span>}>
        <span>Prompt</span>
      </Prompt>
    );
    const wrapper2 = mount(
      <Prompt type="strongHint" extraContent={<span>extra</span>}>
        <span>Prompt</span>
      </Prompt>
    );
    const wrapper3 = mount(
      <Prompt extraContent={<span>extra</span>}>
        <span>Prompt</span>
      </Prompt>
    );
    expect(wrapper1.find('.zent-alert').length).toBe(1);
    expect(wrapper2.find('.zent-alert-item-extra-content').length).toBe(1);
    expect(wrapper3.find('.zent-alert-item-extra-content').length).toBe(1);
  });
});
