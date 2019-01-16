

export default {
  namespace: 'test',

  state: {
    status: undefined,
  },

  effects: {
    *testf({ payload }, { call, put }) {
        console.log("123123")
    },

  },

  reducers: {
    // testf(){
    //   console.log("fff")
    // },
  },
};
