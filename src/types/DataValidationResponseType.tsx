export default interface DataValidationResponseType {
  id: string | number;
  description: string;
  root: {
    [dataId: string]:{log: {
      non_calc?:   
        Array<{
          _id: any;
          field: string;
          type: string;
          code: string;
          level: string;
          detail: string
        }>;
      calc?:   
        Array<{
          _id: any;
          field: string;
          type: string;
          code: string;
          level: string;
          detail: string
        }>;
    };
  };
  };
  error?: string;
}