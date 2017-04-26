import React from 'react';
import { mount } from 'enzyme';
import omit from 'lodash/omit';
import ZentForm from 'form';

describe('CreateForm and Fieldset', () => {
  const { Form, createForm, Field, Fieldset, unknownProps } = ZentForm;
  const returnedFunction = createForm();
  const FormCreated = returnedFunction(Form);
  const DivComponent = props => {
    const passableProps = omit(props, unknownProps);
    return <div {...passableProps} />;
  };

  it('Fieldset can have legend prop', () => {
    const nestedWrapper = mount(
      <FormCreated>
        <Fieldset legend="legend1">
          <Field name="bar" component={DivComponent} />
        </Fieldset>
      </FormCreated>
    );
    expect(nestedWrapper.find(Fieldset).length).toBe(1);
    expect(nestedWrapper.find(Fieldset).prop('legend')).toBe('legend1');
  });
});
