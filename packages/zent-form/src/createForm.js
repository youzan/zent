/* eslint-disable no-underscore-dangle */

import { Component, PropTypes, createElement } from 'react';
import omit from 'zent-utils/lodash/omit';
import find from 'zent-utils/lodash/find';
import noop from 'zent-utils/lodash/noop';
import assign from 'zent-utils/lodash/assign';
import isEqual from 'zent-utils/lodash/isEqual';
import isPromise from 'zent-utils/isPromise';
import { getDisplayName, silenceEvent, silenceEvents } from './utils';
import rules from './validationRules';
import handleSubmit from './handleSubmit';

const emptyArray = [];
const checkSubmit = submit => {
  if (!submit || typeof submit !== 'function') {
    throw new Error('You must either pass handleSubmit() an onSubmit function or pass onSubmit as a prop');
  }
  return submit;
};
const createForm = (config = {}) => {
  const { formValidations } = config;
  const validationRules = assign({}, rules, formValidations);

  return WrappedComponent => {
    return class Form extends Component {
      constructor(props) {
        super(props);
        this.state = {
          isFormValid: true,
          isSubmitting: false,
        };
        this.fields = [];
        this._isMounted = false;
      }

      static displayName = `Form(${getDisplayName(WrappedComponent)})`
      static WrappedComponent = WrappedComponent

      static propTypes = {
        onSubmit: PropTypes.func,
        onValidSubmit: PropTypes.func,
        onInvalidSubmit: PropTypes.func,
        onValid: PropTypes.func,
        onInvalid: PropTypes.func,
        onChange: PropTypes.func,
        validationErrors: PropTypes.object
      }

      static defaultProps = {
        onSubmit: noop,
        onSubmitSuccess: noop,
        onSubmitFail: noop,
        onValid: noop,
        onInvalid: noop,
        onChange: noop,
        validationErrors: null
      }

      static childContextTypes = {
        zentForm: PropTypes.object
      }

      getChildContext() {
        return {
          zentForm: {
            attachToForm: this.attachToForm,
            detachFromForm: this.detachFromForm,
            validate: this.validate,
            getFormValues: this.getFormValues,
            getFieldError: this.getFieldError,
            isValidValue: this.isValidValue,
            setFieldExternalErrors: this.setFieldExternalErrors,
            resetFieldsValue: this.resetFieldsValue,
            setFormPristine: this.setFormPristine,
            isValid: this.isValid,
            isSubmitting: this.isSubmitting
          }
        };
      }

      componentDidMount() {
        this.validateForm();
        this._isMounted = true;
      }

      componentWillUpdate() {
        this.prevFieldNames = this.fields.map(field => field.props.name);
      }

      componentDidUpdate() {
        const { validationErrors } = this.props;
        if (validationErrors &&
            typeof validationErrors === 'object' &&
            Object.keys(validationErrors).length > 0) {
          this.setFieldValidationErrors(validationErrors);
        }

        const newFieldNames = this.fields.map(field => field.props.name);
        if (!isEqual(this.prevFieldNames, newFieldNames)) {
          this.validateForm();
        }
      }

      submitCompleted = (result) => {
        delete this.submitPromise;
        return result;
      }

      submitFailed = (error) => {
        delete this.submitPromise;
        throw error;
      }

      listenToSubmit = (promise) => {
        if (!isPromise(promise)) {
          return promise;
        }
        // 当submit是一个promise时，需要一个标识表明正在提交，提交结束后删除标识
        this.submitPromise = promise;
        return promise.then(this.submitCompleted, this.submitFailed);
      }

      submit = (submitOrEvent) => {
        const { onSubmit } = this.props;

        if (!submitOrEvent || silenceEvent(submitOrEvent)) {
          // submitOrEvent是一个event对象，直接调用props传入的onSubmit方法
          if (!this.submitPromise) {
            return this.listenToSubmit(handleSubmit(checkSubmit(onSubmit), this));
          }
        } else {
          // submitOrEvent是一个自定义submit函数，返回一个promise对象
          return silenceEvents(() =>
            !this.submitPromise &&
            this.listenToSubmit(handleSubmit(checkSubmit(submitOrEvent), this)));
        }
      }

      isSubmitting = () => {
        return this.state.isSubmitting;
      }

      isValid = () => {
        return this.state.isFormValid;
      }

      setFieldValidationErrors = (errors) => {
        this.fields.forEach(field => {
          const name = field.props.name;
          field.setState({
            _isValid: !(name in errors),
            _validationError: typeof errors[name] === 'string' ? [errors[name]] : errors[name]
          });
        });
      }

      // 设置服务端返回的错误信息
      setFieldExternalErrors = (errors) => {
        Object.keys(errors).forEach((name) => {
          const field = find(this.fields, (component) => component.props.name === name);
          if (!field) {
            throw new Error(`field ${name} does not exits`);
          }
          field.setState({
            _isValid: false,
            _externalError: typeof errors[name] === 'string' ?
              [errors[name]] :
              errors[name]
          });
        });
      }

      setFormPristine = (isPristine) => {
        this.fields.forEach(field => {
          field.setState({
            _isPristine: isPristine
          });
        });
      }

      resetFieldsValue= (data) => {
        this.fields.forEach(field => {
          const name = field.props.name;
          if (data && data.hasOwnProperty(name)) {
            field.setValue(data[name]);
          } else {
            field.resetValue();
          }
        });
      }

      reset = (data) => {
        this.setFormPristine(true);
        this.resetFieldsValue(data);
      }

      getFieldError = (name) => {
        const field = this.fields.find(component => component.props.name === name);

        if (!field) return '';
        return field.getErrorMessage();
      }

      getFormValues = () => {
        return this.fields.reduce((values, field) => {
          const name = field.props.name;
          values[name] = field.getValue();
          return values;
        }, {});
      }

      getPristineValues = () => {
        return this.fields.reduce((values, field) => {
          const name = field.props.name;
          values[name] = field.getPristineValue();
          return values;
        }, {});
      }

      isChanged = () => {
        return !isEqual(this.getPristineValues(), this.getFormValues());
      }

      isValidValue = (field, value) => {
        return this.runValidation(field, value).isValid;
      }

      runValidation = (field, value = field.getValue()) => {
        const formValidationErrors = this.props.validationErrors;
        const { name, validationError, validationErrors } = field.props;
        const currentValues = this.getFormValues();

        const validationResults = this.runRules(value, currentValues, field._validations);
        const isValid = !validationResults.failed.length &&
          !(formValidationErrors && formValidationErrors[field.props.name]);

        return {
          isValid,
          error: (function () {
            if (isValid) {
              return emptyArray;
            }

            if (validationResults.errors.length) {
              return validationResults.errors;
            }

            if (formValidationErrors && formValidationErrors[name]) {
              return typeof formValidationErrors[name] === 'string' ?
                [formValidationErrors[name]] :
                formValidationErrors[name];
            }

            if (validationResults.failed.length) {
              return validationResults.failed.map((failed) => {
                return validationErrors[failed] ?
                  validationErrors[failed] :
                  validationError;
              }).filter((x, pos, arr) => {
                // Remove duplicates
                return arr.indexOf(x) === pos;
              });
            }
          }())
        };
      }

      runRules = (value, currentValues, validations = []) => {
        const results = {
          errors: [],
          failed: []
        };

        function updateResults(validation, validationMethod) {
          // validation方法可以直接返回错误信息，否则需要返回布尔值表明校验是否成功
          if (typeof validation === 'string') {
            results.errors.push(validation);
            results.failed.push(validationMethod);
          } else if (!validation) {
            results.failed.push(validationMethod);
          }
        }

        Object.keys(validations).forEach((validationMethod) => {
          // validations中不指定function则必须是内置的rule
          if (!validationRules[validationMethod] && typeof validations[validationMethod] !== 'function') {
            throw new Error(`does not have the validation rule: ${validationMethod}`);
          }

          // 使用自定义校验方法或内置校验方法（可以按需添加）
          if (typeof validations[validationMethod] === 'function') {
            const validation = validations[validationMethod](currentValues, value);
            updateResults(validation, validationMethod);
          } else if (typeof validations[validationMethod] !== 'function') {
            const validation = validationRules[validationMethod](currentValues, value, validations[validationMethod]);
            updateResults(validation, validationMethod);
          }
        });

        return results;
      }

      validate = (field) => {
        // 初始化时调用validate不触发onChange
        if (this._isMounted) {
          this.props.onChange(this.getFormValues(), this.isChanged());
        }

        const validation = this.runValidation(field);

        field.setState({
          _isValid: validation.isValid,
          _validationError: validation.error,
          _externalError: null
        }, this.validateForm);
      }

      validateForm = () => {
        const onValidationComplete = () => {
          const allIsValid = this.fields.every(field => {
            return field.isValid();
          });

          this.setState({
            isFormValid: allIsValid
          });

          if (allIsValid) {
            this.props.onValid();
          } else {
            this.props.onInvalid();
          }
        };

        this.fields.forEach((field, index) => {
          const validation = this.runValidation(field);
          if (validation.isValid && field.state._externalError) {
            validation.isValid = false;
          }

          field.setState({
            _isValid: validation.isValid,
            _validationError: validation.error,
            _externalError: !validation.isValid && field.state._externalError ?
              field.state._externalError :
              null
          }, index === this.fields.length - 1 ? onValidationComplete : null);
        });
      }

      attachToForm = (field) => {
        if (this.fields.indexOf(field) < 0) {
          this.fields.push(field);
        }
        // form初始化时不校验，后续动态添加的元素再校验
        this._isMounted && this.validate(field);
      }

      detachFromForm = (field) => {
        const fieldPos = this.fields.indexOf(field);
        if (fieldPos >= 0) {
          this.fields.splice(fieldPos, 1);
        }
        this.validateForm();
      }

      render() {
        const passableProps = omit(this.props, [
          'validationErrors',
          'handleSubmit',
          'onChange'
        ]);

        return createElement(WrappedComponent, {
          ...passableProps,
          handleSubmit: this.submit,
          zentForm: {
            getFormValues: this.getFormValues,
            getFieldError: this.getFieldError,
            setFieldExternalErrors: this.setFieldExternalErrors,
            resetFieldsValue: this.resetFieldsValue,
            setFormPristine: this.setFormPristine,
            isValid: this.isValid,
            isSubmitting: this.isSubmitting
          }
        });
      }
    };
  };
};

export default createForm;
