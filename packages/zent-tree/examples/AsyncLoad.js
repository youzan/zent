import React, { Component } from 'react';
import ajax from 'superagent';
import jsonp from 'superagent-jsonp';
import Tree from '../src/Index';
import '../assets/index.scss';

/*
异步加载数据，通过loadMore属性配置点击节点的回调方法，需要返回promise对象
*/

const ajaxJsonpGet = (url, callback) => {
  ajax
    .get(url)
    .use(jsonp)
    .end((err, res) => {
      if (err || res.body.code !== 0) {
        // deal with error
      } else {
        callback(res.body);
      }
    });
};

const getProvince = callback => {
  ajaxJsonpGet('https://koudaitong.com/v2/common/region/provinceList.jsonp', callback);
};

export default class Example extends Component {
  constructor() {
    super();
    this.state = {
      treeData: []
    };
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    getProvince(res => {
      if (res) {
        let newData = [{
          id: 'China',
          title: '中国🇨🇳',
          expand: true
        }];
        newData = newData.concat(Object.keys(res.data).map(key => ({
          id: key,
          title: res.data[key],
          parentId: 'China'
        })));
        this.setState({
          treeData: newData
        });
      }
    });
  }

  loadMore(data) {
    return new Promise((resolve, reject) => {
      ajax
        .get(`https://koudaitong.com/v2/common/region/list.jsonp?region_id=${data.id}`)
        .use(jsonp)
        .end((err, res) => {
          if (err || res.body.code !== 0) {
            reject();
          } else {
            const treeData = this.state.treeData.concat(Object.keys(res.body.data).map(key => ({
              id: key,
              title: res.body.data[key],
              parentId: data.id
            })));
            this.setState({ treeData });
            resolve();
          }
        });
    });
  }

  render() {
    const props = {
      commonStyle: { color: 'orange' },
      loadMore: this.loadMore,
      dataType: 'plain',
      data: this.state.treeData,
      size: 'medium'
    };
    return <Tree {...props} />;
  }
}
