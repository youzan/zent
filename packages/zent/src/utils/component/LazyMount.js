import PropTypes from 'prop-types';
import { PureComponent } from 'react';

/**
 * 保存domMount状态
 */
export default class LazyMount extends PureComponent {
  static propTypes = {
    mount: PropTypes.bool,
  };

  static defaultProps = {
    mount: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      mounted: props.mount,
    };
  }

  render() {
    let { children } = this.props;
    let { mounted } = this.state;

    return mounted ? children : null;
  }

  componentWillReceiveProps(nextProps) {
    let { mount } = nextProps;
    let { mounted } = this.state;
    if (mount && !mounted) {
      this.setState({
        mounted: true,
      });
    }
  }
}
