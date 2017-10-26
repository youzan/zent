import React from 'react';
import cx from 'classnames';

import PageHeader from './PageHeader';
import SideNav from './SideNav';
import FooterNav from './FooterNav';

export default function LayoutCN({
  oreo,
  i18n,
  children,
  version,
  sideNavData,
  prefix,
  sideNavRef,
  footerData,
  spiderOn,
  spiderReady,
  saveSpiderNode,
  onGithubSpiderMouseEnter
}) {
  return (
    <div className="doc__layout">
      <PageHeader version={version} i18n={i18n} />
      <div className="main-content">
        <div className="page-container">
          <SideNav
            data={sideNavData}
            base={prefix + oreo}
            ref={sideNavRef}
          />
          <div className="page-content">
            <div className="react-doc-page-content">
              <a
                href="https://github.com/youzan/zent"
                target="_blank"
                rel="noopener noreferrer"
                ref={saveSpiderNode}
              >
                <div
                  className="github-spider-trigger"
                  onMouseEnter={onGithubSpiderMouseEnter}
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
              {children}
            </div>
            <FooterNav data={footerData} i18n={i18n} />
          </div>
        </div>
      </div>
    </div>
  );
}
