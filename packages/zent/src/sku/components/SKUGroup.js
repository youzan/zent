import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'select';
import Checkbox from 'checkbox';
import SKUContainer from './SKUContainer';

const noop = res => res;

class SKUGroup extends (PureComponent || Component) {
  constructor(props) {
    super(props);
    this.state = {
      newSKUText: '',
      hasSKUImage: props.sku.leaf
        ? props.sku.leaf.some(item => item.img_url)
        : false
    };
  }

  filterHandler = (item, keyword) => {
    let { maxSKUTextLength } = this.context;
    if (maxSKUTextLength && maxSKUTextLength > 0) {
      keyword = keyword.substring(0, maxSKUTextLength);
    }
    return item.text.indexOf(keyword) > -1;
  };

  // 选择sku
  selectSKUHandler = (evt, sku) => {
    let { index, onSKUChange } = this.props;
    let { optionValue, optionText } = this.context;
    sku.leaf = [];
    if (sku[optionValue] === this.props.sku[optionValue]) return;
    if (sku[optionValue]) {
      onSKUChange(sku, index);
      return;
    }
    this.createSKU(sku[optionText], index);
  };

  // 创建sku
  createSKU(text) {
    let { sku, index, onSKUChange } = this.props;
    let { onCreateGroup, optionValue, optionText } = this.context;
    onCreateGroup(text).then(data => {
      if (data > 0) {
        sku[optionValue] = data;
        sku[optionText] = text;
        this.setState({
          newSKUText: ''
        });
        onSKUChange(sku, index);
      }
    });
  }

  asyncFilterSKU = keyword => {
    let { skuTree } = this.props;
    let { optionText, maxSKUTextLength } = this.context;
    if (maxSKUTextLength && maxSKUTextLength > 0) {
      keyword = keyword.substring(0, maxSKUTextLength);
    }
    if (skuTree.some(item => item[optionText] === keyword)) return;
    this.setState({
      newSKUText: keyword
    });
  };

  onSKULeafChange = leaf => {
    let { sku, index, onSKUChange } = this.props;
    sku.leaf = leaf;
    onSKUChange(sku, index);
  };

  rebuildSKULeaf(sku, index) {
    let { subGroup } = this.state;
    if (subGroup[index]) {
      subGroup[index].leaf = [].concat(sku);
    }
    this.setState({ subGroup });
    this.props.onChange(subGroup);
  }

  checkSKUImage = evt => {
    let { sku, index, onSKUChange } = this.props;
    let isShow = evt.target.checked;
    sku.is_show = isShow;
    sku.leaf = sku.leaf.map(item => {
      item.is_show = isShow;
      return item;
    });
    this.setState({
      hasSKUImage: isShow
    });
    onSKUChange(sku, index);
  };

  handleReset = () => {
    this.setState({
      newSKUText: ''
    });
  };

  render() {
    let { sku, index, skuTree } = this.props;
    let { optionValue, optionText } = this.context;
    let { newSKUText, hasSKUImage } = this.state;

    const prefix = `${this.context.prefix}-group`;

    if (newSKUText) {
      skuTree = [].concat(skuTree);
      if (skuTree[0][optionValue] === 0) {
        skuTree[0][optionText] = newSKUText;
      } else {
        let newSKU = {};
        newSKU[optionValue] = 0;
        newSKU[optionText] = newSKUText;
        skuTree.unshift(newSKU);
      }
    }

    return (
      <div className={prefix}>
        <h3 className="group-title">
          <Select
            open={typeof sku[optionValue] === 'undefined'}
            optionValue={optionValue}
            data={skuTree}
            onChange={this.selectSKUHandler}
            filter={this.filterHandler}
            onAsyncFilter={this.asyncFilterSKU}
            onOpen={this.handleReset}
            value={sku[optionValue] || ''}
          />
          {index === 0 ? (
            <Checkbox checked={hasSKUImage} onChange={this.checkSKUImage}>
              添加规格图片
            </Checkbox>
          ) : (
            ''
          )}
          <span className="group-remove" onClick={this.props.onSKUDelete}>
            ×
          </span>
        </h3>
        <SKUContainer
          sku={{ ...sku }}
          hasSKUImage={hasSKUImage}
          onSKULeafChange={this.onSKULeafChange}
        />
        {hasSKUImage ? (
          <div className="sku-group-cont">
            <p className="help-block">目前只支持为第一个规格设置不同的规格图片</p>
            <p className="help-block">设置后，用户选择不同规格会显示不同图片</p>
            <p className="help-block">建议尺寸：640 x 640像素</p>
          </div>
        ) : (
          <div className="sku-group-cont" />
        )}
      </div>
    );
  }
}

SKUGroup.contextTypes = {
  prefix: PropTypes.string,
  maxSKUTextLength: PropTypes.number,
  optionValue: PropTypes.string,
  optionText: PropTypes.string,
  onCreateGroup: PropTypes.func
};

SKUGroup.propTypes = {
  index: PropTypes.number,
  sku: PropTypes.object.isRequired,
  onSKUDelete: PropTypes.func,
  onSKUChange: PropTypes.func
};

SKUGroup.defaultProps = {
  index: 0,
  data: {},
  onSKUDelete: noop,
  onSKUChange: noop
};

export default SKUGroup;
