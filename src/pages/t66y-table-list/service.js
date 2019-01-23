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
  if (params === undefined) {
    params = { pageNum: 1, pageSize: 10 };
  }
  if (params.pageSize === undefined) {
    params.pageSize = 10;
  }
  if (params.current === undefined) {
    params.pageNum = 1;
  } else {
    params.pageNum = params.current;
    params.current = undefined;
  }

  return request.get('/t66y/topic', { params: params });
}

export async function findTopicFidMap() {
  return request.get('/t66y/fid');
}

export async function findTopicStatusMap() {
  return request.get('/t66y/status');
}

export async function findTopicTitleList() {
  return request.get('/t66y/topic/title');
}
