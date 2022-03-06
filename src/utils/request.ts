import { extend } from 'umi-request';
import { message } from 'antd';

const baseURL = 'https://take-home.hasura.app/api/rest';

const errorHandler = function (error: any) {
  if (error.response) {
    if (error.response.status > 400) {
      console.log(error);
      message.error(error.data.message ? error.data.message : error.message);
    }
  } else {
    message.error('Network Error');
  }
};

const extendRequest = extend({
  prefix: `${baseURL}`,
  timeout: 30000,
  responseType: 'json',
  errorHandler,
  headers: {
    'Content-Type': 'multipart/form-data',
    'x-hasura-user-id': 'EZwLEAoqARQ',
  },
});

export default extendRequest;
