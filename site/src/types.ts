import DocLoadable from './components/Loadable';

export interface INavItem {
  title: string;
  path?: string;
  source?: ReturnType<typeof DocLoadable>;
  subtitle?: string;
  hidden?: boolean;
  link?: string;
}

export interface INavGroup {
  groupName: string;
  list: INavItem[];
}

export interface INav {
  name: string;
  groups: INavGroup[];
}

export interface INavLocaleData {
  [key: string]: INav[];
}

export interface IFooterNavItem {
  pathname: string;
  title: string;
  prev: IFooterNavItem | null;
  next: IFooterNavItem | null;
}

export interface ILayoutProps {
  oreo: string;
  i18n: Locale;
  sideNavData: INav[];
  footerData: Record<string, IFooterNavItem>;
  changeI18N: (locale: string) => void;
}

export type Locale = 'zh-CN' | 'en-US';
