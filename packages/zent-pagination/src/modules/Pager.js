import React from 'react';

const { string, number, func, bool } = React.PropTypes;

const Pager = React.createClass({
  propTypes: {
    content: string,
    current: bool,
    onClick: func,
    target: number
  },

  getInitialState() {
    return {
      pageLabel: this.props.content
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      pageLabel: nextProps.content
    });
  },

  onClick() {
    // 有目标，且不是当前页的时候
    if (this.props.target && !this.props.current) {
      this.props.onChange(this.props.target);
    }
  },

  render() {
    let className = 'pager';

    if (this.props.current) {
      className += ' pager--current';
    }

    if (this.props.type === 'omni') {
      className += ' pager--omni';
    } else {
      if (!this.props.target) {
        className += ' pager--disabled';
      }
    }

    return (
      <li
        className={className}
        onClick={this.onClick}>
        {this.props.content}
      </li>
    );
  }
});

export default Pager;
