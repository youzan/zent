/// <reference types="react" />

declare module 'zent/lib/steps' {
  interface IStepsProps {
    type?: 'number' | 'card' | 'breadcrumb'
    current?: number
    status?: 'finish' | 'error' | 'wait'
    className?: string
    prefix?: string
  }

  export class Steps extends React.Component<IStepsProps, any> { }

  export namespace Steps {
    interface IStepProps {
      title: React.ReactNode
      description?: React.ReactNode
    }

    class Step extends React.Component<IStepProps, any> { }
  }
}
