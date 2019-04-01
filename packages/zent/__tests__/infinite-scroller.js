import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import InfiniteScroller from 'infinite-scroller';

Enzyme.configure({ adapter: new Adapter() });

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

  it('can have initialLoad', () => {
    class Test extends React.Component {
      state = {
        list: [1, 2, 3],
      };

      loadMore = () => {
        const { list } = this.state;
        const last = list[list.length - 1];

        this.setState({
          list: [...list, last + 1],
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
    expect(wrapper.find('.child').length).toBe(4);
  });

  it('can stop initialLoad', () => {
    class Test extends React.Component {
      state = {
        list: [1, 2, 3],
      };

      loadMore = () => {
        const { list } = this.state;
        const last = list[list.length - 1];

        this.setState({
          list: [...list, last + 1],
        });
      };

      render() {
        const { list } = this.state;
        return (
          <InfiniteScroller initialLoad={false} loadMore={this.loadMore}>
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
    expect(wrapper.find('.child').length).toBe(3);
  });

  it('can scroll to bottom and load more not using window', () => {
    class Test extends React.Component {
      state = {
        list: [1, 2, 3],
      };

      loadMore = stopLoading => {
        const { list } = this.state;
        const last = list[list.length - 1];

        this.setState({
          list: [...list, last + 1],
        });

        stopLoading && stopLoading();
      };

      render() {
        const { list } = this.state;
        return (
          <InfiniteScroller
            ref={scroll => (this.scroll = scroll)}
            initialLoad={false}
            useWindow={false}
            loadMore={this.loadMore}
          >
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
    wrapper.instance().scroll.handleScroll();
    wrapper.update();
    expect(wrapper.find('.child').length).toBe(4);
  });

  it('can scroll to bottom and load more use window', () => {
    class Test extends React.Component {
      state = {
        list: [1, 2, 3],
      };

      loadMore = () => {
        const { list } = this.state;
        const last = list[list.length - 1];

        this.setState({
          list: [...list, last + 1],
        });

        return Promise.resolve();
      };

      render() {
        const { list } = this.state;
        return (
          <InfiniteScroller
            ref={scroll => (this.scroll = scroll)}
            initialLoad={false}
            loadMore={this.loadMore}
          >
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
    wrapper.instance().scroll.handleScroll();
    wrapper.update();
    expect(wrapper.find('.child').length).toBe(4);
  });

  it('loading will disappear when promise reject', () => {
    class Test extends React.Component {
      state = {
        list: [1, 2, 3],
      };

      loadMore = () => {
        const { list } = this.state;
        const last = list[list.length - 1];

        this.setState({
          list: [...list, last + 1],
        });

        return Promise.reject();
      };

      render() {
        const { list } = this.state;
        return (
          <InfiniteScroller
            ref={scroll => (this.scroll = scroll)}
            initialLoad={false}
            loader={<div>loading</div>}
            loadMore={this.loadMore}
          >
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
    wrapper.instance().scroll.handleScroll();
    wrapper.update();
    expect(wrapper.find('.child').length).toBe(4);
  });

  it('can stop load more', () => {
    class Test extends React.Component {
      state = {
        list: [1, 2, 3],
      };

      loadMore = () => {
        const { list } = this.state;
        const last = list[list.length - 1];

        this.setState({
          list: [...list, last + 1],
        });
      };

      render() {
        const { list } = this.state;
        return (
          <InfiniteScroller
            ref={scroll => (this.scroll = scroll)}
            initialLoad={false}
            hasMore={false}
            useWindow={false}
            loadMore={this.loadMore}
          >
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
    wrapper.instance().scroll.handleScroll();
    expect(wrapper.find('.child').length).toBe(3);
  });

  it('wont load more untils scroll at bottom', () => {
    class Test extends React.Component {
      state = {
        list: [1, 2, 3],
      };

      loadMore = () => {
        const { list } = this.state;
        const last = list[list.length - 1];

        this.setState({
          list: [...list, last + 1],
        });
      };

      render() {
        const { list } = this.state;
        return (
          <InfiniteScroller
            ref={scroll => (this.scroll = scroll)}
            initialLoad={false}
            offset={-500}
            hasMore={false}
            useWindow={false}
            loadMore={this.loadMore}
          >
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
    wrapper.instance().scroll.handleScroll();
    expect(wrapper.find('.child').length).toBe(3);
  });
});
