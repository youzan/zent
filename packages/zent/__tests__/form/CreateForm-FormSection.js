import React from 'react';
import Enzyme, { mount } from 'enzyme';
import ZentForm from 'form';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('CreateForm and FormSection', () => {
  const { Form, createForm, Field, FormSection, InputField } = ZentForm;
  const returnedFunction = createForm();
  const FormCreated = returnedFunction(Form);

  class Address extends React.Component {
    render() {
      return <Field name="address" component={InputField} type="text" />;
    }
  }

  class Party extends React.Component {
    render() {
      return (
        <FormSection name="party" component={this.props.component}>
          <Address />
        </FormSection>
      );
    }
  }

  it('FieldSection must be in Form Component', () => {
    expect(() => {
      mount(<Party />);
    }).toThrow();
  });

  it('FieldSection can have name prop and component prop', () => {
    const nestedWrapper = mount(
      <FormCreated>
        <Party />
      </FormCreated>
    );
    expect(nestedWrapper.find(FormSection).length).toBe(1);
    expect(nestedWrapper.find(FormSection).prop('name')).toBe('party');
    expect(nestedWrapper.find(FormSection).prop('component')).toBe('div');
  });

  it('FieldSection can have different component props', () => {
    const nestedWrapper = mount(
      <FormCreated>
        <Party component="section" />
      </FormCreated>
    );
    expect(nestedWrapper.find(FormSection).length).toBe(1);
    expect(nestedWrapper.find(FormSection).prop('component')).toBe('section');
  });
});
