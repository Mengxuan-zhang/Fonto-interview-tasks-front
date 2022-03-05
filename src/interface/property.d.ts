export interface ISinglePropertyType {
  id: number;
  address: string;
  valuation: number;
  hidden: boolean;
  create_time?: string;
  update_time?: string;
  // status: number,
}

export interface FromValues {
  [name: string]: any;
}
