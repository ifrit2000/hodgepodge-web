import {addRule, findTopicList, queryRule, removeRule, updateRule} from './service';

export default {
  namespace: 't66yTableList',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    * fetch2({payload}, {call, put}) {
      const response = yield call(findTopicList, payload);
      let {
        data: {
          list,
          total,
          pageSize,
          pageNum: current,
        },

        // pagination: {
        //   "total": 46,
        //   "pageSize": 10,
        //   "current": 1
        // }
      } = response;
      console.log(total);
      console.log(pageSize);
      console.log(current);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    * fetch({payload}, {call, put}) {
      const response = yield call(queryRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    * add({payload, callback}, {call, put}) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    * remove({payload, callback}, {call, put}) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    * update({payload, callback}, {call, put}) {
      const response = yield call(updateRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
