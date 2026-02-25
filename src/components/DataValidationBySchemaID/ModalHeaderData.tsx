import { XMarkIcon } from "@heroicons/react/20/solid";
import type DataValidationResponse from "../../types/DataValidationResponseType";

interface Props {
  validationResponse: DataValidationResponse ;
  closeModal: () => void;
}

export default function ModalHeaderData ({validationResponse, closeModal}: Props) {
    const schemaID = validationResponse.id.toString(); 
    console.log("validationResponse: ", validationResponse) ////////////////test
    let dataIDs: any[] = []
    if (validationResponse.root) {
      dataIDs = Object.keys(validationResponse.root);   
    } 
    const totalProblematicDatas = dataIDs.length;

    let issueCount = 0; 
    console.log("validation response: ", validationResponse) ////////////////test

    dataIDs.forEach(dataID => {
      console.log(validationResponse.root[dataID])
      if (validationResponse.root[dataID].log.calc) issueCount += validationResponse.root[dataID].log.calc.length;
      if (validationResponse.root[dataID].log.non_calc) issueCount += validationResponse.root[dataID].log.non_calc.length;
    });

    return(
        <>
            <div className="flex items-center w-full justify-between p-6 border-b border-gray-700 bg-gray-800 rounded-lg shadow-lg m-3">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {"Data Validation Results"}
                
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
                    {issueCount > 0 ? `${issueCount} Issues Found from ${totalProblematicDatas} datas` : 'No Issues Found'}
                  </span>
                </div>
              </div>
            </div>
        </>
    );
}