import type SchemaValidationData from "../types/schemaValidationResponse";

interface Props {
  validationData: SchemaValidationData;
  validationType: "schema" | "data" | null;
  getStatusColor: (level: string) => {}
}


export default function ModalSchemaTable ({validationData, validationType, getStatusColor}: Props) {
    return (
        <>
            
        </>
    );
}