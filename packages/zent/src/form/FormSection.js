import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import memoize from '../utils/memorize-one';

import { prefixName } from './utils';
import { validElementType } from '../utils/prop-types';
import FormContext from './FormContext';

class FormSection extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    component: validElementType,
    children: PropTypes.any,
  };

  static defaultProps = {
    component: 'div',
  };

  static contextType = FormContext;

  constructor(props, context) {
    super(props, context);

    if (!context.zentForm) {
      throw new Error('FormSection must be in zent-form');
    }
  }

  getFormContext = memoize(name => {
    const { zentForm } = this.context;

    return {
      zentForm: {
        ...zentForm,
        prefix: prefixName(zentForm, name),
      },
    };
  });

  render() {
    const { component: Comp, ...rest } = this.props;

    return (
      <FormContext.Provider value={this.getFormContext(this.props.name)}>
        <Comp {...rest} />
      </FormContext.Provider>
    );
  }
}

export default FormSection;
