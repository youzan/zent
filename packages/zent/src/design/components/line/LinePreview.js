import React, { PureComponent } from 'react';

export default class LinePreview extends PureComponent {
  render() {
    const { value, prefix } = this.props;

    return (
      <div className={`${prefix}-design-component-line-preview`}>
        <div style={createStyle(value)} />
      </div>
    );
  }
}

function createStyle(value) {
  const { color, hasPadding, lineType } = value;

  return {
    height: 0,
    borderTopWidth: '1px',
    margin: hasPadding ? '0 10px' : 0,
    borderColor: color,
    borderStyle: lineType,
  };
}
