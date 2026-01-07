import { XMarkIcon } from "@heroicons/react/20/solid";
import type DataValidationResponse from "../types/dataValidationResponse";
import HARDCODED_SCHEMA_LIST from "../constants/SchemasList"; 

interface Props {
  validationResponse: DataValidationResponse;
  validationType: "schema" | "data" | null;
  closeModal: () => void;
  selectedSchema: typeof HARDCODED_SCHEMA_LIST[0];
}

export default function ModalHeaderData({ validationResponse, validationType, closeModal, selectedSchema }: Props) {
  const schemaId = Object.keys(validationResponse)[0] || "";
  const schemaData = schemaId ? validationResponse[schemaId] : {};
  
  let totalIssues = 0;
  let totalDataEntries = 0;
  let totalWarnings = 0;
  let totalErrors = 0;
  
  if (schemaData) {
    const dataIds = Object.keys(schemaData);
    totalDataEntries = dataIds.length;
    
    dataIds.forEach(dataId => {
      const dataEntry = schemaData[dataId];
      if (dataEntry?.non_calc) {
        const issuesCount = dataEntry.non_calc.length;
        totalIssues += issuesCount;
        
        dataEntry.non_calc.forEach(issue => {
          if (issue.level === "WARNING") totalWarnings++;
          if (issue.level === "ERROR") totalErrors++;
        });
      }
    });
  }
  
  return (
    <>
      <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-800">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Data Validation Results
          </h2>
          <p className="text-gray-400 mt-1">
            Schema: {selectedSchema.id} - {selectedSchema.description}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Found {totalDataEntries} data entries with validation results
          </p>
          
          {(validationResponse as any).error && (
            <p className="text-red-400 text-sm mt-1 bg-red-500/10 p-2 rounded">
              {(validationResponse as any).error}
            </p>
          )}
          
          <div className="flex items-center gap-2 mt-2">
            <span className={`px-2 py-1 text-xs rounded-full ${totalIssues > 0 ? 'bg-yellow-500/20 text-yellow-300' : 'bg-green-500/20 text-green-300'}`}>
              {totalIssues > 0 ? `${totalIssues} Total Issues` : 'No Issues Found'}
            </span>
            
            <span className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded-full">
              Data Validation
            </span>
            
            <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full">
              {totalDataEntries} Data Entries
            </span>
            
            {totalWarnings > 0 && (
              <span className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-300 rounded-full">
                {totalWarnings} Warnings
              </span>
            )}
            
            {totalErrors > 0 && (
              <span className="px-2 py-1 text-xs bg-red-500/20 text-red-300 rounded-full">
                {totalErrors} Errors
              </span>
            )}
            
            {(validationResponse as any).type && (
              <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full">
                {(validationResponse as any).type}
              </span>
            )}
          </div>
          
          {totalIssues > 0 && (
            <div className="mt-3 text-xs text-gray-400">
              <p>
                Analyzed {totalDataEntries} data entries • 
                {totalErrors > 0 && <span className="text-red-300 ml-2"> {totalErrors} critical errors</span>}
                {totalWarnings > 0 && <span className="text-yellow-300 ml-2"> {totalWarnings} warnings</span>}
              </p>
            </div>
          )}
        </div>
        
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