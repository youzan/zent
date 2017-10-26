import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import cx from 'classnames';
import PageHeader from 'components/PageHeader';
import PageFooter from 'components/PageFooter';
import SideNav from 'components/SideNav';
import FooterNav from 'components/FooterNav';
import ScrollToTop from 'components/ScrollToTop';
import throttle from 'lodash/throttle';

import packageJson from '../../packages/zent/package.json';
import navData from './nav.config';
import { registerRoute, registerFooter } from './router.config';
import { prefix } from './constants';

// one-dimentional array
const routeData = registerRoute(navData['zh-CN']);

// double-linked list
const footerData = registerFooter(routeData);

export default class App extends Component {
  state = {
    spiderOn: false,
    spiderReady: false
  };

  render() {
    const { spiderOn, spiderReady } = this.state;

    return (
      <Router>
        <ScrollToTop>
          <PageHeader version={packageJson.version} />
          <div className="main-content">
            <div className="page-container">
              <SideNav
                data={navData['zh-CN']}
                base={prefix}
                ref={this.saveSideNav}
              />
              <div className="page-content">
                <div className="react-doc-page-content">
                  <a
                    href="https://github.com/youzan/zent"
                    target="_blank"
                    rel="noopener noreferrer"
                    ref={this.saveSpiderNode}
                  >
                    <div
                      className="github-spider-trigger"
                      onMouseEnter={this.onGithubSpiderMouseEnter}
                    />
                    {spiderReady && (
                      <img
                        className={cx('github-spider animated', {
                          slideInDown: spiderOn,
                          slideOutUp: !spiderOn
                        })}
                        src="https://img.yzcdn.cn/zanui/react/spidertocat.png"
                        alt="github-spider"
                      />
                    )}
                  </a>
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

  onGithubSpiderMouseEnter = () => {
    this.setState({
      spiderReady: true,
      spiderOn: true
    });
  };

  saveSpiderNode = node => {
    this.spiderNode = node;
  };

  onMouseMove = throttle(evt => {
    const { spiderReady, spiderOn } = this.state;
    if (!spiderReady || !spiderOn) {
      return;
    }

    const { target } = evt;
    if (!this.spiderNode || !this.spiderNode.contains(target)) {
      this.setState({
        spiderOn: false
      });
    }
  }, 16);

  componentDidMount() {
    window.addEventListener('mousemove', this.onMouseMove);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.onMouseMove);
  }
}
