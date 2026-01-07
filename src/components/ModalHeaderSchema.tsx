import { XMarkIcon } from "@heroicons/react/20/solid";
import type SchemaValidationResponse from "../types/SchemaValidationResponse"

interface Props {
  validationResponse: SchemaValidationResponse ;
  validationType: "schema" | "data" | null;
  closeModal: () => void;
}

export default function ModalHeaderSchema ({validationResponse, validationType, closeModal}: Props) {
    const issueCount = validationResponse.root?.length ?? 0;
    return(
        <>
            <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-800">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {validationType === "schema" ? "Schema Validation Results" : "Data Validation Results"}
                </h2>
                <p className="text-gray-400 mt-1">
                  Schema ID: {validationResponse.id} - {validationResponse.description}
                </p>
                {validationResponse.note && (
                  <p className="text-yellow-400 text-sm mt-1 bg-yellow-500/10 p-2 rounded">
                     {validationResponse.note}
                  </p>
                )}
                {validationResponse.error && (
                  <p className="text-red-400 text-sm mt-1 bg-red-500/10 p-2 rounded">
                     {validationResponse.error}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${issueCount > 0 ? 'bg-yellow-500/20 text-yellow-300' : 'bg-green-500/20 text-green-300'}`}>
                    {issueCount > 0 ? `${issueCount} Issues Found` : 'No Issues Found'}
                  </span>
                  {validationType === "data" && (
                    <span className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded-full">
                      Data Validation
                    </span>
                  )}
                  {validationResponse.type && (
                    <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full">
                      {validationResponse.type}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="p-2 rounded-lg hover:bg-gray-700 transition-colors duration-150"
                aria-label="Close modal"
              >
                <XMarkIcon className="h-8 w-8 text-gray-400 hover:text-white" />
              </button>
            </div>
        </>
    );
}