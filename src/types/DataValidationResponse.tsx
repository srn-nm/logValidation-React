export default interface DataValidationResponse {
  [SchemaID: string]: SchemaErrors;
}

export interface SchemaErrors {
  [DataId: string]: DataErrors;
}

export interface DataErrors {
  non_calc?: EachalidationError[];
  calc?: EachalidationError[];
}

export interface EachalidationError {
  _id: string | null;
  field: string;
  type: "data" | string;
  code: "REQUIRED" | "MISSING" | string;
  level: "ERROR" | "WARNING" | string;
  detail: {
    en: string;
    fa: string;
  };
}