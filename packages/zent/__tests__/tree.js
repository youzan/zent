import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AnimateHeight from 'utils/component/AnimateHeight';
import NewTree from 'tree/Tree';

Enzyme.configure({ adapter: new Adapter() });

beforeAll(() => {
  let timestamp = 0;
  window.requestAnimationFrame = fn =>
    setTimeout(() => {
      fn((timestamp += 10));
    }, 0);

  // FIXME: if test fails, you may need to adjust this value
  /* eslint-disable */
  try {
    HTMlElement.scrollHeight = 75;
    HTMLElement.prototype.scrollHeight = 75;
  } catch (e) {}
  /* eslint-enable */
});

// test for new tree
describe('new Tree', () => {
  it('Tree support "props" data, and will be keyword when render, includes "id"、"title"、"children"、"parentId"', () => {
    const data = [
      {
        uId: 1,
        name: 'root',
        leaderId: 0,
      },
      {
        uId: 2,
        name: 'son',
        leaderId: 1,
      },
      {
        uId: 3,
        name: 'grandSon',
        leaderId: 2,
      },
      {
        uId: 4,
        name: 'anotherSon',
        leaderId: 1,
      },
    ];

    const renderKey = {
      id: 'uId',
      title: 'name',
      parentId: 'leaderId',
      children: 'group',
    };

    const wrapper = mount(
      <NewTree dataType="plain" renderKey={renderKey} data={data} />
    );
    const state = wrapper.state();
    expect(
      wrapper
        .find('span')
        .at(0)
        .text()
    ).toBe('root');
    expect(state.tree[0].name).toBe('root');
    expect(state.tree[0].uId).toBe(1);
    expect(state.tree[0].group.length).toBe(2);
    expect(state.tree[0].group[0].leaderId).toBe(1);

    const renderKey2 = {
      id: 'uId',
      title: 'name',
      parentId: 'leaderId',
      // children use defaulft 'children'
    };
    const wrapper2 = mount(
      <NewTree dataType="plain" renderKey={renderKey2} data={data} />
    );
    expect(wrapper2.state().tree[0].children.length).toBe(2);
  });

  it('Tree support "plain" data, and will be transfer to "tree" data when render, and will render default element structure', () => {
    const data = [
      {
        id: 1,
        title: 'root',
        parentId: 0,
      },
      {
        id: 2,
        title: 'son',
        parentId: 1,
      },
      {
        id: 3,
        title: 'grandSon',
        parentId: 2,
      },
      {
        id: 4,
        title: 'anotherSon',
        parentId: 1,
      },
    ];
    const wrapper = shallow(<NewTree dataType="plain" data={data} />);
    /**
     * ul.zent-tree
     *   li
     *     .zent-tree-bar.off?
     *       icon
     *       .zent-tree-node
     *         span
     *           {{title}}
     *     ul.zent-tree-child
     *       li
     *         .zent-tree-bar.off?
     *         ...
     */
    expect(wrapper.type()).toBe('ul');
    expect(wrapper.hasClass('zent-tree')).toBe(true);
    expect(wrapper.find('.zent-tree').find('li').length).toBe(4);
    expect(wrapper.find('.zent-tree').find('ul').length).toBe(3);
    expect(
      wrapper
        .find('.zent-tree')
        .children()
        .at(0)
        .type()
    ).toBe('li');
    expect(
      wrapper
        .find('li')
        .at(0)
        .childAt(0)
        .type()
    ).toBe('div');
    expect(
      wrapper
        .find('li')
        .at(0)
        .childAt(1)
        .type()
    ).toBe(AnimateHeight);
    expect(
      wrapper
        .find('li')
        .at(0)
        .childAt(1)
        .childAt(0)
        .type()
    ).toBe('ul');
    const example = wrapper
      .find('li')
      .at(0)
      .childAt(0);
    expect(example.hasClass('zent-tree-bar')).toBe(true);
    expect(example.hasClass('off')).toBe(true);
    expect(example.children().length).toBe(2);
    expect(example.childAt(0).type()).toBe('i');
    expect(example.childAt(1).type()).toBe('div');
    expect(example.childAt(1).hasClass('zent-tree-node')).toBe(true);
    expect(example.childAt(1).find('span').length).toBe(1);
    expect(
      example
        .childAt(1)
        .find('span')
        .text()
    ).toBe('root');
  });

  it('Tree support "tree" data as default set', () => {
    const data = [
      {
        id: 1,
        title: 'root',
        children: [
          {
            id: 2,
            title: 'son',
            children: [
              {
                id: 3,
                title: 'grandSon',
              },
            ],
          },
          {
            id: 4,
            title: 'anotherSon',
          },
        ],
      },
    ];
    const wrapper = shallow(<NewTree data={data} />);
    expect(wrapper.type()).toBe('ul');
    expect(wrapper.hasClass('zent-tree')).toBe(true);
    expect(wrapper.find('.zent-tree').find('li').length).toBe(4);
    expect(wrapper.find('.zent-tree').find('ul').length).toBe(3);
    expect(
      wrapper
        .find('.zent-tree')
        .children()
        .at(0)
        .type()
    ).toBe('li');
    expect(
      wrapper
        .find('li')
        .at(0)
        .childAt(0)
        .type()
    ).toBe('div');
    expect(
      wrapper
        .find('li')
        .at(0)
        .childAt(1)
        .type()
    ).toBe(AnimateHeight);
    /**
     * No icon in Node without Leaf
     * .zent-tree-bar.off?
     *   .zent-tree-node
     *     span||{{title}}
     */
    const example = wrapper
      .find('li')
      .at(2)
      .childAt(0);
    expect(example.hasClass('zent-tree-bar')).toBe(true);
    expect(example.hasClass('off')).toBe(true);
    expect(example.children().length).toBe(1);
    expect(example.childAt(0).type()).toBe('div');
    expect(example.childAt(0).hasClass('zent-tree-node')).toBe(true);
    expect(example.childAt(0).find('span').length).toBe(1);
    expect(
      example
        .childAt(0)
        .find('span')
        .text()
    ).toBe('grandSon');
  });

  // BUG: 应该在deepClone里直接抛出一个错误
  // HACK: console.error
  // it('Tree act weried when there is something wrong in root arr of data or dataType prop', () => {
  //   const data = [
  //     {
  //       id: 1,
  //       title: 'root',
  //       children: [
  //         {
  //           id: 2,
  //           title: 'son',
  //           children: [
  //             {
  //               id: 3,
  //               title: 'grandSon'
  //             }
  //           ]
  //         }, {
  //           id: 4,
  //           title: 'anotherSon',
  //         }
  //       ]
  //     },
  //     'Here is !Wrong Data!'
  //   ];
  //   expect(() => { shallow(<NewTree data={data} />) }).not.toThrow();
  //   expect(() => { shallow(<NewTree data={[{ id: 1, title: 'root', parentId: 0 }]} dataType="wrongType" />) }).not.toThrow();
  // });

  it('Support isLeaf sign and isRoot prop method with "plain" data', () => {
    const data = [
      {
        id: 1,
        title: 'root',
        isRoot: true,
      },
      {
        id: 2,
        title: 'son',
        parentId: 1,
      },
      {
        id: 3,
        title: 'grandSon',
        parentId: 2,
        isLeaf: true,
      },
      {
        id: 4,
        title: 'anotherSon',
        parentId: 1,
      },
    ];
    const wrapper = shallow(
      <NewTree dataType="plain" data={data} isRoot={node => node.isRoot} />
    );
    expect(wrapper.type()).toBe('ul');
    expect(wrapper.hasClass('zent-tree')).toBe(true);
    expect(wrapper.find('.zent-tree').find('li').length).toBe(4);
    expect(wrapper.find('.zent-tree').find('ul').length).toBe(3);
    expect(
      wrapper
        .find('.zent-tree')
        .children()
        .at(0)
        .type()
    ).toBe('li');
    expect(
      wrapper
        .find('li')
        .at(0)
        .childAt(0)
        .type()
    ).toBe('div');
    expect(
      wrapper
        .find('li')
        .at(0)
        .childAt(1)
        .type()
    ).toBe(AnimateHeight);
    const example = wrapper
      .find('li')
      .at(0)
      .childAt(0);
    expect(example.hasClass('zent-tree-bar')).toBe(true);
    expect(example.hasClass('off')).toBe(true);
    expect(example.children().length).toBe(2);
    expect(example.childAt(0).type()).toBe('i');
    expect(example.childAt(1).type()).toBe('div');
    expect(example.childAt(1).hasClass('zent-tree-node')).toBe(true);
    expect(example.childAt(1).find('span').length).toBe(1);
    expect(
      example
        .childAt(1)
        .find('span')
        .text()
    ).toBe('root');
  });

  it('Tree Support expandAll prop and render function as prop', () => {
    const data = [
      {
        id: 1,
        title: 'root',
      },
      {
        id: 2,
        title: 'son',
        parentId: 1,
      },
      {
        id: 3,
        title: 'grandSon',
        parentId: 2,
        isLeaf: true,
      },
      {
        id: 4,
        title: 'anotherSon',
        parentId: 1,
      },
    ];
    const wrapper = shallow(
      <NewTree
        dataType="plain"
        data={data}
        render={node => `zent-${node.title}`}
        expandAll
      />
    );
    expect(
      wrapper
        .find('span')
        .at(0)
        .text()
    ).toBe('zent-root');
  });

  it('Tree Support foldable to control expandable', () => {
    const data = [
      {
        id: 1,
        title: 'root',
      },
      {
        id: 2,
        title: 'son',
        parentId: 1,
      },
      {
        id: 3,
        title: 'grandSon',
        parentId: 2,
        isLeaf: true,
      },
      {
        id: 4,
        title: 'anotherSon',
        parentId: 1,
      },
    ];
    const onExpandMock = jest.fn();
    const onSelectMock = jest.fn();
    const wrapper = shallow(
      <NewTree
        dataType="plain"
        data={data}
        render={node => `zent-${node.title}`}
        expandAll
        foldable={false}
        onExpand={onExpandMock}
        onSelect={onSelectMock}
      />
    );

    wrapper
      .find('i')
      .at(0)
      .simulate('click', { currentTarget: { classList: [] } });
    wrapper
      .find('.content')
      .at(0)
      .simulate('click', { currentTarget: { classList: [] } });

    expect(wrapper.find('off').length).toBe(0);
    expect(onExpandMock.mock.calls.length).toBe(0);
    expect(onSelectMock.mock.calls.length).toBe(1);
  });

  it('Tree will treat node as an empty value with "plain" type when cound not find its parent except root node', () => {
    const data = [
      {
        id: 1,
        title: 'root',
        isRoot: true,
      },
      {
        id: 2,
        title: 'sonOfOthers',
        parentId: 3,
      },
    ];
    const wrapper = shallow(<NewTree dataType="plain" data={data} />);
    expect(wrapper.find('li').length).toBe(1);
    expect(
      wrapper
        .find('li')
        .find('span')
        .text()
    ).toBe('root');
  });

  it('Tree will update when data prop changed', () => {
    const initialData = [
      {
        id: 1,
        title: 'root',
        parentId: 0,
      },
      {
        id: 2,
        title: 'son',
        parentId: 1,
      },
    ];
    const wrapper = mount(<NewTree dataType="plain" data={initialData} />);
    expect(wrapper.find('li').length).toBe(2);
    // HACK: branch
    wrapper.setProps({ data: initialData });
    expect(wrapper.find('li').length).toBe(2);
    const updatedData = [
      {
        id: 1,
        title: 'root',
        parentId: 0,
      },
      {
        id: 2,
        title: 'son',
        parentId: 1,
      },
      {
        id: 3,
        title: 'daughter',
        parentId: 1,
      },
      {
        id: 4,
        title: 'littleSon',
        parentId: 1,
      },
      {
        id: 5,
        title: 'littleDaughter',
        parentId: 1,
      },
      {
        id: 6,
        title: 'grandSon',
        parentId: 2,
      },
      {
        id: 7,
        title: 'grandDaughter',
        parentId: 2,
      },
      {
        id: 8,
        title: 'grandSon',
        parentId: 3,
      },
      {
        id: 9,
        title: 'grandDaughter',
        parentId: 3,
      },
    ];
    wrapper.setProps({ data: updatedData });
    expect(wrapper.find('li').length).toBe(9);

    let onCheckedData;

    const checkableWrapper = mount(
      <NewTree
        dataType="plain"
        data={updatedData}
        checkable
        checkedKeys={[3, 6]}
        disabledCheckedKeys={[4, 5]}
        onCheck={checkedData => {
          onCheckedData = checkedData;
          wrapper.setProps({
            checkedKeys: onCheckedData,
          });
        }}
      />
    );

    const checkboxList = checkableWrapper.find('Checkbox');
    expect(checkboxList.length).toBe(9);
    expect(checkboxList.at(0).prop('indeterminate')).toBe(true);
    expect(checkboxList.at(2).prop('checked')).toBe(true);
    expect(checkboxList.at(7).prop('disabled')).toBe(true);
  });

  it('The click event from Span or Icon will trigger expand', () => {
    const data = [
      {
        id: 1,
        title: 'root',
        parentId: 0,
      },
      {
        id: 2,
        title: 'son',
        parentId: 1,
      },
      {
        id: 3,
        title: 'daughter',
        parentId: 1,
      },
      {
        id: 4,
        title: 'grandSon',
        parentId: 2,
      },
    ];
    const wrapper = mount(<NewTree dataType="plain" data={data} />);
    const rootSpan = wrapper.find('span').at(0);
    const sonSpan = wrapper.find('span').at(1);
    const grandSonSpan = wrapper.find('span').at(2);
    const daughterSpan = wrapper.find('span').at(3);
    expect(rootSpan.text()).toBe('root');
    expect(sonSpan.text()).toBe('son');
    expect(grandSonSpan.text()).toBe('grandSon');
    expect(daughterSpan.text()).toBe('daughter');
    expect(rootSpan.closest('.zent-tree-bar').hasClass('off')).toBe(true);
    rootSpan.simulate('click');
    // jest.runAllTimers();

    // NOTE: jest and enzyme couldn't simulate switcher.click()
    // expect(rootSpan.closest('.zent-tree-bar').hasClass('off')).toBe(true);
    // const iconRoot = wrapper.find('i').at(0);
    // iconRoot.simulate('click');
    // jest.runAllTimers();
    // expect(rootSpan.closest('.zent-tree-bar').hasClass('off')).toBe(false);
    // iconRoot.simulate('click');
    // jest.runAllTimers();
    // expect(rootSpan.closest('.zent-tree-bar').hasClass('off')).toBe(true);
    // expect(
    //   rootSpan.closest('.zent-tree-bar').getNode().nextSibling.style.display
    // ).toBe('none');
    // iconRoot.simulate('click');
    // jest.runAllTimers();
    // expect(rootSpan.closest('.zent-tree-bar').hasClass('off')).toBe(false);
    // expect(
    //   rootSpan.closest('.zent-tree-bar').getNode().nextSibling.style.display
    // ).toBe('block');

    const onExpandMock = jest.fn();
    const expandWrapper = mount(
      <NewTree dataType="plain" data={data} onExpand={onExpandMock} />
    );
    const expandIcon = expandWrapper.find('i').at(0);
    expandIcon.simulate('click');
    // jest.runAllTimers();
    expect(onExpandMock.mock.calls.length).toBe(1);
    expect(onExpandMock.mock.calls[0][1].isExpanded).toBe(true);
    expandIcon.simulate('click');
    // jest.runAllTimers();
    expect(onExpandMock.mock.calls.length).toBe(2);
    expect(onExpandMock.mock.calls[1][1].isExpanded).toBe(false);

    // HACK: triggerSwitherClick branch
    const hackData = [
      {
        id: 1,
        title: 'root',
        children: [
          {
            id: 2,
            title: 'son',
          },
        ],
      },
    ];
    let hackWrapper = mount(<NewTree data={hackData} />);
    hackWrapper
      .find('span')
      .at(1)
      .simulate('click');
    const onSelectMock = jest.fn();
    hackWrapper = mount(<NewTree data={hackData} onSelect={onSelectMock} />);
    hackWrapper
      .find('span')
      .at(1)
      .simulate('click');
    expect(onSelectMock.mock.calls.length).toBe(1);
  });

  it('Tree will can not expand with prop "autoExpandOnSelect" false', () => {
    const data = [
      {
        id: 1,
        title: 'root',
        children: [
          {
            id: 2,
            title: 'son',
          },
        ],
      },
    ];
    const onExpandMock = jest.fn();
    const onSelectMock = jest.fn();
    const wrapper = mount(
      <NewTree
        data={data}
        autoExpandOnSelect={false}
        onSelect={onSelectMock}
        onExpand={onExpandMock}
      />
    );

    wrapper
      .find('.content')
      .at(0)
      .simulate('click');
    expect(
      wrapper
        .find('.zent-tree-bar')
        .at(0)
        .hasClass('off')
    ).toBe(true);
    expect(onExpandMock.mock.calls.length).toBe(0);
    expect(onSelectMock.mock.calls.length).toBe(1);

    wrapper
      .find('i')
      .at(0)
      .simulate('click');
    expect(
      wrapper
        .find('.zent-tree-bar')
        .at(0)
        .hasClass('off')
    ).toBe(false);
    expect(onExpandMock.mock.calls.length).toBe(1);
    expect(onSelectMock.mock.calls.length).toBe(1);
  });

  it('Tree will keep child state after their ancestor folded', () => {
    const data = [
      {
        id: 1,
        title: 'root',
        parentId: 0,
      },
      {
        id: 2,
        title: 'son',
        parentId: 1,
      },
      {
        id: 3,
        title: 'daughter',
        parentId: 1,
      },
      {
        id: 4,
        title: 'grandSon',
        parentId: 2,
      },
    ];
    const wrapper = mount(<NewTree dataType="plain" data={data} />);
    // const rootSpan = wrapper.find('span').at(0);
    // const sonSpan = wrapper.find('span').at(1);
    const iconRoot = wrapper.find('i').at(0);
    // const iconSon = wrapper.find('i').at(1);

    iconRoot.simulate('click');
    // jest.runAllTimers();
    // expect(rootSpan.closest('.zent-tree-bar').hasClass('off')).toBe(false);
    // expect(
    //   rootSpan.closest('.zent-tree-bar').getNode().nextSibling.style.display
    // ).not.toBe('none');
    // iconSon.simulate('click');
    // jest.runAllTimers();
    // expect(sonSpan.closest('.zent-tree-bar').hasClass('off')).toBe(false);
    // expect(
    //   sonSpan.closest('.zent-tree-bar').getNode().nextSibling.style.display
    // ).not.toBe('none');
    // iconRoot.simulate('click');
    // jest.runAllTimers();
    // // iconRoot.simulate('click');
    // // jest.runAllTimers();
    // expect(sonSpan.closest('.zent-tree-bar').hasClass('off')).toBe(false);
    // expect(
    //   sonSpan.closest('.zent-tree-bar').getNode().nextSibling.style.display
    // ).not.toBe('none');
  });

  it('Tree surpport aync load by loadMore prop which return a promise', () => {
    const loadMoreMock = jest.fn().mockImplementation(
      () =>
        new Promise(resolve => {
          setTimeout(resolve, 1000);
        })
    );
    const data = [
      {
        id: 1,
        parentId: 0,
        title: 'root',
      },
    ];
    const wrapper = mount(<NewTree data={data} loadMore={loadMoreMock} />);
    const rootIcon = wrapper.find('i');
    rootIcon.simulate('click');
    // jest.runAllTimers();
    expect(loadMoreMock.mock.calls.length).toBe(1);

    const dataWithEmptyArr = [
      {
        id: 0,
        title: 'root',
        children: [],
      },
    ];

    // BUG: loadMore in expand flow has no reject processing
    const loadMoreMockRejected = jest.fn().mockImplementation(
      () =>
        new Promise((resolve, reject) => {
          setTimeout(reject, 1000);
        })
    );
    const rejectWrapper = mount(
      <NewTree data={dataWithEmptyArr} loadMore={loadMoreMockRejected} />
    );
    const rejectIcon = rejectWrapper.find('i');

    expect(() => {
      rejectIcon.simulate('click');
      // jest.runAllTimers();
    }).not.toThrow();
    expect(loadMoreMockRejected.mock.calls.length).toBe(1);

    // HACK: branch
    const hackData = [
      {
        id: 1,
        title: 'root',
        children: [
          {
            id: 2,
            title: 'son',
          },
        ],
      },
    ];
    const hackWrapper = mount(
      <NewTree data={hackData} loadMore={loadMoreMock} />
    );
    const hackIcon = hackWrapper.find('i').at(0);
    hackIcon.simulate('click');
    // jest.runAllTimers();
    expect(loadMoreMock.mock.calls.length).toBe(1);
  });

  it('You can limit loadMore times, The will hold expand status', done => {
    const holdData = [
      {
        id: 1,
        title: 'root',
        children: [],
      },
    ];

    let holdWrapper;
    const holdLoadMore = root => {
      return new Promise(resolve => {
        if (root.id === 1 && !root.children.length) {
          holdWrapper.setProps({
            data: [
              {
                id: 1,
                title: 'root',
                children: [
                  {
                    id: 2,
                    title: 'son',
                    children: [],
                  },
                ],
              },
            ],
          });
        } else {
          holdWrapper.setProps({
            loadMore: null,
            data: [
              {
                id: 1,
                title: 'root',
                children: [
                  {
                    id: 2,
                    title: 'son',
                    expand: true,
                    children: [
                      {
                        id: 3,
                        title: 'grandSon',
                      },
                    ],
                  },
                ],
              },
            ],
          });
        }
        resolve();
      });
    };
    holdWrapper = mount(<NewTree data={holdData} loadMore={holdLoadMore} />);

    holdWrapper
      .find('i')
      .at(0)
      .simulate('click');

    setImmediate(() => {
      expect(holdWrapper.state().expandNode).toEqual([1]);
      holdWrapper.update();
      holdWrapper
        .find('i')
        .at(1)
        .simulate('click');
      setImmediate(() => {
        expect(holdWrapper.state().expandNode).toEqual([1]);
        holdWrapper.update();
        expect(
          holdWrapper
            .find('.zent-tree-bar')
            .at(0)
            .hasClass('off')
        ).toBe(false);

        done();
      });
    }, 200);
  });

  it('LoadMore callback promise return reject, loading will remove', done => {
    const data = [
      {
        id: 1,
        title: 'root',
        children: [],
      },
    ];

    let wrapper;
    const holdLoadMore = () => {
      return new Promise((res, rej) => {
        rej();
      });
    };
    wrapper = mount(<NewTree data={data} loadMore={holdLoadMore} />);

    wrapper
      .find('i')
      .at(0)
      .simulate('click');

    expect(wrapper.state().loadingNode).toEqual([1]);

    setImmediate(() => {
      expect(wrapper.state().expandNode).toEqual([]);
      expect(wrapper.state().loadingNode).toEqual([]);
      wrapper.update();
      expect(wrapper.find('.tree-node-loading-wrapper').length).toBe(0);

      done();
    }, 200);
  });

  it('Tree will handle checkbox click properly with default rule', () => {
    const data = [
      {
        id: 1,
        title: 'root',
        children: [
          {
            id: 2,
            title: 'son',
            children: [
              {
                id: 4,
                title: 'grandSon',
              },
              {
                id: 5,
                title: 'grandDaughter',
              },
            ],
          },
          {
            id: 3,
            title: 'daughter',
            children: [
              {
                id: 6,
                title: 'grandDaughter',
              },
              {
                id: 7,
                title: 'grandSon',
              },
            ],
          },
          {
            id: 10,
            title: 'wife',
          },
        ],
      },
    ];

    let onCheckedData;

    const wrapper = mount(
      <NewTree
        data={data}
        checkedKeys={[6, 7]}
        checkable
        disabledCheckedKeys={[7]}
        onCheck={checkedData => {
          onCheckedData = checkedData;
          wrapper.setProps({
            checkedKeys: onCheckedData,
          });
        }}
      />
    );

    expect(
      wrapper
        .find('Checkbox')
        .at(4)
        .prop('checked')
    ).toBe(true);

    expect(
      wrapper
        .find('Checkbox')
        .at(0)
        .prop('indeterminate')
    ).toBe(true);

    wrapper
      .find('Checkbox input')
      .at(0)
      .simulate('change', { target: { checked: true } });
    expect(
      wrapper
        .find('Checkbox')
        .not({ disabled: true })
        .everyWhere(n => n.prop('checked'))
    ).toBe(true);
    expect(
      wrapper
        .find('Checkbox')
        .at(6)
        .prop('checked')
    ).toBe(true);
    expect(onCheckedData.length).toBe(8);

    wrapper
      .find('Checkbox input')
      .at(0)
      .simulate('change', { target: { checked: false } });
    expect(
      wrapper
        .find('Checkbox')
        .at(6)
        .prop('checked')
    ).toBe(true);

    expect(
      wrapper
        .find('Checkbox')
        .everyWhere(n => n.prop('checked') && n.prop('indeterminate'))
    ).toBe(false);
    expect(onCheckedData.length).toBe(1);

    wrapper
      .find('Checkbox input')
      .at(0)
      .simulate('change', { target: { checked: true } });
    expect(wrapper.find('Checkbox').everyWhere(n => n.prop('checked'))).toBe(
      true
    );

    wrapper
      .find('Checkbox input')
      .at(1)
      .simulate('change', { target: { checked: false } });
    expect(
      wrapper
        .find('Checkbox')
        .at(1)
        .prop('checked')
    ).toBe(false);
    expect(
      wrapper
        .find('Checkbox')
        .at(3)
        .prop('checked')
    ).toBe(false);
    expect(
      wrapper
        .find('Checkbox')
        .at(2)
        .prop('checked')
    ).toBe(false);
    expect(
      wrapper
        .find('Checkbox')
        .at(6)
        .prop('checked')
    ).toBe(true);
    wrapper
      .find('Checkbox input')
      .at(6)
      .simulate('change', { target: { checked: false } });
    expect(
      wrapper
        .find('Checkbox')
        .at(6)
        .prop('checked')
    ).toBe(false);
  });

  it('Tree disabled check', () => {
    const disabledData = [
      {
        id: 1,
        title: 'root',
        children: [
          {
            id: 2,
            title: 'son',
          },
          {
            id: 3,
            title: 'daughter',
          },
        ],
      },
    ];

    const disabledWrapper = mount(
      <NewTree
        data={disabledData}
        checkable
        checkedKeys={[]}
        disabledCheckedKeys={[2, 3]}
      />
    );

    expect(
      disabledWrapper
        .find('Checkbox')
        .at(0)
        .prop('disabled')
    ).toBe(true);

    expect(
      disabledWrapper
        .find('Checkbox')
        .at(1)
        .prop('disabled')
    ).toBe(true);

    expect(
      disabledWrapper
        .find('Checkbox')
        .at(2)
        .prop('disabled')
    ).toBe(true);

    const disabledData2 = [
      {
        id: 1,
        title: 'root',
        children: [
          {
            id: 2,
            title: 'son',
            children: [
              {
                id: 4,
                title: 'grandSon',
              },
              {
                id: 5,
                title: 'grandDaughter',
              },
            ],
          },
          {
            id: 3,
            title: 'daughter',
            children: [
              {
                id: 6,
                title: 'grandDaughter',
              },
              {
                id: 7,
                title: 'grandSon',
              },
            ],
          },
          {
            id: 10,
            title: 'wife',
          },
        ],
      },
    ];

    let onCheckedData;

    const disabledWrapper2 = mount(
      <NewTree
        data={disabledData2}
        checkedKeys={[4, 5, 10]}
        checkable
        disabledCheckedKeys={[6, 7]}
        onCheck={checkedData => {
          onCheckedData = checkedData;
          disabledWrapper2.setProps({
            checkedKeys: onCheckedData,
          });
        }}
      />
    );

    expect(
      disabledWrapper2
        .find('Checkbox')
        .at(0)
        .prop('checked')
    ).toBe(true);

    expect(
      disabledWrapper2
        .find('Checkbox')
        .at(4)
        .prop('disabled')
    ).toBe(true);

    disabledWrapper2
      .find('Checkbox input')
      .at(4)
      .simulate('change', { target: { checked: false } });

    expect(
      disabledWrapper2
        .find('Checkbox')
        .at(4)
        .prop('disabled')
    ).toBe(true);
  });

  it('Tree supports custom operations', () => {
    const actionMockDelete = jest.fn();
    const actionMockClone = jest.fn();
    const operations = [
      {
        name: 'Delete',
        icon: 'bar',
        action: actionMockDelete,
        shouldRender: data => data.id % 2 === 0,
      },
      {
        name: 'Clone',
        icon: 'foo',
        action: actionMockClone,
      },
    ];
    const data = [
      {
        id: 1,
        title: 'root',
        children: [
          {
            id: 2,
            title: 'son',
          },
        ],
      },
    ];
    const wrapper = mount(<NewTree data={data} operations={operations} />);
    expect(wrapper.find('.operation').length).toBe(2);
    expect(
      wrapper
        .find('.operation')
        .at(0)
        .find('span').length
    ).toBe(1);
    expect(
      wrapper
        .find('.operation')
        .at(0)
        .find('.foo').length
    ).toBe(1);
    expect(
      wrapper
        .find('.operation')
        .at(0)
        .find('.bar').length
    ).toBe(0);
    expect(
      wrapper
        .find('.operation')
        .at(1)
        .find('span').length
    ).toBe(2);
    wrapper
      .find('.operation')
      .at(0)
      .find('span')
      .simulate('click');
    wrapper
      .find('.operation')
      .at(1)
      .find('span')
      .at(0)
      .simulate('click');
    wrapper
      .find('.operation')
      .at(1)
      .find('span')
      .at(1)
      .simulate('click');
    expect(actionMockClone.mock.calls.length).toBe(2);
    expect(actionMockDelete.mock.calls.length).toBe(1);

    const iconOperations = [
      {
        name: 'Delete',
        icon: <span className="customer-class">123</span>,
        action: actionMockDelete,
        shouldRender: () => true,
      },
    ];
    const iconWrapper = mount(
      <NewTree data={data} operations={iconOperations} />
    );

    expect(iconWrapper.find('.customer-class').length).toBe(2);
  });
});
