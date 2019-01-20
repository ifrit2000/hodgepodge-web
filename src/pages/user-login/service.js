import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  return request('/api/user-login/account', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/user-login/captcha?mobile=${mobile}`);
}

export async function getPublicKey() {
  const response = request.get(`/service-cipher/rsa/publicKey`);

  return response;
}

