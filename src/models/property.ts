import { Effect, Reducer, Subscription } from 'umi';
import { fetchAllPropertyList, postProperty } from '../service/property';
import { message } from 'antd';
import { PropertyModelType } from '@/interface/Property';

const PropertyModel: PropertyModelType = {
  namespace: 'property',
  state: {
    properties: [],
  },
  reducers: {
    propertyList(state, { payload }) {
      return payload;
    },
  },

  effects: {
    *getAllList(action, { put, call }) {
      const data = yield call(fetchAllPropertyList);
      if (data) {
        yield put({
          type: 'propertyList',
          payload: data,
        });
      } else {
        message.error('Get data failed');
      }
    },
    *postProperty({ payload }, { put, call }) {
      const { values } = payload;
      const response = yield call(postProperty, { values });
      if (response) {
        console.log(response);
        message.success('add property successfully');
      } else {
        message.error('Get data failed');
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/property') {
          dispatch({
            type: 'getAllList',
          });
        }
      });
    },
  },
};

export default PropertyModel;
