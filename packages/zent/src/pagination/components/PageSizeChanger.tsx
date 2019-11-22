import * as React from 'react';
import { Component } from 'react';
import memoize from '../../utils/memorize-one';
import Select from '../../select';
import { I18nReceiver as Receiver, II18nLocalePagination } from '../../i18n';

export interface IPaginationPageSizeCompoundOption {
  text: React.ReactNode;
  value: number;
}

export type PaginationPageSizeOption =
  | number
  | IPaginationPageSizeCompoundOption;

export interface IPaginationPageSizeChangerBaseProps {
  total: number;
  formatTotal?: (total: number) => React.ReactNode;
  pageSize: number;
}

export interface IPaginationPageSizeChangerProps
  extends IPaginationPageSizeChangerBaseProps {
  pageSizeOptions?: PaginationPageSizeOption[];
  onPageSizeChange?: (pageSize: number) => void;
}

const memoizedNormalizeSelectOptions = memoize(function normalizeSelectOptions(
  pageSizeOptions: PaginationPageSizeOption[],
  i18n: II18nLocalePagination
) {
  return (pageSizeOptions || []).map(opt => {
    if (typeof opt === 'number') {
      return { value: opt, text: `${opt} ${i18n.items}` };
    }

    return opt;
  });
});

const Text: React.FunctionComponent<{ type: 'middle' | 'right' }> = props => {
  return (
    <span className={`zent-pagination-count--${props.type}`}>
      {props.children}
    </span>
  );
};

export default class PageSizeChanger extends Component<
  IPaginationPageSizeChangerProps,
  any
> {
  render() {
    const {
      total,
      formatTotal,
      pageSize,
      pageSizeOptions,
      onPageSizeChange,
    } = this.props;

    if (!pageSizeOptions || pageSizeOptions.length === 0) {
      return (
        <StaticPageSize
          total={total}
          formatTotal={formatTotal}
          pageSize={pageSize}
        />
      );
    }

    const totalText = formatTotal ? formatTotal(total) : total;

    return (
      <Receiver componentName="Pagination">
        {(i18n: II18nLocalePagination) => {
          const select = (
            <PageSizeSelect
              pageSizeOptions={pageSizeOptions}
              onPageSizeChange={onPageSizeChange}
              pageSize={pageSize}
              i18n={i18n}
            />
          );

          return (
            <div className="zent-pagination-page-size-changer">
              {i18n.pageStats({
                select,
                total: totalText,
                Text,
              })}
            </div>
          );
        }}
      </Receiver>
    );
  }
}

class PageSizeSelect extends Component<
  {
    i18n: II18nLocalePagination;
    pageSize: number;
    pageSizeOptions: PaginationPageSizeOption[];
    onPageSizeChange(pageSize: number): void;
  },
  any
> {
  render() {
    const { pageSize, i18n, pageSizeOptions } = this.props;
    const options = memoizedNormalizeSelectOptions(pageSizeOptions, i18n);

    return (
      <Select
        width={i18n.selectWidth}
        autoWidth
        data={options}
        value={pageSize}
        onChange={this.onChange}
      />
    );
  }

  onChange = (evt: any, data: any) => {
    this.props.onPageSizeChange(data.value);
  };
}

export interface IPaginationStaticPageSizeProps
  extends IPaginationPageSizeChangerBaseProps {}

class StaticPageSize extends Component<IPaginationStaticPageSizeProps, any> {
  render() {
    const { total, formatTotal, pageSize } = this.props;
    const totalText = formatTotal ? formatTotal(total) : total;

    return (
      <Receiver componentName="Pagination">
        {(i18n: II18nLocalePagination) => {
          return (
            <div className="zent-pagination-page-size-changer">
              {i18n.pageStatsStatic({
                total: totalText,
                pageSize,
                Text,
              })}
            </div>
          );
        }}
      </Receiver>
    );
  }
}
