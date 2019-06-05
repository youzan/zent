import * as React from 'react';
import { PureComponent } from 'react';
import cx from 'classnames';

import TextRow, { IPlaceholderTextRowProps } from '../shapes/TextRow';
import TextRowDashed, {
  IPlaceholderTextRowDashedProps,
} from '../shapes/TextRowDashed';
import { DEFAULT_SEGMENTS } from '../shapes/consts';

export interface IPlaceholderTextBlockProps {
  rows: number;
  lineSpacing?: string | number;
  widths?: number[];
  dashSegments?: Array<Array<string | number>>;
  animate?: boolean;
  dashed?: boolean;
  style?: React.CSSProperties;
  className?: string;
  prefix?: string;
}

export default class TextBlock extends PureComponent<
  IPlaceholderTextBlockProps
> {
  static defaultProps = {
    widths: [97, 99, 94, 92, 96, 95, 98, 60],
    dashSegments: DEFAULT_SEGMENTS,
    animate: true,
    dashed: true,
    lineSpacing: '0.7em',
    prefix: 'zent',
  };

  getRowStyle = i => {
    const { widths } = this.props;

    return {
      width: `${widths[i % widths.length]}%`,
    };
  };

  getRows = () => {
    const {
      rows,
      lineSpacing,
      prefix,
      animate,
      dashed,
      dashSegments,
    } = this.props;
    const textRows = [];

    for (let i = 0; i < rows; i++) {
      const Comp = dashed ? TextRowDashed : TextRow;
      const props: IPlaceholderTextRowDashedProps & IPlaceholderTextRowProps = {
        style: this.getRowStyle(i),
        lineSpacing: i ? lineSpacing : 0,
        prefix,
        animate,
      };
      if (dashed) {
        props.segments = dashSegments[i % dashSegments.length];
      }

      textRows.push(<Comp key={i} {...props} />);
    }

    return textRows;
  };

  render() {
    const { style, className, prefix } = this.props;
    const classes = cx(`${prefix}-placeholder-text-block`, className);

    return (
      <div className={classes} style={{ ...style, width: '100%' }}>
        {this.getRows()}
      </div>
    );
  }
}
