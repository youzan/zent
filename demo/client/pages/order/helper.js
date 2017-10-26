import map from 'lodash/map';
import assign from 'lodash/assign';
import indexOf from 'lodash/indexOf';
import { keywordArr } from './constants';

/**
 * 转换select data
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function transformSelectData(data) {
  const keyArr = Object.keys(data);
  return map(keyArr, item => {
    return {
      value: item,
      text: data[item]
    };
  });
}

/**
 * 组装请求数据对象
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function serializeAjaxData(data, state) {
  const assignData = assign({}, state.filter_info, data);
  const keyArr = Object.keys(assignData);
  const pageInfo = assign({}, state.page_info, data);

  map(keyArr, item => {
    if (indexOf(keywordArr, item) !== -1) {
      const value = assignData[item];
      delete assignData[item];
      if (value !== '') {
        assignData[`keyword[${item}]`] = value;
      }
    }
  });

  if (assignData.order_label_value) {
    assignData[`keyword[${assignData.order_label}]`] =
      assignData.order_label_value;
  }

  assignData.p = pageInfo.page;
  assignData.page_size = pageInfo.count;

  return assignData;
}
