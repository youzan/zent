import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import cx from 'classnames';

import { I18nReceiver as Receiver } from 'i18n';

import Tag from '../components/Tag';

class TagsTrigger extends PureComponent {
  constructor(props) {
    super(props);
    this.deleteTagHandler = this.deleteTagHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { selectedItems } = this.props;
    const { cid, text, value } = nextProps;

    if (this.isDelete || this.isAdded) {
      this.isDelete = false;
      this.isAdded = false;
      return;
    }

    const isExist = selectedItems.filter(item => item.cid === cid).length > 0;

    if (typeof cid !== 'undefined' && !isExist) {
      selectedItems.push({
        cid,
        text,
        value,
      });
      this.props.onChange({
        selectedItems,
        selectedItem: {
          value: '',
        },
        open: false,
      });
    } else if (isExist) {
      this.isAdded = true;
      this.props.onChange({
        selectedItem: {
          value: '',
        },
      });
    }
  }

  deleteTagHandler(cid) {
    const { selectedItems } = this.props;
    const deleteItem = selectedItems.filter(item => item.cid === cid)[0];
    this.isDelete = true;
    this.props.onDelete(deleteItem);
    this.props.onChange({
      selectedItems: selectedItems.filter(item => item.cid !== cid),
      selectedItem: {},
      open: false,
    });
  }

  render() {
    const {
      prefixCls,
      placeholder,
      onClick,
      selectedItems,
      visible,
    } = this.props;
    const rootClass = cx(`${prefixCls}-tags`, {
      tags__empty: !selectedItems.length,
      visible,
    });

    return (
      <Receiver componentName="Select">
        {i18n => (
          <div className={rootClass} onClick={onClick}>
            {selectedItems.length > 0 ? (
              selectedItems.map((item, index) => {
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
            ) : (
              <span className={`${prefixCls}-placeholder`}>
                {placeholder || i18n.input}
              </span>
            )}
          </div>
        )}
      </Receiver>
    );
  }
}

TagsTrigger.propTypes = {
  prefixCls: PropTypes.string,
  selectedItems: PropTypes.array,
  selectedItem: PropTypes.object,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onDelete: PropTypes.func,
};

TagsTrigger.defaultProps = {
  selectedItems: [],
  onDelete: noop,
};

export default TagsTrigger;
