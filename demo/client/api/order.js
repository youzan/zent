import ajax from 'zan-pc-ajax';

export function fetchOrderList(data) {
  return ajax({
    url: '/api/order/list.json',
    method: 'GET',
    data
  });
}
