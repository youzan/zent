import { Component } from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Tabs from '../src/tabs';
import VerticalTabs from '../src/tabs/VerticalTabs';
import capitalize from '../src/utils/capitalize';

Enzyme.configure({ adapter: new Adapter() });
const overflowTabs = Array(15)
  .fill(null)
  .map((_, index) => ({
    title: `tab${index + 1}`,
    key: index + 1,
  }));
describe('Tabs', () => {
  const TabPanel = Tabs.TabPanel;

  it('render with TabPanel', () => {
    const wrapper = mount(
      <Tabs activeId="1">
        <TabPanel id="1" tab="tab-title">
          foobar
        </TabPanel>
      </Tabs>
    );
    expect(wrapper.find('NormalTabsNav').length).toBe(1);
    expect(wrapper.find('NormalTab').length).toBe(1);
    expect(wrapper.find('TabPanel').length).toBe(1);
  });

  it('render with tabs prop', () => {
    class App extends Component {
      constructor(props) {
        super(props);
        this.state = {
          activeId: '2',
          tabs: [
            {
              title: '选项一',
              key: '1',
              disabled: true,
            },
            {
              title: '选项二',
              key: '2',
            },
            {
              title: '选项三',
              key: '3',
            },
          ],
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
    expect(wrapper.find('NormalTab').length).toBe(3);
  });

  it(`can't render without panel children and tabs props`, () => {
    expect(() =>
      mount(<Tabs activeId="1" className="foobar-cls" />)
    ).toThrowError();
  });

  it('custom className', () => {
    const wrapper = mount(
      <Tabs activeId="1" className="foobar-cls">
        <TabPanel id="1" className="foobar-panel-cls" tab="tab-title">
          foobar
        </TabPanel>
      </Tabs>
    );
    expect(wrapper.find('.zent-tabs.foobar-cls').length).toBe(1);
    expect(wrapper.find('.zent-tabs-panel.foobar-panel-cls').length).toBe(1);
  });

  it('different types', () => {
    const ensure = (type, targetType) => {
      const wrapper = mount(
        <Tabs activeId="foobar" type={type}>
          <TabPanel id="foobar" tab="foobar-tab">
            foobar
          </TabPanel>
        </Tabs>
      );
      expect(
        wrapper
          .find('.zent-tabs-nav')
          .hasClass(`zent-tabs-nav-type__${targetType}`)
      ).toBe(true);
    };
    ensure(undefined, 'normal');
    ensure('normal', 'normal');
    ensure('card', 'card');
    ensure('button', 'button');
    // zent 6.x tabs type
    ensure('slider', 'normal');
  });

  it('stretch props', () => {
    const wrapper = mount(
      <Tabs activeId="foobar" stretch>
        <TabPanel id="foobar" tab="foobar-tab">
          foobar
        </TabPanel>
        <TabPanel id="quux" tab="quux-tab">
          quux
        </TabPanel>
      </Tabs>
    );
    expect(
      wrapper.find('.zent-tabs-nav').hasClass(`zent-tabs-nav__stretch`)
    ).toBe(true);
  });

  it('overflowMode props', () => {
    const wrapper = mount(
      <Tabs activeId="1" overflowMode="slide" tabs={overflowTabs} />
    );
    expect(wrapper.find('.zent-tabs-nav-tabs-content-slide').length).toBe(1);

    const wrapper2 = mount(
      <Tabs activeId="1" overflowMode="anchor" tabs={overflowTabs} />
    );
    expect(wrapper2.find('.zent-tabs-nav-tabs-content-anchor').length).toBe(1);
  });

  it('onChange callback', () => {
    /**
     * @param {string} type
     */
    const ensure = type => {
      const tabComponent = `${capitalize(type)}Tab`;
      const onChange = jest.fn();
      const wrapper = mount(
        <Tabs type={type} activeId="foobar" onChange={onChange}>
          <TabPanel id="foobar" tab="foobar-tab">
            foobar
          </TabPanel>
          <TabPanel id="quux" tab="quux-tab">
            foobar
          </TabPanel>
        </Tabs>
      );

      wrapper.find(tabComponent).last().simulate('click');
      expect(onChange.mock.calls.length).toBe(1);
      expect(onChange.mock.calls[0][0]).toBe('quux');
    };

    ensure('normal');
    ensure('card');
    ensure('button');
  });

  it('onTabDel callback', () => {
    /**
     * @param {string} type
     */
    const ensure = type => {
      const tabComponent = `${capitalize(type)}Tab`;
      class App extends Component {
        state = {
          active: 'foobar',
          tabs: ['foobar', 'quux'],
        };

        onChange = jest.fn().mockImplementationOnce(id =>
          this.setState({
            active: id,
          })
        );

        onDelete = jest.fn().mockImplementationOnce(id => {
          const { tabs } = this.state;

          this.setState({
            tabs: tabs.reduce((tbs, t) => {
              if (t !== id) {
                tbs.push(t);
              }
              return tbs;
            }, []),
          });
        });

        onAdd = jest.fn().mockImplementationOnce(() =>
          this.setState(state => ({
            tabs: state.tabs.concat('bar'),
          }))
        );

        render() {
          const { tabs, active } = this.state;
          return (
            <Tabs
              activeId={active}
              onChange={this.onChange}
              onDelete={this.onDelete}
              candel
              type={type}
              navExtraContent={
                <a className="add-link" onClick={this.onAdd}>
                  Add
                </a>
              }
            >
              {tabs.map(t => (
                <TabPanel key={t} id={t} tab={`${t}-tab`}>
                  {t}
                </TabPanel>
              ))}
            </Tabs>
          );
        }
      }

      const wrapper = mount(<App />);

      expect(wrapper.find(tabComponent).length).toBe(2);
      wrapper.find('.add-link').simulate('click');
      expect(wrapper.find(tabComponent).length).toBe(3);

      wrapper.find(tabComponent).last().simulate('click');
      expect(wrapper.state('active')).toBe('bar');

      wrapper
        .find(tabComponent)
        .first()
        .find('.zent-tabs-tab-delete')
        .simulate('click');
      expect(wrapper.find(tabComponent).length).toBe(2);
      expect(wrapper.state('tabs')).toEqual(['quux', 'bar']);
    };

    ensure('normal');
    ensure('card');
  });

  it('navExtraContent', () => {
    const wrapper = mount(
      <Tabs activeId="foobar" navExtraContent={<span>当前网点：文三路店</span>}>
        <TabPanel id="foobar" tab="foobar-tab">
          foobar
        </TabPanel>
      </Tabs>
    );
    expect(wrapper.find('.zent-tabs-nav-extra-content').length).toBe(1);
  });
});

describe('VerticalTabs', () => {
  const TabPanel = VerticalTabs.TabPanel;
  const Divide = VerticalTabs.Divide;

  it('render VerticalTabsNav and VerticalTab and  with children', () => {
    const wrapper = mount(
      <VerticalTabs activeId="foo">
        <TabPanel id="foo" tab="for-tab">
          foo
        </TabPanel>
      </VerticalTabs>
    );
    expect(wrapper.find('VerticalTabsNav').length).toBe(1);
    expect(wrapper.find('VerticalTab').length).toBe(1);
  });

  it('render divide with children', () => {
    const wrapper = mount(
      <VerticalTabs activeId="foo">
        <TabPanel id="foo" tab="for-tab">
          foo
        </TabPanel>
        <Divide />
        <TabPanel id="bar" tab="bar-tab">
          bar
        </TabPanel>
      </VerticalTabs>
    );
    expect(wrapper.find('.zent-tabs-divide').length).toBe(1);
  });

  it('render divide with tabs prop', () => {
    const wrapper = mount(
      <VerticalTabs
        activeId="1"
        tabs={[
          {
            title: '选项一',
            key: '1',
          },
          {
            divide: true,
          },
          {
            title: '选项二',
            key: '2',
          },
        ]}
      />
    );
    expect(wrapper.find('.zent-tabs-divide').length).toBe(1);
  });

  it('scrollHeight', () => {
    const wrapper = mount(
      <VerticalTabs
        activeId="1"
        scrollHeight={100}
        tabs={[
          {
            title: '选项一',
            key: '1',
          },
          {
            title: '选项二',
            key: '2',
          },
        ]}
      />
    );
    expect(
      wrapper.find('.zent-tabs-scroll').getDOMNode().getAttribute('style')
    ).toBe('max-height: 100px;');
  });
});
