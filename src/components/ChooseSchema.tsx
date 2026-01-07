import { useState } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import HARDCODED_SCHEMA_LIST from "../constants/SchemasList"; 
import axios from "axios";
import ModalHeaderSchema from "./ModalHeaderSchema";
import ModalContentSchema from "./ModalContentSchema";
import type SchemaValidationResponse from "../types/schemaValidationResponse";
import type DataValidationResponse from "../types/dataValidationResponse";
import ModalHeaderData from "./ModalHeaderData";
import ModalContentData from "./ModalContentData";

export default function ChooseSchema() {
  const [selectedSchema, setSelectedSchema] = useState(HARDCODED_SCHEMA_LIST[0]);
  const [isChecking, setIsChecking] = useState(false);
  const [schemaValidationResponse, setSchemaValidationResponse] = useState< SchemaValidationResponse | null>(null);
  const [dataValidationResponse, setDataValidationResponse] = useState< DataValidationResponse | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [validationType, setValidationType] = useState<"schema" | "data" | null>(null);

  const handleSchemaValidationBySchemaID = async () => {
    setValidationType("schema");
    setSchemaValidationResponse(null);
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
      
      const processedData = processApiResponseSchemaCheck(res.data, selectedSchema);
      setSchemaValidationResponse(processedData);
      setShowModal(true);

    } catch (error) {
      console.error("Error checking schema:", error);
      setSchemaValidationResponse({
        id: selectedSchema.id.toString(),
        description: selectedSchema.description,
        root: [],
        error: "Failed to fetch validation data"
      });
      setShowModal(true);
    } finally {
      setIsChecking(false);
    }
  };

  const processApiResponseSchemaCheck = (apiData: any, selectedSchema: any) => {
    
    const schemaId = selectedSchema.id.toString();
    const rootArray = apiData[schemaId].root;
            
    return {
      id: selectedSchema.id,
      description: selectedSchema.description,
      root: rootArray,
      schemaId: schemaId
    };
  };

  const handleDataValidationBySchemaID = async () => {
    setValidationType("data");
    setDataValidationResponse(null);
    setIsChecking(true);
    setShowModal(false);

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
      
      const processedData = processApiResponseDataCheck(res.data, selectedSchema);
      setDataValidationResponse(processedData);
      setShowModal(true);

    } catch (error) {
      // setDataValidationResponse({
      //   id: selectedSchema.id.toString(),
      //   description: selectedSchema.description,
      //   root: [],
      //   error: "Failed to fetch validation data"
      // });
      setShowModal(true);
    } finally {
      setIsChecking(false);
    }
  };

  const processApiResponseDataCheck = (apiData: any, selectedSchema: any) => {
    
    const schemaId = selectedSchema.id.toString();
            
    return {
      id: selectedSchema.id,
      description: selectedSchema.description,
      root: apiData[schemaId],
      schemaId: schemaId
    };
  };

  const closeModal = () => {
    setShowModal(false);
    setDataValidationResponse(null);
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
                    {HARDCODED_SCHEMA_LIST.map((schema: any) => (
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

      {showModal && schemaValidationResponse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-6xl max-h-[90vh] bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
            {validationType == "schema" && (
            <>
              <ModalHeaderSchema validationResponse={schemaValidationResponse} validationType={validationType} closeModal={closeModal}/>
              <ModalContentSchema validationResponse={schemaValidationResponse} validationType={validationType} getStatusColor={getStatusColor}/> 
            </>
            )}
          </div>
        </div>
      )}
      {showModal && dataValidationResponse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-6xl max-h-[90vh] bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
            {validationType == "schema" && (
            <>
              <ModalHeaderData validationResponse={dataValidationResponse} validationType={validationType} closeModal={closeModal} selectedSchema={selectedSchema}/>
              <ModalContentData validationResponse={dataValidationResponse} validationType={validationType} getStatusColor={getStatusColor} /> 
            </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}