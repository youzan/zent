import * as React from 'react';
import { PureComponent } from 'react';
import cx from 'classnames';
import isArray from 'lodash-es/isArray';
import * as startOfWeek from 'date-fns/start_of_week';
import * as endOfWeek from 'date-fns/end_of_week';
import * as addDays from 'date-fns/add_days';
import * as subDays from 'date-fns/sub_days';
import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import { Omit } from 'utility-types';

import Input from '../input';
import Popover from '../popover';
import getWidth from '../utils/getWidth';
import { I18nReceiver as Receiver } from '../i18n';

import DatePanel from './date/DatePanel';
import PanelFooter from './common/PanelFooter';
import {
  goMonths,
  formatDate,
  parseDate,
  dayStart,
  dayEnd,
  setTime,
  isSameDate,
} from './utils';
import { CURRENT_DAY, noop, popPositionMap, commonProps } from './constants';
import { DatePickers } from './common/types';

function getSelectedWeek(val, start = 1, isDisabled): [Date?, Date?] {
  let weekStart = startOfWeek(val, {
    weekStartsOn: start,
  });
  let weekEnd = endOfWeek(val, {
    weekStartsOn: start,
  });

  while (
    isDisabled(weekStart) &&
    (weekStart <= weekEnd || isSameDate(weekStart, weekEnd))
  ) {
    weekStart = addDays(weekStart, 1);
  }

  while (
    isDisabled(weekEnd) &&
    (weekEnd >= weekStart || isSameDate(weekEnd, weekStart))
  ) {
    weekEnd = subDays(weekEnd, 1);
  }

  if (differenceInCalendarDays(weekEnd, weekStart) < 0) {
    return [];
  }

  return [weekStart, weekEnd];
}

export interface IWeekPickerProps
  extends Omit<DatePickers.ICommonProps<[Date?, Date?]>, 'onClick'> {
  startDay?: number;
  onBeforeClear?: () => boolean;
  onClick?: (val: [Date?, Date?], type?: DatePickers.RangeType) => void;
  isFooterVisible?: boolean;
  showTime?: boolean;
}

export class WeekPicker extends PureComponent<IWeekPickerProps, any> {
  static defaultProps = {
    ...commonProps,
    placeholder: '',
    startDay: 1,
  };

  retType = 'string';
  isfooterShow: boolean;

  constructor(props: IWeekPickerProps) {
    super(props);
    const { value, valueType, showTime, isFooterVisible } = props;

    if (valueType) {
      this.retType = valueType.toLowerCase();
    } else if (value) {
      if (typeof value === 'number') this.retType = 'number';
      if (value instanceof Date) this.retType = 'date';
    }

    this.state = this.extractStateFromProps(props);
    // 没有footer的逻辑
    this.isfooterShow = showTime || isFooterVisible;
  }

  extractStateFromProps(props) {
    let selected;
    let actived;
    let showPlaceholder;
    const { openPanel, value, format, defaultValue, startDay } = props;

    // 如果 value 是数组就取数组第一个值，否则就取 value
    const hasValue = isArray(value) ? value[0] : value;

    if (hasValue) {
      const tmp = parseDate(hasValue, format);

      if (tmp) {
        showPlaceholder = false;
        selected = getSelectedWeek(tmp, startDay, val =>
          this.isDisabled(val, props)
        );
        actived = setTime(tmp);
      } else {
        console.warn("date and format don't match."); // eslint-disable-line
        showPlaceholder = true;
        actived = dayStart();
      }
    } else {
      showPlaceholder = true;

      if (defaultValue) {
        actived = parseDate(defaultValue, format);
      } else {
        actived = dayStart();
      }

      actived = parseDate(actived, format);
    }

    /**
     * actived 用来临时存放日期，改变年份和月份的时候只会改动 actived 的值
     * selected 用来存放用户选择的日期，点击日期时会设置 selected 的值
     */

    let ret;
    if (selected) {
      ret = selected.map(item => formatDate(item, format));
    }
    return {
      value: ret,
      actived,
      selected,
      openPanel,
      showPlaceholder,
    };
  }

  componentWillReceiveProps(next) {
    const state = this.extractStateFromProps(next);
    this.setState(state);
  }

  onChangeDate = val => {
    this.setState({
      actived: val,
    });
  };

  onHover = val => {
    const { startDay } = this.props;
    const week = [
      startOfWeek(val, {
        weekStartsOn: startDay,
      }),
      endOfWeek(val, {
        weekStartsOn: startDay,
      }),
    ];

    this.setState({
      range: week,
    });
  };

  onSelectDate = val => {
    const { onClick, startDay } = this.props;
    const week = getSelectedWeek(val, startDay, this.isDisabled);

    this.setState(
      {
        selected: week,
      },
      () => {
        if (!this.isfooterShow) {
          this.onConfirm();
        }
      }
    );

    onClick && onClick(week);
  };

  onChangeMonth = type => {
    const typeMap = {
      prev: -1,
      next: 1,
    };

    return () => {
      const { actived } = this.state;
      const acp = goMonths(actived, typeMap[type]);

      this.setState({
        actived: acp,
      });
    };
  };

  onClearInput = evt => {
    evt.stopPropagation();
    const { onChange, onBeforeClear, canClear } = this.props;
    if (onBeforeClear && !onBeforeClear()) return; // 用户可以通过这个函数返回 false 来阻止清空

    if (!canClear) return;

    onChange([]);
  };

  onMouseOut = evt => {
    evt.stopPropagation();
    this.setState({
      range: [],
    });
  };

  /**
   * 如果传入为数字，返回值也为数字
   * 如果传入为 Date 的实例，返回值也为 Date 的实例
   * 默认返回 format 格式的字符串
   */

  getReturnValue = date => {
    const { format } = this.props;
    if (this.retType === 'number') {
      return date.getTime();
    }

    if (this.retType === 'date') {
      return date;
    }

    return formatDate(date, format);
  };

  onConfirm = () => {
    const { selected } = this.state;
    const { format, onClose, onChange } = this.props;

    if (selected.length === 0) {
      return;
    }

    let tmp = selected.slice();
    if (this.isDisabled(tmp[0] || this.isDisabled(tmp[1]))) return;

    tmp = [dayStart(tmp[0]), dayEnd(tmp[1])];
    const value = tmp.map(item => formatDate(item, format));
    this.setState({
      value,
      openPanel: false,
      showPlaceholder: false,
      range: [],
    });

    const ret = tmp.map(this.getReturnValue);
    onChange(ret);
    onClose && onClose();
  };

  isDisabled = (val, props?: IWeekPickerProps) => {
    const { disabledDate, min, max, format } = props || this.props;

    if (disabledDate && disabledDate(val)) return true;
    if (min && dayEnd(val) < parseDate(min, format)) return true;
    if (max && dayStart(val) > parseDate(max, format)) return true;

    return false;
  };

  renderPicker(i18n) {
    const {
      props: { confirmText },
      state: { openPanel, range, actived, selected },
    } = this;
    let weekPicker;

    // 打开面板的时候才渲染
    if (openPanel) {
      const isDisabled = this.isDisabled(CURRENT_DAY);
      const linkCls = cx({
        'link--current': true,
        'link--disabled': isDisabled,
      });

      const weekPickerCls = cx({
        'week-picker': true,
        small: this.isfooterShow,
      });

      weekPicker = (
        <div className={weekPickerCls}>
          <div onMouseOut={this.onMouseOut}>
            <DatePanel
              range={range}
              actived={actived}
              selected={selected}
              disabledDate={this.isDisabled}
              onHover={this.onHover}
              onSelect={this.onSelectDate}
              onChange={this.onChangeDate}
              onPrev={this.onChangeMonth('prev')}
              onNext={this.onChangeMonth('next')}
              disableSelectedHighlight
              i18n={i18n}
            />
          </div>
          {this.isfooterShow ? (
            <PanelFooter
              buttonText={confirmText || i18n.confirm}
              onClickButton={this.onConfirm}
              linkText={i18n.current.week}
              linkCls={linkCls}
              showLink={!isDisabled}
              onClickLink={() => this.onSelectDate(CURRENT_DAY)}
            />
          ) : null}
        </div>
      );
    }

    return weekPicker;
  }

  togglePicker = () => {
    const { onOpen, onClose, disabled } = this.props;
    const openPanel = !this.state.openPanel;
    if (disabled) return;

    openPanel ? onOpen && onOpen() : onClose && onClose();
    this.setState({
      openPanel,
    });
  };

  render() {
    const {
      props: {
        className,
        disabled,
        name,
        placeholder,
        popPosition,
        prefix,
        width,
        canClear,
        autoComplete,
      },
      state: { openPanel, showPlaceholder, value },
    } = this;

    const wrapperCls = cx(
      `${prefix}-datetime-picker`,
      `${prefix}-week-picker`,
      className
    );
    const inputCls = cx('picker-input', 'week-picker-input', {
      'picker-input--show-clear-icon': canClear && !showPlaceholder,
      'picker-input--disabled': disabled,
    });
    const widthStyle = getWidth(width);

    return (
      <div style={widthStyle} className={wrapperCls}>
        <Receiver componentName="TimePicker">
          {i18n => (
            <Popover
              cushion={5}
              visible={openPanel}
              onVisibleChange={this.togglePicker}
              className={`${prefix}-datetime-picker-popover ${className}-popover`}
              position={popPositionMap[popPosition.toLowerCase()]}
            >
              <Popover.Trigger.Click>
                <div
                  style={widthStyle}
                  className={inputCls}
                  onClick={evt => evt.preventDefault()}
                >
                  <Input
                    name={name}
                    placeholder={placeholder || i18n.week}
                    value={value ? value.join(` ${i18n.to} `) : ''}
                    onChange={noop}
                    disabled={disabled}
                    autoComplete={autoComplete}
                  />

                  <span className="zenticon zenticon-calendar-o" />
                  {canClear && (
                    <span
                      onClick={this.onClearInput}
                      className="zenticon zenticon-close-circle"
                    />
                  )}
                </div>
              </Popover.Trigger.Click>
              <Popover.Content>{this.renderPicker(i18n)}</Popover.Content>
            </Popover>
          )}
        </Receiver>
      </div>
    );
  }
}

export default WeekPicker;
