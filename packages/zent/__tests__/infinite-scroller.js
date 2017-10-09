import React from 'react';
import { mount, shallow } from 'enzyme';
import InfiniteScroller from 'infinite-scroller';

describe('InfiniteScroller', () => {
  it('className default to zent-infinite-scroller ', () => {
    const wrapper = shallow(<InfiniteScroller />);
    expect(wrapper.hasClass('zent-infinite-scroller')).toBe(true);
  });

  it('can have custom prefix', () => {
    const wrapper = shallow(<InfiniteScroller prefix="dwb" />);
    expect(wrapper.hasClass('dwb-infinite-scroller')).toBe(true);
  });

  it('can have custom className', () => {
    const wrapper = shallow(<InfiniteScroller className="dengwenbo" />);
    expect(wrapper.hasClass('dengwenbo')).toBe(true);
  });

  it('can scroll to bottom and load more', () => {
    class Test extends React.Component {
      state = {
        list: [1, 2, 3]
      };

      loadMore = () => {
        const { list } = this.state;
        const last = list[list.length - 1];

        this.setState({
          list: [...list, last + 1]
        });
      };

      render() {
        const { list } = this.state;
        return (
          <InfiniteScroller loadMore={this.loadMore}>
            {list.map(item => (
              <div className="child" key={item}>
                {item}
              </div>
            ))}
          </InfiniteScroller>
        );
      }
    }
    const wrapper = mount(<Test />);
    wrapper.simulate('scroll', 200);
    expect(wrapper.find('.child').length).toBe(4);
    wrapper.unmount();
  });

  it('can stop load more', () => {
    class Test extends React.Component {
      state = {
        list: [1, 2, 3]
      };

      loadMore = () => {
        const { list } = this.state;
        const last = list[list.length - 1];

        this.setState({
          list: [...list, last + 1]
        });
      };

      render() {
        const { list } = this.state;
        return (
          <InfiniteScroller hasMore={false} loadMore={this.loadMore}>
            {list.map(item => (
              <div className="child" key={item}>
                {item}
              </div>
            ))}
          </InfiniteScroller>
        );
      }
    }
    const wrapper = mount(<Test />);
    wrapper.simulate('scroll', 200);
    expect(wrapper.find('.child').length).toBe(3);
    wrapper.unmount();
  });

  it('wont load more until scroll to bottom', () => {
    class Test extends React.Component {
      state = {
        list: [1, 2, 3]
      };

      loadMore = () => {
        const { list } = this.state;
        const last = list[list.length - 1];

        this.setState({
          list: [...list, last + 1]
        });
      };

      render() {
        const { list } = this.state;
        return (
          <InfiniteScroller offset={-100} loadMore={this.loadMore}>
            {list.map(item => (
              <div className="child" key={item}>
                {item}
              </div>
            ))}
          </InfiniteScroller>
        );
      }
    }
    const wrapper = mount(<Test />);
    wrapper.simulate('scroll', { deltaX: 10 });
    expect(wrapper.find('.child').length).toBe(3);
    wrapper.unmount();
  });
});
