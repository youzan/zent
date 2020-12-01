import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './style.scss';

class FooterNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nav: { prev: null, next: null },
    };

    const { data, location } = props;
    if (location && location.pathname && data[location.pathname]) {
      this.state.nav = data[location.pathname];
    }
  }

  componentWillReceiveProps(nextProps) {
    const { data, location } = nextProps;

    if (location !== this.props.location) {
      this.setState({ nav: data[location.pathname] });
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
        {nav && nav.prev && (
          <a
            className="footer-nav__link footer-nav__left"
            onClick={() => {
              this.handleNavClick(nav.prev.pathname);
            }}
          >
            <i className="zenticon zenticon-right" />
            {nav.prev.title}
          </a>
        )}
        {nav && nav.next && (
          <a
            className="footer-nav__link footer-nav__right"
            onClick={() => {
              this.handleNavClick(nav.next.pathname);
            }}
          >
            <i className="zenticon zenticon-right" />
            {nav.next.title}
          </a>
        )}
      </div>
    );
  }
}

export default withRouter(FooterNav);
