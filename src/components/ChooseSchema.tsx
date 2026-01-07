import { useState } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import HARDCODED_SCHEMA_LIST from "../constants/schemasList"; 
import axios from "axios";

export default function ChooseSchema() {
  const [selectedSchema, setSelectedSchema] = useState(HARDCODED_SCHEMA_LIST[0]);
  const [isChecking, setIsChecking] = useState(false);
  const [validationData, setValidationData] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [validationType, setValidationType] = useState<"schema" | "data" | null>(null);

  const handleSchemaValidationBySchemaID = async () => {
    setValidationData("");
    setIsChecking(true);

    try {
      const res = await axios.get(
        `http://172.16.20.134:8080/api/v1/data/validation/schema/${selectedSchema.id}`,
        {
          params: {
            calc_validation: false,
            deep_check: false,
            max_depth: 1,
            lang: "en",
          },
          headers: {
            Accept: `application/json`,
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0MDNjZjZjNS1jNzRmLTRjMmYtYWNmNS1iMWE4ODBlMTkxNGUiLCJleHAiOjE3Njg3NDM2MzAsImlhdCI6MTc2MDk2NzYzMCwibmJmIjoxNzYwOTY3NjMwLCJqdGkiOiJlY2NkZmRmYy1jYTMxLTQ3MTgtOWViNi1hNGIxY2FkNjgyZTUiLCJyb2xlcyI6WyJ1c2VyIl0sInNjb3BlcyI6WyJyZXBvcnQ6cmVhZCIsInJlcG9ydDp3cml0ZSIsInRlbXBsYXRlOnJlYWQiLCJ0ZW1wbGF0ZTp3cml0ZSJdfQ.0R7-zA-eCojvBkCwjUZmSlEXgrVN1V8VMB2bgIThCGtrimdvUKB_Cvef0NAkpXuK4fdVxTassBLGRZTajVp1lfcrNA6hFucJ8le_eECEbb4sfolWeM3qUEzHrD3Kg4_RGObFfcbuRM7Zb2InQEGl-GryxuQ5r9nI8eMMpM1fBJlA7hnKCPgVNA9tP_FCpcpdb0MgziVPyVndKXdul0qKppJpjJJN40m_UQv9i9Xa_yuCNxgWRe4snhSWndCQsbkNOEuYI6egEoF4nsEPZ4cUdXIDjxx1EPdhG0p8s31_IBrg1b9P4qBRd_v-wa4srHOpeOqCAlMevEKQFL71QroYMQ`,
          }
        }
      );

      console.log("res data: ", res.data);
      setValidationData(res.data);

    } catch (error) {
      console.error("Error checking schema:" + error);
    } finally {
      setIsChecking(false);
    }

    setValidationType("schema");
    setIsChecking(true);
    
    setTimeout(() => {
      // Get validation data for the selected schema ID
      const schemaId = selectedSchema.id.toString();
      
      // Cast to any to access dynamic properties
      
      console.log("Selected Schema ID:", schemaId);
      console.log("Data:", validationData);
      
      // Check if test data has validation for this specific schema ID
      if (validationData[schemaId] && validationData[schemaId].root) {
        // Found validation data for this schema ID
        console.log("Found validation data for schema", schemaId);
        setValidationData({
          id: selectedSchema.id,
          description: selectedSchema.description,
          root: validationData[schemaId].root
        });
      } else {
        // No validation data found for this schema ID
        // Try to find any validation data in the object
        console.log("Looking for any validation data...");
        
        // Get all keys that are numbers (schema IDs)
        const schemaKeys = Object.keys(validationData).filter(key => 
          !isNaN(Number(key)) && validationData[key]?.root
        );
        
        if (schemaKeys.length > 0) {
          // Use the first available validation data
          const firstKey = schemaKeys[0];
          console.log("Using validation data for schema", firstKey);
          setValidationData({
            id: selectedSchema.id,
            description: selectedSchema.description,
            root: validationData[firstKey].root,
            note: `Note: Test data shows validation results for schema ${firstKey}`
          });
        } else {
          // No validation data at all
          console.log("No validation data found");
          setValidationData({
            id: selectedSchema.id,
            description: selectedSchema.description,
            root: []
          });
        }
      }
      
      setShowModal(true);
      setIsChecking(false);
    }, 1000); 
  };

  const handleDataValidationBySchemaID = async () => {
    
  };

  const closeModal = () => {
    setShowModal(false);
    setValidationData(null);
    setValidationType(null);
  };

  const getStatusColor = (level: string) => {
    switch (level?.toUpperCase()) {
      case "ERROR":
        return "bg-red-500/20 text-red-300";
      case "WARNING":
        return "bg-yellow-500/20 text-yellow-300";
      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  return (
    <div>
      <div className="w-full max-w-md px-4 bg-gray-900 p-5 rounded-lg shadow-lg border border-gray-700 flex-col ">
        {isChecking && 
          <div className="flex h-full w-full items-center justify-center bg-gray-900">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin m-10">
            </div>
          </div>
        }

        {!isChecking &&
          <>  
            <div className="mb-4">
              <label className="text-md font-medium text-white mb-2 block pl-1">
                Select Schema:
              </label>
              
              <Listbox value={selectedSchema} onChange={setSelectedSchema}>
                <div className="relative mt-1">
                  <ListboxButton className="relative w-full rounded-lg bg-white/5 py-2 pl-3 pr-10 text-left text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <span className="block truncate">{selectedSchema.description}</span>
                  </ListboxButton>
                  
                  <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {HARDCODED_SCHEMA_LIST.map((schema) => (
                      <ListboxOption
                        key={schema.id}
                        className={({ active }) =>
                          clsx(
                            active ? 'bg-blue-600 text-white' : 'text-gray-300',
                            'relative cursor-default select-none py-2 pl-10 pr-4'
                          )
                        }
                        value={schema}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={clsx(
                                selected ? 'font-medium' : 'font-normal',
                                'block truncate'
                              )}
                            >
                              {schema.description}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
            </div>

            <div className="flex flex-row space-x-3">
              <button
                className="w-full p-2.5 bg-blue-500 dark:bg-blue-600 text-white rounded-lg font-bold text-base 
                    hover:bg-blue-600 dark:hover:bg-blue-700 
                    active:scale-95 active:bg-blue-700 dark:active:bg-blue-800 
                    transition-all duration-150 ease-in-out"
                onClick={handleSchemaValidationBySchemaID}
                disabled={isChecking}
              >
              Check Schema
              </button>

              <button
                className="w-full p-2.5 bg-green-500 dark:bg-green-600 text-white rounded-lg font-bold text-base 
                    hover:bg-green-600 dark:hover:bg-green-700 
                    active:scale-95 active:bg-green-700 dark:active:bg-green-800 
                    transition-all duration-150 ease-in-out"
                onClick={handleDataValidationBySchemaID}
                disabled={isChecking}
              >
              Check Data
              </button>
            </div>
          </>
        }
      </div>

      {/* Modal Overlay */}
      {showModal && validationData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          {/* Modal Container */}
          <div className="relative w-full max-w-6xl max-h-[90vh] bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-800">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {validationType === "schema" ? "Schema Validation Results" : "Data Validation Results"}
                </h2>
                <p className="text-gray-400 mt-1">
                  Schema: {validationData.id} - {validationData.description}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${validationData.root?.length > 0 ? 'bg-yellow-500/20 text-yellow-300' : 'bg-green-500/20 text-green-300'}`}>
                    {validationData.root?.length > 0 ? `${validationData.root.length} Issues Found` : 'No Issues Found'}
                  </span>
                  {validationType === "data" && (
                    <span className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded-full">
                      Data Validation
                    </span>
                  )}
                  {validationData.type && (
                    <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full">
                      {validationData.type}
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

            {/* Modal Content */}
            <div className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
                <div className="space-y-6">
                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gray-800 rounded-xl p-4">
                      <h4 className="font-medium text-gray-400">Schema ID</h4>
                      <p className="text-white text-lg font-mono">{validationData.id}</p>
                    </div>
                    
                    <div className="bg-gray-800 rounded-xl p-4">
                      <h4 className="font-medium text-gray-400">Total Issues</h4>
                      <p className={`text-lg font-semibold ${validationData.root?.length > 0 ? 'text-yellow-400' : 'text-green-400'}`}>
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
                      <p className={`text-lg font-semibold ${validationData.root?.length > 0 ? 'text-yellow-400' : 'text-green-400'}`}>
                        {validationData.root?.length > 0 ? "Issues Found" : "Valid"}
                      </p>
                    </div>
                  </div>

                  {/* Issues Table - Only show if there are issues */}
                  {validationData.root && validationData.root.length > 0 ? (
                    <div className="bg-gray-800 rounded-xl p-5">
                      <h4 className="font-medium text-gray-400 mb-4 text-xl">
                        Validation Issues ({validationData.root.length})
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                          <thead>
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">#</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Field</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Code</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Level</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Detail</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-700">
                            {validationData.root.map((error: any, index: number) => (
                              <tr key={index} className="hover:bg-gray-700/50 transition-colors">
                                <td className="px-4 py-3 text-gray-400 font-mono">
                                  {index + 1}
                                </td>
                                <td className="px-4 py-3 text-blue-400 font-mono">
                                  {error.field}
                                </td>
                                <td className="px-4 py-3 text-gray-300">
                                  {error.type}
                                </td>
                                <td className="px-4 py-3 font-mono">
                                  <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full">
                                    {error.code}
                                  </span>
                                </td>
                                <td className="px-4 py-3">
                                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(error.level)}`}>
                                    {error.level}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-gray-300">
                                  {error.detail?.en || error.detail || "No details available"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-800 rounded-xl p-8 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                        <CheckIcon className="h-8 w-8 text-green-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">No Issues Found!</h3>
                      <p className="text-gray-400">
                        The {validationType === "schema" ? "schema" : "data"} has passed all validation checks.
                      </p>
                    </div>
                  )}

                  {/* Raw JSON View */}
                  <div className="bg-gray-800 rounded-xl p-5">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium text-gray-400">Raw JSON Data</h4>
                      <span className="text-xs text-gray-500">For debugging purposes</span>
                    </div>
                    <pre className="text-sm text-gray-300 bg-gray-900/50 p-4 rounded-lg overflow-x-auto max-h-64">
                      {JSON.stringify(validationData, null, 2)}
                    </pre>
                  </div>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// [vite] connecting...
// client:745  WebSocket connection to 'ws://172.16.20.98:5174/?token=whpySc3w4Cc0' failed: 
// createConnection @ client:745
// connect @ client:411
// connect @ client:751
// connect @ client:289
// connect @ client:373
// (anonymous) @ client:823
// client:772  [vite] failed to connect to websocket (Error: WebSocket closed without opened.). 
// overrideMethod @ hook.js:608
// connect @ client:772
// await in connect
// connect @ client:289
// connect @ client:373
// (anonymous) @ client:823
// client:423  Uncaught (in promise) Error: WebSocket closed without opened.
//     at WebSocket.<anonymous> (client:423:30)
// (anonymous) @ client:423
// scheduler.development.js:14 [Violation] 'message' handler took 408ms
// ChooseSchema.tsx:36 res data:  {27: {…}}27: 112666: {non_calc: Array(2)}112667: {non_calc: Array(2)}112668: {non_calc: Array(2)}112669: {non_calc: Array(1)}112670: {non_calc: Array(1)}112671: {non_calc: Array(1)}112672: {non_calc: Array(1)}112673: {non_calc: Array(2)}112674: {non_calc: Array(1)}112675: {non_calc: Array(1)}112676: {non_calc: Array(1)}112677: {non_calc: Array(1)}112678: {non_calc: Array(1)}112679: {non_calc: Array(1)}112680: {non_calc: Array(2)}112681: {non_calc: Array(1)}112682: {non_calc: Array(1)}112683: {non_calc: Array(1)}112684: {non_calc: Array(1)}112685: {non_calc: Array(2)}112686: {non_calc: Array(2)}112687: {non_calc: Array(2)}112688: {non_calc: Array(2)}112689: {non_calc: Array(2)}112690: {non_calc: Array(2)}112691: {non_calc: Array(2)}112692: {non_calc: Array(2)}112693: {non_calc: Array(2)}112694: {non_calc: Array(2)}112695: {non_calc: Array(2)}112696: {non_calc: Array(2)}112697: {non_calc: Array(2)}112698: {non_calc: Array(2)}112699: {non_calc: Array(2)}112700: {non_calc: Array(1)}112701: {non_calc: Array(2)}112702: {non_calc: Array(1)}112703: {non_calc: Array(2)}112704: {non_calc: Array(2)}112705: {non_calc: Array(1)}112706: {non_calc: Array(2)}112707: {non_calc: Array(2)}112708: {non_calc: Array(2)}112709: {non_calc: Array(2)}112710: {non_calc: Array(1)}112711: {non_calc: Array(1)}112712: {non_calc: Array(2)}112713: {non_calc: Array(2)}112714: {non_calc: Array(1)}112715: {non_calc: Array(1)}112716: {non_calc: Array(2)}112717: {non_calc: Array(1)}112718: {non_calc: Array(2)}112719: {non_calc: Array(2)}112720: {non_calc: Array(1)}112721: {non_calc: Array(1)}112722: {non_calc: Array(2)}112723: {non_calc: Array(2)}112724: {non_calc: Array(2)}112798: {non_calc: Array(2)}112799: {non_calc: Array(2)}112800: {non_calc: Array(1)}112801: {non_calc: Array(1)}112802: {non_calc: Array(2)}112803: {non_calc: Array(2)}112804: {non_calc: Array(1)}112805: {non_calc: Array(1)}112810: {non_calc: Array(2)}112817: {non_calc: Array(1)}112822: {non_calc: Array(2)}112823: {non_calc: Array(2)}112824: {non_calc: Array(2)}112825: {non_calc: Array(2)}112826: {non_calc: Array(2)}112827: {non_calc: Array(2)}112828: {non_calc: Array(2)}112829: {non_calc: Array(2)}112830: {non_calc: Array(2)}112831: {non_calc: Array(2)}112832: {non_calc: Array(2)}112833: {non_calc: Array(2)}112834: {non_calc: Array(2)}112835: {non_calc: Array(2)}112846: {non_calc: Array(2)}112847: {non_calc: Array(2)}112848: {non_calc: Array(2)}112850: {non_calc: Array(2)}112851: {non_calc: Array(2)}112852: {non_calc: Array(2)}112853: {non_calc: Array(1)}112854: {non_calc: Array(2)}112855: {non_calc: Array(2)}112856: {non_calc: Array(2)}112857: {non_calc: Array(1)}112858: {non_calc: Array(2)}112859: {non_calc: Array(1)}112860: {non_calc: Array(1)}112861: {non_calc: Array(1)}112862: {non_calc: Array(2)}112863: {non_calc: Array(1)}112864: {non_calc: Array(1)}112868: {non_calc: Array(1)}112869: {non_calc: Array(1)}112870: {non_calc: Array(1)}112871: {non_calc: Array(1)}112872: {non_calc: Array(2)}112873: {non_calc: Array(2)}112878: {non_calc: Array(1)}112880: {non_calc: Array(2)}112881: {non_calc: Array(2)}112882: {non_calc: Array(2)}112883: {non_calc: Array(2)}112884: {non_calc: Array(2)}112885: {non_calc: Array(2)}112888: {non_calc: Array(1)}112889: {non_calc: Array(1)}112890: {non_calc: Array(1)}112891: {non_calc: Array(2)}112892: {non_calc: Array(2)}112893: {non_calc: Array(1)}112897: {non_calc: Array(1)}112901: {non_calc: Array(1)}112906: {non_calc: Array(2)}112907: {non_calc: Array(2)}112908: {non_calc: Array(1)}112909: {non_calc: Array(2)}112910: {non_calc: Array(1)}112911: {non_calc: Array(1)}112912: {non_calc: Array(2)}112913: {non_calc: Array(1)}112914: {non_calc: Array(2)}112915: {non_calc: Array(1)}112916: {non_calc: Array(2)}112917: {non_calc: Array(2)}112918: {non_calc: Array(1)}112919: {non_calc: Array(2)}112920: {non_calc: Array(2)}112921: {non_calc: Array(2)}112924: {non_calc: Array(2)}112925: {non_calc: Array(2)}112927: {non_calc: Array(2)}112928: {non_calc: Array(2)}112929: {non_calc: Array(2)}112930: {non_calc: Array(2)}112931: {non_calc: Array(2)}112932: {non_calc: Array(2)}112933: {non_calc: Array(2)}112934: {non_calc: Array(2)}112935: {non_calc: Array(2)}112936: {non_calc: Array(2)}112937: {non_calc: Array(2)}112938: {non_calc: Array(2)}112939: {non_calc: Array(2)}112940: {non_calc: Array(2)}112941: {non_calc: Array(2)}112942: {non_calc: Array(2)}112943: {non_calc: Array(2)}112944: {non_calc: Array(2)}112945: {non_calc: Array(2)}112946: {non_calc: Array(2)}112947: {non_calc: Array(2)}112948: {non_calc: Array(2)}112949: {non_calc: Array(2)}112950: {non_calc: Array(2)}112951: {non_calc: Array(2)}112952: {non_calc: Array(2)}112953: {non_calc: Array(2)}112954: {non_calc: Array(2)}112955: {non_calc: Array(2)}112956: {non_calc: Array(2)}112958: {non_calc: Array(2)}112959: {non_calc: Array(2)}112960: {non_calc: Array(2)}112961: {non_calc: Array(2)}112962: {non_calc: Array(1)}112963: {non_calc: Array(2)}112964: {non_calc: Array(2)}112965: {non_calc: Array(2)}112966: {non_calc: Array(2)}112968: {non_calc: Array(2)}112969: {non_calc: Array(2)}112970: {non_calc: Array(2)}112971: {non_calc: Array(2)}112972: {non_calc: Array(2)}112973: {non_calc: Array(2)}112974: {non_calc: Array(2)}112976: {non_calc: Array(2)}112977: {non_calc: Array(2)}112978: {non_calc: Array(1)}112980: {non_calc: Array(1)}112981: {non_calc: Array(2)}112982: {non_calc: Array(2)}112983: {non_calc: Array(1)}112985: {non_calc: Array(1)}112986: {non_calc: Array(1)}112987: {non_calc: Array(1)}112988: {non_calc: Array(2)}112989: {non_calc: Array(1)}112990: {non_calc: Array(2)}112991: {non_calc: Array(2)}112992: {non_calc: Array(2)}112993: {non_calc: Array(1)}112994: {non_calc: Array(1)}112996: {non_calc: Array(1)}112997: {non_calc: Array(2)}112998: {non_calc: Array(2)}113000: {non_calc: Array(2)}113001: {non_calc: Array(2)}113002: {non_calc: Array(2)}113004: {non_calc: Array(1)}113016: {non_calc: Array(1)}113039: {non_calc: Array(2)}113041: {non_calc: Array(2)}113043: {non_calc: Array(2)}113045: {non_calc: Array(2)}113055: {non_calc: Array(1)}113056: {non_calc: Array(1)}[[Prototype]]: Object(...)[[Prototype]]: Object
// ChooseSchema.tsx:54 Selected Schema ID: 27
// ChooseSchema.tsx:55 Data: null
// ChooseSchema.tsx:58  Uncaught TypeError: Cannot read properties of null (reading '27')
//     at ChooseSchema.tsx:58:11
// (anonymous) @ ChooseSchema.tsx:58
// setTimeout
// handleSchemaValidationBySchemaID @ ChooseSchema.tsx:48
// await in handleSchemaValidationBySchemaID
// executeDispatch @ react-dom-client.development.js:19116
// runWithFiberInDEV @ react-dom-client.development.js:871
// processDispatchQueue @ react-dom-client.development.js:19166
// (anonymous) @ react-dom-client.development.js:19767
// batchedUpdates$1 @ react-dom-client.development.js:3255
// dispatchEventForPluginEventSystem @ react-dom-client.development.js:19320
// dispatchEvent @ react-dom-client.development.js:23585
// dispatchDiscreteEvent @ react-dom-client.development.js:23553
// <button>
// exports.jsxDEV @ react-jsx-dev-runtime.development.js:335
// ChooseSchema @ ChooseSchema.tsx:183
// react_stack_bottom_frame @ react-dom-client.development.js:25904
// renderWithHooksAgain @ react-dom-client.development.js:7762
// renderWithHooks @ react-dom-client.development.js:7674
// updateFunctionComponent @ react-dom-client.development.js:10166
// beginWork @ react-dom-client.development.js:11778
// runWithFiberInDEV @ react-dom-client.development.js:871
// performUnitOfWork @ react-dom-client.development.js:17641
// workLoopSync @ react-dom-client.development.js:17469
// renderRootSync @ react-dom-client.development.js:17450
// performWorkOnRoot @ react-dom-client.development.js:16504
// performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:18957
// performWorkUntilDeadline @ scheduler.development.js:45
// <ChooseSchema>
// exports.jsxDEV @ react-jsx-dev-runtime.development.js:335
// SchemaValidation @ SchemaValidation.tsx:7
// react_stack_bottom_frame @ react-dom-client.development.js:25904
// renderWithHooksAgain @ react-dom-client.development.js:7762
// renderWithHooks @ react-dom-client.development.js:7674
// updateFunctionComponent @ react-dom-client.development.js:10166
// beginWork @ react-dom-client.development.js:11778
// runWithFiberInDEV @ react-dom-client.development.js:871
// performUnitOfWork @ react-dom-client.development.js:17641
// workLoopSync @ react-dom-client.development.js:17469
// renderRootSync @ react-dom-client.development.js:17450
// performWorkOnRoot @ react-dom-client.development.js:16504
// performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:18957
// performWorkUntilDeadline @ scheduler.development.js:45
// <SchemaValidation>
// exports.jsxDEV @ react-jsx-dev-runtime.development.js:335
// (anonymous) @ Router.tsx:37