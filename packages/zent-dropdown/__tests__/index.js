import React from 'react';
import { mount } from 'enzyme';
import Dropdown from '../src';

const { Content, Trigger } = Dropdown;

describe('Dropdown', () => {
  it('will render a standard popover and reconstructure its children and get default props right', () => {
    const wrapper = mount(
      <Dropdown>
        <Trigger>
          <a className="test-trigger">Hover Example</a>
        </Trigger>
        <Content>
          <div className="test-content">
            Dropdown any content
          </div>
        </Content>
      </Dropdown>
    );
    expect(wrapper.find('Popover').length).toBe(1);
    expect(wrapper.find('.test-trigger').length).toBe(1);
    expect(wrapper.find('PopoverHoverTrigger').length).toBe(1);
    expect(wrapper.find('PopoverContent').length).toBe(1);
  });

  it('Dropdown will validate its children', () => {
    expect(() => {
      mount(
        <Dropdown>
          <Content>
            <div>Only one child got error</div>
          </Content>
        </Dropdown>
      );
    }).toThrow();
    expect(() => {
      mount(
        <Dropdown>
          <div>Without trigger will got error</div>
          <Content>
            <div>Only one child got error</div>
          </Content>
        </Dropdown>
      );
    }).toThrow();
    expect(() => {
      mount(
        <Dropdown>
          <div>Without content will got error, too</div>
          <Trigger>
            <div>Only one child got error</div>
          </Trigger>
        </Dropdown>
      );
    }).toThrow();
  });
});
