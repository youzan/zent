/// <reference types="react" />

declare module 'zent/lib/breadcrumb' {
  interface IBreadcrumbProps {
    breads?: Array<React.ReactNode>;
    className?: string;
    prefix?: string;
  }

  interface IBreadcrumbItemProps {
    className?: string;
    name: React.ReactNode;
    href?: string;
  }

  class Breadcrumb extends React.Component<IBreadcrumbProps, any> {}

  namespace Breadcrumb {
    class Item extends React.PureComponent<IBreadcrumbItemProps, any> {}
  }

  export default Breadcrumb;
}
