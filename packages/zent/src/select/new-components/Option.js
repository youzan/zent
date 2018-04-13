import * as React from 'react';

class Option extends React.Component {
  defaultProps = {
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
      <li>
        <span
          className={cn('option', { selected, disabled, active })}
          onClick={this.optionClickHandler}
          onMouseEnter={onMouseEnter}
        >
          {text}
        </span>
      </li>
    );
  }
}

export default Option;
