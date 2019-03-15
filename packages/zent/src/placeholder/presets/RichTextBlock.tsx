import * as React from 'react';
import { PureComponent } from 'react';
import cx from 'classnames';

import Circle from '../shapes/Circle';
import Rectangle from '../shapes/Rectangle';
import TextBlock from './TextBlock';

export interface IPlaceholderRichTextBlock {
  className?: string;
  style?: React.CSSProperties;
  rows?: number;
  shape?: string;
  prefix?: string;
  size?: number;
  animate?: boolean;
  dashed?: boolean;
  widths;
  dashSegments;
  lineSpacing;
}

export default class RichTextBlock extends PureComponent<
  IPlaceholderRichTextBlock
> {
  static defaultProps = {
    style: {},
    className: '',
    prefix: 'zent',
    shape: 'circle',
    animate: true,
    dashed: true,
    size: 80,
  };

  render() {
    const {
      className,
      style,
      rows,
      shape,
      prefix,
      size,
      animate,
      dashed,
      widths,
      dashSegments,
      lineSpacing,
    } = this.props;
    const classes = cx(`${prefix}-placeholder-richtext-block`, className);
    const shapeStyle = { marginRight: 10 };

    return (
      <div className={classes} style={{ ...style, display: 'flex' }}>
        {shape === 'circle' ? (
          <Circle style={shapeStyle} diameter={size} animate={animate} />
        ) : (
          <Rectangle
            style={shapeStyle}
            width={size}
            height={size}
            animate={animate}
          />
        )}
        <TextBlock
          rows={rows}
          animate={animate}
          dashed={dashed}
          widths={widths}
          dashSegments={dashSegments}
          lineSpacing={lineSpacing}
        />
      </div>
    );
  }
}
