import ajax from 'zan-pc-ajax';

export function list(options) {
  return ajax({
    url: '/api/shop/paper/list.json',
    method: 'GET',
    data: options
  });
}

export function getDetail(id) {
  return ajax({
    url: '/api/shop/paper/detail.json',
    method: 'GET',
    data: {
      id
    }
  });
}

export function remove(id) {
  return ajax({
    url: '/api/shop/paper/delete.json',
    method: 'POST',
    data: {
      id
    }
  });
}

export function copy(id) {
  return ajax({
    url: '/api/shop/paper/copy.json',
    method: 'POST',
    data: {
      id
    }
  });
}

export function setAsHomepage(id) {
  return ajax({
    url: '/api/shop/paper/sethomepage.json',
    method: 'POST',
    data: {
      id
    }
  });
}
