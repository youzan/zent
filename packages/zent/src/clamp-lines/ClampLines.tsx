import { Component, createRef } from 'react';
import cx from 'classnames';
import identity from '../utils/identity';
import Pop from '../pop';
import { WindowResizeHandler } from '../utils/component/WindowResizeHandler';
import { getLineHeight } from '../utils/dom/getLineHeight';
import { containsEmoji } from '../utils/unicode/isEmoji';
import { containsCJK } from '../utils/unicode/isCJK';

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
  mode: 'performance' | 'correctness';
  className?: string;
}

export interface IClampLinesState {
  holdsFullText: boolean;
  textSuited: string;
}

const WORDBREAK_STYLES: React.CSSProperties = {
  wordBreak: 'break-all',
  overflowWrap: 'break-word',
};

export class ClampLines extends Component<IClampLinesProps, IClampLinesState> {
  static defaultProps: Partial<IClampLinesProps> = {
    className: '',
    lines: 2,
    ellipsis: '...',
    showPop: true,
    popWidth: 250,
    trigger: 'hover',
    renderPop: identity,
    resizable: false,
    mode: 'performance',
    extra: null,
  };

  // Here we are using function ref because we need to be notified whenever ref changes
  element: HTMLDivElement | null = null;

  innerElement = createRef<HTMLSpanElement>();
  resizeObserver: ResizeObserver | null = null;
  containerWidth = NaN;

  constructor(props: IClampLinesProps) {
    super(props);

    this.state = {
      holdsFullText: false,
      textSuited: '',
    };
  }

  componentDidUpdate(prevProps: IClampLinesProps) {
    if (
      prevProps.text !== this.props.text ||
      prevProps.mode !== this.props.mode ||
      prevProps.lines !== this.props.lines
    ) {
      // Make sure DOM node refs exists
      this.setState({ holdsFullText: false }, () => {
        this.clampLines();
      });
    }
  }

  componentDidMount() {
    this.clampLines();
  }

  componentWillUnmount() {
    const observer = this.getResizeObserver();
    if (observer) {
      observer.disconnect();
    }
  }

  handleWindowResize = () => {
    this.setState({ holdsFullText: false }, this.clampLines);
  };

  handleContainerResize: ResizeObserverCallback = entries => {
    const { contentBoxSize, contentRect } = entries[0];

    let width = NaN;
    if (contentBoxSize) {
      // FIXME: ONLY works with horizontal writing mode
      // Note: Firefox(81 and 83 tested) incorrectly returns contentBoxSize as an ResizeObserverSize,
      // but it should be ResizeObserverSize[]
      width = Array.isArray(contentBoxSize)
        ? contentBoxSize[0].inlineSize
        : (contentBoxSize as ResizeObserverSize).inlineSize;
    } else {
      width = contentRect.width;
    }

    // Compare with previous value to see if width actually changed
    if (!Number.isNaN(this.containerWidth) && width !== this.containerWidth) {
      this.setState({ holdsFullText: false }, this.clampLines);
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

    this.props.mode === 'performance'
      ? this._clampLinesFast()
      : this._clampLinesAccurate();
  }

  /**
   * This algorithm relies on the assumption that each line has exactly the same height.
   * The assumption does not always hold, especially when you mix different languages(e.g. CJK, emoji).
   *
   * It's fast because it uses binary search to find the overflow position.
   *
   * It should work well for small `lines` even if you have mixed languages in most cases.
   *
   * Note:
   *
   * Maually setting result string to DOM before return is required, because sometimes
   * the `setState` just before return won't actually cause a re-render since
   * there will cases when `props.text` changed but `state.text` remains the same as previous render.
   */
  private _clampLinesFast() {
    const { text } = this.props;
    const lineHeight = inferContentLineHeight(this.element, text);
    // TLDR; n-line element height is not necessarily equal to n*lineHeight
    // So this is an approximation
    //
    // The reason is different characters have different heights.
    // For example, a line contains emoji character usually has a larger line-height than
    // a line with only ASCII characters, so are CJK characters.
    const maxHeight = lineHeight * this.props.lines;

    // try to fit all
    this.innerElement.current.textContent = text;
    if (this.element.clientHeight <= maxHeight) {
      this.setState({
        textSuited: text,
        holdsFullText: true,
      });
      return;
    }

    // Convert to char array, it's using `String.prototype[@@iterator]()` internally
    // Its length is not necessarily equal to `text.length` because of unicode surrogate pairs
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/@@iterator
    const chars = Array.from(text);

    // binary search to find suitable text size
    // this is a variant to find the `rightmost` index satisfing the condition
    let start = 0;
    let middle = 0;
    let end = chars.length;
    while (start < end) {
      middle = Math.floor((start + end) / 2);
      this.innerElement.current.textContent =
        slice(chars, 0, middle) + this.getEllipsis();
      const height = this.element.clientHeight;
      if (height > maxHeight) {
        end = middle;
      } else {
        start = middle + 1;
      }
    }

    // The rightmost character satisfing height <= maxHeight is at `end - 1`
    const overflowIndex = end - 1;
    const textSuited = slice(chars, 0, overflowIndex) + this.getEllipsis();
    this.innerElement.current.textContent = textSuited;
    this.setState({
      textSuited,
      holdsFullText: false,
    });
  }

  /**
   * This algorithm does not rely on the assumption that each line has same height.
   * But it might be slow because its time complexity is proportional to text length and lines.
   *
   * It works by finding wrapping point(the postion where a line wrap happens) one by one.
   *
   * Note:
   *
   * Maually setting result string to DOM before return is required, because sometimes
   * the `setState` just before return won't actually cause a re-render since
   * there will cases when `props.text` changed but `state.text` remains the same as previous render.
   */
  private _clampLinesAccurate() {
    // This is the line height of a `space`, we assume every line height is larger than or equal to it.
    const miniLineHeight = getLineHeight(this.element);
    const { text } = this.props;
    const chars = Array.from(text); // explode to characters
    let { lines } = this.props;
    let prevIndex = 0;
    let prevStr = chars[prevIndex];
    let textSuited = '';

    this.innerElement.current.textContent = prevStr;
    let prevHeight = this.element.clientHeight;

    let i = 1;
    for (; i < chars.length && lines > 0; i++) {
      const str = prevStr + chars[i];
      this.innerElement.current.textContent = str;
      const height = this.element.clientHeight;
      if (height - prevHeight >= miniLineHeight) {
        lines--;
      }

      if (lines > 0) {
        prevHeight = height;
        prevIndex = i;
        prevStr = str;
      } else {
        // Find room for ellipsis
        while (prevIndex) {
          prevStr = slice(chars, 0, prevIndex--);
          const str = prevStr + this.getEllipsis();
          this.innerElement.current.textContent = str;
          if (prevHeight === this.element.clientHeight) {
            textSuited = str;
            break;
          }
        }
      }
    }

    if (lines > 0) {
      // All content can fit
      this.setState({
        textSuited: text,
        holdsFullText: true,
      });
    } else {
      this.setState({
        textSuited,
        holdsFullText: false,
      });
    }
  }

  getEllipsis() {
    return !this.state.holdsFullText ? this.props.ellipsis : '';
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
      <div className={classString} style={WORDBREAK_STYLES}>
        <div ref={this.onContainerRefChange}>
          <span ref={this.innerElement}>{this.state.textSuited}</span>
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

    if (this.state.holdsFullText) {
      return (
        <div
          ref={this.onNoClampContainerRefChange}
          className={className}
          style={WORDBREAK_STYLES}
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
                ...WORDBREAK_STYLES,
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

function inferContentLineHeight(node: HTMLElement, str: string): number {
  const emojiHeight = containsEmoji(str)
    ? getLineHeight(node, '🇨🇳')
    : -Infinity;
  const cjkHeight = containsCJK(str) ? getLineHeight(node, '世界') : -Infinity;
  const asciiHeight = getLineHeight(node);
  return Math.max(emojiHeight, cjkHeight, asciiHeight);
}

export default ClampLines;
