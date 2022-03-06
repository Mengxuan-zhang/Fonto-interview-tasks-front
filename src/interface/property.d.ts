export interface ISinglePropertyType {
  id: number;
  address: string;
  valuation: number;
  hidden: boolean;
}

export interface FromValues {
  [name: string]: any;
}
