/// <reference types="react" />

declare module 'zent/lib/cascader' {
  interface ICascaderItem {
    id: any;
    title: any;
  }

  interface ICascaderOption extends ICascaderItem {
    children?: ICascaderOption[];
  }

  interface ICascaderLoadMoreResolvedItem extends ICascaderItem {
    isLeaf: boolean;
  }

  interface ICascaderProps {
    type?: 'tabs' | 'menu';
    value?: Array<any>;
    options?: Array<ICascaderOption>;
    title?: Array<React.ReactNode>;
    onChange?: (value: Array<ICascaderItem>) => any;
    loadMore?: () => Promise<ICascaderLoadMoreResolvedItem>;
    changeOnSelect?: boolean;
    placeholder?: string;
    prefix?: string;
    className?: string;
    popClassName?: string;
    displayText?: (value: Array<ICascaderItem>) => React.ReactNode;
    expandTrigger?: 'click' | 'hover';
  }

  export default class Cascader extends React.Component<ICascaderProps, any> {}
}
