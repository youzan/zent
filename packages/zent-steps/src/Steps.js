import React, { Component } from 'react';
import NumberSteps from './components/NumberSteps';
import CardSteps from './components/CardSteps';
import PropTypes from 'zent-utils/prop-types';
import BreadcrumbSteps from './components/BreadcrumbSteps';

export default class Steps extends Component {
  static propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    children: PropTypes.any,
    type: PropTypes.string,
    current: PropTypes.number,
    direction: PropTypes.string,
    size: PropTypes.string,
    status: PropTypes.string
  };

  static defaultProps = {
    className: '',
    prefix: 'zent',
    type: 'number',
    current: 0,
    direction: 'horizontal',
    size: 'normal',
    status: 'finish'
  };

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
