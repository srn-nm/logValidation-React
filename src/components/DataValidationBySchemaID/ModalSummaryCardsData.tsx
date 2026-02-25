import type DataValidationResponse from "../../types/DataValidationResponseType"

export default function ModalSummaryCardsData({ validationResponse }: {validationResponse: DataValidationResponse}) {

  let dataIDs: any[] = []
  if (validationResponse.root) {
      dataIDs = Object.keys(validationResponse.root);   
  } 
  const totalProblematicDatas = dataIDs.length;
  const schemaId = validationResponse.id;
  const description = validationResponse.description;

  let totalIssues = 0; 
  let totalWarnings = 0;
  let totalErrors = 0;
  let totalDataEntries = 0; // value not set yet

  dataIDs.forEach(dataID => {
    console.log(validationResponse.root[dataID])
    if (validationResponse.root[dataID].log.calc) {

      totalIssues += validationResponse.root[dataID].log.calc.length;

      validationResponse.root[dataID].log.calc.forEach(issue => {
        if (issue.level === "WARNING") totalWarnings++;
        if (issue.level === "ERROR") totalErrors++;
      })
    }
    if (validationResponse.root[dataID].log.non_calc) {
      totalIssues += validationResponse.root[dataID].log.non_calc.length;
      validationResponse.root[dataID].log.non_calc.forEach(issue => {
        if (issue.level === "WARNING") totalWarnings++;
        if (issue.level === "ERROR") totalErrors++;
      })
    }
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-xl p-4">
          <h4 className="font-medium text-gray-400">Schema ID</h4>
          <p className="text-white text-lg font-mono">{schemaId}</p>
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
        </div>
        
        <div className="bg-gray-800 rounded-xl p-4">
          <h4 className="font-medium text-gray-400">Validation Type</h4>
          <p className="text-white text-lg">
            Data Check
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl p-4">
          <h4 className="font-medium text-gray-400">Status</h4>
          <p className={`text-lg font-semibold ${totalIssues > 0 ? 'text-yellow-400' : 'text-green-400'}`}>
            {totalIssues > 0 ? "Issues Found" : "Valid"}
          </p>
        </div>
        
      </div>
      
      {/* {totalIssues > 0 && (
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
      )} */}
    </>
  );
}