/// <reference types="react" />

declare module 'zent/lib/breadcrumb' {
  interface IBreadcrumbProps {
    breads?: Array<React.ReactNode>
    className?: string
    prefix?: string
  }

  export class Breadcrumb extends React.Component<IBreadcrumbProps, any> { }
}
