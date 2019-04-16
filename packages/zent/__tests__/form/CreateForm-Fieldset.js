import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import omit from 'lodash/omit';
import ZentForm from 'form';

Enzyme.configure({ adapter: new Adapter() });

describe('CreateForm and Fieldset', () => {
  const { Form, createForm, Field, Fieldset, unknownProps } = ZentForm;
  const returnedFunction = createForm();
  const FormCreated = returnedFunction(Form);

  class SimpleComponent extends React.Component {
    render() {
      const passableProps = omit(this.props, unknownProps);
      return <div {...passableProps} />;
    }
  }

  it('Fieldset can have legend prop', () => {
    const nestedWrapper = mount(
      <FormCreated>
        <Fieldset legend="legend1">
          <Field name="bar" component={SimpleComponent} />
        </Fieldset>
      </FormCreated>
    );
    expect(nestedWrapper.find(Fieldset).length).toBe(1);
    expect(nestedWrapper.find(Fieldset).prop('legend')).toBe('legend1');
  });
});
