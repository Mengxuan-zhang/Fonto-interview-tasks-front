import { Effect, Reducer, Subscription } from 'umi';
import { fetchAllPropertyList } from '../service/property';
import { message } from 'antd';
import { ISinglePropertyType } from '@/interface/Property';

export interface PropertyState {
  properties: ISinglePropertyType[];
}
interface PropertyModelType {
  namespace: 'property';
  state: PropertyState;
  reducers: {
    propertyList: Reducer<PropertyState>;
  };
  effects: {
    getAllList: Effect;
    // edit: Effect;
    // delete: Effect;
    // add: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

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
      console.log(data);
      if (data) {
        yield put({
          type: 'propertyList',
          payload: data,
        });
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
