import React from 'react';
const { number, array, oneOfType, func } = React.PropTypes;
import Select from '@youzan/zent-select';
const { Option } = Select;

const Prefix = React.createClass({
  propTypes: {
    totalItem: number,
    pageSize: oneOfType([number, array]),
    setPageSize: func
  },

  changePageSize(e, data) {
    let { setPageSize } = this.props;
    setPageSize(data.text);
  },

  renderSelect() {
    let { pageSize, currentPageSize } = this.props;

    pageSize = pageSize.map((item) => {
      return `${item.value}`;
    });

    return (
      <span className="each">
        ，每页
        <Select value={currentPageSize} onChange={this.changePageSize}>
          {
            pageSize.map((item, i) => {
              return <Option key={i} value={item}>{item}</Option>;
            })
          }
        </Select>
        条
      </span>
    );
  },

  render() {
    let { pageSize, totalItem, currentPageSize } = this.props;
    let isNeedSelect = false;
    if (Array.isArray(pageSize) && pageSize.length > 1) {
      isNeedSelect = true;
    }

    return (
      <span className="zent-pagination__info">
        <span className="total">共{totalItem}条</span>
        {
          !isNeedSelect &&
            <span className="each">，每页{currentPageSize}条</span>
        }
        {
          isNeedSelect &&
          this.renderSelect()
        }
      </span>
    );
  }
});

export default Prefix;
