import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PureComponent } from 'react';

class Option extends PureComponent<any, any> {
  static propTypes = {
    prefixCls: PropTypes.string,
    cid: PropTypes.string,
    value: PropTypes.any,
    text: PropTypes.any,
    placeholder: PropTypes.string,
    onMouseEnter: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.optionClickHandler = this.optionClickHandler.bind(this);
  }

  optionClickHandler(ev) {
    this.props.onClick(ev, this.props.cid);
  }

  render() {
    const { className, text } = this.props;
    return (
      <span
        className={className}
        onClick={this.optionClickHandler}
        onMouseEnter={this.props.onMouseEnter}
      >
        {text}
      </span>
    );
  }
}

export default Option;
