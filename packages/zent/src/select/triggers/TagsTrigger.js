import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import Tag from '../components/Tag';

class TagsTrigger extends (PureComponent || Component) {
  constructor(props) {
    super(props);
    this.deleteTagHandler = this.deleteTagHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let { selectedItems } = this.props;
    let { cid, text, value } = nextProps;

    if (this.isDelete || this.isAdded) {
      this.isDelete = false;
      this.isAdded = false;
      return;
    }

    let isExist = selectedItems.filter(item => item.cid === cid).length > 0;

    if (typeof cid !== 'undefined' && !isExist) {
      selectedItems.push({
        cid,
        text,
        value
      });
      this.props.onChange({
        selectedItems,
        selectedItem: {
          value: ''
        },
        open: false
      });
    } else if (isExist) {
      this.isAdded = true;
      this.props.onChange({
        selectedItem: {
          value: ''
        }
      });
    }
  }

  deleteTagHandler(cid) {
    let { selectedItems } = this.props;
    let deleteItem = selectedItems.filter(item => item.cid === cid)[0];
    this.isDelete = true;
    this.props.onDelete(deleteItem);
    this.props.onChange({
      selectedItems: selectedItems.filter(item => item.cid !== cid),
      selectedItem: {},
      open: false
    });
  }

  render() {
    let { prefixCls, placeholder, onClick, selectedItems } = this.props;

    return (
      <div className={`${prefixCls}-tags`} onClick={onClick}>
        {selectedItems.length > 0
          ? selectedItems.map((item, index) => {
              return (
                <Tag
                  {...this.props}
                  key={index}
                  cid={item.cid}
                  {...item}
                  onDelete={this.deleteTagHandler}
                />
              );
            })
          : placeholder}
      </div>
    );
  }
}

TagsTrigger.propTypes = {
  prefixCls: PropTypes.string,
  selectedItems: PropTypes.array,
  selectedItem: PropTypes.object,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onDelete: PropTypes.func
};

TagsTrigger.defaultProps = {
  selectedItems: [],
  onDelete: noop
};

export default TagsTrigger;
