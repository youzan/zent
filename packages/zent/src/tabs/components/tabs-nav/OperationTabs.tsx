import cn from 'classnames';
import { Component, createRef } from 'react';

import AnchorOperation from '../operation/AnchorOperation';
import SlideOperation from '../operation/SlideOperation';
import { IInnerTab, ITabsNavProps } from '../../types';
import { WindowResizeHandler } from '../../../utils/component/WindowResizeHandler';
import memorizeOne from '../../../utils/memorize-one';
import Icon from '../../../icon';
import isEqual from '../../../utils/isEqual';

const classNamePrefix = 'zent-tabs-nav-tabs-content';

interface ITabsItem {
  id: string | number;
  width: number;
  accumWidth: number;
}
interface ITabsInfo {
  list: ITabsItem[];
  tabsTotalWidth: number;
}
interface IOperationTabsProps<Id>
  extends Pick<
    ITabsNavProps<Id>,
    'tabDataList' | 'onChange' | 'overflowMode' | 'onAdd' | 'activeId'
  > {
  tabs: React.ReactNode[];
}

abstract class OperationTabs<Id extends string | number> extends Component<
  IOperationTabsProps<Id>
> {
  tabsWrapperRef = createRef<HTMLDivElement>();
  tabsMainRef = createRef<HTMLDivElement>();

  static defaultProps = {
    overflowMode: 'anchor',
  };

  state = {
    // 可视范围内第一个完整展示的tab下标
    startIndex: 0,
    // 可视范围内最后一个完整展示的tab下标
    endIndex: 0,
    translateX: 0,
  };

  get tabsWrapperWidth() {
    return this.tabsWrapperRef.current?.offsetWidth || 0;
  }

  getTabsInfo(): ITabsInfo {
    const { tabDataList } = this.props;
    const tabs = this.tabsMainRef.current?.children || [];
    const list: ITabsItem[] = [];

    let tabsTotalWidth = 0;
    for (let i = 0; i < tabs.length; i++) {
      const width = (tabs[i] as HTMLDivElement).offsetWidth;
      const id = tabDataList[i].key;
      list.push({ id, width, accumWidth: tabsTotalWidth });
      tabsTotalWidth += width;
    }
    return { list, tabsTotalWidth };
  }

  getTargetIndex = (translateX: number, tabsInfo: ITabsInfo, isEnd = false) => {
    const { list, tabsTotalWidth } = tabsInfo;
    const targetIndex = isEnd ? list.length - 1 : 0;
    const indexOffset = isEnd ? -1 : 1;

    if (translateX <= 0) {
      return 0;
    }
    if (translateX >= tabsTotalWidth) {
      return list.length - 1;
    }

    for (let index = 0; index < list.length; index++) {
      const { width, accumWidth } = list[index];
      if (accumWidth + width >= translateX && accumWidth < translateX) {
        return index + indexOffset;
      }
    }
    return targetIndex;
  };

  getHiddenTabs = memorizeOne(
    (
      tabDataList: Array<IInnerTab<Id>>,
      startIndex: number,
      endIndex: number
    ) => {
      return tabDataList.reduce((hiddenTabs, tab, index) => {
        if (index < startIndex || index > endIndex) {
          hiddenTabs.push(tab);
        }
        return hiddenTabs;
      }, []);
    }
  );

  onStartChange = (startIndex: number, tabsInfo: ITabsInfo) => {
    const { list, tabsTotalWidth } = tabsInfo;
    const tabsWrapperWidth = this.tabsWrapperWidth;
    const currentIndexTranslateX =
      list[startIndex].accumWidth + tabsWrapperWidth;

    const availableTranslateX = Math.min(
      currentIndexTranslateX,
      tabsTotalWidth
    );

    // 当前开始索引对应的偏移量大于标签总宽度时，调整可视范围的开始索引
    if (currentIndexTranslateX > tabsTotalWidth) {
      startIndex = this.getTargetIndex(
        tabsTotalWidth - tabsWrapperWidth,
        tabsInfo
      );
    }

    const endIndex = this.getTargetIndex(availableTranslateX, tabsInfo, true);
    const translateX = availableTranslateX - tabsWrapperWidth;

    this.setState({
      startIndex,
      endIndex,
      translateX,
    });
  };

  onEndChange = (endIndex: number, tabsInfo: ITabsInfo) => {
    const { list } = tabsInfo;
    const tabsWrapperWidth = this.tabsWrapperWidth;
    const { accumWidth, width } = list[endIndex];
    const currentIndexTranslateX = accumWidth + width - tabsWrapperWidth;

    const availableTranslateX = Math.max(currentIndexTranslateX, 0);

    // 当前结束索引对应的偏移量小于0时，调整可视范围的结束索引
    if (currentIndexTranslateX < 0) {
      endIndex = this.getTargetIndex(tabsWrapperWidth, tabsInfo, true);
    }

    const startIndex = this.getTargetIndex(availableTranslateX, tabsInfo);

    this.setState({
      startIndex,
      endIndex,
      translateX: availableTranslateX,
    });
  };

  onAnchorPageChange = (tab: IInnerTab<Id>) => {
    if (tab.disabled) return;
    const tabsInfo = this.getTabsInfo();
    const targetIndex = tabsInfo.list.findIndex(item => item.id === tab.key);

    const { startIndex, endIndex } = this.state;
    if (targetIndex <= startIndex) {
      this.onStartChange(targetIndex, tabsInfo);
    }
    if (targetIndex >= endIndex) {
      this.onEndChange(targetIndex, tabsInfo);
    }
    this.props.onChange?.(tab.key);
  };

  onSlidePageChange = (isPrev: boolean, disabled = false) => {
    if (disabled) return;
    const { startIndex, endIndex } = this.state;
    const tabsInfo = this.getTabsInfo();
    if (isPrev) {
      this.onEndChange(startIndex - 1, tabsInfo);
    } else {
      this.onStartChange(endIndex + 1, tabsInfo);
    }
  };

  renderSlideOperations() {
    const { tabDataList } = this.props;
    const { startIndex, endIndex } = this.state;
    const disablePrev = !startIndex;
    const disableNext = endIndex >= tabDataList.length - 1;
    return (
      <SlideOperation
        disablePrev={disablePrev}
        disableNext={disableNext}
        onPrevChange={() => this.onSlidePageChange(true, disablePrev)}
        onNextChange={() => this.onSlidePageChange(false, disableNext)}
      />
    );
  }

  renderAnchorOperations(tabs: Array<IInnerTab<Id>>) {
    return !!tabs.length ? (
      <AnchorOperation<Id> tabs={tabs} onChange={this.onAnchorPageChange} />
    ) : null;
  }

  componentDidMount() {
    this.onStartChange(0, this.getTabsInfo());
  }

  onResize = () => {
    this.onStartChange(this.state.startIndex, this.getTabsInfo());
  };

  componentDidUpdate = prevProps => {
    const { activeId, tabDataList } = this.props;
    if (!isEqual(prevProps.tabDataList, this.props.tabDataList)) {
      this.onResize();
    }
    if (prevProps.activeId === activeId) return;
    const { startIndex, endIndex } = this.state;
    const currentTabIndex = tabDataList.findIndex(tab => tab.key === activeId);
    if (currentTabIndex === -1) return;
    if (currentTabIndex < startIndex || currentTabIndex > endIndex) {
      const currentTab = tabDataList[currentTabIndex];
      this.onAnchorPageChange(currentTab);
    }
  };

  handleAddClick = () => {
    const { onAdd } = this.props;
    onAdd?.();
  };

  render() {
    const { overflowMode, tabs, tabDataList, onAdd } = this.props;
    const { translateX, startIndex, endIndex } = this.state;
    const contentClassName = `${classNamePrefix}-${overflowMode}`;
    const hiddenTabs = this.getHiddenTabs(tabDataList, startIndex, endIndex);
    const isHiddenTab = hiddenTabs.length !== 0;

    return (
      <>
        <div
          className={cn(contentClassName, {
            [`${contentClassName}-left`]: !!startIndex,
            [`${contentClassName}-right`]: endIndex !== tabs.length - 1,
          })}
          ref={this.tabsWrapperRef}
        >
          <div
            className={cn(`${contentClassName}-main`, {
              [`${contentClassName}-main--has-add`]: !isHiddenTab && onAdd,
            })}
            ref={this.tabsMainRef}
            onScroll={this.onResize}
            style={{
              transform: `translateX(-${isHiddenTab ? translateX : 0}px)`,
            }}
          >
            {tabs}
          </div>
          {!isHiddenTab && onAdd && (
            <span
              className={`${contentClassName}__add-btn`}
              onClick={this.handleAddClick}
            >
              <Icon type="plus" className={`${contentClassName}__add-icon`} />
            </span>
          )}
        </div>
        {isHiddenTab && (
          <>
            <div
              className={cn(`${contentClassName}-option`, {
                [`${contentClassName}-option--right`]:
                  endIndex !== tabs.length - 1,
              })}
            >
              {overflowMode === 'slide' && this.renderSlideOperations()}
              {overflowMode === 'anchor' &&
                this.renderAnchorOperations(hiddenTabs)}
              {onAdd && (
                <span
                  className={`${contentClassName}-option__add-btn`}
                  onClick={this.handleAddClick}
                >
                  <Icon
                    type="plus"
                    className={`${contentClassName}__add-icon`}
                  />
                </span>
              )}
            </div>
            <WindowResizeHandler onResize={this.onResize} />
          </>
        )}
      </>
    );
  }
}

export default OperationTabs;
