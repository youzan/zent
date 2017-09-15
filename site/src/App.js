import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import PageHeader from 'components/PageHeader';
import PageFooter from 'components/PageFooter';
import SideNav from 'components/SideNav';
import FooterNav from 'components/FooterNav';
import ScrollToTop from 'components/ScrollToTop';

import packageJson from '../../packages/zent/package.json';
import navData from './nav.config';
import { registerRoute, registerFooter } from './router.config';
import { prefix } from './constants';
import fixSideNav from './components/fix-sidenav';

// one-dimentional array
const routeData = registerRoute(navData['zh-CN']);

// double-linked list
const footerData = registerFooter(routeData);

export default class App extends Component {
  render() {
    return (
      <Router>
        <ScrollToTop>
          <PageHeader />
          <div className="main-content">
            <div className="page-container clearfix">
              <SideNav
                data={navData['zh-CN']}
                base={prefix}
                ref={this.saveSideNav}
                version={packageJson.version}
              />
              <div className="page-content">
                <div className="react-doc-page-content">
                  <Switch>
                    {routeData.map((data, index) => {
                      return (
                        <Route
                          key={`route-${index}`}
                          component={data.component}
                          path={data.path}
                        />
                      );
                    })}

                    <Redirect from="*" to={routeData[0].path} />
                  </Switch>
                </div>
                <FooterNav data={footerData} />
              </div>
            </div>
          </div>
          <PageFooter ref={this.saveFooter} />
        </ScrollToTop>
      </Router>
    );
  }

  saveSideNav = instance => {
    this.sideNav = findDOMNode(instance);
  };

  saveFooter = instance => {
    this.footer = findDOMNode(instance);
  };

  componentDidMount() {
    this.cancelSideNavFix = fixSideNav(this.footer, this.sideNav);
  }

  componentWillUnmount() {
    if (this.cancelSideNavFix) {
      this.cancelSideNavFix();
    }
  }
}
