import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import isNumber from 'lodash/isNumber';
import Select from 'select';
import { I18nReceiver as Receiver } from 'i18n';

export default class PageSizeChanger extends Component {
  static propTypes = {
    total: PropTypes.number,
    pageSize: PropTypes.number,
    pageSizeOptions: PropTypes.array,
    onPageSizeChange: PropTypes.func,
  };

  render() {
    const { total, pageSize, pageSizeOptions, onPageSizeChange } = this.props;

    if (isEmpty(pageSizeOptions)) {
      return <StaticPageSize total={total} pageSize={pageSize} />;
    }

    return (
      <Receiver componentName="Pagination">
        {i18n => {
          const select = (
            <PageSizeSelect
              pageSizeOptions={pageSizeOptions}
              onPageSizeChange={onPageSizeChange}
              pageSize={pageSize}
              i18n={i18n}
            />
          );

          if (i18n.mark === 'zh-CN') {
            return (
              <div className="zent-pagination-page-size-changer">
                {i18n.total}
                <span className="zent-pagination-count">{total}</span>
                {i18n.items}
                {i18n.comma}
                {i18n.perPage}
                {select}
              </div>
            );
          }

          return (
            <div className="zent-pagination-page-size-changer">
              {i18n.total}
              <span className="zent-pagination-count">{total}</span>
              {i18n.items}
              {i18n.comma}
              {select}
              <span className="zent-pagination-count--left">
                {i18n.perPage}
              </span>
            </div>
          );
        }}
      </Receiver>
    );
  }
}

class PageSizeSelect extends Component {
  constructor(props) {
    super();

    this.state = {
      options: this.normalizeSelectOptions(props.pageSizeOptions, props.i18n),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { pageSizeOptions, i18n } = nextProps;

    if (
      pageSizeOptions !== this.props.pageSizeOptions ||
      i18n !== this.props.i18n
    ) {
      this.setState({
        options: this.normalizeSelectOptions(pageSizeOptions, i18n),
      });
    }
  }

  render() {
    const { options } = this.state;
    const { pageSize, i18n } = this.props;

    return (
      <Select
        width={i18n.mark === 'zh-CN' ? 80 : 100}
        autoWidth
        data={options}
        value={pageSize}
        onChange={this.onChange}
      />
    );
  }

  onChange = (evt, data) => {
    this.props.onPageSizeChange(data.value);
  };

  normalizeSelectOptions(pageSizeOptions, i18n) {
    return (pageSizeOptions || []).map(opt => {
      if (isNumber(opt)) {
        return { value: opt, text: `${opt} ${i18n.items}` };
      }

      return opt;
    });
  }
}

class StaticPageSize extends Component {
  static propTypes = {
    total: PropTypes.number,
    pageSize: PropTypes.number,
  };

  render() {
    const { total, pageSize } = this.props;

    return (
      <Receiver componentName="Pagination">
        {i18n => {
          if (i18n.mark === 'zh-CN') {
            return (
              <div className="zent-pagination-page-size-changer">
                {i18n.total}
                <span className="zent-pagination-count">{total}</span>
                {i18n.items}
                {i18n.comma}
                {i18n.perPage}
                <span className="zent-pagination-count">{pageSize}</span>
                {i18n.items}
              </div>
            );
          }

          return (
            <div className="zent-pagination-page-size-changer">
              {i18n.total}
              <span className="zent-pagination-count">{total}</span>
              {i18n.items}
              {i18n.comma}
              <span className="zent-pagination-count">{pageSize}</span>
              {i18n.items} {i18n.perPage}
            </div>
          );
        }}
      </Receiver>
    );
  }
}
