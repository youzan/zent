import * as React from 'react';
import cn from 'classnames';
import AnchorOperation from '../operation/AnchorOperation';
import SlideOperation from '../operation/SlideOperation';
import { IInnerTab, ITabsNavProps } from '../../types';
import { WindowResizeHandler } from '../../../utils/component/WindowResizeHandler';

const classNamePrefix = 'zent-tabs-nav-tabs-content';

interface ITabsItem {
  id: string | number;
  width: number;
  accumWidth: number;
}
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
    translateX: 0,
  };

  get tabsInfo() {
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

  get tabsWrapperWidth() {
    return this.tabsWrapperRef.current?.offsetWidth || 0;
  }

  getTargetIndex = (transformRange, initalTarget) => {
    const { list } = this.tabsInfo;
    let targetIndex = initalTarget;
    const indexOffset = !initalTarget ? 1 : 0;

    for (let index = 0; index < list.length; index++) {
      const { width, accumWidth } = list[index];
      if (accumWidth + width >= transformRange && accumWidth < transformRange) {
        targetIndex = index + indexOffset;
        return targetIndex;
      }
    }
  };

  getHiddenTabs() {
    const { tabDataList } = this.props;
    const { startIndex, endIndex } = this.state;

    return tabDataList.reduce((hiddenTabs, tab, index) => {
      if (index < startIndex || index >= endIndex) {
        hiddenTabs.push(tab);
      }
      return hiddenTabs;
    }, []);
  }

  onStartChange = (startIndex: number) => {
    const { list, tabsTotalWidth } = this.tabsInfo;
    const tabsWrapperWidth = this.tabsWrapperWidth;
    const currentIndexTranslateX =
      list[startIndex].accumWidth + tabsWrapperWidth;

    const availableTranslateX = Math.min(
      currentIndexTranslateX,
      tabsTotalWidth
    );

    // 当前开始索引对应的偏移量大于标签总宽度时，调整可视范围的开始索引
    if (currentIndexTranslateX > tabsTotalWidth) {
      startIndex = this.getTargetIndex(tabsTotalWidth - tabsWrapperWidth, 0);
    }

    const endIndex = this.getTargetIndex(availableTranslateX, list.length - 1);
    const translateX = availableTranslateX - tabsWrapperWidth;

    this.setState({
      startIndex,
      endIndex,
      translateX,
    });
  };

  onEndChange = (endIndex: number) => {
    const { list } = this.tabsInfo;
    const tabsWrapperWidth = this.tabsWrapperWidth;
    const currentIndexTranslateX = list[endIndex].accumWidth - tabsWrapperWidth;

    const availableTranslateX = Math.max(currentIndexTranslateX, 0);

    // 当前结束索引对应的偏移量小于0时，调整可视范围的结束索引
    if (currentIndexTranslateX < 0) {
      endIndex = this.getTargetIndex(tabsWrapperWidth, list.length - 1);
    }

    const startIndex = this.getTargetIndex(availableTranslateX, 0);

    this.setState({
      startIndex,
      endIndex,
      translateX: availableTranslateX,
    });
  };

  onAnchorPageChange = (tab: IInnerTab<Id>) => {
    if (tab.disabled) return;
    const targetIndex = this.tabsInfo.list.findIndex(
      item => item.id === tab.key
    );

    const { startIndex, endIndex } = this.state;
    if (targetIndex <= startIndex) {
      this.onStartChange(targetIndex);
    }
    if (targetIndex >= endIndex) {
      this.onEndChange(targetIndex + 1);
    }
    this.props.onChange?.(tab.key);
  };

  onSlidePageChange = (isPrev: boolean, disabled = false) => {
    if (disabled) return;
    const { startIndex, endIndex } = this.state;
    if (isPrev) {
      this.onEndChange(startIndex);
    } else {
      this.onStartChange(endIndex);
    }
  };

  renderSlideOperations() {
    const { tabDataList } = this.props;
    const { startIndex, endIndex } = this.state;
    const disablePrev = !startIndex;
    const disableNext = endIndex === tabDataList.length - 1;
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
    this.onStartChange(0);
  }

  onResize = () => {
    this.onStartChange(this.state.startIndex);
  };

  render() {
    const { overflowMode, tabs } = this.props;
    const { translateX, startIndex, endIndex } = this.state;
    const contentClassName = `${classNamePrefix}-${overflowMode}`;
    const hiddenTabs = this.getHiddenTabs();
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
            className={cn(`${contentClassName}-main`)}
            ref={this.tabsMainRef}
            style={{ transform: `translate(-${translateX}px, 0)` }}
          >
            {tabs}
          </div>
        </div>
        <div className={`${contentClassName}-option`}>
          {overflowMode === 'slide' && this.renderSlideOperations()}
          {overflowMode === 'anchor' && this.renderAnchorOperations(hiddenTabs)}
        </div>
        <WindowResizeHandler onResize={this.onResize} />
      </>
    );
  }
}

export default OperationTabs;
