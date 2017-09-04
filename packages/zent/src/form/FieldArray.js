/* eslint-disable no-underscore-dangle */

import { Component, PureComponent, createElement } from 'react';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';

import { prefixName } from './utils';
import unknownProps from './unknownProps';

class FieldArray extends (PureComponent || Component) {
  static propTypes = {
    name: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
      .isRequired
  };

  // validationError为默认错误提示
  // validationErrors为指定校验规则所对应的错误提示
  static defaultProps = {};

  static contextTypes = {
    zentForm: PropTypes.object
  };

  static childContextTypes = {
    zentForm: PropTypes.object.isRequired
  };

  getChildContext() {
    const { zentForm } = this.context;
    const { name } = this.props;
    return {
      zentForm: {
        ...zentForm,
        arrayPrefix: prefixName(zentForm, name),
        attachToForm: this.attachToForm,
        detachFromForm: this.detachFromForm,
        getFieldIndex: this.getFieldIndex
      }
    };
  }

  constructor(props, context) {
    super(props, context);
    if (!context.zentForm) {
      throw new Error('FieldArray must be in zent-form');
    }
    this.fields = [];
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(nextState, this.state) || !isEqual(nextProps, this.props);
  }

  componentWillMount() {
    if (!this.props.name) {
      throw new Error('FieldArray requires a name property when used');
    }
    this.context.zentForm.attachToForm(this.fields);
  }

  // componentWillReceiveProps(nextProps) {
  //   if ('validations' in nextProps) {
  // this._name = prefixName(this.context.zentForm, nextProps.name);
  // this._validations = nextProps.validations;
  //   }
  // }

  // componentDidUpdate(prevProps) {
  // 支持props中的value动态更新
  // if (!isEqual(this.props.value, prevProps.value)) {
  //   this.setValue(this.props.value);
  // }
  // }

  componentWillUnmount() {
    this.context.zentForm.detachFromForm(this);
  }

  getFieldIndex = field => {
    return this.fields.indexOf(field);
  };

  attachToForm = field => {
    if (this.fields.indexOf(field) < 0) {
      this.fields.push(field);
      this.context.zentForm.attachToForm(this.fields);
    }
  };

  detachFromForm = field => {
    const fieldPos = this.fields.indexOf(field);
    if (fieldPos >= 0) {
      this.fields.splice(fieldPos, 1);
      this.context.zentForm.detachFromForm(this.fields);
    }
  };

  getWrappedComponent = () => {
    return this.wrappedComponent;
  };

  render() {
    const { component, ...rest } = this.props;
    const passableProps = this.processProps({
      ...rest,
      ref: ref => {
        this.wrappedComponent = ref;
      }
    });

    // 原生的标签不能传非标准属性进去
    if (typeof component === 'string') {
      return createElement(component, {
        ...omit(passableProps, unknownProps)
      });
    }

    return createElement(component, passableProps);
  }
}

export default FieldArray;
