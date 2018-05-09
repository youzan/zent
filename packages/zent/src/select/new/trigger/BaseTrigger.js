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
    if (this.props.disabled) return;
    const { open, close, contentVisible } = this.props;
    contentVisible ? close() : open();
    this.ref.focus();
  };

  render() {
    const {
      _cn: cn,
      reset,
      onBlur,
      onFocus,
      disabled,
      selected,
      allowReset,
      contentVisible,
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
        onBlur={onBlur}
        onFocus={onFocus}
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
