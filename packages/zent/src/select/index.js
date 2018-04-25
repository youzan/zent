/**
 * bypass wrapper of Select
 * created and used before reconstruction finished
 */

import * as React from 'react';

/* old components */
import OldSelect from './Select';
import Option from './components/Option';
import SelectTrigger from './trigger/BaseTrigger';
import InputTrigger from './trigger/InputTrigger';
import TagsTrigger from './trigger/TagsTrigger';
/* end of old components */

/* new components */
import NewSelect from './new';
/* end of new components */

/**
 * @description bypass wrapper
 * @author fancy
 * @param {Object} props the props for real Select
 * @param {string} props.mode key to distinguish old and new
 * @returns instance of real select
 */
function SelectBypass(props) {
  if (props.mode) {
    return <NewSelect {...props}>{props.children}</NewSelect>;
  }
  return <OldSelect {...props}>{props.children}</OldSelect>;
}

SelectBypass.Option = Option;
SelectBypass.SelectTrigger = SelectTrigger;
SelectBypass.InputTrigger = InputTrigger;
SelectBypass.TagsTrigger = TagsTrigger;

export default SelectBypass;
