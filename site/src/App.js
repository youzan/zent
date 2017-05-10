import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import packageJson from '../../packages/zent/package.json';
import navData from './nav.config';
import { registerRoute,  registerFooter } from './router.config';

import PageHeader from 'components/PageHeader';
import PageFooter from 'components/PageFooter';
import SideNav from 'components/SideNav';
import FooterNav from 'components/FooterNav';
import ScrollToTop from 'components/ScrollToTop';

const global = {
  version: packageJson.version
};
window._global = global;

// one-dimentional array
const routeData = registerRoute(navData['zh-CN']);

// double-linked list
const footerData = registerFooter(routeData);

export default class App extends Component {
  render() {
    return (
      <Router>
        <ScrollToTop>
          <PageHeader version={packageJson.version}></PageHeader>
          <div className="main-content">
            <div className="page-container clearfix">
              <SideNav data={navData['zh-CN']} base="/"></SideNav>
              <div className="page-content">
                <div className="react-doc-page-content">
                  <Switch>
                    {routeData.map((data, index) => {
                      return (
                        <Route key={`route-${index}`} component={data.component} path={data.path} />
                      )
                    })}
                    <Redirect from="*" to={routeData[0].path} />
                  </Switch>
                </div>
                <FooterNav data={footerData} />
              </div>
            </div>
          </div>
          <PageFooter />
        </ScrollToTop>
      </Router>
    );
  }
}
