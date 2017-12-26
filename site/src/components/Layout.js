import React from 'react';

import PageHeader from './PageHeader';
import PageFooter from './PageFooter';
import SideNav from './SideNav';
import FooterNav from './FooterNav';

export default function Layout({
  oreo,
  i18n,
  children,
  version,
  sideNavData,
  sideNavRef,
  footerData,
  saveFooter
}) {
  return (
    <div className="doc__layout">
      <PageHeader version={version} i18n={i18n} sideNavData={sideNavData} />
      <div className="main-content">
        <div className="page-container">
          <SideNav data={sideNavData} base={oreo} ref={sideNavRef} />
          <div className="page-content">
            <div className="react-doc-page-content">{children}</div>
            <FooterNav data={footerData} />
          </div>
        </div>
      </div>
      <PageFooter ref={saveFooter} i18n={i18n} />
    </div>
  );
}
