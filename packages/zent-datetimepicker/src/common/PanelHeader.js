import React, { Component, PropTypes } from 'react';
import Icon from 'zent-icon';

export default class PanelHeader extends Component {
  static PropTypes = {
    prev: PropTypes.func,
    next: PropTypes.func,
    showPrev: PropTypes.bool,
    showNext: PropTypes.bool,
    title: PropTypes.string,
    onClickTitle: PropTypes.func
  }

  static defaultProps = {
    showPrev: true,
    showNext: true
  }

  render() {
    const { prev, next, showPrev, showNext, title, onClickTitle } = this.props;

    return (
      <div className="panel__header">
        {showPrev ? <span className="link--prev" onClick={prev}>
          <Icon type="right" />
        </span> : null}
        <span className="panel__title" onClick={onClickTitle}>{title}</span>
        {showNext ? <span className="link--next" onClick={next}>
          <Icon type="right" />
        </span> : null}
      </div>
    );
  }
}
