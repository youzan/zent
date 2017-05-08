import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import packageJson from '../../packages/zent/package.json';
import navData from './nav.config';
import registerRoute from './router.config';

import PageHeader from 'components/PageHeader';
import PageFooter from 'components/PageFooter';
import SideNav from 'components/SideNav';
import FooterNav from 'components/FooterNav';

const global = {
  version: packageJson.version
};
window._global = global;

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return (
      <div className="app">{this.props.children}</div>
    );
  }
}

const ScrollWrapper = withRouter(ScrollToTop);

const routeData = registerRoute(navData['zh-CN']);

const footerData = {};

routeData.forEach(route => {
  footerData[route.path] = { pathname: route.path, title: route.title };
});

routeData.forEach((route, index) => {
  footerData[route.path].prev = index === 0 ? null : footerData[routeData[index - 1].path];
  footerData[route.path].next = index === routeData.length - 1 ? null : footerData[routeData[index + 1].path];
});

export default class App extends Component {
  render() {
    return (
      <Router>
        <ScrollWrapper>
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
        </ScrollWrapper>
      </Router>
    );
  }
}
