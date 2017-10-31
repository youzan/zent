import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import ScrollToTop from 'components/ScrollToTop';
import throttle from 'lodash/throttle';

import packageJson from '../../packages/zent/package.json';
import navData from './nav';
import { registerRoute, registerFooter } from './router.config';
import { prefix } from './constants';
import CNWrapper from './components/CNWrapper';
import USWrapper from './components/USWrapper';

// one-dimentional array
// 第二个参数作为处理路由分块的夹层暂时存在，后续会修复。
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
      // 奥利奥，路由路径中的夹层。
      oreo: `${i18nStr.split('-')[0]}/`,
      version: packageJson.version,
      sideNavData: navData[i18nStr],
      footerData: footerData[i18nStr],
      sideNavRef: this.saveSideNav,
      saveSpiderNode: this.saveSpiderNode,
      saveFooter: this.saveFooter,
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
            <Redirect from="*" to={routeData['en-US'][0].path} />
          </Switch>
        </ScrollToTop>
      </Router>
    );
  }
}
