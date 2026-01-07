import type DataValidationResponse from "../types/DataValidationResponse"

interface Props {
  validationData: DataValidationResponse;
  validationType: "schema" | "data" | null;
}

export default function ModalSummaryCardsData({ validationData, validationType }: Props) {
  const schemaIds = Object.keys(validationData);
  const firstSchemaId = schemaIds[0] || "";
  const schemaData = firstSchemaId ? validationData[firstSchemaId] : {};
  
  const dataEntries = Object.keys(schemaData);
  const totalDataEntries = dataEntries.length;
  
  let totalIssues = 0;
  let totalWarnings = 0;
  let totalErrors = 0;
  
  dataEntries.forEach(dataId => {
    const dataEntry = schemaData[dataId];
    if (dataEntry?.non_calc) {
      totalIssues += dataEntry.non_calc.length;
      
      dataEntry.non_calc.forEach(issue => {
        if (issue.level === "WARNING") totalWarnings++;
        if (issue.level === "ERROR") totalErrors++;
      });
    }
  });
  
  const fieldCounts: Record<string, number> = {};
  dataEntries.forEach(dataId => {
    const dataEntry = schemaData[dataId];
    if (dataEntry?.non_calc) {
      dataEntry.non_calc.forEach(issue => {
        fieldCounts[issue.field] = (fieldCounts[issue.field] || 0) + 1;
      });
    }
  });
  
  const mostCommonField = Object.entries(fieldCounts).sort((a, b) => b[1] - a[1])[0];
  const mostCommonFieldName = mostCommonField?.[0] || "N/A";
  const mostCommonFieldCount = mostCommonField?.[1] || 0;
  
  const schemaId = (validationData as any).id || firstSchemaId || "N/A";
  const description = (validationData as any).description || "Data Validation";

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-xl p-4">
          <h4 className="font-medium text-gray-400">Schema ID</h4>
          <p className="text-white text-lg font-mono">{schemaId}</p>
          <p className="text-xs text-gray-500 mt-1">Analyzing {totalDataEntries} data entries</p>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-4">
          <h4 className="font-medium text-gray-400">Total Issues</h4>
          <div className="flex items-baseline space-x-2">
            <p className={`text-2xl font-semibold ${totalIssues > 0 ? 'text-yellow-400' : 'text-green-400'}`}>
              {totalIssues}
            </p>
            <div className="text-xs text-gray-400">
              {totalErrors > 0 && (
                <div className="text-red-300">• {totalErrors} errors</div>
              )}
              {totalWarnings > 0 && (
                <div className="text-yellow-300">• {totalWarnings} warnings</div>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Across all data entries
          </p>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-4">
          <h4 className="font-medium text-gray-400">Validation Type</h4>
          <p className="text-white text-lg">
            Data Check
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {(validationData as any).type && `Type: ${(validationData as any).type}`}
          </p>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-4">
          <h4 className="font-medium text-gray-400">Common Issue</h4>
          {mostCommonFieldCount > 0 ? (
            <>
              <p className="text-blue-300 text-lg font-mono truncate">{mostCommonFieldName}</p>
              <p className="text-xs text-gray-500 mt-1">
                Found in {mostCommonFieldCount} data entries
              </p>
            </>
          ) : (
            <>
              <p className="text-green-400 text-lg">No Common Issues</p>
              <p className="text-xs text-gray-500 mt-1">All checks passed</p>
            </>
          )}
        </div>
      </div>
      
      {totalIssues > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          <div className="bg-gray-800/50 rounded-xl p-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Data Entries Analyzed</span>
              <span className="text-white font-semibold">{totalDataEntries}</span>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Avg. Issues per Entry</span>
              <span className="text-white font-semibold">
                {totalDataEntries > 0 ? (totalIssues / totalDataEntries).toFixed(1) : 0}
              </span>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Status</span>
              <span className={`font-semibold ${totalIssues > 0 ? (totalErrors > 0 ? 'text-red-400' : 'text-yellow-400') : 'text-green-400'}`}>
                {totalIssues > 0 ? (totalErrors > 0 ? "Critical Issues" : "Warnings Found") : "Valid"}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}