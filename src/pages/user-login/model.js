import {routerRedux} from 'dva/router';
import {getPageQuery} from './utils/utils';
import {setAuthority} from './utils/authority';
import {reloadAuthorized} from './utils/Authorized';
import {fakeAccountLogin, getFakeCaptcha} from './service';
import {getPublicKey} from "@/pages/user-login/service";
import handleResponse from "@/utils/response";

export default {
  namespace: 'userLogin',

  state: {
    status: undefined,
  },

  effects: {

    * publicKey({}, {call, put}) {
      const data = handleResponse(yield call(getPublicKey));
      yield put({
        type: 'getPublicKey',
        payload: data,
      });
    },

    * login({payload}, {call, put}) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let {redirect} = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/welcome'));
      }
    },

    * getCaptcha({payload}, {call}) {
      yield call(getFakeCaptcha, payload);
    },
  },

  reducers: {
    changeLoginStatus(state, {payload}) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
    getPublicKey(state, {payload}) {
      return {
        ...state,
        publicKey: payload.publicKey
      };
    }
  },
};
