import { Effect, Reducer, Subscription } from 'umi';

export interface ISinglePropertyType {
  id: number;
  address: string;
  valuation: number;
  hidden: boolean;
}

export interface FromValues {
  address: string;
  valuation: number;
}

export interface PropertyState {
  properties: ISinglePropertyType[];
}

export interface PropertyModelType {
  namespace: 'property';
  state: PropertyState;
  reducers: {
    propertyList: Reducer<PropertyState>;
  };
  effects: {
    getAllList: Effect;
    postProperty: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}
