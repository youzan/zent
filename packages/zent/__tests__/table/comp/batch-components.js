import React from 'react';
import Table from 'table';

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
      return (
        <div>
          {data.item_id}
        </div>
      );
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
  componentWillMount() {
    this.setState({
      length: 0
    });
  }

  onClick = () => {
    this.setState({
      length: this.props.data.length
    });
  };

  render() {
    return (
      <div className="child-comps child-comps--comp">
        <button className="zent-btn" onClick={this.onClick}>
          这是一个自定义组件,点击试试
        </button>
        <span className="label-container">
          选中了{this.state.length}个元素
        </span>
      </div>
    );
  }
}

class BatchCompsClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
        rowKey="item_id"
        batchComponentsAutoFixed
        batchComponents={[
          <span key="pure" className="child-comps child-comps--pure">
            这是一个DOM
          </span>,
          data => {
            return (
              <span
                key="func"
                className="child-comps child-comps--func"
                style={{ color: 'blueviolet' }}
              >
                {' '}这是一个函数，选中了{data.length}个元素{' '}
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
