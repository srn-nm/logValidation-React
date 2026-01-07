export default interface DataValidationResponse {
  [schemaId: string]: {
    [dataId: string]: {
      non_calc: Array<{
        _id: any;
        field: string;
        type: string;
        code: string;
        level: string;
        detail: {
          en: string;
          fa: string;
        };
      }>;
    };
  };
}