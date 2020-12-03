import BaseTabsNav from '../base/BaseTabsNav';
import OperationTabs from './OperationTabs';
import cn from 'classnames';
import { IInnerTab, ITabsNavProps } from '../../types';
import { commonTransformTabData } from '../../utils';

abstract class CommonTabsNav<
  Id extends string | number = string
> extends BaseTabsNav<Id, IInnerTab<Id>, ITabsNavProps<Id>> {
  get tabsNavCls() {
    const { stretch } = this.props;
    return cn('zent-tabs-nav', `zent-tabs-nav-type__${this.typeName}`, {
      ['zent-tabs-nav__stretch']: stretch,
    });
  }

  onTabDel = (id: Id) => {
    const { onDelete } = this.props;
    onDelete(id);
  };

  renderNavExtraContent() {
    const { navExtraContent } = this.props;
    return navExtraContent ? (
      <div className="zent-tabs-nav-extra-content">{navExtraContent}</div>
    ) : null;
  }

  transformTabDataList(
    tabDataList: Array<IInnerTab<Id>>
  ): Array<IInnerTab<Id>> {
    const { candel } = this.props;
    return tabDataList.map(tabItem => commonTransformTabData(tabItem, candel));
  }

  render() {
    const navExtraContent = this.renderNavExtraContent();
    const { tabDataList, overflowMode, onChange, type } = this.props;
    const tabs = this.renderTabs();
    const isOperationTabs =
      overflowMode && (type === 'normal' || type === 'card');

    return (
      <div className={this.tabsNavCls}>
        {isOperationTabs ? (
          <OperationTabs
            overflowMode={overflowMode}
            onChange={onChange}
            tabDataList={tabDataList}
            tabs={tabs}
          />
        ) : (
          <div className="zent-tabs-nav-content">
            <div className="zent-tabs-scroll" role="tablist">
              {tabs}
            </div>
          </div>
        )}
        {navExtraContent}
      </div>
    );
  }
}

export default CommonTabsNav;
