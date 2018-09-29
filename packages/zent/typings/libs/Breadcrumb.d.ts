/// <reference types="react" />

declare module 'zent/lib/breadcrumb' {

  namespace BreadcrumbItem {

    export interface IProps {
      className?: string
      name: React.ReactNode
      href?: string,
    }

  }


  namespace Breadcrumb {

    import Item = BreadcrumbItem;

    export interface IProps {
      breads?: Array<React.ReactNode>
      className?: string
      prefix?: string
    }

    export {
      Item
    }

  }

  class Breadcrumb extends React.Component<Breadcrumb.IProps, any> { }

  class BreadcrumbItem extends React.PureComponent<BreadcrumbItem.IProps, any> { }

  export default Breadcrumb;
}
