import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/no-redeclare,import/no-extraneous-dependencies
import { addEventListener, I18nProvider, enUSLocale } from 'zent';

import ScrollToTop from './components/ScrollToTop';
import _navData from './nav';
import { registerRoute, registerFooter } from './router.config';
import { prefix } from './constants';
import CNWrapper from './components/CNWrapper';
import USWrapper from './components/USWrapper';
import { ILayoutProps, INav, INavItem } from './types';

addEventListener(window, 'click', e => {
  if (e.target instanceof HTMLAnchorElement) {
    const { href } = e.target;
    if (/(apidoc|formulr)/.test(href)) {
      e.preventDefault();
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  }
});

const navData = _navData as unknown as Record<string, INav[]>;

// one-dimentional array
// 第二个参数作为处理路由分块的夹层暂时存在，后续会修复。
const routeData = {
  'zh-CN': registerRoute(navData['zh-CN'], '/zh'),
  'en-US': registerRoute(navData['en-US'], '/en'),
};

// double-linked list
const footerData = {
  'zh-CN': registerFooter(routeData['zh-CN']),
  'en-US': registerFooter(routeData['en-US']),
};

export default class App extends Component {
  state = {
    i18n: 'zh-CN',
  };

  changeI18N = (target: string) => {
    this.setState({
      i18n: target,
    });
  };

  render() {
    const { i18n } = this.state;
    const layoutProps = (locale: 'zh-CN' | 'en-US') =>
      ({
        // 奥利奥，路由路径中的夹层。
        oreo: `/${locale.split('-')[0]}`,
        sideNavData: navData[locale],
        footerData: footerData[locale],
        changeI18N: this.changeI18N,
        i18n,
      } as ILayoutProps);

    // 通过 basename 控制前缀，不要放到每一层路由里去
    return (
      <Router basename={prefix}>
        <ScrollToTop>
          <Switch>
            <Route
              path="/zh"
              render={() => (
                <CNWrapper pass={layoutProps('zh-CN')}>
                  <Switch>{routeData['zh-CN'].map(renderRouter)}</Switch>
                </CNWrapper>
              )}
            />
            <Route
              path="/en"
              render={() => (
                <I18nProvider value={enUSLocale}>
                  <USWrapper pass={layoutProps('en-US')}>
                    <Switch>{routeData['en-US'].map(renderRouter)}</Switch>
                  </USWrapper>
                </I18nProvider>
              )}
            />
            <Redirect from="*" to={routeData['zh-CN'][0].path!} />
          </Switch>
        </ScrollToTop>
      </Router>
    );
  }
}

function renderRouter(data: INavItem) {
  const { source, path } = data;
  return <Route key={`route-${path}`} component={source} path={path} />;
}
