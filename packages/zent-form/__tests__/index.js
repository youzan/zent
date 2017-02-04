import React from 'react';
import noop from 'lodash/noop';
import { shallow, mount } from 'enzyme';

import ZentForm from '../src';
import * as Utils from '../src/utils';
import validationRules from '../src/validationRules';
import Option from '@youzan/zent-select';

/* eslint-disable no-underscore-dangle */

/**
 * Form Component Section
 */

describe('Form', () => {
  const { Form } = ZentForm;

  it('will render an empty form element without any props or children', () => {
    const wrapper = shallow(<Form />);
    expect(wrapper.type()).toBe('form');
    expect(wrapper.children().length).toBe(0);
    expect(wrapper.hasClass('zent-form')).toBe(true);
    expect(wrapper.props().onSubmit()).toBe(undefined);
  });

  it('can have custom prefix, className, horizontal, inline and style', () => {
    const style = { color: 'red' };
    const wrapper = shallow(<Form className="foo" prefix="bar" horizontal inline style={style} />);
    expect(wrapper.hasClass('foo')).toBe(true);
    expect(wrapper.hasClass('bar-form')).toBe(true);
    expect(wrapper.hasClass('bar-form--horizontal')).toBe(true);
    expect(wrapper.hasClass('bar-form--inline')).toBe(true);
    expect(wrapper.props().style).toBe(style);
  });

  it('can have custom children and onSubmit function', () => {
    const submitMock = jest.fn();
    const wrapper = shallow(<Form onSubmit={submitMock}>
      <span className="zent-form-child">childSpan_1</span>
      <span className="zent-form-child">childSpan_2</span>
    </Form>);
    expect(submitMock.mock.calls.length).toBe(0);
    wrapper.find('form').simulate('submit');
    expect(submitMock.mock.calls.length).toBe(1);
    expect(wrapper.find('span').length).toBe(2);
    expect(wrapper.find('span').at(0).hasClass('zent-form-child')).toBe(true);
    expect(wrapper.find('span').at(1).text()).toBe('childSpan_2');
  });
});

/**
 * CreateForm and Field Section
 */

describe('CreateForm and Field', () => {
  const { Form, createForm, Field } = ZentForm;
  const returnedFunction = createForm();
  const DivCreated = returnedFunction('div');
  const FormCreated = returnedFunction(Form);
  const context = mount(
    <FormCreated>
      <Field name="bar" component={props => (<div {...props} />)} />
    </FormCreated>
  ).find(Field).getNode().context;

  it('createForm return a function that have arg[0] using with react.createElement.\nThat returnedFunction return a react class with default state, props, functions', () => {
    expect(typeof returnedFunction).toBe('function');
    let wrapper = mount(<DivCreated />);
    expect(wrapper.find('div').length).toBe(1);
    wrapper = mount(<FormCreated />);
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
  });

  it('Field must in a created zent-form, and must have name and component props', () => {
    expect(() => { shallow(<Field />) }).toThrow();
    expect(() => { mount(<Field />) }).toThrow();
    expect(() => { mount(<FormCreated><Field component={props => (<div {...props} className="bar" />)} /></FormCreated>) }).toThrow();
    expect(() => { mount(<FormCreated><Field name="foo" /></FormCreated>) }).toThrow();
    expect(() => { mount(<FormCreated><Field name="foo" component={props => (<div {...props} className="bar" />)} /></FormCreated>) }).not.toThrow();
  });

  it('Field will load context from created zent-form and default state while render', () => {
    const nestedWrapper = mount(
      <FormCreated>
        <Field name="bar" component={props => (<div {...props} />)} />
      </FormCreated>
    );
    expect(nestedWrapper.find(Field).length).toBe(1);
    expect(typeof nestedWrapper.find(Field).getNode().context.zentForm).toBe('object');
    const wrapper = mount(<Field name="foo" component={props => (<div {...props} />)} />, { context });
    expect(typeof wrapper.context('zentForm')).toBe('object');
    expect(wrapper.state('_value')).toBe(undefined);
    expect(wrapper.state('_isValid')).toBe(true);
    expect(wrapper.state('_isPristine')).toBe(true);
    expect(wrapper.state('_isValidating')).toBe(false);
    expect(wrapper.state('_pristineValue')).toBe(undefined);
    expect(wrapper.state('_validationError').length).toBe(0);
    expect(wrapper.state('_externalError')).toBe(null);
  });

  it('Field have componentWillRecieveProps method', () => {
    const wrapper = mount(<Field name="foo" component={props => (<div {...props} />)} />, { context });
    expect(Object.keys(wrapper.getNode()._validations).length).toBe(0);
    const validationsObj = { foo: noop };
    wrapper.setProps({ validations: validationsObj });
    expect(wrapper.getNode()._validations).toBe(validationsObj);
  });

  it('Field have componentWillUpdate method', () => {
    const contextCopy = Object.assign({}, context, {});
    const validateMock = jest.fn();
    contextCopy.zentForm.validate = validateMock;
    const wrapper = mount(<Field name="foo" component={props => (<div {...props} />)} />, { context: contextCopy });
    expect(wrapper.state('_value')).toBe(undefined);
    wrapper.setProps({ value: 'foo' });
    expect(validateMock.mock.calls.length).toBe(1);
    expect(validateMock.mock.calls[0][0]).toBe(wrapper.getNode());
    wrapper.setProps({ value: undefined });
  });

  it('Field have componentWillUnmount method', () => {
    const contextCopy = Object.assign({}, context, {});
    const detachFromFormMock = jest.fn();
    contextCopy.zentForm.detachFromForm = detachFromFormMock;
    const wrapper = mount(<Field name="foo" component={props => (<div {...props} />)} />, { context: contextCopy });
    expect(detachFromFormMock.mock.calls.length).toBe(0);
    wrapper.unmount();
    expect(detachFromFormMock.mock.calls.length).toBe(1);
    expect(detachFromFormMock.mock.calls[0][0]).toBe(wrapper.getNode());
  });

  it('In Field render function, an element based on component prop will be created and will load some processed props on component (add "checked" on checkbox and delete "value" on both checkbox and file)', () => {
    let wrapper = mount(<Field name="foo" component={() => (<div className="foo" />)} />, { context });
    expect(wrapper.find('.foo').type()).toBe('div');
    expect(wrapper.find('.foo').length).toBe(1);
    expect(wrapper.find('component').prop('name')).toBe('foo');
    expect(wrapper.find('component').prop('validationError')).toBe('');
    expect(Object.keys(wrapper.find('component').prop('validationErrors')).length).toBe(0);
    expect(wrapper.find('component').prop('isTouched')).toBe(false);
    expect(wrapper.find('component').prop('isPristine')).toBe(true);
    expect(wrapper.find('component').prop('isValid')).toBe(true);
    expect(wrapper.find('component').prop('value')).toBe(undefined);
    expect('value' in wrapper.find('component').props()).toBe(true);
    expect(wrapper.find('component').prop('error')).toBe(null);
    expect(wrapper.find('component').prop('errors').length).toBe(0);
    expect(wrapper.find('component').prop('onChange')).toBe(wrapper.getNode().onChange);
    wrapper = mount(<Field name="foo" component={() => (<div className="foo" />)} type="checkbox" />, { context });
    expect(wrapper.find('component').prop('checked')).toBe(false);
    expect('value' in wrapper.find('component').props()).toBe(false);
    wrapper = mount(<Field name="foo" component={() => (<div className="foo" />)} type="file" />, { context });
    expect('value' in wrapper.find('component').props()).toBe(false);
  });

  it('Field can have normalize prop(function), and it will be excuted with change event', () => {
    const fakeReturnedPre = { bar: 'foo' };
    const normalizeMock = jest.fn().mockImplementation(val => `fb${val}`);
    const getFormValuesMock = jest.fn().mockImplementation(() => fakeReturnedPre);
    const contextCopy = Object.assign({}, context, {});
    contextCopy.zentForm.getFormValues = getFormValuesMock;
    const wrapper = mount(<Field name="foofoo" component={props => (<div {...props} />)} normalize={normalizeMock} value="init" />, { context: contextCopy });
    expect(wrapper.find('component').prop('value')).toBe('fbinit');
    expect(wrapper.state('_value')).toBe('init');
    expect(normalizeMock.mock.calls.length).toBe(1);
    expect(getFormValuesMock.mock.calls.length).toBe(1);
    expect(normalizeMock.mock.calls[0][0]).toBe('init');
    expect(normalizeMock.mock.calls[0][1]).toBe('init');
    expect(normalizeMock.mock.calls[0][2].bar).toBe('foo');
    expect(normalizeMock.mock.calls[0][2].foofoo).toBe('init');
    expect(normalizeMock.mock.calls[0][3].bar).toBe('foo');
    wrapper.simulate('change', { target: { value: 'eve' } });

    // NOTE: 因为onChange会触发一次状态更新rerender，所以会执行两次this.normalize。初始值会变为从事件对象中提取的value值。
    expect(wrapper.find('component').prop('value')).toBe('fbfbeve');
    expect(normalizeMock.mock.calls.length).toBe(3);
    expect(getFormValuesMock.mock.calls.length).toBe(3);
    expect(normalizeMock.mock.calls[1][0]).toBe('eve');
    expect(normalizeMock.mock.calls[2][0]).toBe('fbeve');
    expect(normalizeMock.mock.calls[1][1]).toBe('init');
    expect(normalizeMock.mock.calls[2][1]).toBe('fbeve');
    expect(normalizeMock.mock.calls[1][2].bar).toBe('foo');
    expect(normalizeMock.mock.calls[2][2].bar).toBe('foo');
    expect(normalizeMock.mock.calls[1][2].foofoo).toBe('eve');
    expect(normalizeMock.mock.calls[2][2].foofoo).toBe('fbeve');
    expect(normalizeMock.mock.calls[1][3].bar).toBe('foo');
    expect(normalizeMock.mock.calls[2][3].bar).toBe('foo');
  });

  it('Field have an unused getWrappedField function', () => {
    let wrapper = mount(<Field name="foo" component={() => (<div className="foo" />)} />, { context });
    expect(typeof wrapper.getNode().getWrappedField).toBe('function');

    // NOTE: 'this.wrappedField = ref then wrappedField turns out null'
    expect(wrapper.getNode().getWrappedField()).toBe(null);
  });

  // branch hack
  it('Field will return an empty array if isValid return false and _validationError is false value', () => {
    let wrapper = mount(<Field name="foo" component={() => (<div className="foo" />)} />, { context });
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
            <Field name="foo" component={() => (<div className="foo-div" />)} />
            <Field name="bar" component={() => (<div className="bar-div" />)} />
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

  it('CreatedForm will revalidate when names of fields change, and it can reset, while reset will revalidate, too', () => {
    class FormForTest extends React.Component {
      static propTypes = {
        fieldName: React.PropTypes.string.isRequired
      }

      static defaultProps = {
        fieldName: 'foo'
      }

      render() {
        const { fieldName } = this.props;
        return (
          <Form>
            <Field name={fieldName} component={() => (<div className="foo-div" />)} validations={{ required: true }} value={fieldName === 'foo' ? 1 : undefined} />
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
    expect(wrapper.find(Field).getNode().state._value).toBe(undefined);
    expect(wrapper.state('isFormValid')).toBe(false);
    wrapper.getNode().reset({
      foo: 1
    });
    expect(wrapper.find(Field).getNode().state._value).toBe(1);
    expect(wrapper.state('isFormValid')).toBe(true);
  });

  it('CreatedForm have isValid and getFieldError functions', () => {
    class FormForTest extends React.Component {
      static propTypes = {
        fieldName: React.PropTypes.string.isRequired
      }

      static defaultProps = {
        fieldName: 'foo'
      }

      render() {
        const { fieldName } = this.props;
        return (
          <Form>
            <Field name={fieldName} component={() => (<div className="foo-div" />)} validations={{ required: true }} validationErrors={{ required: '不能为空' }} value={fieldName === 'foo' ? 1 : undefined} />
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

  it('CreatedForm have an unused function "isValidValue"', () => {
    class FormForTest extends React.Component {
      static propTypes = {
        fieldName: React.PropTypes.string.isRequired
      }

      static defaultProps = {
        fieldName: 'foo'
      }

      render() {
        const { fieldName } = this.props;
        return (
          <Form>
            <Field name={fieldName} component={() => (<div className="foo-div" />)} validations={{ required: true }} validationErrors={{ required: '不能为空' }} value={fieldName === 'foo' ? 1 : undefined} />
          </Form>
        );
      }
    }

    const CreatedForm = createForm()(FormForTest);
    const wrapper = mount(<CreatedForm fieldName="bar" />);
    expect(typeof wrapper.getNode().isValidValue).toBe('function');
    expect(wrapper.getNode().isValidValue(wrapper.find(Field).getNode(), '非空')).toBe(true);
  });

  // each of them has an unreachable else branch
  it('CreatedForm have attach and detach methods', () => {
    class FormForTest extends React.Component {
      static propTypes = {
        foo: React.PropTypes.bool.isRequired,
        bar: React.PropTypes.bool.isRequired
      }

      static defaultProps = {
        foo: true,
        bar: false
      }

      render() {
        const { foo, bar } = this.props;
        return (
          <Form>
            {foo && <Field name="foo" component={() => (<div className="foo-div" />)} validations={{ required: true }} validationErrors={{ required: '不能为空' }} />}
            {bar && <Field name="bar" component={() => (<div className="bar-div" />)} validations={{ required: true }} validationErrors={{ required: '不能为空' }} />}
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

  it('CreatedForm have a validation system with Field', () => {
    class FormForThrow extends React.Component {
      render() {
        return (
          <Form>
            <Field name="foo" component={() => (<div className="bar-div" />)} validations={{ foo: true }} validationErrors={{ foo: 'bar' }} />
          </Form>
        );
      }
    }
    let TempForm = createForm()(FormForThrow);
    expect(() => { mount(<TempForm />) }).toThrow();

    class FormWithUndef extends React.Component {
      static propTypes = {
        vals: React.PropTypes.any
      }

      render() {
        const { vals } = this.props;
        return (
          <Form>
            <Field name="bar" component={() => (<div className="bar-div" />)} validations={vals} />
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
        hackSwitch: React.PropTypes.bool,
        showSwitch: React.PropTypes.shape({
          foo: React.PropTypes.bool,
          bar: React.PropTypes.bool,
          fooBar: React.PropTypes.bool,
        })
      }

      static defaultProps = {
        hackSwitch: false,
        showSwitch: {
          foo: true,
          bar: true,
          fooBar: true
        }
      }

      render() {
        const { hackSwitch, showSwitch } = this.props;
        return (
          <Form>
            {showSwitch.foo && <Field name="foo" component={() => (<div className="bar-div" />)} validations={{ required: true }} validationErrors={{ required: '不能为空' }} value={hackSwitch ? '占位' : ''} />}
            {showSwitch.bar && <Field name="bar" component={() => (<div className="bar-div" />)} validations={{ isNumeric: true }} validationErrors={{ isNumeric: '必须是数字' }} value={hackSwitch ? 12 : ''} />}
            {showSwitch.fooBar && <Field name="foo-bar" component={() => (<div className="bar-div" />)} validations={{ hackRule: () => (hackSwitch ? true : 'string supported') }} validationErrors={{ hackRule: 'just test' }} />}
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
    const external = wrapper.getNode().setFieldExternalErrors;
    expect(() => { external({ foo: 'bar', bar: 321 }) }).toThrow();
    wrapper = mount(<CreatedForm />);
    wrapper.setProps({ hackSwitch: true });
    wrapper.getNode().setFieldExternalErrors({ foo: 'bar', bar: 321 });

    // HACK: branch
    wrapper.unmount();
    wrapper.mount();
  });
});

/**
 * CreatedForm and HandleSubmit Section
 */

describe('CreatedForm and HandleSubmit', () => {
  const { Form, createForm, Field } = ZentForm;

  it('onSubmit of CreatedForm can be a function as a prop', () => {
    class SubmitProp extends React.Component {
      render() {
        const { handleSubmit } = this.props;
        return (
          <Form onSubmit={handleSubmit}>
            <Field name="foo" component={() => (<div />)} validations={{ required: true }} value={'占位'}>
              <span />
            </Field>
          </Form>
        );
      }
    }
    let CreatedForm = createForm()(SubmitProp);
    let wrapper = mount(<CreatedForm onSubmit={'string type'} />);
    expect(() => { wrapper.simulate('submit') }).toThrow();
    const onSubmitMock = jest.fn().mockImplementation(() => 'foobar');
    const onSubmitSuccessMock = jest.fn();
    wrapper = mount(<CreatedForm onSubmit={onSubmitMock} onSubmitSuccess={onSubmitSuccessMock} />);
    expect(() => { wrapper.simulate('submit') }).not.toThrow();
    expect(onSubmitMock.mock.calls.length).toBe(1);
    expect(onSubmitSuccessMock.mock.calls.length).toBe(1);
    expect(onSubmitSuccessMock.mock.calls[0][0]).toBe('foobar');
    const pro = new Promise(resolve => setTimeout(resolve, 2000));
    const submitPropPromiseMock = jest.fn().mockImplementation(() => pro);
    wrapper = mount(<CreatedForm onSubmit={submitPropPromiseMock} onSubmitSuccess={onSubmitSuccessMock} />);
    expect(() => { wrapper.simulate('submit') }).not.toThrow();

    // HACK: branch
    expect(() => { wrapper.simulate('submit') }).not.toThrow();
    wrapper = mount(<CreatedForm onSubmit={onSubmitMock} onSubmitSuccess={null} />);
    expect(() => { wrapper.simulate('submit') }).not.toThrow();
    expect(onSubmitMock.mock.calls.length).toBe(2);
  });

  it('onSubmit of CreatedForm can be a function returns promise passed to handleSubmit', () => {
    jest.useFakeTimers();
    const submitFunc = (values) => {
      return new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
        return values;
      });
    };
    const promiseSuccessMock = jest.fn();
    class SubmitFunc extends React.Component {
      render() {
        const { handleSubmit } = this.props;
        return (
          <Form onSubmit={handleSubmit(submitFunc)}>
            <Field name="foo" component={() => (<div />)} validations={{ required: true }} value={'非空'}>
              <span />
            </Field>
          </Form>
        );
      }
    }
    const CreatedForm = createForm()(SubmitFunc);
    let wrapper = mount(<CreatedForm onSubmitSuccess={promiseSuccessMock} />);
    expect(() => { wrapper.simulate('submit') }).not.toThrow();
    expect(wrapper.getNode().isSubmitting()).toBe(true);
    expect(promiseSuccessMock.mock.calls.length).toBe(0);
    jest.runAllTimers();
    Promise.resolve().then(() => {
      expect(promiseSuccessMock.mock.calls.length).toBe(1);
      expect(wrapper.getNode().isSubmitting()).toBe(false);
    });
    wrapper = mount(<CreatedForm onSubmitSuccess={null} />);
    expect(() => { wrapper.simulate('submit') }).not.toThrow();
    expect(wrapper.getNode().isSubmitting()).toBe(true);
    jest.runAllTimers();
    Promise.resolve().then(() => {
      expect(wrapper.getNode().isSubmitting()).toBe(false);
    });
  });

  it('onSubmitFail will be excuted when then promise rejected', () => {
    jest.clearAllTimers();
    jest.useFakeTimers();
    const submitFunc = () => {
      return new Promise((resolve, reject) => setTimeout(reject, 1000));
    };
    const promiseSuccessMock = jest.fn();
    const promiseFailMock = jest.fn();
    class SubmitFunc extends React.Component {
      render() {
        const { handleSubmit } = this.props;
        return (
          <Form onSubmit={handleSubmit(submitFunc)}>
            <Field name="foo" component={() => (<div />)} validations={{ required: true }} value={'非空'}>
              <span />
            </Field>
          </Form>
        );
      }
    }
    const CreatedForm = createForm()(SubmitFunc);
    let wrapper = mount(<CreatedForm onSubmitSuccess={promiseSuccessMock} onSubmitFail={promiseFailMock} />);
    expect(() => { wrapper.simulate('submit') }).not.toThrow();
    expect(wrapper.getNode().isSubmitting()).toBe(true);
    expect(promiseSuccessMock.mock.calls.length).toBe(0);
    expect(promiseFailMock.mock.calls.length).toBe(0);
    jest.runAllTimers();
    Promise.resolve().then(() => {
      expect(promiseSuccessMock.mock.calls.length).toBe(0);
      expect(promiseFailMock.mock.calls.length).toBe(1);
      expect(wrapper.getNode().isSubmitting()).toBe(false);
    });
    wrapper = mount(<CreatedForm onSubmitSuccess={null} onSubmitFail={null} />);
    expect(() => { wrapper.simulate('submit') }).not.toThrow();
    expect(wrapper.getNode().isSubmitting()).toBe(true);
    jest.runAllTimers();
    Promise.resolve().then(() => {
      expect(wrapper.getNode().isSubmitting()).toBe(false);
    });

    // BUG: promise rejected will excute zent-form.submitCompleted not submitFailed
    // HACK lines
    expect(() => {
      wrapper.getNode().submitFailed(new Error());
    }).toThrow();
  });

  it('HandleSubmit method of CreatedForm can handle error occurred while submit', () => {
    const submit = () => {
      throw new Error('Error in Unit Test');
    };
    class SubmitForm extends React.Component {
      render() {
        const { handleSubmit } = this.props;
        return (
          <Form onSubmit={handleSubmit(submit)}>
            <Field name="foo" component={() => (<div />)} validations={{ required: true }} value={'占位'}>
              <span />
            </Field>
          </Form>
        );
      }
    }
    const subFailMock = jest.fn();
    let CreatedForm = createForm()(SubmitForm);
    let wrapper = mount(<CreatedForm onSubmitFail={subFailMock} />);
    expect(() => { wrapper.simulate('submit') }).not.toThrow();
    expect(subFailMock.mock.calls.length).toBe(1);
    wrapper = mount(<CreatedForm onSubmitFail={null} />);
    expect(() => { wrapper.simulate('submit') }).not.toThrow();
  });

  it('Invalid will cause handleSubmit do nothing while excuted', () => {
    const submitMock = jest.fn();
    class SubmitForm extends React.Component {
      render() {
        const { handleSubmit } = this.props;
        return (
          <Form onSubmit={handleSubmit(submitMock)}>
            <Field name="foo" component={() => (<div />)} validations={{ required: true }} value={''}>
              <span />
            </Field>
          </Form>
        );
      }
    }
    const subSuccessMock = jest.fn();
    const subFailMock = jest.fn();
    let CreatedForm = createForm()(SubmitForm);
    let wrapper = mount(<CreatedForm onSubmitFail={subFailMock} onSubmitSuccess={subSuccessMock} />);
    expect(wrapper.state('isFormValid')).toBe(false);
    expect(() => { wrapper.simulate('submit') }).not.toThrow();
    expect(subFailMock.mock.calls.length).toBe(0);
    expect(subSuccessMock.mock.calls.length).toBe(0);
    expect(submitMock.mock.calls.length).toBe(0);
    wrapper.simulate('submit');
    expect(subFailMock.mock.calls.length).toBe(0);
    expect(subSuccessMock.mock.calls.length).toBe(0);
    expect(submitMock.mock.calls.length).toBe(0);
  });
});

/**
 * GetControlGroup and Form_Components Section
 */

describe('GetControlGroup', () => {
  const { Form, createForm, Field, getControlGroup } = ZentForm;
  const FormCreated = createForm()(Form);
  const context = mount(
    <FormCreated>
      <Field name="bar" component={props => (<div {...props} />)} />
    </FormCreated>
  ).find(Field).getNode().context;

  it('will render default structure with example usage(as component prop of Field)', () => {
    const addtionInput = getControlGroup(props => (<input type="text" {...props} />));
    const wrapper = mount(<Field name="foo" component={addtionInput} />, { context });
    /**
     * .zent-form__control-group
     *   label.zent-form__control-label
     *   .zent-form__controls
     *     Control(component)
     */
    expect(wrapper.find('.zent-form__control-group').length).toBe(1);
    expect(wrapper.find('.zent-form__control-label').length).toBe(1);
    expect(wrapper.find('.zent-form__controls').length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
  });

  it('controlGroup have three render switch: required, helpDesc and showError', () => {
    const addtionInput = getControlGroup(props => (<input type="text" {...props} />));
    const wrapper = mount(<Field name="foo" component={addtionInput} required helpDesc={'foo'} validations={{ isEmail: true }} validationErrors={{ isEmail: '必须输入有效的Email地址' }} />, { context });
    expect(wrapper.find('.zent-form__required').length).toBe(1);
    expect(wrapper.find('.zent-form__required').text()).toBe('*');
    expect(wrapper.find('.zent-form__help-desc').length).toBe(1);
    expect(wrapper.find('.zent-form__help-desc').text()).toBe('foo');
    wrapper.getNode().setValue('foo');
    expect(wrapper.find('.zent-form__help-block').length).toBe(1);
    expect(wrapper.find('.zent-form__help-block').text()).toBe('必须输入有效的Email地址');
  });

  it('CheckboxField', () => {
    const { CheckboxField } = ZentForm;
    const wrapper = mount(<Field name="foo" component={CheckboxField} />, { context });
    expect(wrapper.find('Checkbox').length).toBe(1);
    expect('checked' in wrapper.find('Checkbox').props()).toBe(true);
  });

  it('CheckboxGroupField', () => {
    const { CheckboxGroupField } = ZentForm;
    const wrapper = mount(<Field name="foo" component={CheckboxGroupField} />, { context });
    expect(wrapper.find('Group').length).toBe(1);
  });

  it('InputField', () => {
    const { InputField } = ZentForm;
    const wrapper = mount(<Field name="foo" component={InputField} />, { context });
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('input').prop('type')).toBe('text');
  });

  it('RadioGroupField', () => {
    const { RadioGroupField } = ZentForm;
    const wrapper = mount(<Field name="foo" component={RadioGroupField} />, { context });
    expect(wrapper.find('Group').length).toBe(1);
  });

  it('SelectField', () => {
    const { SelectField } = ZentForm;
    const wrapper = mount(<Field name="foo" component={SelectField}>
      <Option className="zent-select-option" value="1">选项一</Option>
      <Option className="zent-select-option" value="2">选项二</Option>
      <Option className="zent-select-option" value="3">选项三</Option>
    </Field>, { context });
    expect(wrapper.find('Select').length).toBe(1);

    // HACK: select is hard to test the onChange
    wrapper.find('Select').prop('onChange')({ target: { value: 'foo' } }, { value: '选项hack' });
  });
});

/**
 * Utils Section
 */

describe('Form-Utilities', () => {
  const { getValue, getDisplayName, silenceEvent, silenceEvents } = Utils;

  it('getValue', () => {
    const emptyObj = {};
    const objWithValue = { value: 'bar' };
    const target = {};
    const canPassEventTest = {
      preventDefault: () => {},
      stopPropagation: () => {},
    };

    // return arg[0]
    expect(getValue(0, 1)).toBe(0);
    expect(getValue(emptyObj)).toBe(emptyObj);

    // arg[0] && arg[0].value return arg[0].value
    expect(getValue(objWithValue)).toBe('bar');


    // after pass event test, arg[0] must have key 'target'
    expect(() => { getValue(canPassEventTest) }).toThrow();

    // if(isEvent(arg[0])) return arg[0].target.value
    canPassEventTest.target = target;
    expect(getValue(canPassEventTest)).toBe(undefined);
    target.value = 'foo';
    expect(getValue(canPassEventTest)).toBe('foo');

    // arg[0].target.type === 'checkbox' return arg[0].target.checked
    target.type = 'checkbox';
    expect(getValue(canPassEventTest)).toBe(undefined);
    target.checked = false;
    expect(getValue(canPassEventTest)).toBe(false);

    // type === 'file' return target.files || (arg[0].dataTransfer && arg[0].dataTransfer.files)
    canPassEventTest.dataTransfer = null;
    target.type = 'file';
    expect(getValue(canPassEventTest)).toBe(null);
    const dataT = {};
    canPassEventTest.dataTransfer = dataT;
    expect(getValue(canPassEventTest)).toBe(undefined);
    dataT.files = 'bar';
    expect(getValue(canPassEventTest)).toBe('bar');
    target.files = 'foo-bar';
    expect(getValue(canPassEventTest)).toBe('foo-bar');

    // type === 'select-multiple' return getSelectedValues(arg[0].target.options)
    target.type = 'select-multiple';
    expect(getValue(canPassEventTest).length).toBe(0);
    target.options = [
      { selected: 0, value: 1 },
      { selected: 1, value: 0 },
      { selected: 'foo', value: 'bar' }
    ];
    expect(getValue(canPassEventTest).length).toBe(2);
    expect(getValue(canPassEventTest)[0]).toBe(0);
    expect(getValue(canPassEventTest)[1]).toBe('bar');

    // type === 'number' || 'range', return parseFloat(value)
    target.value = '11a.234';
    target.type = 'number';
    expect(getValue(canPassEventTest)).toBe(11);
    target.value = '-13.23D';
    expect(getValue(canPassEventTest)).toBe(-13.23);
    target.type = 'range';
    expect(getValue(canPassEventTest)).toBe(-13.23);
  });

  it('getDisplayName', () => {
    const compForTest = {};

    // must have arg
    expect(() => { getDisplayName() }).toThrow();

    // return arg[0].displayName || arg[0].name || 'Component'
    expect(getDisplayName(compForTest)).toBe('Component');
    compForTest.name = 'foo';
    expect(getDisplayName(compForTest)).toBe('foo');
    compForTest.displayName = 'bar';
    expect(getDisplayName(compForTest)).toBe('bar');
  });

  it('silenceEvent', () => {
    const preMock = jest.fn();
    const stopMock = jest.fn();
    const eventObj = {
      preventDefault: preMock,
      stopPropagation: stopMock
    };

    // return isEvent(arg[0])
    expect(silenceEvent()).toBe(false);
    expect(silenceEvent({})).toBe(false);
    expect(preMock.mock.calls.length).toBe(0);
    expect(stopMock.mock.calls.length).toBe(0);
    expect(silenceEvent(eventObj)).toBe(true);
    expect(preMock.mock.calls.length).toBe(1);
    expect(stopMock.mock.calls.length).toBe(0);
  });

  it('silenceEvents', () => {
    const curryMock = jest.fn();
    const preMock = jest.fn();
    const eventObj = {
      preventDefault: preMock,
      stopPropagation: true
    };
    const notEventObj = { bar: 'foo' };

    // must have function as arg[0]
    expect(() => { silenceEvents()({}) }).toThrow();
    silenceEvents(curryMock)(notEventObj, 1);
    expect(curryMock.mock.calls.length).toBe(1);
    expect(preMock.mock.calls.length).toBe(0);
    expect(curryMock.mock.calls[0][0]).toBe(notEventObj);
    expect(curryMock.mock.calls[0][1]).toBe(1);
    silenceEvents(curryMock)(eventObj, 2);
    expect(curryMock.mock.calls.length).toBe(2);
    expect(preMock.mock.calls.length).toBe(1);
    expect(curryMock.mock.calls[1][0]).toBe(2);
  });
});

/**
 * validationRules Section
 */

describe('Validation-Rules', () => {
  // values no use most of the time as arg[0] of validation functions
  const values = {};
  it('required', () => {
    const { required } = validationRules;
    expect(required(values)).toBe(false);
    expect(required(values, '')).toBe(false);
    expect(required(values, ' ')).toBe(true);
  });

  it('isExisty', () => {
    const { isExisty } = validationRules;
    expect(isExisty(values)).toBe(false);
    expect(isExisty(values, null)).toBe(false);
    expect(isExisty(values, '')).toBe(true);
  });

  it('matchRegex', () => {
    const { matchRegex } = validationRules;
    expect(matchRegex(values)).toBe(true);
    expect(matchRegex(values, null)).toBe(true);
    expect(matchRegex(values, '')).toBe(true);
    expect(matchRegex(values, 'bac', /c/)).toBe(true);
    expect(matchRegex(values, 'bac', /^c/)).toBe(false);
    expect(matchRegex(values, 'abc', /^a/)).toBe(true);
  });

  it('isUndefined', () => {
    const { isUndefined } = validationRules;
    expect(isUndefined(values)).toBe(true);
    let t;
    expect(isUndefined(values, t)).toBe(true);
    expect(isUndefined(values, '')).toBe(false);
  });

  it('isEmptyString', () => {
    const { isEmptyString } = validationRules;
    // return value === ''
    expect(isEmptyString(values, '11')).toBe(false);
    expect(isEmptyString(values, 1)).toBe(false);
    expect(isEmptyString(values, '')).toBe(true);
  });

  it('isEmail', () => {
    const { isEmail } = validationRules;

    // NOTE: ！！！空值返回true！！！
    expect(isEmail(values)).toBe(true);
    expect(isEmail(values, null)).toBe(true);
    expect(isEmail(values, '')).toBe(true);

    expect(isEmail(values, 'foo')).toBe(false);
    expect(isEmail(values, 'foo@')).toBe(false);
    expect(isEmail(values, 'foo@.')).toBe(false);
    expect(isEmail(values, 'foo@.com')).toBe(false);
    expect(isEmail(values, 'foo@bar.com')).toBe(true);
    expect(isEmail(values, 'foo1@bar.com')).toBe(true);
    expect(isEmail(values, 'foo1-2@bar.com')).toBe(true);
    expect(isEmail(values, 'foo1-2@bar1.com')).toBe(true);
    expect(isEmail(values, 'foo1-2@bar1-2.com')).toBe(true);
    expect(isEmail(values, 'foo1-2@bar1-2*.com')).toBe(false);
    expect(isEmail(values, 'Foo1-*2@bar1-2.g.com')).toBe(true);
    expect(isEmail(values, 'foo1-*2@Bar1-2.edu.cn')).toBe(true);
  });

  it('isUrl', () => {
    const { isUrl } = validationRules;

    // NOTE: ！！！空值返回true！！！
    expect(isUrl(values)).toBe(true);
    expect(isUrl(values, null)).toBe(true);
    expect(isUrl(values, '')).toBe(true);

    expect(isUrl(values, 'www')).toBe(false);
    expect(isUrl(values, 'www.foo')).toBe(false);
    expect(isUrl(values, 'www.foo.com')).toBe(false);
    expect(isUrl(values, 'http://www')).toBe(false);
    expect(isUrl(values, 'http://foo')).toBe(false);
    expect(isUrl(values, 'http://foo.bar')).toBe(true);
    expect(isUrl(values, 'http://www.foo')).toBe(true);
    expect(isUrl(values, 'https://www.foo')).toBe(true);
    expect(isUrl(values, 'ftp://www.foo')).toBe(true);
    expect(isUrl(values, 'sftp://www.foo')).toBe(true);
    expect(isUrl(values, 'http://foo.com')).toBe(true);
    expect(isUrl(values, 'http://foo.com/foo')).toBe(true);
    expect(isUrl(values, 'http://foo.com/#foo')).toBe(true);
    expect(isUrl(values, 'http://foo.com/#foo/Foo-bar')).toBe(true);
    expect(isUrl(values, 'http://foo.com/foo-bar?foo=bar')).toBe(true);
    expect(isUrl(values, 'http://foo.com/foo-bar?foo=bar')).toBe(true);
    expect(isUrl(values, 'http://foo.com/foo-bar?foo=bar&bar=foo')).toBe(true);
  });

  it('isTrue', () => {
    const { isTrue } = validationRules;

    // return value === true
    expect(isTrue(values)).toBe(false);
    expect(isTrue(values, 1)).toBe(false);
    expect(isTrue(values, true)).toBe(true);
  });

  it('isFalse', () => {
    const { isFalse } = validationRules;

    // return value === false
    expect(isFalse(values)).toBe(false);
    expect(isFalse(values, 0)).toBe(false);
    expect(isFalse(values, false)).toBe(true);
  });

  it('isNumeric', () => {
    const { isNumeric } = validationRules;

    // NOTE: 空值返回true
    expect(isNumeric()).toBe(true);
    expect(isNumeric(values)).toBe(true);
    expect(isNumeric(values, null)).toBe(true);
    expect(isNumeric(values, '')).toBe(true);

    // NOTE: 按type判断和正则判断不匹配
    expect(isNumeric(values, 0)).toBe(true);
    expect(isNumeric(values, -1)).toBe(true);
    expect(isNumeric(values, -1.1)).toBe(true);
    expect(isNumeric(values, -1.1e12)).toBe(true);
    expect(isNumeric(values, 0b101)).toBe(true);
    expect(isNumeric(values, 0o17)).toBe(true);
    expect(isNumeric(values, 0x1a)).toBe(true);

    expect(isNumeric(values, '0')).toBe(true);
    expect(isNumeric(values, '-1')).toBe(true);
    expect(isNumeric(values, '-1.1')).toBe(true);
    expect(isNumeric(values, '-1.1e12')).toBe(false);
    expect(isNumeric(values, '0b101')).toBe(false);
    expect(isNumeric(values, '0o17')).toBe(false);
    expect(isNumeric(values, '0x1a')).toBe(false);
  });

  it('isInt', () => {
    const { isInt } = validationRules;

    // NOTE: 空值返回true
    expect(isInt()).toBe(true);
    expect(isInt(values)).toBe(true);
    expect(isInt(values, null)).toBe(true);
    expect(isInt(values, '')).toBe(true);

    // RegExp.test() support Number input
    expect(isInt(values, 1)).toBe(true);
    expect(isInt(values, 0b1)).toBe(true);
    expect(isInt(values, 0o1)).toBe(true);
    expect(isInt(values, 0x1)).toBe(true);
    expect(isInt(values, '1')).toBe(true);
    expect(isInt(values, 0)).toBe(true);
    expect(isInt(values, '0')).toBe(true);
    expect(isInt(values, '+0')).toBe(true);
    expect(isInt(values, '-0')).toBe(true);
    expect(isInt(values, '+1')).toBe(true);
    expect(isInt(values, '-1')).toBe(true);
    expect(isInt(values, -1234567)).toBe(true);
    expect(isInt(values, '+1234567')).toBe(true);
    expect(isInt(values, 0.1)).toBe(false);
    expect(isInt(values, '0.1')).toBe(false);
  });

  it('isFloat', () => {
    const { isFloat } = validationRules;

    // NOTE: 空值返回true
    expect(isFloat()).toBe(true);
    expect(isFloat(values)).toBe(true);
    expect(isFloat(values, null)).toBe(true);
    expect(isFloat(values, '')).toBe(true);

    expect(isFloat(values, 1.1)).toBe(true);
    expect(isFloat(values, 1)).toBe(true);
    expect(isFloat(values, 0b1)).toBe(true);
    expect(isFloat(values, 0o1)).toBe(true);
    expect(isFloat(values, 0x1)).toBe(true);
    expect(isFloat(values, '1.1')).toBe(true);
    expect(isFloat(values, 0)).toBe(true);
    expect(isFloat(values, '0')).toBe(true);
    expect(isFloat(values, '+0')).toBe(true);
    expect(isFloat(values, '-0')).toBe(true);
    expect(isFloat(values, '+1')).toBe(true);
    expect(isFloat(values, '-1')).toBe(true);
    expect(isFloat(values, -1234.567)).toBe(true);
    expect(isFloat(values, '+1234.567')).toBe(true);
    expect(isFloat(values, 0.1)).toBe(true);
    expect(isFloat(values, '0.1')).toBe(true);
  });

  it('isWords', () => {
    const { isWords } = validationRules;

    // NOTE: 空值返回true
    expect(isWords()).toBe(true);
    expect(isWords(values)).toBe(true);
    expect(isWords(values, null)).toBe(true);
    expect(isWords(values, '')).toBe(true);

    expect(isWords(values, 'foo bar')).toBe(true);
    expect(isWords(values, 'foo-bar')).toBe(false);
    expect(isWords(values, 'foo_bar')).toBe(false);
    expect(isWords(values, 'foo bar *')).toBe(false);
    expect(isWords(values, 'foo.bar')).toBe(false);
    expect(isWords(values, 'À')).toBe(false);
  });

  it('isSpecialWords', () => {
    const { isSpecialWords } = validationRules;

    // NOTE: 空值返回true
    expect(isSpecialWords()).toBe(true);
    expect(isSpecialWords(values)).toBe(true);
    expect(isSpecialWords(values, null)).toBe(true);
    expect(isSpecialWords(values, '')).toBe(true);

    expect(isSpecialWords(values, 'foo bar')).toBe(true);
    expect(isSpecialWords(values, 'foo-bar')).toBe(false);
    expect(isSpecialWords(values, 'foo_bar')).toBe(false);
    expect(isSpecialWords(values, 'foo bar *')).toBe(false);
    expect(isSpecialWords(values, 'foo.bar')).toBe(false);
    expect(isSpecialWords(values, 'Àſ')).toBe(true);
  });

  it('isLength', () => {
    const { isLength } = validationRules;

    // NOTE: 空值返回true
    expect(isLength()).toBe(true);
    expect(isLength(values)).toBe(true);
    expect(isLength(values, null)).toBe(true);
    expect(isLength(values, '')).toBe(true);

    expect(isLength(values, 'foo', 3)).toBe(true);
    expect(isLength(values, 'foo', 2)).toBe(false);
    expect(isLength(values, [1, 2, 3], 3)).toBe(true);
    expect(isLength(values, [1, 2, 3], 2)).toBe(false);
    expect(isLength(values, { length: 3 }, 3)).toBe(true);
    expect(isLength(values, { length: 3 }, 2)).toBe(false);
  });

  it('equals', () => {
    const { equals } = validationRules;

    // NOTE: 空值返回true
    expect(equals()).toBe(true);
    expect(equals(values)).toBe(true);
    expect(equals(values, null)).toBe(true);
    expect(equals(values, '')).toBe(true);

    // return value == eql
    expect(equals(values, 12, 12)).toBe(true);
    expect(equals(values, 12, '12')).toBe(true);
    expect(equals(values, 0x12, '18')).toBe(true);
    expect(equals(values, [1, 2], '1,2')).toBe(true);
    expect(equals(values, { foo: 'bar', valueOf() { return 12 } }, 12)).toBe(true);
  });

  it('equalsField', () => {
    const { equalsField } = validationRules;

    // return values[field] == value
    const specialValues = {};
    specialValues.foo = 12;
    specialValues.bar = '1,2';
    expect(() => { equalsField() }).toThrow();
    expect(equalsField(specialValues, 12, 'foo')).toBe(true);
    expect(equalsField(specialValues, 12, 'bar')).toBe(false);
    expect(equalsField(specialValues, '12', 'foo')).toBe(true);
    expect(equalsField(specialValues, { foo: 'bar', valueOf() { return 12 } }, 'foo')).toBe(true);
    expect(equalsField(specialValues, [1, 2], 'bar')).toBe(true);
  });

  it('maxLength', () => {
    const { maxLength } = validationRules;

    // NOTE: 空值(undefined, null)返回true
    expect(maxLength()).toBe(true);
    expect(maxLength(values)).toBe(true);
    expect(maxLength(values, null)).toBe(true);
    expect(maxLength(values, '')).toBe(false);

    // return value.length <= maxLength
    expect(maxLength(values, 'foo', 3)).toBe(true);
    expect(maxLength(values, 'foo', 4)).toBe(true);
    expect(maxLength(values, 'foo', 2)).toBe(false);
    expect(maxLength(values, [1, 2, 3], 2)).toBe(false);
    expect(maxLength(values, [1, 2, 3], 3)).toBe(true);
    expect(maxLength(values, [1, 2, 3], 4)).toBe(true);
    expect(maxLength(values, { length: 3 }, 4)).toBe(true);
    expect(maxLength(values, { length: 3 }, 3)).toBe(true);
    expect(maxLength(values, { length: 3 }, 2)).toBe(false);
  });

  it('minLength', () => {
    const { minLength } = validationRules;

    // NOTE: 空值(undefined, null, '')返回true
    expect(minLength()).toBe(true);
    expect(minLength(values)).toBe(true);
    expect(minLength(values, null)).toBe(true);
    expect(minLength(values, '')).toBe(true);

    // return value.length >= minLength
    expect(minLength(values, 'foo', 3)).toBe(true);
    expect(minLength(values, 'foo', 4)).toBe(false);
    expect(minLength(values, 'foo', 2)).toBe(true);
    expect(minLength(values, [1, 2, 3], 2)).toBe(true);
    expect(minLength(values, [1, 2, 3], 3)).toBe(true);
    expect(minLength(values, [1, 2, 3], 4)).toBe(false);
    expect(minLength(values, { length: 3 }, 4)).toBe(false);
    expect(minLength(values, { length: 3 }, 3)).toBe(true);
    expect(minLength(values, { length: 3 }, 2)).toBe(true);
  });
});
