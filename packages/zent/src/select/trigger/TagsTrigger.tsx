import * as React from 'react';
import { PureComponent } from 'react';
import noop from 'lodash-es/noop';
import cx from 'classnames';

import { I18nReceiver as Receiver } from '../../i18n';

import Tag from '../components/Tag';

export interface ITagsTriggerItem {
  text: string;
  value: any;
  cid: number;
}

export interface ITagsTriggerProps {
  prefixCls: string;
  selectedItems: any[];
  selectedItem: object;
  placeholder: string;
  value: any;
  onChange: (val: {
    selectedItems?: ITagsTriggerItem[];
    selectedItem: { value?: string };
    open?: boolean;
  }) => void;
  onDelete: (val: ITagsTriggerItem) => void;
  onClick: React.MouseEventHandler<HTMLElement>;
  visible: boolean;
  disabled: boolean;
}

class TagsTrigger extends PureComponent<ITagsTriggerProps, any> {
  static defaultProps = {
    selectedItems: [],
    onDelete: noop,
  };

  constructor(props) {
    super(props);
    this.deleteTagHandler = this.deleteTagHandler.bind(this);
  }

  isDelete: boolean;
  isAdded: boolean;

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
    const { selectedItems, disabled } = this.props;
    if (disabled) {
      return;
    }
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

export default TagsTrigger;
