import {queryTopicDetail} from '../service';
import handleResponse from "@/utils/response";

export default {
  namespace: 't66yDetail',

  state: {

  },

  effects: {
    * fetchTopicDetail({payload}, {call, put}) {
      const response = handleResponse(yield call(queryTopicDetail, payload.topicId));
      yield put({
        type: 'showTopic',
        payload: response,
      });
    },
  },

  reducers: {
    showTopic(state, action) {
      return {
        ...state,
        topic: action.payload,
      }
    },
  },
};
