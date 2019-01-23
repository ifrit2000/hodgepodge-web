import {queryAdvancedProfile} from './service';
import {fetchTopicDetail} from "@/pages/t66y-advanced-profile/service";
import handleResponse from "@/utils/response";

export default {
  namespace: 't66yDetail',

  state: {
    advancedOperation1: [],
    advancedOperation2: [],
    advancedOperation3: [],
  },

  effects: {
    * fetchTopicDetail({payload}, {call, put}) {
      const response = handleResponse(yield call(fetchTopicDetail, payload.topicId));
      yield put({
        type: 'showTopic',
        payload: response,
      });
    },
    * fetchAdvanced(_, {call, put}) {
      const response = yield call(queryAdvancedProfile);
      yield put({
        type: 'show',
        payload: response,
      });
    },
  },

  reducers: {
    show(state, {payload}) {

      return {
        ...state,
        ...payload,
      };
    },
    showTopic(state, action) {
      console.log(action);
      return {
        ...state,
        topic: action.payload
      }
    }
  },


};
