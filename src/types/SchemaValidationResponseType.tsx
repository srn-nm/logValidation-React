export default interface SchemaValidationResponseType {
  id: string;
  description?: string;
  note?: string;
  error?: string;
  root?: unknown[];
  type?: string;
}