import * as React from 'react';
import cn from 'classnames';
import AnchorOperation from '../operation/AnchorOperation';
import FlipOperation from '../operation/FlipOperation';
import { IInnerTab, ITabsNavProps } from '../../types';

const classNamePrefix = 'zent-tabs-nav-tabs-content';

interface IOperationTabsProps<Id>
  extends Pick<ITabsNavProps<Id>, 'tabDataList' | 'onChange' | 'overflowMode'> {
  tabs: React.ReactNode[];
}
abstract class OperationTabs<
  Id extends string | number
> extends React.Component<IOperationTabsProps<Id>> {
  tabsWrapperRef = React.createRef<HTMLDivElement>();
  tabsMainRef = React.createRef<HTMLDivElement>();

  state = {
    startIndex: 0,
    endIndex: 0,
    transformLeft: 0,
  };

  get tabsWidths() {
    const { tabDataList } = this.props;
    const tabs = this.tabsMainRef.current?.children || [];
    const list = [];
    let tabsTotalWidth = 0;
    for (let i = 0; i < tabs.length; i++) {
      const width = (tabs[i] as HTMLDivElement).offsetWidth;
      const id = tabDataList[i].key;
      list.push({ id, width });
      tabsTotalWidth += width;
    }
    return { list, tabsTotalWidth };
  }

  get tabsWrapperWidth() {
    return this.tabsWrapperRef.current?.offsetWidth || 0;
  }

  get maxTransformIndex() {
    const { list, tabsTotalWidth } = this.tabsWidths;
    let maxTransformIndex = 0;
    const transformRange = tabsTotalWidth - this.tabsWrapperWidth;
    list.reduce((total, { width }, index) => {
      const innerTotal = total + width;
      if (innerTotal === transformRange && total < transformRange) {
        maxTransformIndex = index;
      }
      if (innerTotal > transformRange && total < transformRange) {
        maxTransformIndex = index + 1;
      }
      return innerTotal;
    }, 0);
    return maxTransformIndex;
  }

  onPageChange(targetIndex: number, disabled = false) {
    if (disabled) return;
    let transformLeft = 0;
    let endIndex = 0;
    const { list, tabsTotalWidth } = this.tabsWidths;
    const tabsWrapperWidth = this.tabsWrapperWidth;
    const transformRange = tabsTotalWidth - tabsWrapperWidth;
    list.reduce((total, { width }, index) => {
      if (index === targetIndex) {
        transformLeft = total;
      }
      return total + width;
    }, 0);
    let visibleTotal = 0;
    list.reduce((total, { width, id }, index) => {
      if (index >= targetIndex) {
        visibleTotal = total + width;
      }
      if (visibleTotal >= tabsWrapperWidth && total < tabsWrapperWidth) {
        endIndex = index;
      }
      return visibleTotal;
    }, 0);

    const maxIndex = this.maxTransformIndex;
    const isOverMaxIndex = targetIndex >= maxIndex;
    this.setState({
      startIndex: isOverMaxIndex ? maxIndex : targetIndex,
      maxTransformIndex: maxIndex,
      transformLeft: isOverMaxIndex ? transformRange : transformLeft,
      endIndex: isOverMaxIndex ? list.length : endIndex,
    });
  }

  onAnchorPageChange(tab: IInnerTab<Id>) {
    let targetIndex = 0;
    this.tabsWidths.list.map((item, index) => {
      if (item.id === tab.key) {
        targetIndex = index;
        return;
      }
    });
    this.props.onChange?.(tab.key);
    this.onPageChange(targetIndex);
  }

  renderOverflowOperations(tabs: Array<IInnerTab<Id>>) {
    const tabsCount = tabs.length;
    if (!tabsCount) return null;
    const { overflowMode } = this.props;
    const { startIndex } = this.state;

    return overflowMode === 'flip' ? (
      <FlipOperation
        min={startIndex}
        max={this.maxTransformIndex}
        onChange={this.onPageChange.bind(this)}
      />
    ) : (
      <AnchorOperation<Id>
        tabs={tabs}
        onChange={this.onAnchorPageChange.bind(this)}
      />
    );
  }

  componentDidMount() {
    this.onPageChange(0);
  }

  getHiddenTabs() {
    const { tabDataList } = this.props;
    const { startIndex, endIndex } = this.state;
    const startHiddenTabs = tabDataList.slice(0, startIndex);
    const endHiddenTabs = tabDataList.slice(endIndex);
    return [...startHiddenTabs, ...endHiddenTabs];
  }

  render() {
    const { overflowMode, tabs } = this.props;
    const { transformLeft, startIndex } = this.state;
    const contentClassName = `${classNamePrefix}-${overflowMode}`;
    const hiddenTabs = this.getHiddenTabs();
    return (
      <>
        <div
          className={cn(contentClassName, {
            [`${contentClassName}-left`]: !!transformLeft,
            [`${contentClassName}-right`]:
              this.maxTransformIndex !== startIndex && hiddenTabs.length,
          })}
          ref={this.tabsWrapperRef}
        >
          <div
            className={cn(`${contentClassName}-main`)}
            ref={this.tabsMainRef}
            style={{ transform: `translate(-${transformLeft}px, 0)` }}
          >
            {tabs}
          </div>
        </div>
        <div className={`${contentClassName}-option`}>
          {this.renderOverflowOperations(hiddenTabs)}
        </div>
      </>
    );
  }
}

export default OperationTabs;
