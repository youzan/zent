import React from 'react';
import classNames from 'classnames';
import omit from 'lodash/omit';

function Input(props) {
  const handleKeyDown = evt => {
    const { onKeyDown, onPressEnter } = props;
    if (onPressEnter && evt.keyCode === 13) {
      onPressEnter(evt);
    }

    if (onKeyDown) onKeyDown(evt);
  };

  const { addonBefore, addonAfter, prefix, className } = props;

  const wrapClass = classNames({
    [`${prefix}-input-wrapper`]: true,
    [`${prefix}-input-addons`]: props.addonAfter || props.addonBefore
  }, className);

  // 黑名单，下面这些props不应该带入到Input上
  let inputProps = omit(props, ['className', 'prefix']);

  return (
    <div className={wrapClass} >
      {addonBefore && <span className={`${prefix}-input-addon-before`}>{addonBefore}</span>}
      <input className={`${prefix}-input`} {...inputProps} onKeyDown={handleKeyDown} />
      {addonAfter && <span className={`${prefix}-input-addon-after`}>{addonAfter}</span>}
    </div>
  );
}

Input.defaultProps = {
  disabled: false,
  readOnly: false,
  prefix: 'zent'
};

Input.propTypes = {
  className: React.PropTypes.string,
  prefix: React.PropTypes.string,
  type: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  readOnly: React.PropTypes.bool,
  value: React.PropTypes.any,
  defaultValue: React.PropTypes.any,
  addonBefore: React.PropTypes.node,
  addonAfter: React.PropTypes.node,
  onPressEnter: React.PropTypes.func,
  onChange: React.PropTypes.func
};

export default Input;
