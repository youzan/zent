import React from 'react';
import Icon from 'zent-icon';

const PanelHeader = (props) => {
  const { prev, next, showPrev, showNext, title, onClickTitle } = props;

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
};

PanelHeader.defaultProps = {
  showPrev: true,
  showNext: true
};

export default PanelHeader;
