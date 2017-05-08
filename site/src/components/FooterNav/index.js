import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './style.pcss';

class FooterNav extends Component {
  constructor() {
    super();
    this.state = {
      nav: null
    };
  }

  componentWillMount() {
    const { data, location } = this.props;
    this.setState({ nav: data[location.pathname] });
  }

  componentDidUpdate(prevProps) {
    const { data, location } = this.props;

    if (location !== prevProps.location) {
      this.setState({ nav: data[location.pathname] })
    }
  }

  handleNavClick(pathname) {
    const { history } = this.props;
    history.push(pathname);
  }

  render() {
    const { nav } = this.state;
    return (
      <div className="footer-nav">
        {nav.prev && <a href="javascript:void(0)" className="footer-nav__link footer-nav__left" onClick={(e) => {this.handleNavClick(nav.prev.pathname)}}>
          <i className="zenticon zenticon-right"></i>
          {nav.prev.title}
        </a>}
        {nav.next && <a href="javascript:void(0)" className="footer-nav__link footer-nav__right" onClick={(e) => {this.handleNavClick(nav.next.pathname)}}>
          <i className="zenticon zenticon-right"></i>
          {nav.next.title}
        </a>}
      </div>
    )
  }
}

export default withRouter(FooterNav)
