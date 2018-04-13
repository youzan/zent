/**
 * Index
 */

import Select from './Select';
import Option from './components/Option';
import SelectTrigger from './trigger/BaseTrigger';
import InputTrigger from './trigger/InputTrigger';
import TagsTrigger from './trigger/TagsTrigger';
import NewSelect from './NewSelect';

Select.Option = Option;
Select.SelectTrigger = SelectTrigger;
Select.InputTrigger = InputTrigger;
Select.TagsTrigger = TagsTrigger;
Select.Next = NewSelect;

export { Option, SelectTrigger, InputTrigger, TagsTrigger, NewSelect };

export default Select;
