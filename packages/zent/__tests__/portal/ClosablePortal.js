import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Portal from 'portal/ClosablePortal';

Enzyme.configure({ adapter: new Adapter() });

describe('ClosablePortal', () => {
  it('should render a portal if visible is true', () => {
    expect(
      shallow(
        <Portal visible>
          <div>foobar</div>
        </Portal>
      ).contains(<div>foobar</div>)
    ).toBe(true);

    expect(
      shallow(
        <Portal visible={false}>
          <div>foobar</div>
        </Portal>
      ).contains(<div>foobar</div>)
    ).toBe(false);
  });
});
