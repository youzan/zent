import * as React from 'react';

class BaseTrigger extends React.Component {
  renderPlaceholder() {
    const { selected, placeholder } = this.props;
    if (selected.length) {
      return selected[0].text;
    }
    return placeholder;
  }

  onTriggerClick = () => {
    const { open, close, contentVisible, disabled } = this.props;
    if (!contentVisible && !disabled) {
      open();
    }

    if (contentVisible && !disabled) {
      close();
    }

    if (!disabled) this.ref.focus();
  };

  render() {
    const {
      _cn: cn,
      disabled,
      selected,
      contentVisible,
      allowReset,
      reset,
    } = this.props;
    return (
      <div
        tabIndex="0"
        ref={node => (this.ref = node)}
        className={cn('base-trigger', {
          disabled,
          selected: selected.length,
          popout: contentVisible,
        })}
        onClick={this.onTriggerClick}
        onKeyDown={this.props.onKeyDown}
      >
        <div className={cn('placeholder')}>{this.renderPlaceholder()}</div>
        {allowReset && <span className={cn('reset')} onClick={reset} />}
      </div>
    );
  }
}

export default BaseTrigger;
