import React from 'react';
import { mount, shallow } from 'enzyme';

import Breadcrumb from '../src';

describe('Breadcrumb', () => {
  it('can append item through jsx', () => {
    const wrapper = mount(
      <Breadcrumb>
        <Breadcrumb.Item name="foo" href="bar" />
        <Breadcrumb.Item name="bar" href="foo" className="bread-link" />
        <Breadcrumb.Item name="foobar" className="bread-span" />
      </Breadcrumb>
    );
    expect(wrapper.find('a').length).toBe(2);
    expect(wrapper.find('a.bread-link').length).toBe(1);
    expect(wrapper.find('a.bread-link').text()).toBe('bar');
    expect(wrapper.find('a[href="bar"]').length).toBe(1);
    expect(wrapper.find('a[href="bar"]').text()).toBe('foo');
    expect(wrapper.find('span.bread-span').length).toBe(1);
    expect(wrapper.find('span.bread-span').text()).toBe('foobar');
  });

  it('can append item through array prop: breads', () => {
    const breads = [
      {
        name: 'foo',
        href: 'bar'
      }, {
        name: 'bar',
        href: 'foo',
        className: 'bread-link'
      }, {
        name: 'foobar',
        className: 'bread-span'
      }
    ];
    const wrapper = mount(
      <Breadcrumb breads={breads} />
    );
    expect(wrapper.find('a').length).toBe(2);
    expect(wrapper.find('a.bread-link').length).toBe(1);
    expect(wrapper.find('a.bread-link').text()).toBe('bar');
    expect(wrapper.find('a[href="bar"]').length).toBe(1);
    expect(wrapper.find('a[href="bar"]').text()).toBe('foo');
    expect(wrapper.find('a[href="bar"]').text()).toBe('foo');
    expect(wrapper.find('span.bread-span').length).toBe(1);
    expect(wrapper.find('span.bread-span').text()).toBe('foobar');
  });

  it('can append items from children props and array prop: breads simultaneously, children ahead', () => {
    const breads = [
      {
        name: 'foo',
        href: 'bar',
        className: 'foobar'
      }
    ];
    const wrapper = mount(
      <Breadcrumb breads={breads}>
        <Breadcrumb.Item name="bar" href="foo" className="barfoo" />
      </Breadcrumb>
    );
    expect(wrapper.find('a').length).toBe(2);
    expect(wrapper.find('a').first().text()).toBe('bar');
    expect(wrapper.find('a').last().text()).toBe('foo');
    expect(wrapper.find('.foobar').length).toBe(1);
    expect(wrapper.find('.barfoo').length).toBe(1);
  });

  it('will render a empty div without prop or children', () => {
    const wrapper = mount(<Breadcrumb />);
    expect(wrapper.contains(
      <div className="zent-breadcrumb " />
    )).toBe(true);
    expect(wrapper.find('div').text()).toBe('');
  });

  it('can have costom bread item', () => {
    const wrapper = mount(
      <Breadcrumb>
        <span className="foo">bar</span>
        <Breadcrumb.Item>
          <a href="bar">foo</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item name="barfoo" href="barfoo">
          <a href="foobar">foobar</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item name="regularfoo" href="regularbar" />
      </Breadcrumb>
    );
    expect(wrapper.find('span').length).toBe(1);
    expect(wrapper.find(Breadcrumb).children().at(0)
      .type()).toBe('span');
    expect(wrapper.find('span.foo').text()).toBe('bar');
    expect(wrapper.find('a').length).toBe(3);
    expect(wrapper.find(Breadcrumb.Item).at(0).find('[href="bar"]').length)
      .toBe(1);
    expect(wrapper.find(Breadcrumb.Item).at(1).find('a').length).toBe(1);
    expect(wrapper.find(Breadcrumb.Item).at(1).find('[href="barfoo"]')
      .isEmpty()).toBe(true);
    expect(wrapper.find(Breadcrumb.Item).at(2).find('[href="regularbar"]')
      .isEmpty()).toBe(false);
  });

  it('can load custom props to Breadcrumb.Item', () => {
    const breads = [
      {
        name: 'foo',
        href: 'bar',
        className: 'foobar',
        fooProp: 'barProp'
      }
    ];
    const wrapper = mount(
      <Breadcrumb breads={breads}>
        <Breadcrumb.Item name="bar" href="foo" className="barfoo" barProp="fooProp" />
      </Breadcrumb>
    );
    expect(wrapper.find(Breadcrumb.Item).length).toBe(2);
    expect(wrapper.find(Breadcrumb.Item).length).toBe(2);
    expect(wrapper.find(Breadcrumb.Item).at(0).props().barProp).toBe('fooProp');
    expect(wrapper.find(Breadcrumb.Item).at(1).props().fooProp).toBe('barProp');
  });

  it('className default to zent-breadcrumb ', () => {
    const wrapper = shallow(<Breadcrumb />);
    expect(wrapper.find('.zent-breadcrumb').length).toBe(1);
  });

  it('can have custom prefix', () => {
    const wrapper = shallow(<Breadcrumb prefix="foo" />);
    expect(wrapper.find('.foo-breadcrumb').length).toBe(1);
  });

  it('can have custom className', () => {
    const wrapper = shallow(<Breadcrumb prefix="foo" className="bar" />);
    expect(wrapper.contains(
      <div className="foo-breadcrumb bar" />
    )).toBe(true);
  });
});
