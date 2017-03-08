import React from 'react';
import { mount } from 'enzyme';

import ZentForm from '../src';

describe('CreateForm and Fieldset', () => {
  const { Form, createForm, Field, Fieldset } = ZentForm;
  const returnedFunction = createForm();
  const FormCreated = returnedFunction(Form);

  it('Fieldset can have legend prop', () => {
    const nestedWrapper = mount(
      <FormCreated>
        <Fieldset legend="legend1">
          <Field name="bar" component={props => (<div {...props} />)} />
        </Fieldset>
      </FormCreated>
    );
    expect(nestedWrapper.find(Fieldset).length).toBe(1);
    expect(nestedWrapper.find(Fieldset).prop('legend')).toBe('legend1');
  });
});
