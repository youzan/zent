import React, { Component, PropTypes } from 'react';
import NumberSteps from './components/NumberSteps';
import CardSteps from './components/CardSteps';
import BreadcrumbSteps from './components/BreadcrumbSteps';

export default class Steps extends Component {
  render() {
    const props = this.props;
    const { type, children, ...restProps } = props;
    const typeComponentMapping = {
      number: NumberSteps,
      card: CardSteps,
      breadcrumb: BreadcrumbSteps
    };

    const StepsComponent = typeComponentMapping[type];

    return (
      <StepsComponent {...restProps}>
        {children}
      </StepsComponent>
    );
  }
}

Steps.propTypes = {
  className: PropTypes.string,
  prefix: PropTypes.string,
  children: PropTypes.any,
  type: PropTypes.string,
  current: PropTypes.number,
  direction: PropTypes.string,
  size: PropTypes.string,
  status: PropTypes.string
};

Steps.defaultProps = {
  className: '',
  prefix: 'zent',
  type: 'number',
  current: 0,
  direction: 'horizontal',
  size: 'normal',
  status: 'finish'
};
