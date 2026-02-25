import type DataValidationError from "./DataValidationErrorType";

export default interface DataItem {
  dataId: string;
  array: DataValidationError[];
}