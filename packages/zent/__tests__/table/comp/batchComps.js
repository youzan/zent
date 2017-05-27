import React from 'react';
import { Table } from 'zent';

const datasets = [
  {
    item_id: '5024217',
    bro_uvpv: '0/0',
    stock_num: '60',
    sold_num: 0
  },
  {
    item_id: '5024277',
    bro_uvpv: '0/0',
    stock_num: 59,
    sold_num: 0
  },
  {
    item_id: '13213123',
    bro_uvpv: '0/0',
    stock_num: 159,
    sold_num: 0
  }
];
const columns = [
  {
    title: '商品',
    width: '50px',
    bodyRender: data => {
      return <div>{data.item_id}</div>;
    }
  },
  {
    title: '访问量',
    name: 'bro_uvpv',
    width: '100px'
  },
  {
    title: '库存',
    name: 'stock_num',
    width: '100px'
  },
  {
    title: '总销量',
    name: 'sold_num'
  }
];

class Customer extends React.Component {
  onClick = () => {
    alert(`你选中了${this.props.data.length}个东东`);
  };

  render() {
    return <a onClick={this.onClick}>这是一个自定义组件,点击试试</a>;
  }
}

class BatchCompsClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      current: 0,
      total: 101,
      selectedRowKeys: []
    };
  }

  getRowConf() {
    return {
      canSelect: true
    };
  }

  onSelect = selectedRowkeys => {
    this.setState({ selectedRowKeys: selectedRowkeys });
  };

  onChange(conf) {
    this.setState(conf);
  }

  render() {
    return (
      <Table
        columns={columns}
        datasets={datasets}
        onChange={this.onChange.bind(this)}
        getRowConf={this.getRowConf}
        rowKey="item_id"
        batchComps={[
          <span>晚上一个纯组件</span>,
          data => {
            return (
              <span style={{ color: 'pink' }}>
                {' '}我是一个函数，选中了{data.length}个元素{' '}
              </span>
            );
          },
          Customer
        ]}
        selection={{
          selectedRowKeys: this.state.selectedRowKeys,
          onSelect: selectedRowkeys => {
            this.onSelect(selectedRowkeys);
          }
        }}
      />
    );
  }
}

export default BatchCompsClass;
