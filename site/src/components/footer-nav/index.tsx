import { Component } from 'react';
import { withRouter } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from 'zent';

import './style.scss';
import type { RouteComponentProps } from 'react-router';

export interface IFooterNavProps extends RouteComponentProps {
  data: any;
}

interface IFooterNavState {
  nav: {
    prev: any;
    next: any;
  };
  prevPathName: string;
}

class FooterNav extends Component<IFooterNavProps, IFooterNavState> {
  constructor(props: IFooterNavProps) {
    super(props);

    const state: IFooterNavState = {
      nav: { prev: null, next: null },
      prevPathName: props.location.pathname,
    };

    const { data, location } = props;
    if (location && location.pathname && data[location.pathname]) {
      state.nav = data[location.pathname];
    }

    this.state = state;
  }

  static getDerivedStateFromProps(
    props: IFooterNavProps,
    state: IFooterNavState
  ) {
    const {
      data,
      location: { pathname },
    } = props;

    if (pathname !== state.prevPathName) {
      return { nav: data[pathname], prevPathName: pathname };
    }

    return {
      prevPathName: pathname,
    };
  }

  handleNavClick(pathname: string) {
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
            <Icon type="right" />
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
            <Icon type="right" />
            {nav.next.title}
          </a>
        )}
      </div>
    );
  }
}

export default withRouter(FooterNav);
