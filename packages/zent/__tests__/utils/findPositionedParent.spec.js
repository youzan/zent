import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import findPositionedParent from '../../src/utils/dom/findPositionedParent';

Enzyme.configure({ adapter: new Adapter() });

describe('findPositionedParent', () => {
  it('a noop if element not found', () => {
    expect(findPositionedParent(null)).toBe(null);
  });

  it('returns the closest positioned parent', () => {
    let outer, inner, root;
    const saveInner = v => {
      inner = v;
    };
    const saveOuter = v => {
      outer = v;
    };
    const saveRoot = v => {
      root = v;
    };

    const wrapper = mount(
      <div>
        <div style={{ position: 'relative' }} ref={saveRoot} className="quux">
          <div ref={saveOuter}>
            <div style={{ position: 'absolute' }} className="foobar">
              <div>
                <span ref={saveInner}>11</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    expect(findPositionedParent(inner).classList.contains('foobar')).toBe(true);
    expect(findPositionedParent(outer).classList.contains('quux')).toBe(true);
    expect(findPositionedParent(root)).toBe(document.documentElement);
    expect(findPositionedParent(root, true)).toBe(root);

    wrapper.unmount();
  });
});
