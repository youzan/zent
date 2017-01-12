/**
 * 保存domMount状态
 */

import React, { Component } from 'react';

export default class LazyMount extends Component {
  static propTypes = {
    mountTrigger: React.PropTypes.bool
  };

  static defaultProps = {
    mountTrigger: false
  };

  constructor(props) {
    super(props);
    this.state = {
      mounted: props.mountTrigger
    };
  }

  componentWillReceiveProps(nextProps) {
    let { mountTrigger } = nextProps;
    let { mounted } = this.state;
    if (mountTrigger && !mounted) {
      this.setState({
        mounted: true
      });
    }
  }

  render() {
    let { children } = this.props;
    let { mounted } = this.state;
    if (mounted) {
      return children;
    }
    return null;
  }
}
