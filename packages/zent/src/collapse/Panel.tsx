import { Component, PropsWithChildren } from 'react';
import cx from 'classnames';
import { AnimateHeight } from '../utils/component/AnimateHeight';
import LazyMount from '../utils/component/LazyMount';
import {
  EASE_IN_CUBIC,
  EASE_IN_OUT,
  EASE_OUT_CUBIC,
} from '../utils/timingFunctions';
import { DisabledContext, IDisabledContext } from '../disabled';
import isNil from '../utils/isNil';
import Icon from '../icon/Icon';

const NO_BOTTOM_BORDER = {
  borderBottomWidth: 0,
  borderBottomColor: 'rgba(255, 255, 255, 0)',
  transition: `border-bottom-width 200ms ${EASE_IN_OUT}, border-bottom-color 200ms ${EASE_IN_OUT}`,
};
const NO_STYLE = {};

export interface ICollapsePanelProps {
  title: React.ReactNode;
  disabled?: boolean;
  showArrow: boolean;
  style?: React.CSSProperties;
  className?: string;
  active?: boolean;
  onChange?(key: string, active: boolean): void;
  panelKey?: string;
  panelTitleBackground?: string;
  showContentBackground?: boolean;
  isLast?: boolean;
  bordered?: boolean;
  extra?: React.ReactNode;
}

export class CollapsePanel extends Component<
  PropsWithChildren & ICollapsePanelProps
> {
  static defaultProps = {
    showArrow: true,
  };

  static contextType = DisabledContext;
  context!: IDisabledContext;

  state = {
    animateAppear: !this.props.active,
  };

  render() {
    const {
      children,
      title,
      style,
      active,
      disabled = this.context.value,
      showArrow,
      className,
      isLast,
      bordered,
      extra,
      panelTitleBackground,
      showContentBackground,
    } = this.props;
    const { animateAppear } = this.state;
    const isBorderedLast = bordered && isLast;

    // border transitions are done in JS to keep height animtion in sync
    const titleStyle = isBorderedLast && !active ? NO_BOTTOM_BORDER : NO_STYLE;
    const contentBoxStyle =
      isBorderedLast || !active ? NO_BOTTOM_BORDER : NO_STYLE;

    return (
      <div
        className={cx('zent-collapse-panel', className, {
          'zent-collapse-panel--has-arrow': showArrow,
          'zent-collapse-panel--active': active,
          'zent-collapse-panel--inactive': !active,
          'zent-collapse-panel--disabled': disabled,
        })}
        style={style}
      >
        <div
          className={cx('zent-collapse-panel__title', {
            'zent-collapse-panel__title--bg-none':
              panelTitleBackground === 'none',
            'zent-collapse-panel__title--bg-default':
              panelTitleBackground === 'default',
          })}
          style={titleStyle}
          onClick={this.toggle}
        >
          <div className="zent-collapse-panel__title__content">
            {showArrow && (
              <Icon type="down" className="zent-collapse-panel__arrow" />
            )}
            {title}
          </div>
          <div className="zent-collapse-panel__title__extra">{extra}</div>
        </div>
        <LazyMount mount={active}>
          <AnimateHeight
            appear={animateAppear}
            duration={160}
            height={active ? 'auto' : 0}
            transitionPrototype="all"
            easing={active ? EASE_OUT_CUBIC : EASE_IN_CUBIC}
            className={cx('zent-collapse-panel__content-box', {
              'zent-collapse-panel__content-box--inactive': !active,
              'zent-collapse-panel__content-box--active': active,
              'zent-collapse-panel__content_box--show-background':
                showContentBackground,
            })}
            style={contentBoxStyle}
          >
            <div className="zent-collapse-panel__content">{children}</div>
          </AnimateHeight>
        </LazyMount>
      </div>
    );
  }

  toggle = () => {
    const {
      onChange,
      panelKey,
      active,
      disabled = this.context.value,
    } = this.props;

    if (!disabled && !isNil(panelKey)) {
      onChange?.(panelKey, !active);
    }
  };
}

export default CollapsePanel;
