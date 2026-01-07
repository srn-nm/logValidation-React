import { useState } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import HARDCODED_SCHEMA_LIST from "../constants/SchemasList"; 
import HARDCODED_SCHEMA_VALIDATION_BY_SCHEMA_ID from "../constants/SchemaValidationBySchemaID";

export default function ChooseSchema() {
  const [selectedSchema, setSelectedSchema] = useState(HARDCODED_SCHEMA_LIST[0]);
  const [isChecking, setIsChecking] = useState(false);
  const [validationData, setValidationData] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [validationType, setValidationType] = useState<"schema" | "data" | null>(null);

  const handleSchemaValidationBySchemaID = async () => {
    // setData("");
    // setIsChecking(true);

    // try {
    //   const res = await axios.get(
    //     `http://172.16.20.134:8080/api/v1/data/validation/schema/${selectedSchema.id}`,
    //     {
    //       params: {
    //         calc_validation: false,
    //         deep_check: false,
    //         max_depth: 1,
    //         lang: "en",
    //       },
    //       headers: {
    //         Accept: `application/json`,
    //         Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZWVkYTJlNi00M2EwLTQ4ZDUtOGRiMi1hYWRlMjExYjQ0ZWIiLCJleHAiOjE3NjgyMjM1MzgsImlhdCI6MTc2NzYxODczOCwibmJmIjoxNzY3NjE4NzM4LCJqdGkiOiJmN2Q2MDlmYS02YTIyLTRjMmMtOGFlNS1jNDA2YWU3NzI3YjMiLCJyb2xlcyI6WyJ1c2VyIl0sInNjb3BlcyI6WyJyZXBvcnQ6cmVhZCIsInJlcG9ydDp3cml0ZSIsInRlbXBsYXRlOnJlYWQiLCJ0ZW1wbGF0ZTp3cml0ZSJdfQ.Vt72jELV2tyYvIBTV2LsJMs-Y2c_m_jJhWpoE48JIMLOFifL5Cf9VFcPMAEYuV6SZNoqOua1QVHL8036XniifxJBy5QHVFQZIw9FUrJaF0BdOB4vbkJO4n33cZ8yzziVqKQAjtuACb7_ihf5rbfhDUywJYRx789w6f1Z85DXJbsUXihDngZSBpgIm-d-W-9B04AomX0O6b_Wjp44xmHOsQPx8Yqo9lbIjAz13SV-1mrxPwWEzbMiQz3vwjtrEpL95YAxiWzXmcFIDhTRHs6MhEyWZP1cJKYfN390ECIOX7BMfEZ6aDSiU3fQ_slmRs-xXjac1CSrBiXuQLPgaPsUEg`,
    //       }
    //     }
    //   );

    //   setData(res.data);

    // } catch (error) {
    //   console.error("Error checking schema:" + error);
    // } finally {
    //   setIsChecking(false);
    // }

    setValidationType("schema");
    setIsChecking(true);
    
    setTimeout(() => {
      // Get validation data for the selected schema ID
      const schemaId = selectedSchema.id.toString();
      
      // Cast to any to access dynamic properties
      const testData = HARDCODED_SCHEMA_VALIDATION_BY_SCHEMA_ID as any;
      
      console.log("Selected Schema ID:", schemaId);
      console.log("Test Data:", testData);
      
      // Check if test data has validation for this specific schema ID
      if (testData[schemaId] && testData[schemaId].root) {
        // Found validation data for this schema ID
        console.log("Found validation data for schema", schemaId);
        setValidationData({
          id: selectedSchema.id,
          description: selectedSchema.description,
          root: testData[schemaId].root
        });
      } else {
        // No validation data found for this schema ID
        // Try to find any validation data in the object
        console.log("Looking for any validation data...");
        
        // Get all keys that are numbers (schema IDs)
        const schemaKeys = Object.keys(testData).filter(key => 
          !isNaN(Number(key)) && testData[key]?.root
        );
        
        if (schemaKeys.length > 0) {
          // Use the first available validation data
          const firstKey = schemaKeys[0];
          console.log("Using validation data for schema", firstKey);
          setValidationData({
            id: selectedSchema.id,
            description: selectedSchema.description,
            root: testData[firstKey].root,
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