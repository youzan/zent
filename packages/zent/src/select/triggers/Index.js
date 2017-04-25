import PropTypes from 'prop-types';
/**
 * Trigger
 */

import React, { Component } from 'react';

class Trigger extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: props.open
    };
    this.triggerClickHandler = this.triggerClickHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  triggerClickHandler() {
    let { open } = this.state;
    this.props.onChange({
      open: !open
    });
  }

  render() {
    let Node = this.props.trigger;

    return <Node {...this.props} onClick={this.triggerClickHandler} />;
  }
}

Trigger.propTypes = {
  trigger: PropTypes.any,
  open: PropTypes.bool
};

Trigger.defaultProps = {
  open: false
};

export default Trigger;
