import React from 'react';
import Table from '../src/index.js';

import '../assets/index.scss';

import TextComponent from './components/Text';
import CardComponent from './components/Card';

import datasets from './data/conf';

/*
* 自定义的render组件，如：

```js
import React from 'react';

const CardComponent = React.createClass({

  getTitle() {
    const { data } = this.props;
    let { url = '' } = data;
    return (
      <a
        className="card__title"
        href={this.props.data.url}
      >
        {this.props.data.title}
      </a>
    );
  },

  render() {
    return (
      <div className="card">
        <img
          alt="图片"
          className="card__thumb"
          src={this.props.data.image_url}
        />
        {this.getTitle()}
        <span className="card__info"> {this.props.data.info}</span>
      </div>
   );
  }
});

export default CardComponent;
```
*/
const columns = [{
  title: '商品',
  width: 50,
  bodyRender: CardComponent
}, {
  title: '访问量',
  name: 'bro_uvpv',
  width: 10,
  bodyRender: TextComponent
}, {
  title: '库存',
  name: 'stock_num',
  width: 20
}, {
  title: '总销量',
  name: 'sold_num',
  width: 20
}];

const Simple = React.createClass({
  getInitialState() {
    return {
      limit: 10,
      current: 0,
      total: 101
    };
  },

  onChange(conf) {
    this.setState(conf);
  },

  render() {
    return (
      <Table
        columns={columns}
        datasets={datasets}
        onChange={this.onChange}
        rowKey="item_id"
      />
    );
  }
});

export default Simple;
