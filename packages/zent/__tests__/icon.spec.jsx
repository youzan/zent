import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Icon from '../src/icon';

Enzyme.configure({ adapter: new Adapter() });

describe('Icon', () => {
  it('Icon will render an <i> element has default className', () => {
    const wrapper = shallow(<Icon type="summary" />);
    expect(wrapper.find('i').length).toBe(1);
    expect(wrapper.find('i').hasClass('zenticon')).toBe(true);
  });

  it('Icon can have custom className, spin switch', () => {
    const wrapper = shallow(<Icon type="summary" spin className="foo" />);
    expect(wrapper.find('i').length).toBe(1);
    expect(wrapper.find('i').hasClass('foo')).toBe(true);
    expect(wrapper.find('i').hasClass('zenticon-spin')).toBe(true);
  });
});
