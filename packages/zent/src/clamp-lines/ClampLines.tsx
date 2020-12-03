import { Component, createRef } from 'react';
import cx from 'classnames';
import identity from '../utils/identity';
import Pop from '../pop';
import { WindowResizeHandler } from '../utils/component/WindowResizeHandler';
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

  // Here we are using function ref because we need to be notified whenever ref changes
  element: HTMLDivElement | null = null;

  innerElement = createRef<HTMLSpanElement>();
  lineHeight = 0;
  maxHeight = 0;
  resizeObserver: ResizeObserver | null = null;
  containerWidth = NaN;

  constructor(props: IClampLinesProps) {
    super(props);

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
    const { original } = this.state;

    if (!this.lineHeight && this.element) {
      this.lineHeight = getLineHeight(this.element);
    }

    if (prevProps.text !== original) {
      this.clampLines();
    }
  }

  componentDidMount() {
    if (this.element) {
      this.lineHeight = getLineHeight(this.element);
      this.clampLines();
    }
  }

  componentWillUnmount() {
    const observer = this.getResizeObserver();
    if (observer) {
      observer.disconnect();
    }
  }

  handleWindowResize = () => {
    this.setState({ noClamp: false }, this.clampLines);
  };

  handleContainerResize: ResizeObserverCallback = entries => {
    const { contentBoxSize, contentRect } = entries[0];

    let width = NaN;
    if (contentBoxSize) {
      // FIXME: ONLY works with horizontal writing mode
      width = contentBoxSize[0].inlineSize;
    } else {
      width = contentRect.width;
    }

    // Compare with previous value to see if width actually changed
    if (!Number.isNaN(this.containerWidth) && width !== this.containerWidth) {
      this.setState({ noClamp: false }, this.clampLines);
    }
    this.containerWidth = width;
  };

  onContainerRefChange = (node: HTMLDivElement | null) => {
    this.element = node;

    this.observe(node);
  };

  onNoClampContainerRefChange = (node: HTMLDivElement | null) => {
    this.observe(node);
  };

  getResizeObserver() {
    // Do nothing if `ResizeObserver` is not available
    if (!this.resizeObserver && window.ResizeObserver) {
      this.resizeObserver = new window.ResizeObserver(
        this.handleContainerResize
      );
    }

    return this.resizeObserver;
  }

  observe(node: Element) {
    const observer = this.getResizeObserver();
    if (!observer || !this.props.resizable) {
      return;
    }

    // Reset container width whenever it changes
    this.containerWidth = NaN;
    observer.disconnect();
    if (node) {
      observer.observe(node);
    }
  }

  clampLines() {
    if (!this.innerElement.current || !this.element) {
      return;
    }

    const { original } = this.state;

    // Convert to char array, it's using `String.prototype[@@iterator]()` internally
    // Its length is not necessarily equal to `original.length` because of unicode surrogate pairs
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/@@iterator
    const chars = Array.from(original);
    // Don't compare to n*lineHeight, n-line element height is not necessarily equal to n*lineHeight
    const maxHeight = this.lineHeight * (this.props.lines + 1);
    let start = 0;
    let middle = 0;
    let end = chars.length;

    this.maxHeight = maxHeight;

    this.setState({ text: '' });

    // binary search to find suitable text size
    while (start <= end) {
      middle = Math.floor((start + end) / 2);
      this.innerElement.current.textContent =
        slice(chars, 0, middle) + this.getEllipsis();
      if (middle === chars.length) {
        this.setState({
          text: original,
          noClamp: true,
        });
        return;
      }

      if (this.element.clientHeight < maxHeight) {
        start = middle + 1;
      } else {
        end = middle - 1;
      }
    }

    this.innerElement.current.textContent =
      slice(chars, 0, middle - 1) + this.getEllipsis();
    this.setState({
      text: slice(chars, 0, middle - 1) + this.getEllipsis(),
    });
  }

  getEllipsis() {
    return !this.state.noClamp ? this.props.ellipsis : '';
  }

  renderResizable() {
    // Only listen to window resize event if ResizeObserver is not available
    if (this.props.resizable && !window.ResizeObserver) {
      return <WindowResizeHandler onResize={this.handleWindowResize} />;
    }
    return null;
  }

  renderClampedText() {
    const { className } = this.props;
    const classString = cx('zent-clamp-lines', className);
    return (
      <div
        className={classString}
        style={{
          maxHeight: this.maxHeight,
          overflowY: 'hidden',
          wordBreak: 'normal',
          overflowWrap: 'anywhere',
        }}
      >
        <div ref={this.onContainerRefChange}>
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
        <div
          ref={this.onNoClampContainerRefChange}
          className={className}
          style={{ wordBreak: 'normal', overflowWrap: 'anywhere' }}
        >
          {text}
          {this.renderResizable()}
        </div>
      );
    }

    if (showPop) {
      return (
        <Pop
          trigger={trigger}
          content={
            <div
              style={{
                maxWidth: popWidth,
                wordBreak: 'normal',
                overflowWrap: 'anywhere',
              }}
            >
              {renderPop(text)}
            </div>
          }
        >
          {this.renderClampedText()}
        </Pop>
      );
    }

    return this.renderClampedText();
  }
}

function slice(chars: string[], start: number, end: number): string {
  return chars.slice(start, end).join('');
}

export default ClampLines;
