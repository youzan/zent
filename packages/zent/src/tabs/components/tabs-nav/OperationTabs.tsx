import * as React from 'react';
import cn from 'classnames';
import AnchorOperation from '../operation/AnchorOperation';
import SlideOperation from '../operation/SlideOperation';
import { IInnerTab, ITabsNavProps } from '../../types';
import { WindowResizeHandler } from '../../../utils/component/WindowResizeHandler';

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

  getCurrentTransformX(targetIndex: number) {
    const { list } = this.tabsWidths;
    let transformX = 0;
    list.reduce((total, { width }, index) => {
      if (index === targetIndex) {
        transformX = total;
      }
      return total + width;
    }, 0);

    return transformX;
  }

  getTargetIndex = (transformRange, initalTarget) => {
    const { list } = this.tabsWidths;
    let targetIndex = initalTarget;
    const indexOffset = !initalTarget ? 1 : 0;

    list.reduce((total, { width }, index) => {
      const nextTotal = total + width;
      if (nextTotal >= transformRange && total < transformRange) {
        targetIndex = index + indexOffset;
      }
      return nextTotal;
    }, 0);

    return targetIndex;
  };

  onStartChange = (startIndex: number) => {
    const { list, tabsTotalWidth } = this.tabsWidths;
    const tabsWrapperWidth = this.tabsWrapperWidth;
    const currentTransform =
      this.getCurrentTransformX(startIndex) + tabsWrapperWidth;

    const transformRange = Math.min(currentTransform, tabsTotalWidth);
    if (currentTransform > tabsTotalWidth) {
      startIndex = this.getTargetIndex(tabsTotalWidth - tabsWrapperWidth, 0);
    }
    const endIndex = this.getTargetIndex(transformRange, list.length - 1);
    const transformLeft = transformRange - tabsWrapperWidth;
    this.setState({
      startIndex,
      endIndex,
      transformLeft,
    });
  };

  onEndChange = (endIndex: number) => {
    const { list } = this.tabsWidths;
    const tabsWrapperWidth = this.tabsWrapperWidth;
    const currentTransform =
      this.getCurrentTransformX(endIndex) - tabsWrapperWidth;

    const transformRange = Math.max(currentTransform, 0);
    if (currentTransform < 0) {
      endIndex = this.getTargetIndex(tabsWrapperWidth, list.length - 1);
    }
    const startIndex = this.getTargetIndex(transformRange, 0);
    this.setState({
      startIndex,
      endIndex,
      transformLeft: transformRange,
    });
  };

  onAnchorPageChange = (tab: IInnerTab<Id>) => {
    if (tab.disabled) return;
    const targetIndex = this.tabsWidths.list.findIndex(
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

  render() {
    const { overflowMode, tabs } = this.props;
    const { transformLeft, startIndex, endIndex } = this.state;
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
            style={{ transform: `translate(-${transformLeft}px, 0)` }}
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
