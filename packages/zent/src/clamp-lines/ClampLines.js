import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pop from 'pop';
import cx from 'classnames';
import debounce from 'lodash/debounce';
import identity from 'lodash/identity';
import WindowResizeHandler from '../utils/component/WindowResizeHandler';

class ClampLines extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    lines: PropTypes.number,
    delay: PropTypes.number,
    ellipsis: PropTypes.string,
    showPop: PropTypes.bool,
    popWidth: PropTypes.number,
    trigger: PropTypes.oneOf(['click', 'hover', 'focus']),
    renderPop: PropTypes.func,
    resizable: PropTypes.bool,
    extra: PropTypes.element,
    className: PropTypes.string,
    prefix: PropTypes.string,
  };

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

  componentDidMount() {
    const { text } = this.props;
    if (text && !this.ssr) {
      this.lineHeight = this.element.clientHeight + 1;
      this.clampLines();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.original !== nextProps.text) {
      this.setState(
        {
          original: nextProps.text,
          noClamp: false,
        },
        () => {
          if (nextProps.text) {
            this.clampLines();
          }
        }
      );
    }
  }

  handleResize = debounce(() => {
    this.setState({ noClamp: false });
    this.clampLines();
  }, this.props.delay);

  clampLines() {
    const original = this.state.original;
    let maxHeight = this.lineHeight * this.props.lines + 1;
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
