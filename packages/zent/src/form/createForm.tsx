import { Component } from 'react';
import * as React from 'react';
import omit from 'lodash-es/omit';
import find from 'lodash-es/find';
import noop from 'lodash-es/noop';
import assign from 'lodash-es/assign';
import isEqual from 'lodash-es/isEqual';
import some from 'lodash-es/some';
import get from 'lodash-es/get';
import startsWith from 'lodash-es/startsWith';
import isPromise from '../utils/isPromise';
import memoize from '../utils/memorize-one';
import {
  getDisplayName,
  silenceEvent,
  silenceEvents,
  scrollToFirstError,
  updateFieldArray,
} from './utils';
import rules from './validationRules';
import handleSubmit from './handleSubmit';
import { FieldArrayMutatorAction } from './constants';
import FormContext from './FormContext';
import { IFieldState } from './Field';

const FormContextProvider = FormContext.Provider;

const emptyArray = [];

const checkSubmit = submit => {
  if (!submit || typeof submit !== 'function') {
    throw new Error(
      'You must either pass handleSubmit() an onSubmit function or pass onSubmit as a prop'
    );
  }
  return submit;
};

export interface IFormCreateFormConfig {
  formValidations?: { [key: string]: any };
  onChange?: (values?: {}, isChanged?: boolean) => void;
  onSubmitSuccess?: () => void;
  onSubmitFail?: () => void;
  scrollToError?: boolean;
}

export interface IFormCreateFormWrapperProps {
  onSubmit?: () => void;
  onSubmitSuccess?: () => void;
  onSubmitFail?: () => void;
  onValid?: () => void;
  onInvalid?: () => void;
  onChange?: (values?: object, isChanged?: boolean) => void;
  validationErrors?: { [key: string]: string };
  scrollToError?: boolean;

  [key: string]: any;
}

export interface IFormCreateFormWrapperState {
  isFormValid: boolean;
  isSubmitting: boolean;
  submitFail: boolean;
  submitSuccess: boolean;
}

const createForm = (
  config: IFormCreateFormConfig = {} as IFormCreateFormConfig
) => {
  const {
    formValidations,
    onChange,
    onSubmitSuccess,
    onSubmitFail,
    scrollToError,
  } = config;
  const validationRules = assign({}, rules, formValidations);

  return WrappedForm => {
    return class Form extends Component<
      IFormCreateFormWrapperProps,
      IFormCreateFormWrapperState
    > {
      fields: any[];
      fieldArrays: any[];
      _isMounted: boolean;
      prevFieldNames: string[];
      wrappedForm: React.ReactInstance;
      submitPromise: Promise<any>;

      constructor(props) {
        super(props);
        this.state = {
          isFormValid: true,
          isSubmitting: false,
          submitFail: false,
          submitSuccess: false,
        };
        this.fields = [];

        // 保存FieldArray, FormSection
        this.fieldArrays = [];

        this._isMounted = false;
      }

      static displayName = `Form(${getDisplayName(WrappedForm)})`;

      static WrappedForm = WrappedForm;

      // static propTypes = {
      //   onSubmit: PropTypes.func,
      //   onSubmitSuccess: PropTypes.func,
      //   onSubmitFail: PropTypes.func,
      //   onValid: PropTypes.func, // 暂时未对外
      //   onInvalid: PropTypes.func, // 暂时未对外
      //   onChange: PropTypes.func,
      //   validationErrors: PropTypes.object,
      //   scrollToError: PropTypes.bool,
      // };

      static defaultProps = {
        onSubmit: noop,
        onSubmitSuccess: onSubmitSuccess || noop,
        onSubmitFail: onSubmitFail || noop,
        onValid: noop,
        onInvalid: noop,
        onChange: onChange || noop,
        validationErrors: null,
        scrollToError: scrollToError || false,
      };

      getFormProp = memoize(() => ({
        getFormValues: this.getFormValues,
        getFieldError: this.getFieldError,
        setFieldExternalErrors: this.setFieldExternalErrors,
        resetFieldsValue: this.resetFieldsValue,
        setFieldsValue: this.setFieldsValue,
        setFormDirty: this.setFormDirty,
        setFormPristine: this.setFormPristine,
        initialize: this.initialize,
        isFieldDirty: this.isFieldDirty,
        isFieldTouched: this.isFieldDirty,
        isFieldValidating: this.isFieldValidating,
        isValid: this.isValid,
        isValidating: this.isValidating,
        isSubmitting: this.isSubmitting,
        isFormAsyncValidated: this.isFormAsyncValidated,
        validateForm: this.validateForm,
        asyncValidateForm: this.asyncValidateForm,
        isFormSubmitFail: this.isFormSubmitFail,
        isFormSubmitSuccess: this.isFormSubmitSuccess,
        updateFormSubmitStatus: this.updateFormSubmitStatus,
      }));

      getFormContext = memoize(() => {
        return {
          zentForm: {
            attachToForm: this.attachToForm,
            detachFromForm: this.detachFromForm,
            validate: this.validate,
            asyncValidate: this.asyncValidate,
            getFormValues: this.getFormValues,
            getFieldError: this.getFieldError,
            isValidValue: this.isValidValue,
            setFieldExternalErrors: this.setFieldExternalErrors,
            resetFieldsValue: this.resetFieldsValue,
            setFormDirty: this.setFormDirty,
            setFormPristine: this.setFormPristine,
            setFieldArrayMembers: this.setFieldArrayMembers,
            isValid: this.isValid,
            isSubmitting: this.isSubmitting,
            validateForm: this.validateForm,
            asyncValidateForm: this.asyncValidateForm,
            isFormSubmitFail: this.isFormSubmitFail,
            isFormSubmitSuccess: this.isFormSubmitSuccess,
            updateFormSubmitStatus: this.updateFormSubmitStatus,
          },
        };
      });

      componentDidMount() {
        this.validateForm();
        this._isMounted = true;
      }

      componentWillUpdate() {
        this.prevFieldNames = this.fields.map(field => field.getName());
      }

      componentDidUpdate() {
        const { validationErrors } = this.props;
        if (
          validationErrors &&
          typeof validationErrors === 'object' &&
          Object.keys(validationErrors).length > 0
        ) {
          this.setFieldValidationErrors(validationErrors);
        }

        const newFieldNames = this.fields.map(field => field.getName());
        if (!isEqual(this.prevFieldNames, newFieldNames)) {
          this.validateForm();
        }
      }

      submitCompleted = result => {
        delete this.submitPromise;
        this.updateFormSubmitStatus(false);
        return result;
      };

      submitFailed = error => {
        delete this.submitPromise;
        this.updateFormSubmitStatus(true);
        throw error;
      };

      listenToSubmit = promise => {
        if (!isPromise(promise)) {
          return promise;
        }
        // 当submit是一个promise时，需要一个标识表明正在提交，提交结束后删除标识
        this.submitPromise = promise;
        return promise.then(this.submitCompleted, this.submitFailed);
      };

      submit = submitOrEvent => {
        const { onSubmit } = this.props;

        // 在表单中手动调用handleSubmit或者把handleSubmit赋值给表单的onSubmit回调
        // handleSubmit赋值给表单的onSubmit时，submitOrEvent是一个event对象
        // handleSubmit的参数必须是function
        if (!submitOrEvent || silenceEvent(submitOrEvent)) {
          if (!this.submitPromise) {
            // 调用props传入的onSubmit方法
            return this.listenToSubmit(
              handleSubmit(checkSubmit(onSubmit), this)
            );
          }
        } else {
          // submitOrEvent是一个自定义submit函数，返回一个promise对象
          return silenceEvents(
            () =>
              !this.submitPromise &&
              this.listenToSubmit(
                handleSubmit(checkSubmit(submitOrEvent), this)
              )
          );
        }
      };

      isSubmitting = () => {
        return this.state.isSubmitting;
      };

      isValid = () => {
        return this.state.isFormValid;
      };

      setFieldValidationErrors = (errors, updateDirty = true) => {
        this.fields.forEach(field => {
          const name = field.getName();
          const data: IFieldState = {
            _isValid: !(name in errors),
            _validationError:
              typeof errors[name] === 'string' ? [errors[name]] : errors[name],
          };
          if (updateDirty) {
            data._isDirty = true;
          }
          field.setState(data);
        });
      };

      // 设置服务端返回的错误信息
      setFieldExternalErrors = (errors, updateDirty = true) => {
        this.fields.forEach(field => {
          const name = field.getName();
          const error = get(errors, name);
          const data: IFieldState = {
            _isValid: false,
            _externalError: typeof error === 'string' ? [error] : error,
          };
          if (updateDirty) {
            data._isDirty = true;
          }
          field.setState(data);
        });
        // 滚动到第一个错误处
        this.props.scrollToError && scrollToFirstError(this.fields);
      };

      setFormDirty = (isDirty = true) => {
        this.fields.forEach(field => {
          field.setState({
            _isDirty: isDirty,
          });
        });
      };

      setFormPristine = (isPristine = false) => {
        this.fields.forEach(field => {
          field.setState({
            _isDirty: !isPristine,
          });
        });
      };

      initialize = data => {
        updateFieldArray(this.fieldArrays, data, {
          removeIfNotExists: true,
          mutatorAction: FieldArrayMutatorAction.Initialize,
        });

        this.fields.forEach(field => {
          const name = field.getName();
          const value = get(data, name);
          field.setInitialValue(value);
        });
      };

      resetFieldsValue = data => {
        updateFieldArray(this.fieldArrays, data, {
          removeIfNotExists: true,
          mutatorAction: FieldArrayMutatorAction.Reset,
        });

        this.fields.forEach(field => {
          const name = field.getName();
          const value = get(data, name);
          field.resetValue(value);
        });
      };

      setFieldsValue = data => {
        updateFieldArray(this.fieldArrays, data, {
          removeIfNotExists: false,
          mutatorAction: FieldArrayMutatorAction.Set,
        });

        this.fields.forEach(field => {
          const name = field.getName();
          const value = get(data, name);
          if (value !== undefined) {
            field.setValue(value);
          }
        });
      };

      setFieldArrayMembers = (fieldArrayName, value) => {
        let matchedFa;
        const matchedFaChildren = [];
        this.fieldArrays.forEach(fa => {
          const faName = fa.getName();
          if (faName === fieldArrayName) {
            matchedFa = fa;
          } else if (startsWith(faName, fieldArrayName)) {
            matchedFaChildren.push(fa);
          }
        });

        // Ensure nested field arary are correctly handled
        matchedFaChildren.sort();
        matchedFaChildren.forEach(fa => {
          const faName = fa.getName();
          const faNamePath = faName.substring(fieldArrayName.length);
          const faValue = get(value, faNamePath);

          // console.log(faName, ' -> ', faNamePath);

          if (faValue !== undefined) {
            fa.replaceAllFields(faValue);
          } else {
            fa.removeAllFields();
          }

          fa.setMutatorAction(matchedFa.getMutatorAction());
        });

        // Update each member in field array
        if (matchedFa) {
          this.fields.forEach(f => {
            const name = f.getName();
            if (name !== fieldArrayName && startsWith(name, fieldArrayName)) {
              const fieldNamePath = name.substring(fieldArrayName.length);
              const fieldValue = get(value, fieldNamePath);
              const mutatorAction = matchedFa.getMutatorAction();

              // console.log(name, ' -> ', fieldNamePath, fieldValue, value);

              if (mutatorAction === FieldArrayMutatorAction.Initialize) {
                f.setInitialValue(fieldValue);
              } else if (
                mutatorAction === FieldArrayMutatorAction.Set ||
                mutatorAction === FieldArrayMutatorAction.Unknown
              ) {
                if (fieldValue !== undefined) {
                  f.setValue(fieldValue);
                }
              } else if (mutatorAction === FieldArrayMutatorAction.Reset) {
                f.resetValue(fieldValue);
              }
            }
          });
        }
      };

      reset = data => {
        this.setFormDirty(false);
        this.resetFieldsValue(data);
      };

      isFieldDirty = name => {
        const field = find(
          this.fields,
          component => component.getName() === name
        );

        if (!field) return false;
        return field.isDirty();
      };

      isFieldValidating = name => {
        const field = find(
          this.fields,
          component => component.getName() === name
        );

        if (!field) return false;
        return field.isValidating();
      };

      getFieldError = name => {
        const field = find(
          this.fields,
          component => component.getName() === name
        );

        if (!field) return '';
        return field.getErrorMessage();
      };

      getFormValues = () => {
        const assignValue = (values, keyPath, newValue) => {
          if (keyPath.length === 0) {
            return;
          }
          let currentKey = keyPath[0];
          if (/\[\d+\]/.test(currentKey)) {
            // array
            const index = currentKey.match(/\d+(?=\])/)[0];
            currentKey = currentKey.replace(/\[\d+\]/, '');
            if (!values[currentKey]) {
              values[currentKey] = [];
            }
            if (keyPath.length > 1) {
              if (!values[currentKey][index]) {
                values[currentKey][index] = {};
              }
              assignValue(
                values[currentKey][index],
                keyPath.slice(1),
                newValue
              );
            } else {
              values[currentKey][index] = newValue;
            }
          } else {
            // object
            if (!values[currentKey]) {
              values[currentKey] = {};
            }
            if (keyPath.length > 1) {
              assignValue(values[currentKey], keyPath.slice(1), newValue);
            } else {
              values[currentKey] = newValue;
            }
          }
        };

        return this.fields.reduce((values, field) => {
          const name = field.getName();
          const fieldValue = field.getValue();
          const fieldNamePath = name.split('.');
          assignValue(values, fieldNamePath, fieldValue);
          return values;
        }, {});
      };

      getValidationErrors = () => {
        return this.fields.reduce((errors, field) => {
          const name = field.getName();
          errors[name] = field.getErrorMessage();
          return errors;
        }, {});
      };

      getInitialValues = () => {
        return this.fields.reduce((values, field) => {
          const name = field.getName();
          values[name] = field.getInitialValue();
          return values;
        }, {});
      };

      isChanged = () => {
        return !isEqual(this.getInitialValues(), this.getFormValues());
      };

      isValidating = () => {
        return some(this.fields, field => {
          return field.isValidating();
        });
      };

      isValidValue = (field, value) => {
        return this.runValidation(field, value).isValid;
      };

      updateFormSubmitStatus = submitSuccess => {
        this.setState({
          submitFail: !submitSuccess,
          submitSuccess,
        });
      };

      isFormSubmitFail = () => {
        return this.state.submitFail;
      };

      isFormSubmitSuccess = () => {
        return this.state.submitSuccess;
      };

      runValidation = (field, value = field.getValue()) => {
        const formValidationErrors = this.props.validationErrors;
        const { name, validationError, validationErrors } = field.props;
        const currentValues = this.getFormValues();

        const validationResults = this.runRules(
          value,
          currentValues,
          field._validations
        );
        const isValid =
          !validationResults.failed.length &&
          !(formValidationErrors && formValidationErrors[field.getName()]);

        return {
          isValid,
          error: (function error() {
            if (isValid) {
              return emptyArray;
            }

            if (validationResults.errors.length) {
              return validationResults.errors;
            }

            if (formValidationErrors && formValidationErrors[name]) {
              return typeof formValidationErrors[name] === 'string'
                ? [formValidationErrors[name]]
                : formValidationErrors[name];
            }

            if (validationResults.failed.length) {
              return validationResults.failed
                .map(failed => {
                  return validationErrors[failed]
                    ? validationErrors[failed]
                    : validationError;
                })
                .filter((x, pos, arr) => {
                  // Remove duplicates
                  return arr.indexOf(x) === pos;
                });
            }

            return emptyArray;
          })(),
        };
      };

      runRules = (value, currentValues, validations = []) => {
        const results = {
          errors: [],
          failed: [],
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

        Object.keys(validations).forEach(validationMethod => {
          // validations中不指定function则必须是内置的rule
          if (
            !validationRules[validationMethod] &&
            typeof validations[validationMethod] !== 'function'
          ) {
            throw new Error(
              `does not have the validation rule: ${validationMethod}`
            );
          }

          // 使用自定义校验方法或内置校验方法（可以按需添加）
          if (typeof validations[validationMethod] === 'function') {
            const validation = validations[validationMethod](
              currentValues,
              value
            );
            updateResults(validation, validationMethod);
          } else {
            const validation = validationRules[validationMethod](
              currentValues,
              value,
              validations[validationMethod]
            );
            updateResults(validation, validationMethod);
          }
        });

        return results;
      };

      validate = field => {
        // 初始化时调用validate不触发onChange
        if (this._isMounted) {
          this.props.onChange(this.getFormValues(), this.isChanged());
        }

        const validation = this.runValidation(field);

        field.setState(
          {
            _isValid: validation.isValid,
            _validationError: validation.error,
            _externalError: null,
          },
          () => this.validateForm(false, null, field.props.relatedFields)
        );
      };

      asyncValidate = (field, value) => {
        const { asyncValidation } = field.props;
        const values = this.getFormValues();

        if (!asyncValidation || field.state._validationError.length) {
          return Promise.resolve();
        }

        field.setState({
          _isValidating: true,
        });

        const promise = asyncValidation(values, value);
        if (!isPromise(promise)) {
          throw new Error('asyncValidation function must return a promise');
        }

        const handleResult = rejected => error => {
          field.setState({
            _isValidating: false,
            _isValid: !rejected && field.state._validationError.length === 0,
            _externalError: rejected && error ? [error] : null,
            _asyncValidated: true,
          });

          if (rejected) {
            this.setState({
              isFormValid: false,
            });
            throw new Error(error);
          }
        };

        return promise.then(handleResult(false), handleResult(true));
      };

      isFormAsyncValidated = () => {
        const allIsAsyncValid = this.fields.every(field => {
          return field.isAsyncValidated() || !field.props.asyncValidation;
        });

        return allIsAsyncValid;
      };

      asyncValidateForm = (resolve, reject) => {
        const asyncValidations = (this.fields || []).map(field => {
          return this.asyncValidate(field, field.getValue());
        });
        Promise.all(asyncValidations)
          .then(() => {
            resolve && resolve();
          })
          .catch(error => {
            reject && reject(error);
          });
      };

      validateForm = (
        forceValidate = false,
        callback?: () => void,
        relatedFields?: string[]
      ) => {
        const onValidationComplete = index => {
          if (index !== this.fields.length - 1) {
            return;
          }
          const allIsValid = this.fields.every(field => {
            return field.isValid();
          });

          this.setState(
            {
              isFormValid: allIsValid,
            },
            callback
          );

          if (allIsValid) {
            this.props.onValid();
          } else {
            this.props.onInvalid();
          }
        };

        this.fields.forEach((field, index) => {
          if (!forceValidate && !field.props.validateOnBlur) {
            onValidationComplete(index);
            return;
          }

          if (
            relatedFields === undefined ||
            (relatedFields && relatedFields.indexOf(field.getName()) >= 0)
          ) {
            const { _externalError } = field.state;
            const validation = this.runValidation(field);
            if (validation.isValid && _externalError) {
              validation.isValid = false;
            }

            field.setState(
              {
                _isValid: validation.isValid,
                _validationError: validation.error,
                _externalError:
                  !validation.isValid && _externalError ? _externalError : null,
              },
              () => onValidationComplete(index)
            );
          } else {
            onValidationComplete(index);
          }
        });
      };

      attachToForm = (field, options) => {
        if (get(options, 'isFieldContainer', false)) {
          this.fieldArrays.push(field);
        } else {
          if (this.fields.indexOf(field) < 0) {
            this.fields.push(field);
          }
          // form初始化时不校验，后续动态添加的元素再校验
          this._isMounted && this.validate(field);
        }
      };

      detachFromForm = (field, options) => {
        if (get(options, 'isFieldContainer', false)) {
          const idx = this.fieldArrays.indexOf(field);
          if (idx !== -1) {
            this.fieldArrays.splice(idx, 1);
          }
        } else {
          const fieldPos = this.fields.indexOf(field);
          if (fieldPos >= 0) {
            this.fields.splice(fieldPos, 1);
          }
          this.validateForm();
        }
      };

      getWrappedForm = () => {
        return this.wrappedForm;
      };

      saveWrappedFormRef = ref => {
        this.wrappedForm = ref;
      };

      render() {
        const passableProps = omit(this.props, [
          'validationErrors',
          'handleSubmit',
          'onChange',
        ]);

        return (
          <FormContextProvider value={this.getFormContext()}>
            <WrappedForm
              {...passableProps}
              ref={this.saveWrappedFormRef}
              handleSubmit={this.submit}
              zentForm={this.getFormProp()}
            />
          </FormContextProvider>
        );
      }
    };
  };
};

export default createForm;
