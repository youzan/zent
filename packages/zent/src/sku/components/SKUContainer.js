import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Input from 'input';
import Select from 'select';
import Pop from 'pop';
import find from 'lodash/find';
import fullfillImage from 'zan-utils/fullfillImage';
import Upload from 'upload';

class SKUContainer extends (PureComponent || Component) {
  constructor(props) {
    super(props);
    this.state = {
      skuOptions: [],
      newLeafText: '',
      leafValue: [],
      id: 0
    };
  }

  componentWillMount() {
    let { sku } = this.props;
    let { optionValue } = this.context;
    sku[optionValue] && this.fetchLeafById(sku[optionValue]);
  }

  componentWillReceiveProps(nextProps) {
    let { optionValue } = this.context;
    if (this.state.id === nextProps.sku[optionValue]) return;
    this.fetchLeafById(nextProps.sku[optionValue]);
  }

  fetchLeafById(id) {
    if (!id) return;
    this.context.onFetchSKU(id).then(skuOptions => {
      this.setState({
        id,
        skuOptions
      });
    });
  }

  resetLeaf = () => {
    this.setState({ leafValue: [] });
  };

  selectSKU = () => {
    let { sku, hasSKUImage } = this.props;
    let { leafValue } = this.state;
    let { optionValue } = this.context;
    const skuLeaf = this.skuLeaf.state.selectedItems.map((item, key) => {
      item[optionValue] = item.value || leafValue[key];
      item.is_show = hasSKUImage;
      delete item.cid;
      return item;
    });
    let skuLeafIds = sku.leaf.map(item => item[optionValue]);
    skuLeaf.forEach(item => {
      if (skuLeafIds.indexOf(item[optionValue]) < 0) {
        sku.leaf.push(item);
      }
    });
    this.resetLeaf();
    this.props.onSKULeafChange(sku.leaf);
  };

  removeSKULeaf(idx) {
    let { sku } = this.props;
    sku.leaf.splice(idx, 1);
    this.props.onSKULeafChange(sku.leaf);
  }

  createSKULeaf = (evt, leaf) => {
    let { sku } = this.props;
    let { leafValue, skuOptions } = this.state;
    let { onCreateSKU, optionValue, optionText } = this.context;
    if (leaf[optionValue] || typeof leaf[optionText] !== 'string') {
      if (leafValue.indexOf(leaf[optionValue]) < 0) {
        leafValue.push(leaf[optionValue]);
      }
      return false;
    }
    if (!leaf[optionText]) {
      return;
    }
    onCreateSKU({
      text: leaf[optionText],
      id: sku[optionValue]
    }).then(data => {
      let newSKULeaf = {};
      leafValue.push(data);
      newSKULeaf[optionText] = leaf[optionText];
      newSKULeaf[optionValue] = data;
      skuOptions.push(newSKULeaf);
      this.setState({
        newLeafText: '',
        leafValue: [].concat(leafValue),
        skuOptions: [].concat(skuOptions)
      });
    });
  };

  updateLeafValue = sku => {
    let { optionValue } = this.context;
    let { leafValue } = this.state;
    leafValue = leafValue.filter(item => item !== sku[optionValue]);
    this.setState({ leafValue: [].concat(leafValue) });
  };

  asyncFilterSKULeaf = keyword => {
    let { optionText, maxLeafTextLength } = this.context;
    let { skuOptions } = this.state;
    if (maxLeafTextLength && maxLeafTextLength > 0) {
      keyword = keyword.substring(0, maxLeafTextLength);
    }
    if (skuOptions.some(item => item[optionText] === keyword)) return;
    this.setState({
      newLeafText: keyword
    });
  };

  filterSKU = (item, keyword) => {
    let { maxLeafTextLength } = this.context;
    if (maxLeafTextLength && maxLeafTextLength > 0) {
      keyword = keyword.substring(0, maxLeafTextLength);
    }
    return item.text.indexOf(keyword) > -1;
  };

  handleReset = () => {
    this.setState({
      newLeafText: ''
    });
  };

  handleRenameSKULeaf(index) {
    let { sku, onSKULeafChange } = this.props;
    let { optionValue, optionText, onCreateSKU } = this.context;
    let { skuOptions } = this.state;
    let findKey = {};
    findKey[optionText] = this.renameText;
    let skuItem = find(skuOptions, findKey);
    if (skuItem) {
      sku.leaf[index] = skuItem;
      onSKULeafChange(sku.leaf);
      return;
    }
    onCreateSKU({
      text: this.renameText,
      id: sku[optionValue]
    }).then(data => {
      let newSKULeaf = {};
      newSKULeaf[optionText] = this.renameText;
      newSKULeaf[optionValue] = data;
      skuOptions.push(newSKULeaf);
      this.setState({
        skuOptions: [].concat(skuOptions)
      });
      sku.leaf[index] = newSKULeaf;
      onSKULeafChange(sku.leaf);
    });
  }

  renderSKUPopContent() {
    let { optionValue, optionText } = this.context;
    let { leafValue, skuOptions, newLeafText } = this.state;

    if (newLeafText) {
      skuOptions = [].concat(skuOptions);
      if (skuOptions.length > 0 && skuOptions[0][optionValue] === 0) {
        skuOptions[0][optionText] = newLeafText;
      } else {
        let newLeaf = {};
        newLeaf[optionValue] = 0;
        newLeaf[optionText] = newLeafText;
        skuOptions.unshift(newLeaf);
      }
    }

    return (
      <Select
        ref={skuLeaf => (this.skuLeaf = skuLeaf)}
        data={skuOptions}
        optionValue={optionValue}
        tags
        open
        filter={this.filterSKU}
        value={leafValue}
        onAsyncFilter={this.asyncFilterSKULeaf}
        onChange={this.createSKULeaf}
        onDelete={this.updateLeafValue}
        onOpen={this.handleReset}
      />
    );
  }

  removeImg(id) {
    const { sku } = this.props;
    let { optionValue } = this.context;
    sku.leaf.forEach(item => {
      if (item[optionValue] === id) {
        item.img_url = '';
      }
    });
    this.props.onSKULeafChange(sku.leaf);
  }

  uploadSuccess(id, imageUrl) {
    const { sku } = this.props;
    let { optionValue } = this.context;
    sku.leaf.forEach(item => {
      if (item[optionValue] === id) {
        item.img_url = fullfillImage(imageUrl[0].src, '!100x100.jpg');
      }
    });
    this.props.onSKULeafChange(sku.leaf);
  }

  render() {
    let { optionValue, optionText, prefix } = this.context;

    let { sku, hasSKUImage } = this.props;

    return (
      <div className="group-container">
        <div className="sku-list">
          {sku.leaf.map((item, index) => {
            return (
              <Pop
                key={index}
                trigger="click"
                position="bottom-center"
                content={
                  <Input
                    defaultValue={item[optionText]}
                    onChange={evt => (this.renameText = evt.target.value)}
                  />
                }
                wrapperClassName={cx(`${this.context.prefix}-item`, {
                  active: hasSKUImage
                })}
                onConfirm={this.handleRenameSKULeaf.bind(this, index)}
              >
                <div>
                  <span>
                    {item[optionText]}
                  </span>
                  <span
                    className="item-remove"
                    onClick={this.removeSKULeaf.bind(this, index)}
                  >
                    x
                  </span>
                  {hasSKUImage
                    ? <div className="upload-img-wrap">
                        <div className="arrow" />
                        {item.img_url
                          ? <div className="upload-img">
                              <span
                                className="item-remove small"
                                title="删除"
                                onClick={this.removeImg.bind(
                                  this,
                                  item[optionValue]
                                )}
                              >
                                ×
                              </span>
                              <img
                                src={item.img_url}
                                role="presentation"
                                alt=""
                                data-src={item.img_url}
                              />
                              <Upload
                                triggerClassName="img-edit"
                                materials
                                maxAmount="1"
                                onUpload={this.uploadSuccess.bind(
                                  this,
                                  item[optionValue]
                                )}
                              >
                                <span>替换</span>
                              </Upload>
                            </div>
                          : <Upload
                              materials
                              maxAmount="1"
                              onUpload={this.uploadSuccess.bind(
                                this,
                                item[optionValue]
                              )}
                            >
                              <i>+</i>
                            </Upload>}
                      </div>
                    : ''}
                </div>
              </Pop>
            );
          })}
          {sku[optionValue] > 0
            ? <Pop
                trigger="click"
                position="bottom-center"
                className={`${prefix}-pop`}
                wrapperClassName={`${prefix}-pop`}
                content={this.renderSKUPopContent()}
                onConfirm={this.selectSKU}
                onClose={this.resetLeaf}
              >
                <span className="sku-add">+添加</span>
              </Pop>
            : ''}
        </div>
      </div>
    );
  }
}

SKUContainer.contextTypes = {
  prefix: PropTypes.string,
  maxLeafTextLength: PropTypes.number,
  optionValue: PropTypes.string,
  optionText: PropTypes.string,
  onFetchSKU: PropTypes.func,
  onCreateSKU: PropTypes.func
};

export default SKUContainer;
