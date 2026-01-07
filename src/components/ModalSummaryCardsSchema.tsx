import type SchemaValidationResponse from "../types/schemaValidationResponse"

interface Props {
  validationData: SchemaValidationResponse ;
  validationType: "schema" | "data" | null;
}

export default function ModalSummaryCards ({validationData, validationType}: Props) {
    const issueCount = validationData.root?.length ?? 0;
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gray-800 rounded-xl p-4">
                      <h4 className="font-medium text-gray-400">Schema ID</h4>
                      <p className="text-white text-lg font-mono">{validationData.id}</p>
                    </div>
                    
                    <div className="bg-gray-800 rounded-xl p-4">
                      <h4 className="font-medium text-gray-400">Total Issues</h4>
                      <p className={`text-lg font-semibold ${issueCount > 0 ? 'text-yellow-400' : 'text-green-400'}`}>
                        {validationData.root?.length || 0}
                      </p>
                    </div>
                    
                    <div className="bg-gray-800 rounded-xl p-4">
                      <h4 className="font-medium text-gray-400">Validation Type</h4>
                      <p className="text-white text-lg">
                        {validationType === "schema" ? "Schema Check" : "Data Check"}
                        {validationData.type && ` (${validationData.type})`}
                      </p>
                    </div>
                    
                    <div className="bg-gray-800 rounded-xl p-4">
                      <h4 className="font-medium text-gray-400">Status</h4>
                      <p className={`text-lg font-semibold ${issueCount > 0 ? 'text-yellow-400' : 'text-green-400'}`}>
                        {issueCount > 0 ? "Issues Found" : "Valid"}
                      </p>
                    </div>
                  </div>
        </>
    );
}