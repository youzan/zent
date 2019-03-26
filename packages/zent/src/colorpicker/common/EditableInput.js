import React, { Component } from 'react';
import reactCSS from '../helpers/reactcss';

export default class EditableInput extends Component {
  constructor(props) {
    super();

    this.state = {
      value: String(props.value).toUpperCase(),
      blurValue: String(props.value).toUpperCase(),
    };
  }

  componentWillReceiveProps(nextProps) {
    const InputRefs = this.refs;
    if (nextProps.value !== this.state.value) {
      if (InputRefs.input === document.activeElement) {
        this.setState({ blurValue: String(nextProps.value).toUpperCase() });
      } else {
        this.setState({ value: String(nextProps.value).toUpperCase() });
      }
    }
  }

  componentWillUnmount() {
    this.unbindEventListeners();
  }

  handleBlur = e => {
    if (this.state.blurValue) {
      this.setState({ value: this.state.blurValue, blurValue: null });
    }
    this.props.onBlur && this.props.onBlur(e);
  };

  handleChange = e => {
    const label = !!this.props.label;
    if (label) {
      this.props.onChange({ [this.props.label]: e.target.value }, e);
    } else {
      this.props.onChange(e.target.value, e);
    }

    this.setState({ value: e.target.value });
  };

  handleKeyDown = e => {
    const number = Number(e.target.value);

    if (isNaN(number)) {
      return;
    }

    const amount = this.props.arrowOffset || 1;

    // Up
    if (e.keyCode === 38) {
      if (this.props.label !== null) {
        this.props.onChange({ [this.props.label]: number + amount }, e);
      } else {
        this.props.onChange(number + amount, e);
      }

      this.setState({ value: number + amount });
    }

    // Down
    if (e.keyCode === 40) {
      if (this.props.label !== null) {
        this.props.onChange({ [this.props.label]: number - amount }, e);
      } else {
        this.props.onChange(number - amount, e);
      }

      this.setState({ value: number - amount });
    }

    // Enter
    if (e.keyCode === 13) {
      this.props.onPressEnter && this.props.onPressEnter(e);
    }
  };

  handleDrag = e => {
    if (this.props.dragLabel) {
      const newValue = Math.round(this.props.value + e.movementX);
      if (newValue >= 0 && newValue <= this.props.dragMax) {
        this.props.onChange({ [this.props.label]: newValue }, e);
      }
    }
  };

  handleMouseDown = e => {
    if (this.props.dragLabel) {
      e.preventDefault();
      this.handleDrag(e);
      window.addEventListener('mousemove', this.handleDrag);
      window.addEventListener('mouseup', this.handleMouseUp);
    }
  };

  handleMouseUp = () => {
    this.unbindEventListeners();
  };

  unbindEventListeners = () => {
    window.removeEventListener('mousemove', this.handleDrag);
    window.removeEventListener('mouseup', this.handleMouseUp);
  };

  render() {
    const styles = reactCSS(
      {
        default: {
          wrap: {
            position: 'relative',
          },
        },
        'user-override': {
          wrap:
            this.props.style && this.props.style.wrap
              ? this.props.style.wrap
              : {},
          input:
            this.props.style && this.props.style.input
              ? this.props.style.input
              : {},
          label:
            this.props.style && this.props.style.label
              ? this.props.style.label
              : {},
        },
        'dragLabel-true': {
          label: {
            cursor: 'ew-resize',
          },
        },
      },
      {
        'user-override': true,
      },
      this.props
    );

    return (
      <div style={styles.wrap}>
        <input
          prefix="colorpicker-rgb"
          style={styles.input}
          ref={ref => (this.refs = ref)}
          value={this.state.value}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          placeholder={this.props.placeholder}
        />
        {this.props.label ? (
          <span style={styles.label} onMouseDown={this.handleMouseDown}>
            {this.props.label}
          </span>
        ) : null}
      </div>
    );
  }
}
