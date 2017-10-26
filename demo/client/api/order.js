import ajax from 'zan-pc-ajax';

export function fetchOrderList(data) {
  return ajax({
    url: `${_global.url.demo}/api/order/list.json`,
    method: 'GET',
    data
  });
}
