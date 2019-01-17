import request from '@/utils/request';

export async function queryRule(params) {
  return request(`/api/table-list`, {
    params,
  });
}

export async function removeRule(params) {
  return request('/api/table-list', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/table-list', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params) {
  return request('/api/table-list', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}

export async function findTopicList(params) {
  return request.get('/t66y/topic/list', {params: {pageNum: 1, pageSize: 10}});
}
