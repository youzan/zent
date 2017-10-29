import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PageFooter from 'components/PageFooter';
import ScrollToTop from 'components/ScrollToTop';
import throttle from 'lodash/throttle';

import packageJson from '../../packages/zent/package.json';
import navData from './nav';
import { registerRoute, registerFooter } from './router.config';
import { prefix } from './constants';
import CNWrapper from './components/CNWrapper';
import USWrapper from './components/USWrapper';

// one-dimentional array
const routeData = {
  'zh-CN': registerRoute(navData['zh-CN'], 'zh/'),
  'en-US': registerRoute(navData['en-US'], 'en/')
};

// double-linked list
const footerData = {
  'zh-CN': registerFooter(routeData['zh-CN']),
  'en-US': registerFooter(routeData['en-US'])
};

export default class App extends Component {
  state = {
    spiderOn: false,
    spiderReady: false,
    i18n: ''
  };

  changeI18N = target => {
    this.setState({
      i18n: target
    });
  };

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

  render() {
    const { spiderOn, spiderReady, i18n } = this.state;
    const passthrough = i18nStr => ({
      oreo: `${i18nStr.split('-')[0]}/`,
      version: packageJson.version,
      sideNavData: navData[i18nStr],
      footerData: footerData[i18nStr],
      sideNavRef: this.saveSideNav,
      saveSpiderNode: this.saveSpiderNode,
      onGithubSpiderMouseEnter: this.onGithubSpiderMouseEnter,
      changeI18N: this.changeI18N,
      spiderOn,
      prefix,
      spiderReady,
      i18n
    });
    return (
      <Router key={module.hot ? Math.random() : null}>
        <ScrollToTop>
          <Switch>
            <Route
              path="/zh"
              render={() => (
                <CNWrapper pass={passthrough('zh-CN')}>
                  <Switch>
                    {routeData['zh-CN'].map((data, index) => {
                      return (
                        <Route
                          key={`route-${index}`}
                          component={data.source}
                          path={data.path}
                        />
                      );
                    })}
                  </Switch>
                </CNWrapper>
              )}
            />
            <Route
              path="/en"
              render={() => (
                <USWrapper pass={passthrough('en-US')}>
                  <Switch>
                    {routeData['en-US'].map((data, index) => {
                      return (
                        <Route
                          key={`route-${index}`}
                          component={data.source}
                          path={data.path}
                        />
                      );
                    })}
                  </Switch>
                </USWrapper>
              )}
            />
          </Switch>
          <PageFooter ref={this.saveFooter} />
        </ScrollToTop>
      </Router>
    );
  }
}
