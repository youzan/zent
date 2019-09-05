import * as React from 'react';
import { Component, createRef } from 'react';
import reactCSS from '../helpers/reactcss';

export default class EditableInput extends Component<any, any> {
  inputRef = createRef<HTMLInputElement>();

  constructor(props) {
    super(props);

    this.state = {
      value: String(props.value).toUpperCase(),
      blurValue: String(props.value).toUpperCase(),
    };
  }

  componentDidUpdate(prevProps) {
    const input = this.inputRef.current;
    const val = this.props.value;

    if (prevProps.value !== val && val !== this.state.value) {
      if (input === document.activeElement) {
        this.setState({ blurValue: String(val).toUpperCase() });
      } else {
        this.setState({ value: String(val).toUpperCase() });
      }
    }
  }

  componentWillUnmount() {
    this.unbindEventListeners();
  }

  handleBlur = e => {
    const { blurValue } = this.state;

    if (blurValue) {
      this.setState({ value: blurValue, blurValue: null });
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
    const val = Number(e.target.value);

    if (isNaN(val)) {
      return;
    }

    const amount = this.props.arrowOffset || 1;
    const { key } = e;

    if (key === 'ArrowUp') {
      if (this.props.label !== null) {
        this.props.onChange({ [this.props.label]: val + amount }, e);
      } else {
        this.props.onChange(val + amount, e);
      }

      this.setState({ value: val + amount });
    }

    if (key === 'ArrowDown') {
      if (this.props.label !== null) {
        this.props.onChange({ [this.props.label]: val - amount }, e);
      } else {
        this.props.onChange(val - amount, e);
      }

      this.setState({ value: val - amount });
    }

    if (key === 'Enter') {
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
    const styles: any = reactCSS(
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
          ref={this.inputRef}
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
