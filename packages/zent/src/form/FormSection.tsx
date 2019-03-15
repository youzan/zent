import { PureComponent } from 'react';
import * as React from 'react';
import memoize from '../utils/memorize-one';

import { prefixName } from './utils';
import FormContext from './FormContext';

export interface IFormSectionProps {
  name: string;
  component?: React.ElementType;
}

class FormSection extends PureComponent<IFormSectionProps> {
  static defaultProps = {
    component: 'div',
  };

  static contextType = FormContext;

  context!: React.ContextType<typeof FormContext>;

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
