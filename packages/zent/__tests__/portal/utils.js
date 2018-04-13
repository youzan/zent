/**
 * utils
 *
 * @author hyczzhu
 */
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { isDescendant } from 'portal/util';

Enzyme.configure({ adapter: new Adapter() });

describe('util', () => {
  function createContainer(className = 'custom-container') {
    const container = document.createElement('div');
    container.className = className;
    document.body.appendChild(container);
    return container;
  }

  function removeContainer(container) {
    container.parentNode.removeChild(container);
  }

  it('should support DOM Element as `selector`', () => {
    const container = createContainer();
    const container2 = createContainer('container2');
    expect(isDescendant(container, container2)).toBe(false);
    removeContainer(container);
    removeContainer(container2);
  });
});
