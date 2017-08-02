import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './style.pcss';

export default class SideNav extends Component {
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired
      }).isRequired,
      route: PropTypes.object
    }).isRequired
  };

  handleTitleClick = item => {
    if (item.groups[0].list[0].path) {
      this.context.router.history.push(
        this.props.base + item.groups[0].list[0].path
      );
    }
  };

  parseData = (item, index) =>
    <li className="nav-item" key={`nav-${index}`}>
      {item.path
        ? <NavLink
            activeClassName="active"
            exact
            to={this.props.base + item.path}
          >
            {item.name}
          </NavLink>
        : <a onClick={() => this.handleTitleClick(item)}>
            {item.name}
          </a>}
      {item.children &&
        <ul className="pure-menu-list sub-nav">
          {item.children.map(this.parseChildren)}
        </ul>}
      {item.groups && item.groups.map(this.parseGroup)}
    </li>;

  parseChildren = (navItem, index) =>
    <li className="nav-item" key={`nav-children-${index}`}>
      <NavLink
        activeClassName="active"
        exact
        to={this.props.base + navItem.path}
      >
        {navItem.title || navItem.name}
      </NavLink>
    </li>;

  parseGroup = (group, index) =>
    <div className="nav-group" key={`nav-group-${index}`}>
      <div className="nav-group__title">
        {group.groupName}
      </div>
      <ul className="pure-menu-list">
        {group.list.map(this.parseList)}
      </ul>
    </div>;

  parseList = (navItem, index) => {
    return navItem.disabled
      ? null
      : <li className="nav-item" key={`nav-list-${index}`}>
          <NavLink
            activeClassName="active"
            exact
            to={this.props.base + navItem.path}
          >
            {navItem.title}
          </NavLink>
        </li>;
  };

  render() {
    const { data } = this.props;

    return (
      <div className="side-nav">
        <ul>
          {data.map(this.parseData)}
        </ul>
      </div>
    );
  }
}
