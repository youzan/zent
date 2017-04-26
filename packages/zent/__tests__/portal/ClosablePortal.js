import React from 'react';
import { shallow } from 'enzyme';
import Portal from 'portal/ClosablePortal';

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
