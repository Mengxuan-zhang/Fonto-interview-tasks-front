import { Effect, Reducer, Subscription } from 'umi';
import { fetchAllPropertyList } from '../service/property';
import { message } from 'antd';
import { ISinglePropertyType } from '@/interface/Property';

export interface PropertyState {
  data: ISinglePropertyType[];
  // meta: {
  //     total: number,
  //     per_page: number,
  //     page: number,
  // }
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
    data: [],
  },
  reducers: {
    propertyList(state, { payload }) {
      return payload;
    },
  },

  effects: {
    *getAllList(action, { put, call }) {
      // 先等用call调用箭头函数返回给一个值 然后yield把值拿到
      const data = yield call(fetchAllPropertyList);
      // 然后在把值传到reducer中
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
