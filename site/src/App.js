import { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { I18nProvider } from '../../packages/zent/src/i18n';
import * as i18nEN from '../../packages/zent/src/i18n/en-US';
import ScrollToTop from './components/ScrollToTop';
import packageJson from '../../packages/zent/package.json';
import navData from './nav';
import { registerRoute, registerFooter } from './router.config';
import { prefix } from './constants';
import CNWrapper from './components/CNWrapper';
import USWrapper from './components/USWrapper';

window.addEventListener('click', e => {
  if (e.target instanceof HTMLAnchorElement) {
    const { href } = e.target;
    if (/(apidoc|formulr)/.test(href)) {
      e.preventDefault();
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  }
});

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

  changeI18N = target => {
    this.setState({
      i18n: target,
    });
  };

  render() {
    const { i18n } = this.state;
    const passthrough = i18nStr => ({
      // 奥利奥，路由路径中的夹层。
      oreo: `/${i18nStr.split('-')[0]}`,
      version: packageJson.version,
      sideNavData: navData[i18nStr],
      footerData: footerData[i18nStr],
      sideNavRef: this.saveSideNav,
      saveFooter: this.saveFooter,
      changeI18N: this.changeI18N,
      prefix,
      i18n,
    });

    // 通过 basename 控制前缀，不要放到每一层路由里去
    return (
      <Router key={module.hot ? Math.random() : null} basename={prefix}>
        <ScrollToTop>
          <Switch>
            <Route
              path="/zh"
              render={() => (
                <CNWrapper pass={passthrough('zh-CN')}>
                  <Switch>{routeData['zh-CN'].map(renderRouter)}</Switch>
                </CNWrapper>
              )}
            />
            <Route
              path="/en"
              render={() => (
                <I18nProvider value={i18nEN}>
                  <USWrapper pass={passthrough('en-US')}>
                    <Switch>{routeData['en-US'].map(renderRouter)}</Switch>
                  </USWrapper>
                </I18nProvider>
              )}
            />
            <Redirect from="*" to={routeData['zh-CN'][0].path} />
          </Switch>
        </ScrollToTop>
      </Router>
    );
  }
}

function renderRouter(data) {
  const { source, path } = data;
  return <Route key={`route-${path}`} component={source} path={path} />;
}
