import * as React from 'react';
import { Component } from 'react';
import isEmpty from 'lodash-es/isEmpty';
import isNumber from 'lodash-es/isNumber';
import memoize from '../../utils/memorize-one';
import Select from '../../select';
import { I18nReceiver as Receiver } from '../../i18n';

export interface IPaginationPageSizeCompoundOption {
  text: React.ReactNode;
  value: number;
}

export type PaginationPageSizeOption =
  | number
  | IPaginationPageSizeCompoundOption;

export interface IPaginationPageSizeChangerProps {
  total?: number;
  pageSize?: number;
  pageSizeOptions?: PaginationPageSizeOption[];
  onPageSizeChange?: (pageSize: number) => void;
}

const memoizedNormalizeSelectOptions = memoize(function normalizeSelectOptions(
  pageSizeOptions,
  i18n
) {
  return (pageSizeOptions || []).map(opt => {
    if (isNumber(opt)) {
      return { value: opt, text: `${opt} ${i18n.items}` };
    }

    return opt;
  });
});

export default class PageSizeChanger extends Component<
  IPaginationPageSizeChangerProps,
  any
> {
  render() {
    const { total, pageSize, pageSizeOptions, onPageSizeChange } = this.props;

    if (isEmpty(pageSizeOptions)) {
      return <StaticPageSize total={total} pageSize={pageSize} />;
    }

    return (
      <Receiver componentName="Pagination">
        {(i18n: any) => {
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

class PageSizeSelect extends Component<any, any> {
  render() {
    const { pageSize, i18n, pageSizeOptions } = this.props;
    const options = memoizedNormalizeSelectOptions(pageSizeOptions, i18n);

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
}

export interface IPaginationStaticPageSizeProps {
  total?: number;
  pageSize?: number;
}

class StaticPageSize extends Component<IPaginationStaticPageSizeProps, any> {
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
