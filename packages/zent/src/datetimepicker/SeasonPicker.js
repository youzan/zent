import React, { Component, PureComponent } from 'react';
import classNames from 'classnames';
import isArray from 'lodash/isArray';
import Input from 'input';
import Popover from 'popover';
import parseDate from 'zan-utils/date/parseDate';
import getWidth from 'utils/getWidth';

import SeasonPanel from './season/SeasonPanel';
import { dayStart, dayEnd, getSeasonFromDate } from './utils/date';
import {
  noop,
  popPositionMap,
  commonProps,
  commonPropTypes
} from './constants/';

const seasonMonthMap = {
  0: 0,
  1: 3,
  2: 6,
  3: 9
};

function getSeasonLastDay(season, year) {
  const seasonLastDayMap = {
    0: [2, 31],
    1: [5, 30],
    2: [8, 30],
    3: [11, 31]
  };

  return new Date(year, ...seasonLastDayMap[season]);
}

function extractStateFromProps(props) {
  let showPlaceholder;
  let selected;
  let actived;
  const { format, value, defaultValue } = props;
  const val = isArray(value) ? value[0] : value;

  if (val) {
    const tmp = parseDate(val, format);
    if (tmp) {
      showPlaceholder = false;
      selected = actived = tmp;
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
  }
  let season;
  if (selected) {
    season = getSeasonFromDate(selected);
  }

  return {
    value: season,
    actived,
    selected,
    openPanel: false,
    showPlaceholder
  };
}

class SeasonPicker extends (PureComponent || Component) {
  static PropTypes = {
    ...commonPropTypes
  };

  static defaultProps = {
    ...commonProps,
    placeholder: '请选择季度',
    format: 'YYYY-MM-DD'
  };

  constructor(props) {
    super(props);
    this.state = extractStateFromProps(props);
  }

  componentWillReceiveProps(next) {
    const state = extractStateFromProps(next);
    this.setState(state);
  }

  onChangeSeason = val => {
    this.setState({
      actived: val
    });
  };

  onSelectSeason = season => {
    const { actived } = this.state;
    const { onChange } = this.props;
    const year = actived.getFullYear();
    const month = seasonMonthMap[season];

    if (this.isDisabled(season)) return;

    const begin = new Date(year, month, 1);
    const end = getSeasonLastDay(season, year);
    const ret = [dayStart(begin), dayEnd(end)];

    this.setState({
      value: season,
      selected: begin,
      actived: begin,
      openPanel: false,
      showPlaceholder: false
    });

    onChange(ret);
  };

  onClearInput = evt => {
    evt.stopPropagation();
    this.props.onChange([]);
  };

  isDisabled = season => {
    const { disabledDate } = this.props;
    const { actived } = this.state;
    const year = actived.getFullYear();
    const month = seasonMonthMap[season];
    const begin = new Date(year, month, 1);
    const end = getSeasonLastDay(season, year);
    const ret = [dayStart(begin), dayEnd(end)];

    if (disabledDate) return disabledDate(ret);

    return false;
  };

  renderPicker() {
    const { state } = this;
    let seasonPicker;
    if (state.openPanel) {
      seasonPicker = (
        <div className="season-picker" ref={ref => (this.picker = ref)}>
          <SeasonPanel
            actived={state.actived}
            selected={state.selected}
            onChange={this.onChangeSeason}
            onSelect={this.onSelectSeason}
            disabledDate={this.isDisabled}
          />
        </div>
      );
    }

    return seasonPicker;
  }

  togglePicker = () => {
    const { disabled } = this.props;
    const openPanel = !this.state.openPanel;

    if (disabled) return;

    this.setState({
      openPanel
    });
  };

  render() {
    const { props, state } = this;
    const wrapperCls = `${props.prefix}-datetime-picker ${props.className}`;
    const inputCls = classNames({
      'picker-input': true,
      'picker-input--filled': !state.showPlaceholder,
      'picker-input--disabled': props.disabled
    });
    const widthStyle = getWidth(props.width);
    let inputVal;
    if (state.selected) {
      inputVal = `${state.selected.getFullYear()}年${state.value + 1}季度`;
    }

    return (
      <div style={widthStyle} className={wrapperCls}>
        <Popover
          cushion={5}
          visible={state.openPanel}
          onVisibleChange={this.togglePicker}
          className={`${props.prefix}-datetime-picker-popover ${props.className}-popover`}
          position={popPositionMap[props.popPosition.toLowerCase()]}
        >
          <Popover.Trigger.Click>
            <div style={widthStyle} className={inputCls}>
              <Input
                name={props.name}
                value={state.showPlaceholder ? props.placeholder : inputVal}
                onChange={noop}
                disabled={props.disabled}
              />

              <span className="zenticon zenticon-calendar-o" />
              <span
                onClick={this.onClearInput}
                className="zenticon zenticon-close-circle"
              />
            </div>
          </Popover.Trigger.Click>
          <Popover.Content>{this.renderPicker()}</Popover.Content>
        </Popover>
      </div>
    );
  }
}

export default SeasonPicker;
