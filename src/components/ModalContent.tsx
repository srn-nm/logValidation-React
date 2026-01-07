import ModalSchemaTable from "./ModalSchemaTable";
import ModalSummaryCards from "./ModalSummaryCards";
import ModalDataTable from "./ModalDataTable"

interface SchemaValidationData {
  id: string;
  description?: string;
  note?: string;
  error?: string;
  root?: unknown[];
  type?: string;
}

interface Props {
  validationData: SchemaValidationData;
  validationType: "schema" | "data" | null;
  getStatusColor: (level: string) => {}
}


export default function ModalContent ({validationData, validationType, getStatusColor}: Props) {
    return (
        <>
             <div className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
                <div className="space-y-6">

                  <ModalSummaryCards validationData={validationData} validationType={validationType}/>

                  {/* table */}
                  {validationType == "schema" && 
                  <ModalSchemaTable validationData={validationData} validationType={validationType} getStatusColor={getStatusColor}/>
                  }
                  {validationType == "data" && 
                  <ModalDataTable validationData={validationData} validationType={validationType} getStatusColor={getStatusColor}/>
                  }

                  {/* RAW JSON */}
                  <div className="bg-gray-800 rounded-xl p-5">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium text-gray-400">Raw JSON Data</h4>
                    </div>
                    <pre className="text-sm text-gray-300 bg-gray-900/50 p-4 rounded-lg overflow-x-auto max-h-64">
                      {JSON.stringify(validationData, null, 2)}
                    </pre>
                  </div>
                </div>
            </div>
        </>
    );
}