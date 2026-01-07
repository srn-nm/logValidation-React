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
    setValidationType("schema");
    setValidationData(null);
    setIsChecking(true);
    setShowModal(false);

    try {
      const res = await axios.get(
        `http://172.16.20.134:8080/api/v1/schema/validation/${selectedSchema.id}`,
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

      console.log("API Response data:", res.data);
      
      // Process the API response
      const processedData = processApiResponse(res.data, selectedSchema);
      setValidationData(processedData);
      setShowModal(true);

    } catch (error) {
      console.error("Error checking schema:", error);
      // Show error state
      setValidationData({
        id: selectedSchema.id,
        description: selectedSchema.description,
        root: [],
        error: "Failed to fetch validation data"
      });
      setShowModal(true);
    } finally {
      setIsChecking(false);
    }
  };

  // Helper function to process API response
  const processApiResponse = (apiData: any, selectedSchema: any) => {
    console.log("Processing API data:", apiData);
    
    const schemaId = selectedSchema.id.toString();
    
    // Check if the API response has data for this schema ID
    if (apiData[schemaId]) {
      // The data is nested under the schema ID key
      const schemaData = apiData[schemaId];
      
      // Check if it has a 'non_calc' property (from your console log)
      if (schemaData.non_calc) {
        // Convert non_calc array to the expected 'root' format
        return {
          id: selectedSchema.id,
          description: selectedSchema.description,
          root: schemaData.non_calc.map((item: any, index: number) => ({
            _id: index,
            field: item.field || `Field ${index}`,
            type: item.type || "schema",
            code: item.code || "UNKNOWN",
            level: item.level || "WARNING",
            detail: {
              en: item.message || item.detail?.en || "No details available",
              fa: item.detail?.fa || ""
            }
          }))
        };
      } else if (schemaData.root) {
        // Has root property directly
        return {
          id: selectedSchema.id,
          description: selectedSchema.description,
          root: schemaData.root
        };
      } else {
        // Unknown structure, return as is
        return {
          id: selectedSchema.id,
          description: selectedSchema.description,
          ...schemaData,
          root: [] // Ensure root exists
        };
      }
    } else {
      // API response doesn't have data for this schema ID
      // Try to extract any available data
      const keys = Object.keys(apiData).filter(key => !isNaN(Number(key)));
      
      if (keys.length > 0) {
        // Use the first available data
        const firstKey = keys[0];
        const firstData = apiData[firstKey];
        
        if (firstData.non_calc) {
          return {
            id: selectedSchema.id,
            description: selectedSchema.description,
            root: firstData.non_calc.map((item: any, index: number) => ({
              _id: index,
              field: item.field || `Field ${index}`,
              type: item.type || "schema",
              code: item.code || "UNKNOWN",
              level: item.level || "WARNING",
              detail: {
                en: item.message || item.detail?.en || "No details available",
                fa: item.detail?.fa || ""
              }
            })),
            note: `Showing validation data for schema ${firstKey} (requested: ${selectedSchema.id})`
          };
        }
      }
      
      // No data found
      return {
        id: selectedSchema.id,
        description: selectedSchema.description,
        root: [],
        note: "No validation data available for this schema"
      };
    }
  };

  const handleDataValidationBySchemaID = async () => {
    // todo - implement data validation
    setValidationType("data");
    setIsChecking(true);
    
    // For now, just show a placeholder
    setTimeout(() => {
      setValidationData({
        id: selectedSchema.id,
        description: selectedSchema.description,
        type: "data_validation",
        root: [],
        note: "Data validation not implemented yet"
      });
      setShowModal(true);
      setIsChecking(false);
    }, 500);
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
                {validationData.note && (
                  <p className="text-yellow-400 text-sm mt-1 bg-yellow-500/10 p-2 rounded">
                    ⚠️ {validationData.note}
                  </p>
                )}
                {validationData.error && (
                  <p className="text-red-400 text-sm mt-1 bg-red-500/10 p-2 rounded">
                    ❌ {validationData.error}
                  </p>
                )}
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
                            {validationData.map((error: any, index: number) => (
                              <tr key={index} className="hover:bg-gray-700/50 transition-colors">
                                <td className="px-4 py-3 text-gray-400 font-mono">
                                  {index + 1}
                                </td>
                                <td className="px-4 py-3 text-blue-400 font-mono">
                                  {error.field || `Error ${index + 1}`}
                                </td>
                                <td className="px-4 py-3 text-gray-300">
                                  {error.type || "schema"}
                                </td>
                                <td className="px-4 py-3 font-mono">
                                  <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full">
                                    {error.code || "UNKNOWN"}
                                  </span>
                                </td>
                                <td className="px-4 py-3">
                                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(error.level)}`}>
                                    {error.level || "WARNING"}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-gray-300">
                                  {error.detail?.en || error.detail || error.message || "No details available"}
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
                      {validationData.note && (
                        <p className="text-gray-500 mt-2 text-sm">
                          {validationData.note}
                        </p>
                      )}
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

// the result format given from server to me: {
//     "27": {
//         "root": [
//             {
//                 "_id": null,
//                 "field": "TEL.group",
//                 "type": "schema",
//                 "code": "MISSING",
//                 "level": "WARNING",
//                 "detail": {
//                     "en": "'TEL.group' is missing",
//                     "fa": ""
//                 }
//             },
//             {
//                 "_id": null,
//                 "field": "NAME.group",
//                 "type": "schema",
//                 "code": "MISSING",
//                 "level": "WARNING",
//                 "detail": {
//                     "en": "'NAME.group' is missing",
//                     "fa": ""
//                 }
//             },
//             {
//                 "_id": null,
//                 "field": "ID_PIC.group",
//                 "type": "schema",
//                 "code": "MISSING",
//                 "level": "WARNING",
//                 "detail": {
//                     "en": "'ID_PIC.group' is missing",
//                     "fa": ""
//                 }
//             },
//             {
//                 "_id": null,
//                 "field": "NATIONALCODE.group",
//                 "type": "schema",
//                 "code": "MISSING",
//                 "level": "WARNING",
//                 "detail": {
//                     "en": "'NATIONALCODE.group' is missing",
//                     "fa": ""
//                 }
//             }
//         ]
//     }
// }


// console: 
// API Response data: {27: {…}}27: root: Array(4)0: code: "MISSING"detail: {en: "'TEL.group' is missing", fa: ''}field: "TEL.group"level: "WARNING"type: "schema"_id: null[[Prototype]]: Object1: {_id: null, field: 'NAME.group', type: 'schema', code: 'MISSING', level: 'WARNING', …}2: {_id: null, field: 'ID_PIC.group', type: 'schema', code: 'MISSING', level: 'WARNING', …}3: {_id: null, field: 'NATIONALCODE.group', type: 'schema', code: 'MISSING', level: 'WARNING', …}length: 4[[Prototype]]: Array(0)[[Prototype]]: Objectconstructor: ƒ Object()hasOwnProperty: ƒ hasOwnProperty()isPrototypeOf: ƒ isPrototypeOf()propertyIsEnumerable: ƒ propertyIsEnumerable()toLocaleString: ƒ toLocaleString()toString: ƒ toString()valueOf: ƒ valueOf()__defineGetter__: ƒ __defineGetter__()__defineSetter__: ƒ __defineSetter__()__lookupGetter__: ƒ __lookupGetter__()__lookupSetter__: ƒ __lookupSetter__()__proto__: (...)get __proto__: ƒ __proto__()set __proto__: ƒ __proto__()[[Prototype]]: Objectconstructor: ƒ Object()hasOwnProperty: ƒ hasOwnProperty()isPrototypeOf: ƒ isPrototypeOf()propertyIsEnumerable: ƒ propertyIsEnumerable()toLocaleString: ƒ toLocaleString()toString: ƒ toString()valueOf: ƒ valueOf()__defineGetter__: ƒ __defineGetter__()__defineSetter__: ƒ __defineSetter__()__lookupGetter__: ƒ __lookupGetter__()__lookupSetter__: ƒ __lookupSetter__()__proto__: (...)get __proto__: ƒ __proto__()set __proto__: ƒ __proto__()
// ChooseSchema.tsx:62 Processing API data: {27: {…}}
// SchemaValidation.tsx:7  TypeError: validationData.map is not a function
//     at ChooseSchema (ChooseSchema.tsx:370:45)
//     at Object.react_stack_bottom_frame (react-dom-client.development.js:25904:20)
//     at renderWithHooks (react-dom-client.development.js:7662:22)
//     at updateFunctionComponent (react-dom-client.development.js:10166:19)
//     at beginWork (react-dom-client.development.js:11778:18)
//     at runWithFiberInDEV (react-dom-client.development.js:871:30)
//     at performUnitOfWork (react-dom-client.development.js:17641:22)
//     at workLoopSync (react-dom-client.development.js:17469:41)
//     at renderRootSync (react-dom-client.development.js:17450:11)
//     at performWorkOnRoot (react-dom-client.development.js:16583:35)

// The above error occurred in the <ChooseSchema> component.

// React will try to recreate this component tree from scratch using the error boundary you provided, RenderErrorBoundary.

// overrideMethod @ hook.js:608
// defaultOnCaughtError @ react-dom-client.development.js:9410
// logCaughtError @ react-dom-client.development.js:9446
// runWithFiberInDEV @ react-dom-client.development.js:871
// inst.componentDidCatch.update.callback @ react-dom-client.development.js:9493
// callCallback @ react-dom-client.development.js:7423
// commitCallbacks @ react-dom-client.development.js:7443
// runWithFiberInDEV @ react-dom-client.development.js:871
// commitClassCallbacks @ react-dom-client.development.js:13377
// commitLayoutEffectOnFiber @ react-dom-client.development.js:14026
// recursivelyTraverseLayoutEffects @ react-dom-client.development.js:15159
// commitLayoutEffectOnFiber @ react-dom-client.development.js:13949
// recursivelyTraverseLayoutEffects @ react-dom-client.development.js:15159
// commitLayoutEffectOnFiber @ react-dom-client.development.js:14165
// recursivelyTraverseLayoutEffects @ react-dom-client.development.js:15159
// commitLayoutEffectOnFiber @ react-dom-client.development.js:14165
// recursivelyTraverseLayoutEffects @ react-dom-client.development.js:15159
// commitLayoutEffectOnFiber @ react-dom-client.development.js:13949
// recursivelyTraverseLayoutEffects @ react-dom-client.development.js:15159
// commitLayoutEffectOnFiber @ react-dom-client.development.js:14165
// recursivelyTraverseLayoutEffects @ react-dom-client.development.js:15159
// commitLayoutEffectOnFiber @ react-dom-client.development.js:14165
// recursivelyTraverseLayoutEffects @ react-dom-client.development.js:15159
// commitLayoutEffectOnFiber @ react-dom-client.development.js:14165
// recursivelyTraverseLayoutEffects @ react-dom-client.development.js:15159
// commitLayoutEffectOnFiber @ react-dom-client.development.js:14165
// recursivelyTraverseLayoutEffects @ react-dom-client.development.js:15159
// commitLayoutEffectOnFiber @ react-dom-client.development.js:13949
// recursivelyTraverseLayoutEffects @ react-dom-client.development.js:15159
// commitLayoutEffectOnFiber @ react-dom-client.development.js:13949
// recursivelyTraverseLayoutEffects @ react-dom-client.development.js:15159
// commitLayoutEffectOnFiber @ react-dom-client.development.js:14165
// recursivelyTraverseLayoutEffects @ react-dom-client.development.js:15159
// commitLayoutEffectOnFiber @ react-dom-client.development.js:13949
// recursivelyTraverseLayoutEffects @ react-dom-client.development.js:15159
// commitLayoutEffectOnFiber @ react-dom-client.development.js:14165
// recursivelyTraverseLayoutEffects @ react-dom-client.development.js:15159
// commitLayoutEffectOnFiber @ react-dom-client.development.js:14031
// flushLayoutEffects @ react-dom-client.development.js:18138
// commitRoot @ react-dom-client.development.js:17954
// commitRootWhenReady @ react-dom-client.development.js:16824
// performWorkOnRoot @ react-dom-client.development.js:16722
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
// App.tsx:28  React Router caught the following error during render TypeError: validationData.map is not a function
//     at ChooseSchema (ChooseSchema.tsx:370:45)
//     at Object.react_stack_bottom_frame (react-dom-client.development.js:25904:20)
//     at renderWithHooks (react-dom-client.development.js:7662:22)
//     at updateFunctionComponent (react-dom-client.development.js:10166:19)
//     at beginWork (react-dom-client.development.js:11778:18)
//     at runWithFiberInDEV (react-dom-client.development.js:871:30)
//     at performUnitOfWork (react-dom-client.development.js:17641:22)
//     at workLoopSync (react-dom-client.development.js:17469:41)
//     at renderRootSync (react-dom-client.development.js:17450:11)
//     at performWorkOnRoot (react-dom-client.development.js:16583:35)
// overrideMethod @ hook.js:608
// componentDidCatch @ chunk-JMJ3UQ3L.mjs:5774
// react_stack_bottom_frame @ react-dom-client.development.js:25959
// inst.componentDidCatch.update.callback @ react-dom-client.development.js:9504
// callCallback @ react-dom-client.development.js:7423
// commitCallbacks @ react-dom-client.development.js:7443
// runWithFiberInDEV @ react-dom-client.development.js:871
// commitClassCallbacks @ react-dom-client.development.js:13377
// commitLayoutEffectOnFiber @ react-dom-client.development.js:14026
// recursivelyTraverseLayoutEffects @ react-dom-client.development.js:15159
// commitLayoutEffectOnFiber @ react-dom-client.development.js:13949
// recursivelyTraverseLayoutEffects @ react-dom-client.development.js:15159
// commitLayoutEffectOnFiber @ react-dom-client.development.js:14165
// recursivelyTraverseLayoutEffects @ react-dom-client.development.js:15159
// commitLayoutEffectOnFiber @ react-dom-client.development.js:14165
// recursivelyTraverseLayoutEffects @ react-dom-client.development.js:15159
// commitLayoutEffectOnFiber @ react-dom-client.development.js:13949
// recursivelyTraverseLayoutEffects @ react-dom-client.development.js:15159
// commitLayoutEffectOnFiber @ react-dom-client.development.js:14165
// recursivelyTraverseLayoutEffects @ react-dom-client.development.js:15159
// commitLayoutEffectOnFiber @ react-dom-client.development.js:14165
// recursivelyTraverseLayoutEffects @ react-dom-client.development.js:15159
// commitLayoutEffectOnFiber @ react-dom-client.development.js:14165
// recursivelyTraverseLayoutEffects @ react-dom-client.development.js:15159
// commitLayoutEffectOnFiber @ react-dom-client.development.js:14165
// recursivelyTraverseLayoutEffects @ react-dom-client.development.js:15159
// commitLayoutEffectOnFiber @ react-dom-client.development.js:13949
// recursivelyTraverseLayoutEffects @ react-dom-client.development.js:15159
// commitLayoutEffectOnFiber @ react-dom-client.development.js:13949
// recursivelyTraverseLayoutEffects @ react-dom-client.development.js:15159
// commitLayoutEffectOnFiber @ react-dom-client.development.js:14165
// recursivelyTraverseLayoutEffects @ react-dom-client.development.js:15159
// commitLayoutEffectOnFiber @ react-dom-client.development.js:13949
// recursivelyTraverseLayoutEffects @ react-dom-client.development.js:15159
// commitLayoutEffectOnFiber @ react-dom-client.development.js:14165
// recursivelyTraverseLayoutEffects @ react-dom-client.development.js:15159
// commitLayoutEffectOnFiber @ react-dom-client.development.js:14031
// flushLayoutEffects @ react-dom-client.development.js:18138
// commitRoot @ react-dom-client.development.js:17954
// commitRootWhenReady @ react-dom-client.development.js:16824
// performWorkOnRoot @ react-dom-client.development.js:16722
// performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:18957
// performWorkUntilDeadline @ scheduler.development.js:45
// <RenderErrorBoundary>
// exports.createElement @ react.development.js:1054
// (anonymous) @ chunk-JMJ3UQ3L.mjs:5955
// _renderMatches @ chunk-JMJ3UQ3L.mjs:5904
// useRoutesImpl @ chunk-JMJ3UQ3L.mjs:5674
// DataRoutes @ chunk-JMJ3UQ3L.mjs:6490
// react_stack_bottom_frame @ react-dom-client.development.js:25904
// renderWithHooksAgain @ react-dom-client.development.js:7762
// renderWithHooks @ react-dom-client.development.js:7674
// updateFunctionComponent @ react-dom-client.development.js:10166
// updateSimpleMemoComponent @ react-dom-client.development.js:9830
// updateMemoComponent @ react-dom-client.development.js:9763
// beginWork @ react-dom-client.development.js:12204
// runWithFiberInDEV @ react-dom-client.development.js:871
// performUnitOfWork @ react-dom-client.development.js:17641
// workLoopSync @ react-dom-client.development.js:17469
// renderRootSync @ react-dom-client.development.js:17450
// performWorkOnRoot @ react-dom-client.development.js:16504
// performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:18957
// performWorkUntilDeadline @ scheduler.development.js:45
// <DataRoutes>
// exports.createElement @ react.development.js:1054
// RouterProvider @ chunk-JMJ3UQ3L.mjs:6458
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
// <RouterProvider>
// exports.createElement @ react.development.js:1054
// RouterProvider2 @ dom-export.mjs:51
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
// <RouterProvider2>
// exports.jsxDEV @ react-jsx-dev-runtime.development.js:335
// App @ App.tsx:28
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
// <App>
// exports.jsxDEV @ react-jsx-dev-runtime.development.js:335
// (anonymous) @ main.tsx:8