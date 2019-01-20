import {notification} from "antd";

const handleResponse = (response) => {
  if (!response.code.endsWith("00")) {
    notification.error({
      message: `请求错误 `,
      description: response.msg,
    });
  }
  return response.data;
};

export default handleResponse;
