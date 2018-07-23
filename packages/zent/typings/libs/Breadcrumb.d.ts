/// <reference types="react" />

declare module 'zent/lib/breadcrumb' {
  interface IBreadcrumbProps {
    breads?: Array<React.ReactNode>
    className?: string
    prefix?: string
  }

  interface IBreadcrumbItemProps {
    className?: string
    name?: any
    href?: string
  }

  class BreadcrumbItem extends React.Component<IBreadcrumbItemProps, any> {}

  export default class Breadcrumb extends React.Component<IBreadcrumbProps, any> {
      static Item: BreadcrumbItem
   }
}
