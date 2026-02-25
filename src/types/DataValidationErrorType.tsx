export default interface DataValidationError {
  _id: any;
  field: string;
  type: string;
  code: string;
  level: string;
  detail: string
}