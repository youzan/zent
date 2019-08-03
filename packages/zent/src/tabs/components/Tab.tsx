import * as React from 'react';
import { Component } from 'react';
import noop from 'lodash-es/noop';
import cn from 'classnames';
import { ITabProps } from '../types';

class Tab<Id extends string | number = string> extends Component<
  ITabProps<Id>
> {
  static defaultProps = {
    actived: false,
    disabled: false,
    id: '',
    minWidth: '',
    onSelected: noop,
    onDelete: noop,
    candel: false,
  };

  onDel = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    const { onDelete, id } = this.props;
    onDelete(id);
  };

  onClick = () => {
    const { onSelected, id, actived, disabled } = this.props;
    if (!actived && !disabled) {
      onSelected(id);
    }
  };

  renderDelOperater() {
    const { candel } = this.props;
    return (
      candel && (
        <span className="zent-tabs-tab-inner-del" onClick={this.onDel}>
          ✕
        </span>
      )
    );
  }

  render() {
    const { minWidth, actived, disabled, uniqueId, id, children } = this.props;
    const classes = cn('zent-tabs-tab', {
      ['zent-tabs-actived']: actived,
      ['zent-tabs-disabled']: disabled,
    });

    const style: React.CSSProperties = {
      minWidth,
    };

    return (
      <div
        role="tab"
        aria-labelledby={`zent-tabpanel-${uniqueId}-${id}`}
        className={classes}
        aria-disabled={disabled}
        aria-selected={actived}
        onClick={this.onClick}
        style={style}
      >
        <div className={`zent-tabs-tab-inner`}>
          {this.renderDelOperater()}
          {children}
        </div>
      </div>
    );
  }
}

export default Tab;
