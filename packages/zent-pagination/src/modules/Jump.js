import React from 'react';

const Jump = React.createClass({

  getInitialState() {
    return {
      pageLabel: this.props.content.trim()
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      pageLabel: nextProps.content.trim()
    });
  },

  onKeyUp(e) {
    if (e.key !== 'Enter') return;
    let value = e.target.value.trim();
    let pattern = /^\d+$/g;

    if (pattern.test(value)) {
      if (value <= 0) {
        value = 0;
      }

      if (value > this.props.total) {
        value = this.props.total;
      }

      this.props.onChange(parseInt(value, 10));
    }
  },

  onChange(e) {
    this.setState({
      pageLabel: e.target.value.trim()
    });
  },

  render() {
    return (
      <li className="pager pager--jump">
        <input className="pager__input" value={this.state.pageLabel} onKeyUp={this.onKeyUp} onChange={this.onChange} />

        <span className="pager__suffix">/共{this.props.total}页</span>

      </li>
    );
  }
});

export default Jump;
