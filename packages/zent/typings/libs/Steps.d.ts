/// <reference types="react" />

declare module 'zent/lib/steps' {
  interface IStepsProps {
    type?: 'number' | 'card' | 'breadcrumb';
    direction?: 'horizontal' | 'vertical';
    current?: number;
    status?: 'process' | 'finish' | 'error' | 'wait';
    sequence?: boolean;
    onStepChange?: (stepIndex: number) => void;
    className?: string;
    prefix?: string;
  }

  class Steps extends React.Component<IStepsProps, any> {}

  namespace Steps {
    interface IStepProps {
      title: React.ReactNode;
      description?: React.ReactNode;
    }

    class Step extends React.Component<IStepProps, any> {}
  }

  export default Steps;
}
