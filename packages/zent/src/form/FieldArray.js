/* eslint-disable no-underscore-dangle */

import { Component, PureComponent, createElement } from 'react';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import assign from 'lodash/assign';
import map from 'lodash/map';
import forEach from 'lodash/forEach';
import PropTypes from 'prop-types';

import { prefixName } from './utils';
import unknownProps from './unknownProps';

class FieldArray extends (PureComponent || Component) {
  static propTypes = {
    name: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
      .isRequired
  };

  static defaultProps = {};

  static contextTypes = {
    zentForm: PropTypes.object
  };

  static childContextTypes = {
    zentForm: PropTypes.object.isRequired
  };

  getChildContext() {
    const { zentForm } = this.context;
    // const { name } = this.props;
    return {
      zentForm: {
        ...zentForm,
        prefix: this._name,
        attachToForm: this.attachToForm,
        detachFromForm: this.detachFromForm
      }
    };
  }

  constructor(props, context) {
    super(props, context);
    if (!context.zentForm) {
      throw new Error('FieldArray must be in zent-form');
    }
    this._name = prefixName(context.zentForm, props.name);
    this.state = {
      fields: []
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(nextState, this.state) || !isEqual(nextProps, this.props);
  }

  componentWillMount() {
    if (!this.props.name) {
      throw new Error('FieldArray requires a name property when used');
    }
    // this.context.zentForm.attachToForm(this.fields);
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
    // this.context.zentForm.detachFromForm(this.fields);
  }

  // attachToForm = field => {
  //   if (this.fields.indexOf(field) < 0) {
  //     this.fields.push(field);
  //     this.context.zentForm.attachToForm(this.fields);
  //   }
  // };

  // detachFromForm = field => {
  //   const fieldPos = this.fields.indexOf(field);
  //   if (fieldPos >= 0) {
  //     this.fields.splice(fieldPos, 1);
  //     this.context.zentForm.detachFromForm(this.fields);
  //   }
  // };

  getWrappedComponent = () => {
    return this.wrappedComponent;
  };

  getFieldsIndex = field => {
    return this.state.fields.indexOf(field);
  };

  forEachFields = callback => {
    const { fields } = this.state;
    forEach(fields, (value, index) => {
      const name = this._name[index];
      callback(name, index, this.state.fields);
    });
  };

  getField = index => {
    const { fields } = this.state;
    const fieldLen = fields.length;
    if (index >= fieldLen) {
      throw Error('The index for getField is invalid');
    }
    return fields[index];
  };

  getAllFields = () => {
    return this.state.fields;
  };

  insertField = (index, value) => {
    const { fields } = this.state;
    const fieldLen = fields.length;
    if (index >= fieldLen) {
      throw Error('The index for insertField is invalid');
    }
    fields.splice(index, 0, value);
    this.setState({
      fields
    });
  };

  mapFields = callback => {
    const { fields } = this.state;
    console.log(fields);
    map(fields, (value, index) => {
      const name = this._name[index];
      console.log(name, index, fields);
      callback(name, index, fields);
    });
  };

  moveFields = (fromPos, toPos) => {
    const { fields } = this.state;
    const fieldLen = fields.length;
    if (fromPos >= fieldLen || toPos >= fieldLen) {
      throw Error('The index for moveFields is invalid');
    }
    const fieldToMove = fields.splice(fromPos, 1)[0];
    this.setState({
      fields: fields.splice(toPos + 1, 0, fieldToMove)
    });
  };

  popFields = () => {
    const { fields } = this.state;
    fields.pop();
    this.setState({
      fields
    });
  };

  pushFields = value => {
    const { fields } = this.state;
    fields.push(value);
    this.setState({
      fields
    });
  };

  removeFields = index => {
    const { fields } = this.state;
    const fieldLen = fields.length;
    if (index >= fieldLen) {
      throw Error('The index for removeFields is invalid');
    }
    fields.splice(index, 1);
    this.setState({
      fields
    });
  };

  removeAllFields = () => {
    this.setState({
      fields: []
    });
  };

  shiftFields = () => {
    const { fields } = this.state;
    fields.shift();
    this.setState({
      fields
    });
  };

  swapFields = (indexA, indexB) => {
    const { fields } = this.state;
    const fieldLen = fields.length;
    if (indexA >= fieldLen || indexB >= fieldLen) {
      throw Error('The index to swap in invalid');
    }
    const fieldA = assign({}, fields[indexA]);
    fields[indexA] = fields[indexB];
    fields[indexB] = fieldA;
    this.setState({
      fields
    });
  };

  unshiftFields = value => {
    const { fields } = this.state;
    fields.unshift(value);
    this.setState({
      fields
    });
  };

  render() {
    const { component, ...rest } = this.props;
    const { fields } = this.state;
    const passableProps = {
      ...rest,
      ref: ref => {
        this.wrappedComponent = ref;
      },
      fields,
      handleFields: {
        name: this._name,
        forEach: this.forEachFields,
        get: this.getField,
        getAll: this.getAllFields,
        insert: this.insertField,
        length: fields.length,
        map: this.mapFields,
        move: this.moveFields,
        pop: this.popFields,
        push: this.pushFields,
        remove: this.removeFields,
        removeAll: this.removeAllFields,
        shift: this.shiftFields,
        swap: this.swapFields,
        unshift: this.unshiftFields
      }
    };

    console.log(passableProps.fields);

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
