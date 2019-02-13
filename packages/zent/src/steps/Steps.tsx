import * as React from 'react';
import { Component } from 'react';
import * as PropTypes from 'prop-types';
import Step from './components/Step';

import NumberSteps from './components/NumberSteps';
import BreadcrumbSteps from './components/BreadcrumbSteps';

export interface IStepsProps {
  type?: 'number' | 'card' | 'breadcrumb' | 'tabs';
  direction?: 'horizontal' | 'vertical';
  current?: number;
  status?: 'process' | 'finish' | 'error' | 'wait';
  sequence?: boolean;
  onStepChange?: (stepIndex: number) => void;
  className?: string;
  prefix?: string;
}

export class Steps extends Component<IStepsProps> {
  static propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    children: PropTypes.any,
    type: PropTypes.string,
    current: PropTypes.number,
    direction: PropTypes.string,
    size: PropTypes.string,
    status: PropTypes.string,
    sequence: PropTypes.bool,
    onStepChange: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    prefix: 'zent',
    type: 'number',
    current: 0,
    direction: 'horizontal',
    size: 'normal',
    status: 'process',
    sequence: true,
  };

  static Step = Step;

  render() {
    const props = this.props;
    const { type, children, ...restProps } = props;
    const typeComponentMapping = {
      number: NumberSteps,
      card: BreadcrumbSteps,
      breadcrumb: BreadcrumbSteps,
      tabs: BreadcrumbSteps,
    };

    const StepsComponent = typeComponentMapping[type];

    return (
      <StepsComponent {...restProps} type={type}>
        {children}
      </StepsComponent>
    );
  }
}

export default Steps;
