import type DataValidationResponse from "../types/DataValidationResponse"
import ModalDataTable from "./ModalDataTable";
import ModalSummaryCardsData from "./ModalSummaryCardsData";

interface Props {
  validationResponse: DataValidationResponse;
  validationType: "schema" | "data" | null;
  getStatusColor: (level: string) => string
}


export default function ModalContentData ({validationResponse, validationType, getStatusColor}: Props) {
    return (
        <>
             <div className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
                <div className="space-y-6">

                  <ModalSummaryCardsData validationData={validationResponse} validationType={validationType}/>

                  <ModalDataTable DataValidationResponse={validationResponse} validationType={validationType} getStatusColor={getStatusColor}/>
                 
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