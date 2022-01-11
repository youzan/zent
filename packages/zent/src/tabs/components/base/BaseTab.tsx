import { Component } from 'react';
import cn from 'classnames';
import { ITabProps, ITabNavState } from '../../types';
import Icon from '../../../icon';

abstract class BaseTab<Id> extends Component<ITabProps<Id>, ITabNavState> {
  protected abstract typeName: string;

  get tabsCls() {
    const { actived, disabled } = this.props;
    return cn('zent-tabs-tab', `zent-tabs-tab-type__${this.typeName}`, {
      ['zent-tabs-tab__actived']: actived,
      ['zent-tabs-tab__disabled']: disabled,
    });
  }

  get isFixed() {
    const { id, fixedIds = [] } = this.props;
    return fixedIds.includes(id);
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

  onClickFixed = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    const { fixedIds = [], onFixedChange, id } = this.props;
    const ids = this.isFixed
      ? fixedIds.filter(key => key !== id)
      : [...fixedIds, id];
    onFixedChange?.(ids);
  };

  renderDelOperater() {
    const { candel, canFixed } = this.props;
    return candel ? (
      <div
        className={cn('zent-tabs-tab__actions', {
          'zent-tabs-tab-actions--fixed': this.isFixed,
        })}
      >
        {!this.isFixed && (
          <span className="zent-tabs-tab__actions__delete" onClick={this.onDel}>
            ✕
          </span>
        )}
        {canFixed && (
          <span
            className="zent-tabs-tab__actions__fixed"
            onClick={this.onClickFixed}
          >
            {this.isFixed ? <Icon type="pin" /> : <Icon type="pin-o" />}
          </span>
        )}
      </div>
    ) : null;
  }
}

export default BaseTab;
