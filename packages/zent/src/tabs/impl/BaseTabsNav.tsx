import * as React from 'react';
import cn from 'classnames';
import { ITabsNavProps } from '../types';

abstract class BaseTabsNav<
  Id extends string | number = string
> extends React.PureComponent<ITabsNavProps<Id>> {
  protected abstract typeName: string;

  get tabsNavCls() {
    const { align } = this.props;
    return cn(
      'zent-tabs-nav',
      `zent-tabs-nav-align-${align}`,
      `zent-tabs-nav-type__${this.typeName}`
    );
  }

  onTabSelected = (id: Id) => {
    const { onChange } = this.props;
    onChange(id);
  };

  onTabDel = (id: Id) => {
    const { onDelete } = this.props;
    onDelete(id);
  };

  onTabAdd = () => {
    const { onAdd } = this.props;
    onAdd();
  };

  renderAddBtn() {
    const { canadd } = this.props;
    return canadd ? (
      <div className="zent-tabs-nav-add" onClick={this.onTabAdd}>
        <span>+</span>
      </div>
    ) : null;
  }

  renderNavExtraContent() {
    const { navExtraContent } = this.props;
    return navExtraContent ? (
      <div className={`zent-tabs-nav-extra-content`}>{navExtraContent}</div>
    ) : null;
  }
}

export default BaseTabsNav;
