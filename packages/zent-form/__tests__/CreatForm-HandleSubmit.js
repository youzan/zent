import React from 'react';
import { mount } from 'enzyme';

import ZentForm from '../src';

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
    let wrapper;

    // HACK: console.error
    //  = mount(<CreatedForm onSubmit={'string type'} />);
    // expect(() => { wrapper.simulate('submit') }).toThrow();
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

  it('onSubmit of CreatedForm can be a function passed to handleSubmit', () => {
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

  it('While submit, HandleSubmit method of CreatedForm can handle occurred errors', () => {
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
