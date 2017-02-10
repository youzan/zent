/**
 * TagsTrigger
 */

import React, { Component, PropTypes } from 'react';
import assign from 'zent-utils/lodash/assign';
import Tag from '../components/Tag';

const noop = function () {};

class TagsTrigger extends Component {

  constructor(props) {
    super(props);
    this.state = assign({}, props);
    this.deleteTagHandler = this.deleteTagHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let { selectedItems } = this.state;
    let {
      cid,
      text,
      value
    } = nextProps;

    if (this.isDelete || this.isAdded) {
      this.isDelete = false;
      this.isAdded = false;
      return;
    }

    let isExist = selectedItems.filter(item => item.cid === cid).length > 0;

    if (nextProps.selectedItems) {
      this.state.selectedItems = nextProps.selectedItems;
    }

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
    let { selectedItems } = this.state;
    let deleteItem = selectedItems.filter(item => item.cid === cid)[0];
    selectedItems = selectedItems.filter(item => item.cid !== cid);
    this.isDelete = true;
    this.setState({
      selectedItems
    });
    this.props.onDelete(deleteItem);
    this.props.onChange({
      selectedItems,
      selectedItem: {},
      open: false
    });
  }

  render() {
    let { prefixCls, placeholder, onClick } = this.props;

    let {
      selectedItems,
    } = this.state;

    return (
      <div className={`${prefixCls}-tags`} onClick={onClick}>
        {
          selectedItems.length > 0 ? selectedItems.map(item => {
            return (
              <Tag
                {...this.props}
                key={item.cid}
                cid={item.cid}
                {...item}
                onDelete={this.deleteTagHandler}
              />
            );
          }) : placeholder
        }
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
