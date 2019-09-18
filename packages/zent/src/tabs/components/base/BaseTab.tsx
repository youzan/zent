import * as React from 'react';
import { Component } from 'react';
import cn from 'classnames';
import { ITabProps } from '../../types';

abstract class BaseTab<Id> extends Component<ITabProps<Id>> {
  protected abstract typeName: string;

  get tabsCls() {
    const { actived, disabled } = this.props;
    return cn('zent-tabs-tab', `zent-tabs-tab-type__${this.typeName}`, {
      ['zent-tabs-tab__actived']: actived,
      ['zent-tabs-tab__disabled']: disabled,
    });
  }

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
      <span className="zent-tabs-tab-delete" onClick={this.onDel}>
        ✕
      </span>
    ) : null;
  }
}

export default BaseTab;
