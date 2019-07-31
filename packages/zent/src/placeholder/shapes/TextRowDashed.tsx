import * as React from 'react';
import { PureComponent } from 'react';
import cx from 'classnames';
import sample from 'lodash-es/sample';
import { DEFAULT_SEGMENTS } from './consts';

export interface IPlaceholderTextRowDashedProps {
  className?: string;
  prefix?: string;
  style?: React.CSSProperties;
  lineSpacing?: number | string;
  animate?: boolean;
  segments?: Array<number | string>;
}

export interface IPlaceholderTextRowDashedState {
  segments: number[];
}

export default class TextRowDashed extends PureComponent<
  IPlaceholderTextRowDashedProps,
  IPlaceholderTextRowDashedState
> {
  static defaultProps = {
    lineSpacing: '0.7em',
    animate: true,
    prefix: 'zent',
  };

  constructor(props) {
    super(props);

    this.state = {
      segments: sample(DEFAULT_SEGMENTS),
    };
  }

  render() {
    const {
      className,
      lineSpacing,
      animate,
      segments,
      style,
      prefix,
    } = this.props;
    const defaultStyles = {
      marginTop: lineSpacing,
    };
    const classes = cx(`${prefix}-placeholder-text-row-dashed`, className);
    const segmengtClasses = cx(`${prefix}-placeholder-shape`, {
      [`${prefix}-placeholder-shape--animate`]: animate,
    });
    const rawSegments = Array.isArray(segments)
      ? segments
      : this.state.segments;

    return (
      <div className={classes} style={{ ...defaultStyles, ...style }}>
        {rawSegments.map((seg, i) => (
          <div
            key={i}
            className={`${prefix}-placeholder-text-row-dashed-segment`}
            style={{ width: `${seg}%`, paddingLeft: i === 0 ? 0 : '0.3em' }}
          >
            <div className={segmengtClasses} />
          </div>
        ))}
      </div>
    );
  }
}
