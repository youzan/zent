import * as React from 'react';
import { Component } from 'react';
import cn from 'classnames';
import { ITabProps } from '../../types';

class NormalTab<Id extends string | number = string> extends Component<
  ITabProps<Id>
> {
  onDel = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    const { onDelete, id } = this.props;
    onDelete && onDelete(id);
  };

  onClick = () => {
    const { onSelected, id, actived, disabled } = this.props;
    if (!actived && !disabled) {
      onSelected && onSelected(id);
    }
  };

  renderDelOperater() {
    const { candel } = this.props;
    return candel ? (
      <span className="zent-tabs-tab-inner-del" onClick={this.onDel}>
        ✕
      </span>
    ) : null;
  }

  render() {
    const { minWidth, actived, disabled, children } = this.props;
    const classes = cn('zent-tabs-tab', {
      ['zent-tabs-tab__actived']: actived,
      ['zent-tabs-tab__disabled']: disabled,
    });

    const style: React.CSSProperties = {
      minWidth,
    };

    return (
      <div
        role="tab"
        className={classes}
        aria-disabled={disabled}
        aria-selected={actived}
        onClick={this.onClick}
        style={style}
      >
        <div className="zent-tabs-tab-inner">
          {children}
          {this.renderDelOperater()}
        </div>
      </div>
    );
  }
}

export default NormalTab;
