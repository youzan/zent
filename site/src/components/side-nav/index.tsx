import { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import { prefix } from '../../constants';

import './style.scss';
import { INav, INavGroup, INavItem } from '../../types';
import type { RouteComponentProps } from 'react-router';

interface ISideNavProps extends RouteComponentProps {
  base: string;
  data: INav[];
}

class SideNav extends Component<ISideNavProps> {
  handleTitleClick = (item: INav) => {
    if (item.groups[0].list[0].path) {
      this.props.history.push(
        getFullPath(this.props.base, item.groups[0].list[0].path)
      );
    }
  };

  parseData = (item: INav, index: number) => (
    <li className="nav-group-item" key={`nav-${index}`}>
      {item.groups && item.groups.map(this.parseGroup)}
    </li>
  );

  parseGroup = (group: INavGroup, index: number) => (
    <div className="nav-group" key={`nav-group-${index}`}>
      <div className="nav-group__title">{group.groupName}</div>
      <ul className="pure-menu-list">{group.list.map(this.parseList)}</ul>
    </div>
  );

  parseList = (navItem: INavItem, index: number) => {
    const { title, subtitle, hidden, link } = navItem;

    if (hidden) {
      return null;
    }

    const linkTitle = subtitle ? (
      <span>
        {title} <span className="nav-item__subtitle">{subtitle}</span>
      </span>
    ) : (
      title
    );

    return (
      <li className="nav-item" key={`nav-list-${index}`}>
        {navItem.link ? (
          <a
            href={`${prefix}${link}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {title}
          </a>
        ) : (
          <NavLink
            activeClassName="active"
            exact
            to={getFullPath(this.props.base, navItem.path!)}
          >
            {linkTitle}
          </NavLink>
        )}
      </li>
    );
  };

  render() {
    const { data } = this.props;

    return (
      <div className="side-nav">
        <ul>{data.map(this.parseData)}</ul>
      </div>
    );
  }
}

function getFullPath(base: string, path: string) {
  return `${base}/${path}`;
}

export default withRouter(SideNav);
