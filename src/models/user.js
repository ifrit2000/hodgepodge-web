import {query as queryUsers, queryCurrentUser} from '@/services/user';
import {routerRedux} from "dva/router";
import handleResponse from "@/utils/response";

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    * fetch(_, {call, put}) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    * fetchCurrent(_, {call, put}) {
      const token = localStorage.getItem("token");
      if (token !== null) {
        console.log(token);
        const userInfo = handleResponse(yield call(queryCurrentUser, token));
        if (userInfo !== null) {
          yield put({
            type: 'saveCurrentUser',
            payload: userInfo,
          });
          console.log(1);
          return;
        }
      }
      yield put(routerRedux.replace('/login'));
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
