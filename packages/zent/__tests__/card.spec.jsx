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
  it('should render borderless card', () => {
    const card = shallow(
      <Card bordered={false}>
        <p>card items</p>
      </Card>
    );
    expect(card.find('.zent-card--borderless').length).toBe(1);
  });
  it('card loading', () => {
    const card = shallow(
      <Card loading>
        <p>card items</p>
      </Card>
    );
    expect(card.find('TextBlock').length).toBe(1);
  });
});

describe('Small Card', () => {
  it('should render children in card-body', () => {
    const card = shallow(
      <Card size="small">
        <p>card items</p>
      </Card>
    );
    expect(card.find('.zent-card-body').children().length).toBe(1);
  });
  it('should only render title in header', () => {
    const card = shallow(
      <Card size="small" title="card title">
        card items
      </Card>
    );
    expect(card.find('.zent-card-header__action').length).toBe(0);
    expect(card.find('.zent-card-header').text()).toBe('card title');
    expect(card.find('.zent-card-body').text()).toBe('card items');
  });
  it('should render left extra', () => {
    const card = shallow(
      <Card size="small" leftExtra="left extra">
        <p>card items</p>
      </Card>
    );
    expect(card.find('.zent-card__left-extra').length).toBe(1);
    expect(card.find('.zent-card__left-extra').text()).toBe('left extra');
  });
  it('should render right extra', () => {
    const card = shallow(
      <Card size="small" rightExtra="right extra">
        <p>card items</p>
      </Card>
    );
    expect(card.find('.zent-card__right-extra').length).toBe(1);
    expect(card.find('.zent-card__right-extra').text()).toBe('right extra');
  });
  it('should render bottom extra', () => {
    const card = shallow(
      <Card size="small" bottomExtra="bottom extra">
        <p>card items</p>
      </Card>
    );
    expect(card.find('.zent-card__bottom-extra').length).toBe(1);
    expect(card.find('.zent-card__bottom-extra').text()).toBe('bottom extra');
  });
  it('small card loading', () => {
    const card = shallow(
      <Card size="small" loading>
        <p>card items</p>
      </Card>
    );
    expect(card.find('TextBlock').length).toBe(1);
  });
});
