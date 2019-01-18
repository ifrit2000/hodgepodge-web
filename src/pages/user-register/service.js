import request from '@/utils/request';

export async function fakeRegister(params) {
  return request('/api/user-register/register', {
    method: 'POST',
    data: params,
  });
}
