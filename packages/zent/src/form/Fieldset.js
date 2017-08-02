import React from 'react';

export default props => {
  return (
    <fieldset className="zent-form__fieldset">
      <legend className="zent-form__legend">
        {props.legend}
      </legend>
      {props.children}
    </fieldset>
  );
};
