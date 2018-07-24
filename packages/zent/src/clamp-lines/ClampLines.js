import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pop from 'pop';
import cx from 'classnames';
import isSsr from 'zan-utils/browser/isSsr';
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
    this.start = 0;
    this.middle = 0;
    this.end = 0;
    this.state = {
      noClamp: false,
      text: '.',
    };

    // check if in nodejs env or not
    this.ssr = isSsr();

    if (!this.ssr && props.resizable) {
      this.handleResize = debounce(() => {
        this.setState({ noClamp: false });
        this.clampLines();
      }, props.delay);
    }
  }

  componentDidMount() {
    const { text } = this.props;
    if (text && !this.ssr) {
      this.lineHeight = this.element.clientHeight + 1;
      this.clampLines();
    }
  }

  clampLines() {
    this.setState({ text: '' });

    let maxHeight = this.lineHeight * this.props.lines + 1;
    this.maxHeight = maxHeight;
    this.start = 0;
    this.middle = 0;
    this.end = this.original.length;

    while (this.start <= this.end) {
      this.middle = Math.floor((this.start + this.end) / 2);
      this.innerElement.textContent =
        this.original.slice(0, this.middle) + this.getEllipsis();
      if (this.middle === this.original.length) {
        this.setState({
          text: this.original,
          noClamp: true,
        });
        return;
      }

      this.moveMarkers(maxHeight);
    }

    this.innerElement.textContent =
      this.original.slice(0, this.middle - 1) + this.getEllipsis();
    this.setState({
      text: this.original.slice(0, this.middle - 1) + this.getEllipsis(),
    });
  }

  // binary search divider
  moveMarkers(maxHeight) {
    if (this.element.clientHeight <= maxHeight) {
      this.start = this.middle + 1;
    } else {
      this.end = this.middle - 1;
    }
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
