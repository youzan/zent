import React, { Component } from 'react';
import { mount } from 'enzyme';
import Tabs from 'tabs';

const TabPanel = Tabs.TabPanel;

describe('Tabs', () => {
  it('requires an id and activeId', () => {
    const wrapper = mount(
      <Tabs activeId="1">
        <TabPanel id="1" tab="tab-title">
          foobar
        </TabPanel>
      </Tabs>
    );
    expect(wrapper.find('Nav').length).toBe(1);
    expect(wrapper.find('Tab').length).toBe(1);
    expect(wrapper.find('TabPanel').length).toBe(1);
  });

  it('custom className and prefix', () => {
    const wrapper = mount(
      <Tabs activeId="1" className="foobar-cls" prefix="quux">
        <TabPanel id="1" tab="tab-title">
          foobar
        </TabPanel>
      </Tabs>
    );
    expect(wrapper.find('.quux-tabs.foobar-cls').length).toBe(1);
  });

  it('different alignments', () => {
    const ensure = align => {
      const wrapper = mount(
        <Tabs activeId="foobar" align={align}>
          <TabPanel id="foobar" tab="foobar-tab">
            foobar
          </TabPanel>
          <TabPanel id="quux" tab="quux-tab">
            quux
          </TabPanel>
        </Tabs>
      );
      align = align || 'left';
      expect(
        wrapper.find('.zent-tabs-nav').hasClass(`zent-tabs-align-${align}`)
      ).toBe(true);
    };
    ensure();
    ensure('left');
    ensure('right');
    ensure('center');
  });

  it('different sizes', () => {
    const ensure = size => {
      const wrapper = mount(
        <Tabs activeId="foobar" size={size}>
          <TabPanel id="foobar" tab="foobar-tab">
            foobar
          </TabPanel>
        </Tabs>
      );
      size = size || 'normal';
      expect(
        wrapper.find('.zent-tabs-nav').hasClass(`zent-tabs-size-${size}`)
      ).toBe(true);
    };
    ensure();
    ensure('normal');
    ensure('huge');
  });

  it('different types', () => {
    const ensure = type => {
      const wrapper = mount(
        <Tabs activeId="foobar" type={type}>
          <TabPanel id="foobar" tab="foobar-tab">
            foobar
          </TabPanel>
        </Tabs>
      );
      type = type || 'normal';
      expect(
        wrapper.find('.zent-tabs-nav').hasClass(`zent-tabs-type-${type}`)
      ).toBe(true);
    };
    ensure();
    ensure('normal');
    ensure('card');
    ensure('slider');
  });

  it('onTabChange callback', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Tabs activeId="foobar" onTabChange={onChange}>
        <TabPanel id="foobar" tab="foobar-tab">
          foobar
        </TabPanel>
        <TabPanel id="quux" tab="quux-tab">
          foobar
        </TabPanel>
      </Tabs>
    );

    wrapper.find('Tab').last().simulate('click');
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toBe('quux');
  });

  it('onTabDel and onTabAdd callback', () => {
    class App extends Component {
      state = {
        active: 'foobar',
        tabs: ['foobar', 'quux']
      };

      onChange = jest.fn().mockImplementationOnce(id =>
        this.setState({
          active: id
        })
      );

      onDelete = jest.fn().mockImplementationOnce(id => {
        this.setState({
          tabs: this.state.tabs.reduce((tabs, t) => {
            if (t !== id) {
              tabs.push(t);
            }
            return tabs;
          }, [])
        });
      });

      onAdd = jest.fn().mockImplementationOnce(() =>
        this.setState({
          tabs: this.state.tabs.concat('bar')
        })
      );

      render() {
        const { tabs, active } = this.state;
        return (
          <Tabs
            activeId={active}
            onTabChange={this.onChange}
            onTabDel={this.onDelete}
            onTabAdd={this.onAdd}
            candel
            canadd
          >
            {tabs.map(t =>
              <TabPanel key={t} id={t} tab={`${t}-tab`}>
                {t}
              </TabPanel>
            )}
          </Tabs>
        );
      }
    }

    const wrapper = mount(<App />);

    expect(wrapper.find('Tab').length).toBe(2);
    wrapper.find('.zent-tabs-nav-add').simulate('click');
    expect(wrapper.find('Tab').length).toBe(3);

    wrapper.find('Tab').last().simulate('click');
    expect(wrapper.state('active')).toBe('bar');

    wrapper
      .find('Tab')
      .first()
      .find('.zent-tabs-tab-inner-del')
      .simulate('click');
    expect(wrapper.find('Tab').length).toBe(2);
    expect(wrapper.state('tabs')).toEqual(['quux', 'bar']);
  });

  it('use without panel', () => {
    class App extends Component {
      constructor(props) {
        super(props);
        this.state = {
          activeId: '2',
          tabs: [
            {
              title: '选项一',
              key: '1',
              disabled: true
            },
            {
              title: '选项二',
              key: '2'
            },
            {
              title: '选项三',
              key: '3'
            }
          ]
        };
      }

      render() {
        return (
          <div>
            <div style={{ marginTop: '10px' }}>
              <Tabs {...this.state} />
            </div>
          </div>
        );
      }
    }

    const wrapper = mount(<App />);
    expect(wrapper.find('Tab').length).toBe(3);
  });

  it('can render withour any panel', () => {
    expect(() =>
      mount(<Tabs activeId="1" className="foobar-cls" prefix="quux" />)
    ).not.toThrow();
  });
});
