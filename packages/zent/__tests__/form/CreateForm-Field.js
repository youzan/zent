/* eslint-disable no-underscore-dangle */

import React from 'react';
import noop from 'lodash/noop';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import ZentForm from 'form';

describe('CreateForm and Field', () => {
  const { Form, createForm, Field, InputField, unknownProps } = ZentForm;
  const returnedFunction = createForm();
  // const DivCreated = returnedFunction('div');
  const FormCreated = returnedFunction(Form);
  const DivComponent = props => {
    const passableProps = omit(props, unknownProps);
    return <div {...passableProps} />;
  };
  const context = mount(
    <FormCreated>
      <Field name="bar" component={DivComponent} />
    </FormCreated>
  )
    .find(Field)
    .getNode().context;

  it('createForm return a function that have arg[0] using react.createElement.\nThat returnedFunction return a react class with default state, props, methods', () => {
    expect(typeof returnedFunction).toBe('function');
    // let wrapper = mount(<DivCreated />);
    // expect(wrapper.find('div').length).toBe(1);
    const wrapper = mount(<FormCreated />);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.props().onValid).toBe(noop);
    expect(wrapper.props().onInvalid).toBe(noop);
    expect(wrapper.props().onChange).toBe(noop);
    expect(wrapper.props().onSubmit).toBe(noop);
    expect(wrapper.props().onSubmitFail).toBe(noop);
    expect(wrapper.props().onSubmitSuccess).toBe(noop);
    expect(wrapper.props().validationErrors).toBe(null);
    expect(wrapper.state('isFormValid')).toBe(true);
    expect(wrapper.state('isSubmitting')).toBe(false);
    expect(wrapper.getNode().fields.length).toBe(0);
    expect(wrapper.getNode()._isMounted).toBe(true);
    expect(wrapper.getNode().getWrappedForm() instanceof Form).toBe(true);
  });

  it('Field must in a created zent-form. Must have name and component props', () => {
    expect(() => {
      mount(<Field />);
    }).toThrow();
    expect(() => {
      mount(
        <FormCreated>
          <Field component={props => <div {...props} className="bar" />} />
        </FormCreated>
      );
    }).toThrow();
    expect(() => {
      mount(
        <FormCreated>
          <Field name="foo" />
        </FormCreated>
      );
    }).toThrow();
    expect(() => {
      mount(
        <FormCreated>
          <Field
            name="foo"
            component={props => <div {...props} className="bar" />}
          />
        </FormCreated>
      );
    }).not.toThrow();
  });

  it('While render, Field will load default state and contextObj from created zent-form', () => {
    const nestedWrapper = mount(
      <FormCreated>
        <Field name="bar" component={DivComponent} />
      </FormCreated>
    );
    expect(nestedWrapper.find(Field).length).toBe(1);
    expect(typeof nestedWrapper.find(Field).getNode().context.zentForm).toBe(
      'object'
    );
    const wrapper = mount(<Field name="foo" component={DivComponent} />, {
      context
    });
    expect(typeof wrapper.context('zentForm')).toBe('object');
    expect(wrapper.state('_value')).toBe('');
    expect(wrapper.state('_isValid')).toBe(true);
    expect(wrapper.state('_isDirty')).toBe(false);
    expect(wrapper.state('_isValidating')).toBe(false);
    expect(wrapper.state('_initialValue')).toBe('');
    expect(wrapper.state('_validationError').length).toBe(0);
    expect(wrapper.state('_externalError')).toBe(null);
  });

  it('The component prop of Field can be a html tag string', () => {
    const nestedWrapper = mount(
      <FormCreated>
        <Field name="bar" component="input" value="111" />
      </FormCreated>
    );
    const inputField = nestedWrapper.find(Field);
    expect(inputField.length).toBe(1);
  });

  it('Field have componentWillRecieveProps method', () => {
    const wrapper = mount(<Field name="foo" component={DivComponent} />, {
      context
    });
    expect(Object.keys(wrapper.getNode()._validations).length).toBe(0);
    const validationsObj = { foo: noop };
    wrapper.setProps({ validations: validationsObj });
    expect(wrapper.getNode()._validations).toBe(validationsObj);
  });

  it('Field have componentWillUpdate method', () => {
    const contextCopy = Object.assign({}, context, {});
    const validateMock = jest.fn();
    contextCopy.zentForm.validate = validateMock;
    const wrapper = mount(<Field name="foo" component={DivComponent} />, {
      context: contextCopy
    });
    expect(wrapper.state('_value')).toBe('');
    wrapper.setProps({ value: 'foo' });
    expect(validateMock.mock.calls.length).toBe(1);
    expect(validateMock.mock.calls[0][0]).toBe(wrapper.getNode());
    wrapper.setProps({ value: undefined });
  });

  // HACK: console.error
  // it('Field have componentWillUnmount method', () => {
  //   const contextCopy = Object.assign({}, context, {});
  //   const detachFromFormMock = jest.fn();
  //   contextCopy.zentForm.detachFromForm = detachFromFormMock;
  //   const wrapper = mount(<Field name="foo" component={props => (<div {...props} />)} />, { context: contextCopy });
  //   expect(detachFromFormMock.mock.calls.length).toBe(0);
  //   wrapper.unmount();
  //   expect(detachFromFormMock.mock.calls.length).toBe(1);
  //   expect(detachFromFormMock.mock.calls[0][0]).toBe(wrapper.getNode());
  // });

  it('In Field render function, an element based on component prop will be created and will load its different processed props(add "checked" on checkbox and delete "value" on both checkbox and file)', () => {
    let wrapper = mount(
      <Field name="foo" component={() => <div className="foo" />} />,
      { context }
    );
    expect(wrapper.find('.foo').type()).toBe('div');
    expect(wrapper.find('.foo').length).toBe(1);
    expect(wrapper.find('component').prop('name')).toBe('foo');
    expect(wrapper.find('component').prop('validationError')).toBe('');
    expect(
      Object.keys(wrapper.find('component').prop('validationErrors')).length
    ).toBe(0);
    expect(wrapper.find('component').prop('isDirty')).toBe(false);
    expect(wrapper.find('component').prop('isValid')).toBe(true);
    expect(wrapper.find('component').prop('value')).toBe('');
    expect('value' in wrapper.find('component').props()).toBe(true);
    expect(wrapper.find('component').prop('error')).toBe(null);
    expect(wrapper.find('component').prop('errors').length).toBe(0);
    wrapper = mount(
      <Field
        name="foo"
        component={() => <div className="foo" />}
        type="checkbox"
      />,
      { context }
    );
    expect(wrapper.find('component').prop('checked')).toBe(false);
    expect('value' in wrapper.find('component').props()).toBe(false);
    wrapper = mount(
      <Field
        name="foo"
        component={() => <div className="foo" />}
        type="file"
      />,
      { context }
    );
    expect('value' in wrapper.find('component').props()).toBe(false);
  });

  it('Field can have format prop(function), and it will be excuted before Field rendered', () => {
    const formatMock = jest.fn().mockImplementation(val => val.toUpperCase());
    const wrapper = mount(
      <Field
        name="foofoo"
        component={DivComponent}
        format={formatMock}
        value="aaa"
      />,
      { context }
    );
    // format影响value的渲染，但不影响实际保存的value值
    expect(wrapper.state('_value')).toBe('aaa');
    expect(wrapper.find(DivComponent).prop('value')).toBe('AAA');
  });

  it('Field can have normalize prop(function), and it will be excuted with change event', () => {
    const fakeReturnedPre = { bar: 'foo' };
    const normalizeMock = jest.fn().mockImplementation(val => `fb${val}`);
    const getFormValuesMock = jest
      .fn()
      .mockImplementation(() => fakeReturnedPre);
    const contextCopy = Object.assign({}, context, {});
    contextCopy.zentForm.getFormValues = getFormValuesMock;
    const wrapper = mount(
      <Field
        name="foofoo"
        component={DivComponent}
        normalize={normalizeMock}
        value="init"
      />,
      { context: contextCopy }
    );
    // Field初始化时不会调用normalize
    expect(wrapper.find(DivComponent).prop('value')).toBe('init');
    expect(wrapper.state('_value')).toBe('init');
    expect(normalizeMock.mock.calls.length).toBe(0);
    expect(getFormValuesMock.mock.calls.length).toBe(0);
    // 触发change后调用normalize
    wrapper.simulate('change', { target: { value: 'eve' } });
    expect(wrapper.find(DivComponent).prop('value')).toBe('fbeve');
    expect(normalizeMock.mock.calls.length).toBe(1);
    expect(getFormValuesMock.mock.calls.length).toBe(1);
    expect(normalizeMock.mock.calls[0][0]).toBe('eve');
    expect(normalizeMock.mock.calls[0][1]).toBe('init');
    expect(normalizeMock.mock.calls[0][2].bar).toBe('foo');
    expect(normalizeMock.mock.calls[0][2].foofoo).toBe('eve');
    expect(normalizeMock.mock.calls[0][3].bar).toBe('foo');
  });

  it('Field have an unused getWrappedComponent method(not metioned in docs)', () => {
    let wrapper = mount(
      <Field name="foo" component={() => <div className="foo" />} />,
      { context }
    );
    expect(typeof wrapper.getNode().getWrappedComponent).toBe('function');

    // NOTE: 'this.getWrappedComponent = ref' turns out null, need catch up.
    // component是functional component的时候ref是null
    expect(wrapper.getNode().getWrappedComponent()).toBe(null);
  });

  // HACK: branch
  it('Field will return an empty array if isValid return false and _validationError is false value', () => {
    let wrapper = mount(
      <Field name="foo" component={() => <div className="foo" />} />,
      { context }
    );
    expect(wrapper.state('_validationError').length).toBe(0);
    wrapper.setState({ _validationError: null, _isValid: false });
    expect(wrapper.state('_isValid')).toBe(false);
    expect(wrapper.state('_externalError')).toBe(null);
    expect(wrapper.state('_validationError')).toBe(null);
  });

  it('CreatedForm have componentDidUpdate method, and will be triggered when validationErrors occurred', () => {
    class FormForTest extends React.Component {
      render() {
        return (
          <Form>
            <Field name="foo" component={() => <div className="foo-div" />} />
            <Field name="bar" component={() => <div className="bar-div" />} />
          </Form>
        );
      }
    }
    const CreatedForm = createForm()(FormForTest);
    const wrapper = mount(<CreatedForm />);
    expect(wrapper.getNode().fields[0].props.name).toBe('foo');
    expect(wrapper.getNode().fields[0].state._isValid).toBe(true);
    expect(wrapper.getNode().fields[1].props.name).toBe('bar');
    expect(wrapper.getNode().fields[1].state._isValid).toBe(true);
    wrapper.setProps({ validationErrors: { foo: 'bar', bar: 'foo' } });
    expect(wrapper.getNode().prevFieldNames[0]).toBe('foo');
    expect(wrapper.getNode().prevFieldNames[1]).toBe('bar');
    expect(wrapper.getNode().fields[0].state._isValid).toBe(false);
    expect(wrapper.getNode().fields[0].state._validationError[0]).toBe('bar');
    expect(wrapper.getNode().fields[1].state._isValid).toBe(false);
    expect(wrapper.getNode().fields[1].state._validationError[0]).toBe('foo');
    wrapper.setProps({ validationErrors: { foo: 123, bar: 321 } });
    expect(wrapper.getNode().fields[0].state._validationError).toBe(123);
    expect(wrapper.getNode().fields[1].state._validationError).toBe(321);
  });

  it('CreatedForm will revalidate when names of fields change, and it has reset method which will be excuted with another revalidate', () => {
    class FormForTest extends React.Component {
      static propTypes = {
        fieldName: PropTypes.string.isRequired
      };

      static defaultProps = {
        fieldName: 'foo'
      };

      render() {
        const { fieldName } = this.props;
        return (
          <Form>
            <Field
              name={fieldName}
              component={() => <div className="foo-div" />}
              validations={{ required: true }}
              value={fieldName === 'foo' ? 1 : ''}
            />
          </Form>
        );
      }
    }

    const CreatedForm = createForm()(FormForTest);
    const wrapper = mount(<CreatedForm fieldName="bar" />);
    expect(wrapper.find(Field).props().name).toBe('bar');
    expect(wrapper.state('isFormValid')).toBe(false);
    wrapper.setProps({ fieldName: 'foo' });
    expect(wrapper.find(Field).props().name).toBe('foo');
    expect(wrapper.state('isFormValid')).toBe(true);
    expect(wrapper.find(Field).getNode().state._value).toBe(1);
    wrapper.getNode().reset();
    expect(wrapper.find(Field).getNode().state._value).toBe('');
    expect(wrapper.state('isFormValid')).toBe(false);
    wrapper.getNode().reset({
      foo: 1
    });
    expect(wrapper.find(Field).getNode().state._value).toBe(1);
    expect(wrapper.state('isFormValid')).toBe(true);
  });

  it('CreatedForm has initialize method which will be excuted with another revalidate', () => {
    class FormForTest extends React.Component {
      render() {
        return (
          <Form>
            <Field
              name="foo"
              component={() => <div className="foo-div" />}
              validations={{ required: true }}
              value={1}
            />
          </Form>
        );
      }
    }

    const CreatedForm = createForm()(FormForTest);
    const wrapper = mount(<CreatedForm />);
    expect(wrapper.state('isFormValid')).toBe(true);
    expect(wrapper.find(Field).getNode().state._value).toBe(1);
    expect(wrapper.find(Field).getNode().state._initialValue).toBe(1);
    wrapper.getNode().initialize({
      foo: 12
    });
    expect(wrapper.find(Field).getNode().state._value).toBe(12);
    expect(wrapper.find(Field).getNode().state._initialValue).toBe(12);
    expect(wrapper.state('isFormValid')).toBe(true);
    wrapper.getNode().reset({
      foo: ''
    });
    expect(wrapper.find(Field).getNode().state._value).toBe('');
    expect(wrapper.find(Field).getNode().state._initialValue).toBe(12);
    expect(wrapper.state('isFormValid')).toBe(false);
    wrapper.getNode().initialize();
    expect(wrapper.find(Field).getNode().state._value).toBe(12);
    expect(wrapper.find(Field).getNode().state._initialValue).toBe(12);
    expect(wrapper.state('isFormValid')).toBe(true);
  });

  it('CreatedForm has setFieldsValue method which will be excuted with another revalidate', () => {
    class FormForTest extends React.Component {
      render() {
        return (
          <Form>
            <Field
              name="foo"
              component={() => <div className="foo-div" />}
              validations={{ required: true }}
              value={1}
            />
            <Field
              name="bar"
              component={() => <div className="bar-div" />}
              validations={{ required: true }}
              value={2}
            />
          </Form>
        );
      }
    }

    const CreatedForm = createForm()(FormForTest);
    const wrapper = mount(<CreatedForm />);
    expect(wrapper.state('isFormValid')).toBe(true);
    expect(wrapper.getNode().fields[0].state._value).toBe(1);
    expect(wrapper.getNode().fields[0].state._initialValue).toBe(1);
    expect(wrapper.getNode().fields[0].state._isDirty).toBe(false);
    expect(wrapper.getNode().fields[1].state._value).toBe(2);
    expect(wrapper.getNode().fields[1].state._initialValue).toBe(2);
    expect(wrapper.getNode().fields[1].state._isDirty).toBe(false);
    wrapper.getNode().setFieldsValue({
      foo: 12
    });
    expect(wrapper.getNode().fields[0].state._value).toBe(12);
    expect(wrapper.getNode().fields[0].state._isDirty).toBe(true);
    expect(wrapper.getNode().fields[0].state._initialValue).toBe(1);
    expect(wrapper.getNode().fields[1].state._value).toBe(2);
    expect(wrapper.getNode().fields[1].state._initialValue).toBe(2);
    expect(wrapper.getNode().fields[1].state._isDirty).toBe(false);
    expect(wrapper.state('isFormValid')).toBe(true);
  });

  it('CreatedForm has setFormDirty, setFormPristine and isFieldDirty methods', () => {
    class FormForTest extends React.Component {
      render() {
        return (
          <Form>
            <Field
              name="foo"
              component={() => <div className="foo-div" />}
              validations={{ required: true }}
              value={1}
            />
          </Form>
        );
      }
    }

    const CreatedForm = createForm()(FormForTest);
    const wrapper = mount(<CreatedForm />);
    wrapper.getNode().setFormDirty(true);
    expect(wrapper.getNode().fields[0].state._isDirty).toBe(true);
    wrapper.getNode().setFormPristine(true);
    expect(wrapper.getNode().fields[0].state._isDirty).toBe(false);
    expect(wrapper.getNode().isFieldDirty('foo')).toBe(false);
    expect(wrapper.getNode().isFieldDirty('bar')).toBe(false);
  });

  it('CreatedForm have isValid and getFieldError methods', () => {
    class FormForTest extends React.Component {
      static propTypes = {
        fieldName: PropTypes.string.isRequired
      };

      static defaultProps = {
        fieldName: 'foo'
      };

      render() {
        const { fieldName } = this.props;
        return (
          <Form>
            <Field
              name={fieldName}
              component={() => <div className="foo-div" />}
              validations={{ required: true }}
              validationErrors={{ required: '不能为空' }}
              value={fieldName === 'foo' ? 1 : undefined}
            />
          </Form>
        );
      }
    }

    const CreatedForm = createForm()(FormForTest);
    const wrapper = mount(<CreatedForm fieldName="bar" />);
    expect(wrapper.state('isFormValid')).toBe(false);
    expect(wrapper.getNode().isValid()).toBe(false);
    expect(wrapper.getNode().getFieldError('foo')).toBe('');
    expect(wrapper.getNode().getFieldError('bar')).toBe('不能为空');
  });

  it('Field can clear the error or not by setting clearErrorOnFocus', () => {
    class FormForTest extends React.Component {
      static propTypes = {
        fieldName: PropTypes.string.isRequired
      };

      static defaultProps = {
        fieldName: 'foo'
      };

      render() {
        const { fieldName } = this.props;
        return (
          <Form>
            <Field
              name={fieldName}
              component={InputField}
              validations={{ required: true }}
              validationErrors={{ required: '不能为空' }}
              value={fieldName === 'foo' ? 1 : undefined}
            />
          </Form>
        );
      }
    }

    const CreatedForm = createForm()(FormForTest);
    const wrapper = mount(<CreatedForm fieldName="bar" />);
    expect(wrapper.getNode().fields[0].state._isValid).toBe(false);
    expect(wrapper.getNode().getFieldError('bar')).toBe('不能为空');

    let input = wrapper.find('input');
    input.simulate('focus');
    expect(wrapper.getNode().fields[0].state._isValid).toBe(true);
    expect(wrapper.getNode().getFieldError('bar')).toBe(null);

    class FormForTest2 extends React.Component {
      static propTypes = {
        fieldName: PropTypes.string.isRequired
      };

      static defaultProps = {
        fieldName: 'foo'
      };

      render() {
        const { fieldName } = this.props;
        return (
          <Form>
            <Field
              name={fieldName}
              component={InputField}
              validations={{ required: true }}
              validationErrors={{ required: '不能为空' }}
              value={fieldName === 'foo' ? 1 : undefined}
              clearErrorOnFocus={false}
            />
          </Form>
        );
      }
    }

    const CreatedForm2 = createForm()(FormForTest2);
    const wrapper2 = mount(<CreatedForm2 fieldName="bar" />);
    expect(wrapper2.getNode().fields[0].state._isValid).toBe(false);
    expect(wrapper2.getNode().getFieldError('bar')).toBe('不能为空');

    let input2 = wrapper2.find('input');
    input2.simulate('focus');
    expect(wrapper2.getNode().fields[0].state._isValid).toBe(false);
    expect(wrapper2.getNode().getFieldError('bar')).toBe('不能为空');
  });

  // NOTE: need catch up.
  it('CreatedForm have an unused function "isValidValue"', () => {
    class FormForTest extends React.Component {
      static propTypes = {
        fieldName: PropTypes.string.isRequired
      };

      static defaultProps = {
        fieldName: 'foo'
      };

      render() {
        const { fieldName } = this.props;
        return (
          <Form>
            <Field
              name={fieldName}
              component={() => <div className="foo-div" />}
              validations={{ required: true }}
              validationErrors={{ required: '不能为空' }}
              value={fieldName === 'foo' ? 1 : undefined}
            />
          </Form>
        );
      }
    }

    const CreatedForm = createForm()(FormForTest);
    const wrapper = mount(<CreatedForm fieldName="bar" />);
    expect(typeof wrapper.getNode().isValidValue).toBe('function');
    expect(
      wrapper.getNode().isValidValue(wrapper.find(Field).getNode(), '非空')
    ).toBe(true);
  });

  it('CreatedForm have attach and detach methods', () => {
    // NOTE: each of them has an unreachable else branch
    class FormForTest extends React.Component {
      static propTypes = {
        foo: PropTypes.bool.isRequired,
        bar: PropTypes.bool.isRequired
      };

      static defaultProps = {
        foo: true,
        bar: false
      };

      render() {
        const { foo, bar } = this.props;
        return (
          <Form>
            {foo && (
              <Field
                name="foo"
                component={() => <div className="foo-div" />}
                validations={{ required: true }}
                validationErrors={{ required: '不能为空' }}
              />
            )}
            {bar && (
              <Field
                name="bar"
                component={() => <div className="bar-div" />}
                validations={{ required: true }}
                validationErrors={{ required: '不能为空' }}
              />
            )}
          </Form>
        );
      }
    }

    const CreatedForm = createForm()(FormForTest);
    const wrapper = mount(<CreatedForm fieldName="bar" />);
    expect(wrapper.find(Field).length).toBe(1);
    expect(wrapper.find('.foo-div').length).toBe(1);
    wrapper.setProps({ foo: false, bar: true });
    expect(wrapper.find(Field).length).toBe(1);
    expect(wrapper.find('.bar-div').length).toBe(1);
  });

  it('CreatedForm have a complicate validation system with Field', () => {
    class FormForThrow extends React.Component {
      render() {
        return (
          <Form>
            <Field
              name="foo"
              component={() => <div className="bar-div" />}
              validations={{ foo: true }}
              validationErrors={{ foo: 'bar' }}
            />
          </Form>
        );
      }
    }
    let TempForm = createForm()(FormForThrow);
    expect(() => {
      mount(<TempForm />);
    }).toThrow();

    class FormWithUndef extends React.Component {
      static propTypes = {
        vals: PropTypes.any
      };

      render() {
        const { vals } = this.props;
        return (
          <Form>
            <Field
              name="bar"
              component={() => <div className="bar-div" />}
              validations={vals}
            />
          </Form>
        );
      }
    }

    TempForm = createForm()(FormWithUndef);
    let tempWrapper = mount(<TempForm vals={{ required: true }} />);
    tempWrapper.setProps({ vals: undefined });
    expect(tempWrapper.find(Field).getNode()._validations).toBe(undefined);
    // HACK: branch
    tempWrapper.getNode().runValidation(tempWrapper.find(Field).getNode());

    class FormForTest extends React.Component {
      static propTypes = {
        hackSwitch: PropTypes.bool,
        showSwitch: PropTypes.shape({
          foo: PropTypes.bool,
          bar: PropTypes.bool,
          fooBar: PropTypes.bool
        })
      };

      static defaultProps = {
        hackSwitch: false,
        showSwitch: {
          foo: true,
          bar: true,
          fooBar: true
        }
      };

      render() {
        const { hackSwitch, showSwitch } = this.props;
        return (
          <Form>
            {showSwitch.foo && (
              <Field
                name="foo"
                component={() => <div className="bar-div" />}
                validations={{ required: true }}
                validationErrors={{ required: '不能为空' }}
                value={hackSwitch ? '占位' : ''}
              />
            )}
            {showSwitch.bar && (
              <Field
                name="bar"
                component={() => <div className="bar-div" />}
                validations={{ isNumeric: true }}
                validationErrors={{ isNumeric: '必须是数字' }}
                value={hackSwitch ? 12 : ''}
              />
            )}
            {showSwitch.fooBar && (
              <Field
                name="foo-bar"
                component={() => <div className="bar-div" />}
                validations={{
                  hackRule: () => (hackSwitch ? true : 'string supported')
                }}
                validationErrors={{ hackRule: 'just test' }}
              />
            )}
          </Form>
        );
      }
    }

    const CreatedForm = createForm()(FormForTest);
    let wrapper = mount(<CreatedForm />);
    expect(wrapper.state('isFormValid')).toBe(false);
    wrapper.setProps({ hackSwitch: true });
    expect(wrapper.state('isFormValid')).toBe(true);
    expect(wrapper.find(Field).length).toBe(3);
    wrapper.setProps({ showSwitch: { foo: true, bar: true, fooBar: false } });
    expect(wrapper.find(Field).length).toBe(2);
    expect(wrapper.state('isFormValid')).toBe(true);
    wrapper.setProps({ validationErrors: { foo: 'foo', bar: 123 } });
    wrapper.unmount();
    wrapper.mount();
    expect(wrapper.state('isFormValid')).toBe(false);
    // const external = wrapper.getNode().setFieldExternalErrors;
    // expect(() => {
    //   external({ foo: 'bar', bar: 321 });
    // }).toThrow();
    wrapper = mount(<CreatedForm />);
    wrapper.setProps({ hackSwitch: true });
    wrapper.getNode().setFieldExternalErrors({ foo: 'bar', bar: 321 });

    // HACK: branch
    wrapper.unmount();
    wrapper.mount();
  });

  it('Field can handle async validation on blur by adding a asyncValidation prop', () => {
    jest.clearAllTimers();
    jest.useFakeTimers();

    const asyncValidation = (values, value) => {
      return new Promise((resolve, reject) =>
        setTimeout(() => {
          if (value === 'pangxie') {
            reject('用户名已被占用');
          } else {
            resolve();
          }
        }, 1000)
      );
    };
    class FormForAsyncValidation extends React.Component {
      render() {
        return (
          <Form>
            <Field
              name="foo"
              component={InputField}
              asyncValidation={asyncValidation}
              validations={{ required: true }}
              validationErrors={{ required: '不能为空' }}
              value="pangxie"
            />
          </Form>
        );
      }
    }
    let TempForm = createForm()(FormForAsyncValidation);
    let wrapper = mount(<TempForm />);
    let input = wrapper.find('input');
    expect(wrapper.getNode().isValidating()).toBe(false);
    expect(wrapper.getNode().isFieldValidating('foo')).toBe(false);
    input.simulate('focus');
    input.simulate('blur');
    expect(wrapper.find('InputWrap').prop('error')).toBeNull();
    expect(wrapper.getNode().isValidating()).toBe(true);
    expect(wrapper.getNode().isFieldValidating('foo')).toBe(true);
    expect(wrapper.getNode().isFieldValidating('bar')).toBe(false);
    jest.runAllTimers();
    // Promise.resolve().then(() => {
    // expect(wrapper.getNode().isValidating()).toBe(false);
    // expect(wrapper.getNode().isFieldValidating('foo')).toBe(false);
    // expect(wrapper.find('InputWrap').prop('validationError')).toBe('用户名已被占用');
    // });
  });

  it('Field can have onChange/onBlur/onFocus callback', () => {
    const contextCopy = Object.assign({}, context, {});
    const onChangeMock = jest.fn();
    const onFocusMock = jest.fn();
    const onBlurMock = jest.fn();
    const wrapper = mount(
      <Field
        name="foo"
        value="1"
        onChange={onChangeMock}
        onFocus={onFocusMock}
        onBlur={onBlurMock}
        component={InputField}
      />,
      {
        context: contextCopy
      }
    );
    let input = wrapper.find('input');
    input.simulate('focus');
    input.simulate('change', { target: { value: '' } });
    input.simulate('blur');
    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(onFocusMock.mock.calls.length).toBe(1);
    expect(onBlurMock.mock.calls.length).toBe(1);
  });

  it('Field can have prevent value change through custom onChange/onBlur/onFocus callback', () => {
    const contextCopy = Object.assign({}, context, {});
    const customOnChange = (e, newValue, prevValue, preventSetValue) => {
      preventSetValue();
    };
    const customOnBlur = (e, newValue, prevValue, preventSetValue) => {
      preventSetValue();
    };
    const wrapper = mount(
      <Field
        name="foo"
        value="1"
        onChange={customOnChange}
        onBlur={customOnBlur}
        component={InputField}
      />,
      {
        context: contextCopy
      }
    );
    let input = wrapper.find('input');
    input.simulate('change', { target: { value: '' } });
    expect(wrapper.state('_value')).toBe('1');
    input.simulate('blur', { target: { value: '2' } });
    expect(wrapper.state('_value')).toBe('1');
  });

  it('Field can choose merge value or not', () => {
    const contextCopy = Object.assign({}, context, {});
    class ContactPhone extends React.Component {
      onCountryChange = e => {
        const merge = this.props.merge;
        const newValue = {
          country: e.target.value
        };
        this.props.onChange(newValue, { merge });
      };

      onPhoneChange = e => {
        const merge = this.props.merge;
        const newValue = {
          mobile: e.target.value
        };
        this.props.onChange(newValue, { merge });
      };

      filterHandler = (item, keyword) => {
        return (
          keyword &&
          item.text
            .trim()
            .toLowerCase()
            .indexOf(keyword.trim().toLowerCase()) > -1
        );
      };

      render() {
        const props = this.props;
        const value = props.value;

        return (
          <div className="zent-form__controls">
            <input
              className="country"
              type="text"
              placeholder="{i18n.phonePlaceholder}"
              value={value.country}
              onChange={this.onCountryChange}
            />
            <input
              className="mobile"
              type="text"
              placeholder="{i18n.phonePlaceholder}"
              value={value.mobile}
              onChange={this.onPhoneChange}
            />
          </div>
        );
      }
    }

    const wrapper = mount(
      <Field
        name="foo"
        component={ContactPhone}
        value={{
          country: '1',
          mobile: '15899776666'
        }}
        merge
      />,
      {
        context: contextCopy
      }
    );

    let mobileInput = wrapper.find('input.mobile');
    mobileInput.simulate('change', { target: { value: '2' } });
    expect(wrapper.state('_value').country).toBe('1');
    expect(wrapper.state('_value').mobile).toBe('2');
  });
});
