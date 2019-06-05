import * as React from 'react';
import { Component } from 'react';
import cx from 'classnames';
import debounce from 'lodash-es/debounce';
import identity from 'lodash-es/identity';
import Pop from '../pop';
import WindowResizeHandler from '../utils/component/WindowResizeHandler';

export interface IClampLinesProps {
  text: string;
  lines?: number;
  delay?: number;
  ellipsis?: string;
  showPop?: boolean;
  popWidth?: number;
  trigger?: 'click' | 'hover' | 'focus';
  renderPop?: (text: string) => React.ReactNode;
  resizable?: boolean;
  extra?: React.ReactNode;
  className?: string;
  prefix?: string;
}

export interface IClampLinesState {
  noClamp: boolean;
  text: string;
  original: string;
}

export class ClampLines extends Component<IClampLinesProps, IClampLinesState> {
  static defaultProps = {
    className: '',
    prefix: 'zent',
    lines: 2,
    delay: 300,
    ellipsis: '...',
    showPop: true,
    popWidth: 250,
    trigger: 'hover',
    renderPop: identity,
    resizable: false,
    extra: null,
  };

  element: HTMLDivElement;
  innerElement: HTMLSpanElement;
  original: string;
  lineHeight: number;
  maxHeight: number;
  ssr: boolean;

  constructor(props) {
    super(props);

    this.element = null;
    this.innerElement = null;
    this.original = props.text;
    this.lineHeight = 0;

    this.state = {
      noClamp: false,
      text: '.',
      original: props.text,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { text } = props;
    if (state.original !== text) {
      return {
        original: text,
        noClamp: false,
      };
    }

    return null;
  }

  componentDidUpdate(prevProps) {
    const { text } = prevProps;
    if (text && text !== this.state.original) {
      this.clampLines();
    }
  }

  componentDidMount() {
    const { text } = this.props;
    if (text && !this.ssr) {
      this.lineHeight = this.element.clientHeight + 1;
      this.clampLines();
    }
  }

  handleResize = debounce(() => {
    this.setState({ noClamp: false });
    this.clampLines();
  }, this.props.delay);

  clampLines() {
    const original = this.state.original;
    const maxHeight = this.lineHeight * this.props.lines + 1;
    let start = 0;
    let middle = 0;
    let end = original.length;

    this.maxHeight = maxHeight;

    // WindowResizeHandler will exec a later call on unmounted element
    if (!this.innerElement) {
      return;
    }

    this.setState({ text: '' });

    // binary search to find suitable text size
    while (start <= end) {
      middle = Math.floor((start + end) / 2);
      this.innerElement.textContent =
        original.slice(0, middle) + this.getEllipsis();
      if (middle === original.length) {
        this.setState({
          text: original,
          noClamp: true,
        });
        return;
      }

      if (this.element.clientHeight <= maxHeight) {
        start = middle + 1;
      } else {
        end = middle - 1;
      }
    }

    this.innerElement.textContent =
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
      return <WindowResizeHandler onResize={() => this.handleResize()} />;
    }
    return null;
  }

  renderClampedText() {
    const { className, prefix } = this.props;
    const classString = cx({
      [className]: className,
      [`${prefix}-clamp-lines`]: true,
    });
    return (
      <div
        className={classString}
        style={{ maxHeight: this.maxHeight, overflowY: 'hidden' }}
      >
        <div ref={e => (this.element = e)}>
          <span ref={e => (this.innerElement = e)}>{this.state.text}</span>
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
