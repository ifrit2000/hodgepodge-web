import {queryImage} from "@/pages/t66y-advanced-profile/service";
import handleResponse from "@/utils/response";

export default {
  namespace: 'imageModel',

  state: {},

  effects: {

    * fetchImage({payload}, {call, put}) {
      const images = [];
      for (let image of payload) {
        if (image.fileId !== undefined && image.fileId !== '-') {
          images.push(handleResponse(yield call(queryImage, image.fileId)));
        }
      }

      yield put({
        type: 'showImage',
        payload: {images},
      });
    },

  },

  reducers: {
    showImage(state, action) {
      console.log(action.payload);
      return {
        ...state,
        ...action.payload,
      }
    },
  },
};
