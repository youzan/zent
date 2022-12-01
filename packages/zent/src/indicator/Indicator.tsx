import { FC } from 'react';
import { Steps, IStepProps } from '../steps';

export type IIndicatorProps = Omit<IStepProps, 'type'>;

export type IIndicator = FC<React.PropsWithChildren<IIndicatorProps>> & {
  Step: typeof Steps.Step;
};

export const Indicator: IIndicator = props => (
  <Steps type="number" {...props} />
);

Indicator.Step = Steps.Step;

export default Indicator;
