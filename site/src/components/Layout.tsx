import PageHeader from './page-header';
import PageFooter from './page-footer';
import SideNav from './side-nav';
import FooterNav from './footer-nav';
import { ILayoutProps } from '../types';

const Layout: React.FC<ILayoutProps> = ({
  oreo,
  i18n,
  children,
  sideNavData,
  footerData,
}) => {
  return (
    <div className="doc__layout">
      <PageHeader i18n={i18n} sideNavData={sideNavData} />
      <div className="main-content">
        <div className="page-container">
          <SideNav data={sideNavData} base={oreo} />
          <div className="page-content">
            <div className="react-doc-page-content">{children}</div>
            <FooterNav data={footerData} />
          </div>
        </div>
      </div>
      <PageFooter i18n={i18n} />
    </div>
  );
};

export default Layout;
