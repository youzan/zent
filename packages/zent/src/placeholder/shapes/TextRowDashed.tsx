import { PureComponent } from 'react';
import cx from 'classnames';
import sample from '../../utils/sample';
import { DEFAULT_SEGMENTS } from './consts';

export interface IPlaceholderTextRowDashedProps {
  className?: string;
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
  };

  constructor(props) {
    super(props);

    this.state = {
      segments: sample(DEFAULT_SEGMENTS),
    };
  }

  render() {
    const { className, lineSpacing, animate, segments, style } = this.props;
    const defaultStyles = {
      marginTop: lineSpacing,
    };
    const classes = cx('zent-placeholder-text-row-dashed', className);
    const segmengtClasses = cx('zent-placeholder-shape', {
      'zent-placeholder-shape--animate': animate,
    });
    const rawSegments = Array.isArray(segments)
      ? segments
      : this.state.segments;

    return (
      <div className={classes} style={{ ...defaultStyles, ...style }}>
        {rawSegments.map((seg, i) => (
          <div
            key={i}
            className="zent-placeholder-text-row-dashed-segment"
            style={{ width: `${seg}%`, paddingLeft: i === 0 ? 0 : '0.3em' }}
          >
            <div className={segmengtClasses} />
          </div>
        ))}
      </div>
    );
  }
}
