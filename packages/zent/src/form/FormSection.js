import { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import { prefixName } from './utils';

class FormSection extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    children: PropTypes.any,
  };

  static defaultProps = {
    component: 'div',
  };

  static contextTypes = {
    zentForm: PropTypes.object,
  };

  static childContextTypes = {
    zentForm: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    if (!context.zentForm) {
      throw new Error('FormSection must be in zent-form');
    }
  }

  getChildContext() {
    const { zentForm } = this.context;
    const { name } = this.props;
    return {
      zentForm: {
        ...zentForm,
        prefix: prefixName(zentForm, name),
      },
    };
  }

  render() {
    const { children, component, ...rest } = this.props;
    return createElement(component, {
      ...rest,
      children,
    });
  }
}

export default FormSection;
