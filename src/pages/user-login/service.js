import request from '@/utils/request';
import {JSEncrypt} from "jsencrypt";

export async function fakeAccountLogin(params) {

  return request('/api/user-login/account', {
    method: 'POST',
    data: params,
  });
}

export async function userAuthorizeToken(params) {
  const {
    userName,
    password,
    publicKey,
    keyId
  } = params;
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  const encodedPassword = encrypt.encrypt(password);
  const requestParam = {
    body: encodedPassword
  };
  return request.post(`/service-auth/auth/` + userName + '/' + keyId, requestParam);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/user-login/captcha?mobile=${mobile}`);
}

export async function getPublicKey() {
  return request.get(`/service-cipher/rsa/publicKey`);
}

