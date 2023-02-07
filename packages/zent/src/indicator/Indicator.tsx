import { FC } from 'react';
import { Steps, IStepsProps } from '../steps';

export type IIndicatorProps = Omit<IStepsProps, 'type'>;

export type IIndicator = FC<IIndicatorProps> & {
  Step: typeof Steps.Step;
};

export const Indicator: IIndicator = props => (
  <Steps type="number" {...props} />
);

Indicator.Step = Steps.Step;

export default Indicator;
