import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Card from '../src/card';

Enzyme.configure({ adapter: new Adapter() });

describe('Card', () => {
  it('should render children in card-body', () => {
    const card = shallow(
      <Card>
        <p>card items</p>
      </Card>
    );
    expect(card.find('.zent-card-body').children().length).toBe(1);
  });
  it('should only render title in header', () => {
    const card = shallow(
      <Card title="card title">
        <p>card items</p>
      </Card>
    );
    expect(card.find('.zent-card-header__action').length).toBe(0);
    expect(card.find('.zent-card-header__title').text()).toBe('card title');
  });
  it('should only render action in header', () => {
    const card = shallow(
      <Card action="act">
        <p>card items</p>
      </Card>
    );
    expect(card.find('.zent-card-header__title').length).toBe(0);
    expect(card.find('.zent-card-header__action').text()).toBe('act');
  });
  it('both render title and action in header', () => {
    const card = shallow(<Card title="card title" action="act" />);
    expect(card.find('.zent-card-header__title').text()).toBe('card title');
    expect(card.find('.zent-card-header__action').text()).toBe('act');
  });
  it('should change card-body style by bodyStyle', () => {
    const card = shallow(<Card bodyStyle={{ background: 'blue' }} />);
    const cardBody = card.find('.zent-card-body');
    expect(cardBody.prop('style').background).toBe('blue');
  });
});
