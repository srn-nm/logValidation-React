import ModalSchemaTable from "./ModalSchemaTable";
import ModalSummaryCards from "./ModalSummaryCardsSchema";
import type SchemaValidationResponse from "../../types/SchemaValidationResponseType"

export default function ModalContentSchema ({validationResponse}: {validationResponse: SchemaValidationResponse}) {

    return (
        <>
             <div className="p-6 overflow-auto w-full ">
                <div className="space-y-6">

                  <ModalSummaryCards validationData={validationResponse} />

                  {/* table */}
                  <ModalSchemaTable SchemaValidationResponse={validationResponse}/>
                 
                  {/* RAW JSON */}
                  <div className="bg-gray-800 rounded-xl p-5">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium text-gray-400">Raw JSON Data</h4>
                    </div>
                    <pre className="text-sm text-gray-300 bg-gray-900/50 p-4 rounded-lg overflow-x-auto max-h-64">
                      {JSON.stringify(validationResponse, null, 2)}
                    </pre>
                  </div>
                </div>
            </div>
        </>
    );
}