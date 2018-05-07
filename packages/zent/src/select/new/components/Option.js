import * as React from 'react';
import noop from 'lodash/noop';

class Option extends React.Component {
  static defaultProps = {
    disabled: false,
    active: false,
    selected: false,
  };

  optionClickHandler = ev => {
    this.props.onClick(ev);
  };

  render() {
    const {
      _cn: cn,
      text,
      disabled,
      active,
      selected,
      onMouseEnter,
    } = this.props;

    return (
      <li role="option" style={{ userSelect: 'none' }} unselectable="on">
        <span
          className={cn('option', { selected, disabled, active })}
          onClick={this.optionClickHandler}
          onMouseEnter={disabled ? noop : onMouseEnter}
        >
          {text}
        </span>
      </li>
    );
  }
}

export default Option;
