export default {
  namespace: 'demo',

  state: {
    status: undefined,
  },

  effects: {
    *process({payload}, {call, put}) {
      yield put({
        type: 'show',
        payload: payload.data,
      });
    },

  },

  reducers: {
    show(state, action) {
      return {
        ...state,
        data: action.payload
      };
    },
  },
};
