import * as React from 'react';
import { Cascader, Notify } from '../';

class App extends React.Component {

  state = {
    value: ['330000', '330100', '330106'],
    options: [
      {
        id: '330000',
        title: '浙江省',
        children: [
          {
            id: '330100',
            title: '杭州市',
            children: [
              {
                id: '330106',
                title: '西湖区'
              }
            ]
          },
          {
            id: '330200',
            title: '温州市',
            children: [
              {
                id: '330206',
                title: '龙湾区'
              }
            ]
          }
        ]
      },
      {
        id: '120000',
        title: '新疆维吾尔自治区',
        children: [
          {
            id: '120100',
            title: '博尔塔拉蒙古自治州',
            children: [
              {
                id: '120111',
                title: '阿拉山口市'
              }
            ]
          }
        ]
      }
    ]
  }

  onChange = (data) => {
    Notify.success(JSON.stringify(data));

    this.setState({
      value: data.map(item => item.id)
    });
  }

  loadMore = (root, stage) => new Promise((resolve, reject) => {
    setTimeout(() => {
      let isLeaf = stage >= 2;
      let children = [{
        id: `66666${stage}`,
        title: `Label${stage}`,
        isLeaf
      }];
      resolve(children);
    }, 500);
  })

  render() {
    return (
      <Cascader
        value={this.state.value}
        options={this.state.options}
        onChange={this.onChange}
        type='menu'
        changeOnSelect
        loadMore={this.loadMore}
        placeholder="请选择"
        title={[
          '省',
          '市',
          '区'
        ]}
      />
    );
  }
}

export default App
