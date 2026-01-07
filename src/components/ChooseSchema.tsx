import { useState } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

const HARDCODED_SCHEMA_IDS = [
  { id: "160", name: "Schema 160" },
  { id: "165", name: "Schema 165" },
  { id: "170", name: "Schema 170" },
  { id: "175", name: "Schema 175" },
  { id: "180", name: "Schema 180" },
  { id: "185", name: "Schema 185" },
  { id: "190", name: "Schema 190" },
  { id: "195", name: "Schema 195" },
];

const TEST_DATA = {
  id: "test-schema-001",
  name: "User Profile Schema",
  type: "object",
  version: "2.0.1",
  description: "Schema for validating user profile data including personal information and preferences",
  created: "2024-01-15T10:30:00Z",
  updated: "2024-03-20T14:45:00Z",
  status: "active",
  properties: {
    id: { type: "string", required: true, description: "Unique user identifier" },
    username: { type: "string", required: true, minLength: 3, maxLength: 30 },
    email: { type: "string", format: "email", required: true },
    age: { type: "integer", minimum: 18, maximum: 120 },
    active: { type: "boolean", default: true },
    roles: { 
      type: "array", 
      items: { type: "string", enum: ["admin", "user", "moderator", "guest"] },
      minItems: 1
    },
    metadata: {
      type: "object",
      properties: {
        createdAt: { type: "string", format: "date-time" },
        lastLogin: { type: "string", format: "date-time" },
        loginCount: { type: "integer" }
      }
    }
  },
  required: ["id", "username", "email"],
  validationRules: [
    "email must be valid format",
    "username must be unique",
    "age must be positive integer"
  ],
  sampleData: {
    valid: {
      id: "user-123",
      username: "john_doe",
      email: "john@example.com",
      age: 28,
      active: true,
      roles: ["user", "moderator"]
    },
    invalid: {
      id: "user-456",
      username: "ab", // Too short
      email: "invalid-email",
      age: 15 // Under 18
    }
  }
};

export default function ChooseSchema() {
  const [selectedSchema, setSelectedSchema] = useState(HARDCODED_SCHEMA_IDS[0]);
  const [isChecking, setIsChecking] = useState(false);
  const [data, setData] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleCheckSchema = async () => {

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

    setIsChecking(true);
    
    setTimeout(() => {
      setData(TEST_DATA); 
      setShowModal(true);
      setIsChecking(false);
    }, 1000); 
  };

  const closeModal = () => {
    setShowModal(false);
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
                    <span className="block truncate">{selectedSchema.name}</span>
                  </ListboxButton>
                  
                  <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {HARDCODED_SCHEMA_IDS.map((schema) => (
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
                              {schema.name}
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
                onClick={handleCheckSchema}
                disabled={isChecking}
              >
              Check Schema
              </button>

              <button
                className="w-full p-2.5 bg-blue-500 dark:bg-blue-600 text-white rounded-lg font-bold text-base 
                    hover:bg-blue-600 dark:hover:bg-blue-700 
                    active:scale-95 active:bg-blue-700 dark:active:bg-blue-800 
                    transition-all duration-150 ease-in-out"
                onClick={handleCheckSchema}
                disabled={isChecking}
              >
              Check Data
              </button>
              
              
            </div>
          </>
        }
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          {/* Modal Container */}
          <div className="relative w-full max-w-6xl max-h-[90vh] bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-800">
              <div>
                <h2 className="text-2xl font-bold text-white">
                    Schema Results
                </h2>
                <p className="text-gray-400 mt-1">
                  Selected: {selectedSchema.id} - {selectedSchema.name}
                </p>
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
                      <p className="text-white text-lg font-mono">{data.id}</p>
                    </div>
                    
                    <div className="bg-gray-800 rounded-xl p-4">
                      <h4 className="font-medium text-gray-400">Version</h4>
                      <p className="text-white text-lg">{data.version}</p>
                    </div>
                    
                    <div className="bg-gray-800 rounded-xl p-4">
                      <h4 className="font-medium text-gray-400">Status</h4>
                      <p className="text-green-400 text-lg font-semibold">{data.status}</p>
                    </div>
                    
                    <div className="bg-gray-800 rounded-xl p-4">
                      <h4 className="font-medium text-gray-400">Type</h4>
                      <p className="text-white text-lg">{data.type}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="bg-gray-800 rounded-xl p-5">
                    <h4 className="font-medium text-gray-400 mb-3">Description</h4>
                    <p className="text-white text-lg">{data.description}</p>
                  </div>

                  {/* Properties Table */}
                  <div className="bg-gray-800 rounded-xl p-5">
                    <h4 className="font-medium text-gray-400 mb-4 text-xl">Properties</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-700">
                        <thead>
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Property</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Required</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                          {Object.entries(data.properties).map(([key, value]: [string, any]) => (
                            <tr key={key} className="hover:bg-gray-700/50">
                              <td className="px-4 py-3">
                                <span className="text-blue-400 font-mono font-medium">{key}</span>
                              </td>
                              <td className="px-4 py-3">
                                <span className="text-green-400 font-medium">{value.type}</span>
                              </td>
                              <td className="px-4 py-3">
                                {value.required ? (
                                  <span className="px-2 py-1 text-xs bg-red-500/20 text-red-300 rounded-full">Required</span>
                                ) : (
                                  <span className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded-full">Optional</span>
                                )}
                              </td>
                              <td className="px-4 py-3 text-gray-300">
                                {value.description || "No description"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Required Fields */}
                  {data.required && data.required.length > 0 && (
                    <div className="bg-gray-800 rounded-xl p-5">
                      <h4 className="font-medium text-gray-400 mb-3">Required Fields</h4>
                      <div className="flex flex-wrap gap-2">
                        {data.required.map((field: string) => (
                          <span key={field} className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">
                            {field}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Validation Rules */}
                  {data.validationRules && (
                    <div className="bg-gray-800 rounded-xl p-5">
                      <h4 className="font-medium text-gray-400 mb-3">Validation Rules</h4>
                      <ul className="space-y-2">
                        {data.validationRules.map((rule: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-400 mr-2">✓</span>
                            <span className="text-white">{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Raw JSON View */}
                  <div className="bg-gray-800 rounded-xl p-5">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium text-gray-400">Raw JSON Data</h4>
                      <span className="text-xs text-gray-500">For debugging purposes</span>
                    </div>
                    <pre className="text-sm text-gray-300 bg-gray-900/50 p-4 rounded-lg overflow-x-auto max-h-64">
                      {JSON.stringify(data, null, 2)}
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