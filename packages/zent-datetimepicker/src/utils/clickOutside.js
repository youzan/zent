import React, { Component } from 'react';

const clickOutside = ComposedComponent => class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  componentDidMount() {
    document.addEventListener('click', this.picker.clickOutSide, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.picker.clickOutSide, true);
  }

  render() {
    return (
      <ComposedComponent ref={(ref) => this.picker = ref} {...this.props} />
    );
  }
};

export default clickOutside;
