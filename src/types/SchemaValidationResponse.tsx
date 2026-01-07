export default interface SchemaValidationData {
  id: string;
  description?: string;
  note?: string;
  error?: string;
  root?: unknown[];
  type?: string;
}