import type SchemaValidationResponse from "../../types/SchemaValidationResponseType"

interface Props {
  validationResponse: SchemaValidationResponse ;
  closeModal: () => void;
}

export default function ModalHeaderSchema ({validationResponse, closeModal}: Props) {
    const issueCount = validationResponse.root?.length ?? 0;
    return(
        <>
            <div className="flex items-center w-full justify-between p-6 border-b border-gray-700 bg-gray-800 rounded-lg shadow-lg m-3">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {"Schema Validation Results" }
                </h2>
                <p className="text-gray-400 mt-1">
                  Schema ID: {validationResponse.id} - {validationResponse.description}
                </p>
                <br></br>
                {validationResponse.error && (
                  <p className="text-red-400 text-sm mt-1 bg-red-500/10 p-2 rounded-3xl">
                     {validationResponse.error}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${issueCount > 0 ? 'bg-yellow-500/20 text-yellow-300' : 'bg-green-500/20 text-green-300'}`}>
                    {issueCount > 0 ? `${issueCount} Issues Found` : 'No Issues Found'}
                  </span>
                </div>
              </div>
            </div>
        </>
    );
}