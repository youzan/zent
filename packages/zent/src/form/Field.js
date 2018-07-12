/* eslint-disable no-underscore-dangle */

import { Component, createElement } from 'react';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import assign from 'lodash/assign';
import has from 'lodash/has';
import PropTypes from 'prop-types';

import { getValue, getCurrentValue, prefixName } from './utils';
import unknownProps from './unknownProps';

class Field extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
      .isRequired,
    normalize: PropTypes.func,
    format: PropTypes.func,
    validationError: PropTypes.string,
    validationErrors: PropTypes.object,
    validateOnBlur: PropTypes.bool,
    validateOnChange: PropTypes.bool,
    clearErrorOnFocus: PropTypes.bool,
    relatedFields: PropTypes.arrayOf(PropTypes.string),
  };

  // validationError为默认错误提示
  // validationErrors为指定校验规则所对应的错误提示
  static defaultProps = {
    value: '',
    validationError: '',
    validationErrors: {},
    validateOnBlur: true,
    validateOnChange: true,
    clearErrorOnFocus: true,
  };

  static contextTypes = {
    zentForm: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    if (!context.zentForm) {
      throw new Error('Field must be in zent-form');
    }
    this.state = {
      _value: props.value,
      _isValid: true,
      _isDirty: false,
      _isValidating: false,
      _initialValue: props.value,
      _validationError: [],
      _externalError: null,
      _asyncValidated: false,
    };
    this._name = prefixName(context.zentForm, props.name);
    this._validations = props.validations || {};
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(nextState, this.state) || !isEqual(nextProps, this.props);
  }

  componentWillMount() {
    if (!this.props.name) {
      throw new Error('Form Field requires a name property when used');
    }
    const zentForm = this.context.zentForm;
    zentForm.attachToForm(this);

    this._name = prefixName(zentForm, this.props.name);
  }

  componentWillReceiveProps(nextProps) {
    if ('validations' in nextProps) {
      this._validations = nextProps.validations;
    }

    this._name = prefixName(this.context.zentForm, nextProps.name);
  }

  componentDidUpdate(prevProps) {
    // 支持props中的value动态更新
    if (!isEqual(this.props.value, prevProps.value)) {
      this.setValue(this.props.value, this.props.validateOnBlur);
    }

    // 动态改变validation方法，重新校验
    // if (!isEqual(this.props.validations, prevProps.validations)) {
    //   this.context.zentForm.validate(this);
    // }
  }

  componentWillUnmount() {
    this.context.zentForm.detachFromForm(this);
  }

  isDirty = () => {
    return this.state._isDirty;
  };

  isValid = () => {
    return this.state._isValid;
  };

  isValidating = () => {
    return this.state._isValidating;
  };

  isActive = () => {
    return this.state._active;
  };

  getInitialValue = () => {
    return this.state._initialValue;
  };

  getValue = () => {
    return this.state._value;
  };

  getName = () => {
    return this._name;
  };

  isAsyncValidated = () => {
    return this.state._asyncValidated;
  };

  setValue = (value, needValidate = true) => {
    this.setState(
      () => {
        return {
          _value: value,
          _isDirty: true,
        };
      },
      () => {
        needValidate && this.context.zentForm.validate(this);
      }
    );
  };

  resetValue = value => {
    this.setState(
      state => {
        const newValue = value !== undefined ? value : state._initialValue;

        return {
          _value: newValue,
          _isDirty: false,
        };
      },
      () => {
        this.context.zentForm.validate(this);
      }
    );
  };

  setInitialValue = value => {
    const currentInitialValue =
      value !== undefined ? value : this.state._initialValue;
    this.setState(
      {
        _value: currentInitialValue,
        _initialValue: currentInitialValue,
        _isDirty: false,
      },
      () => {
        this.context.zentForm.validate(this);
      }
    );
  };

  getWrappedComponent = () => {
    return this.wrappedComponent;
  };

  getErrorMessage = () => {
    const errors = this.getErrorMessages();
    return errors.length ? errors[0] : null;
  };

  getErrorMessages = () => {
    const { _externalError, _validationError } = this.state;
    return !this.isValid() ? _externalError || _validationError || [] : [];
  };

  normalize = value => {
    const { normalize } = this.props;
    if (!normalize) {
      return value;
    }
    const previousValues = this.context.zentForm.getFormValues();
    const previousValue = this.getValue();
    const nextValues = {
      ...previousValues,
      [this.getName()]: value,
    };
    return normalize(value, previousValue, nextValues, previousValues);
  };

  format = value => {
    const { format } = this.props;
    if (!format) {
      return value;
    }
    return format(value);
  };

  handleChange = (event, options = { merge: false }) => {
    const { onChange, validateOnChange } = this.props;
    const previousValue = this.getValue();
    const val = has(options, 'value')
      ? getValue(event, options.value)
      : getValue(event);
    const currentValue = options.merge
      ? getCurrentValue(val, previousValue)
      : val;
    const newValue = this.normalize(currentValue);
    let preventSetValue = false;

    // 在传入的onChange中可以按需阻止更新value值
    if (onChange) {
      onChange(event, newValue, previousValue, () => (preventSetValue = true));
    }

    if (!preventSetValue) {
      this.setValue(newValue, validateOnChange);
      this.context.zentForm.onChangeFieldArray &&
        this.context.zentForm.onChangeFieldArray(this._name, newValue);
    }
  };

  handleFocus = event => {
    const { onFocus, clearErrorOnFocus } = this.props;
    let data = {
      _active: true,
    };

    if (onFocus) {
      onFocus(event);
    }

    if (clearErrorOnFocus) {
      assign(data, {
        _isValid: true,
        _validationError: [],
        _externalError: null,
      });
    }

    this.setState(data);
  };

  handleBlur = (event, options = { merge: false }) => {
    const { onBlur, asyncValidation, validateOnBlur } = this.props;
    const previousValue = this.getValue();
    const val = has(options, 'value')
      ? getValue(event, options.value)
      : getValue(event);
    const currentValue = options.merge
      ? getCurrentValue(val, previousValue)
      : val;
    const newValue = this.normalize(currentValue);
    let preventSetValue = false;

    if (onBlur) {
      onBlur(event, newValue, previousValue, () => (preventSetValue = true));
    }

    this.setState({
      _active: false,
    });

    if (!preventSetValue) {
      this.setValue(newValue, validateOnBlur);
      if (asyncValidation) {
        this.context.zentForm.asyncValidate(this, newValue).catch(error => {
          // eslint-disable-next-line
          console.log(error);
        });
      }
    }
  };

  processProps = props => {
    const { type, value, ...rest } = props;
    if (type === 'checkbox') {
      return {
        ...rest,
        checked: !!value,
        type,
      };
    }
    if (type === 'file') {
      return {
        ...rest,
        type,
      };
    }

    return props;
  };

  render() {
    const { component, ...rest } = this.props;
    const passableProps = this.processProps({
      ...rest,
      ref: ref => {
        this.wrappedComponent = ref;
      },
      name: this.getName(),
      isTouched: this.isDirty(),
      isDirty: this.isDirty(),
      isValid: this.isValid(),
      isAsyncValidated: this.isAsyncValidated,
      isActive: this.isActive(),
      value: this.format(this.getValue()),
      error: this.getErrorMessage(),
      errors: this.getErrorMessages(),
      onChange: this.handleChange,
      onBlur: this.handleBlur,
      onFocus: this.handleFocus,
    });

    // 原生的标签不能传非标准属性进去
    if (typeof component === 'string') {
      return createElement(component, {
        ...omit(passableProps, unknownProps),
      });
    }

    return createElement(component, passableProps);
  }
}

export default Field;
