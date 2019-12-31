import * as React from 'react';
import { Component } from 'react';
import cx from 'classnames';
import identity from '../utils/identity';
import Pop from '../pop';
import { WindowResizeHandler } from '../utils/component/WindowResizeHandler';
import isBrowser from '../utils/isBrowser';
import { getLineHeight } from '../utils/dom/getLineHeight';

export interface IClampLinesProps {
  text: string;
  lines?: number;
  ellipsis?: string;
  showPop?: boolean;
  popWidth?: number;
  trigger?: 'click' | 'hover' | 'focus';
  renderPop?: (text: string) => React.ReactNode;
  resizable?: boolean;
  extra?: React.ReactNode;
  className?: string;
}

export interface IClampLinesState {
  noClamp: boolean;
  text: string;
  original: string;
}

export class ClampLines extends Component<IClampLinesProps, IClampLinesState> {
  static defaultProps = {
    className: '',
    lines: 2,
    ellipsis: '...',
    showPop: true,
    popWidth: 250,
    trigger: 'hover',
    renderPop: identity,
    resizable: false,
    extra: null,
  };

  element = React.createRef<HTMLDivElement>();
  innerElement = React.createRef<HTMLSpanElement>();
  lineHeight = 0;
  maxHeight = 0;

  original: string;

  constructor(props: IClampLinesProps) {
    super(props);

    this.original = props.text;

    this.state = {
      noClamp: false,
      text: '',
      original: props.text,
    };
  }

  static getDerivedStateFromProps(
    props: IClampLinesProps,
    state: IClampLinesState
  ) {
    const { text } = props;
    if (state.original !== text) {
      return {
        original: text,
        noClamp: false,
      };
    }

    return null;
  }

  componentDidUpdate(prevProps: IClampLinesProps) {
    const { text } = prevProps;
    if (text && text !== this.state.original) {
      this.clampLines();
    }
  }

  componentDidMount() {
    const { text } = this.props;
    if (text && isBrowser) {
      this.lineHeight = getLineHeight(this.element.current);
      this.clampLines();
    }
  }

  handleResize = () => {
    this.setState({ noClamp: false }, this.clampLines);
  };

  clampLines() {
    if (!this.innerElement.current || !this.element.current) {
      return;
    }

    const original = this.state.original;
    // Don't compare to n*lineHeight, n-line element height is not necessarily equal to n*lineHeight
    const maxHeight = this.lineHeight * (this.props.lines + 1);
    let start = 0;
    let middle = 0;
    let end = original.length;

    this.maxHeight = maxHeight;

    this.setState({ text: '' });

    // binary search to find suitable text size
    while (start <= end) {
      middle = Math.floor((start + end) / 2);
      this.innerElement.current.textContent =
        original.slice(0, middle) + this.getEllipsis();
      if (middle === original.length) {
        this.setState({
          text: original,
          noClamp: true,
        });
        return;
      }

      if (this.element.current.clientHeight < maxHeight) {
        start = middle + 1;
      } else {
        end = middle - 1;
      }
    }

    this.innerElement.current.textContent =
      original.slice(0, middle - 1) + this.getEllipsis();
    this.setState({
      text: original.slice(0, middle - 1) + this.getEllipsis(),
    });
  }

  getEllipsis() {
    return !this.state.noClamp ? this.props.ellipsis : '';
  }

  renderResizable() {
    if (this.props.resizable) {
      return <WindowResizeHandler onResize={this.handleResize} />;
    }
    return null;
  }

  renderClampedText() {
    const { className } = this.props;
    const classString = cx('zent-clamp-lines', {
      [className]: className,
    });
    return (
      <div
        className={classString}
        style={{ maxHeight: this.maxHeight, overflowY: 'hidden' }}
      >
        <div ref={this.element}>
          <span ref={this.innerElement}>{this.state.text}</span>
          {this.props.extra}
        </div>
        {this.renderResizable()}
      </div>
    );
  }

  render() {
    const {
      text,
      className,
      showPop,
      popWidth,
      trigger,
      renderPop,
    } = this.props;

    if (!text) {
      return null;
    }

    if (this.state.noClamp) {
      return (
        <div className={className}>
          {text}
          {this.renderResizable()}
        </div>
      );
    }

    if (showPop) {
      return (
        <Pop
          trigger={trigger}
          content={<div style={{ maxWidth: popWidth }}>{renderPop(text)}</div>}
        >
          {this.renderClampedText()}
        </Pop>
      );
    }

    return this.renderClampedText();
  }
}

export default ClampLines;
