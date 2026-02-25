import { useState } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import HARDCODED_SCHEMA_LIST from "../constants/SchemasList"; 
import axios from "axios";
import type DataValidationResponseType from "../types/DataValidationResponseType";
import type SchemaValidationResponseType from "../types/SchemaValidationResponseType";

interface Props {
  isChecking: boolean;
  openModal: () => void;
  setShowModal: (a:boolean) => void;
  setSchemaValidationResponse: (a:SchemaValidationResponseType) => void ;
  setIsChecking: (a:boolean) => void;
  setDataValidationResponse:(a:DataValidationResponseType) => void;
}

export default function SchemaFilters({isChecking, openModal, setShowModal, setSchemaValidationResponse, setIsChecking, setDataValidationResponse}: Props) {
  const [selectedSchema, setSelectedSchema] = useState(HARDCODED_SCHEMA_LIST[0]);

  const TLAPIBaseUrl: string = import.meta.env.VITE_TL_API_BASE_URL;
  const accessToken: string = import.meta.env.VITE_ACCESS_TOKEN;

  const handleSchemaValidationBySchemaID = async () => {
    openModal();

    try {
      console.log(TLAPIBaseUrl);
      const res = await axios.get(
        `${TLAPIBaseUrl}/schema/validation/${selectedSchema.id}`,
        {
          params: {
            calc_validation: false,
            deep_check: false,
            max_depth: 1,
            lang: "en",
          },
          headers: {
            Accept: `application/json`,
            Authorization: accessToken,
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
    openModal();

    try {
      const res = await axios.get(
        `${TLAPIBaseUrl}/data/validation/schema/${selectedSchema.id}`,
        {
          params: {
            calc_validation: false,
            deep_check: false,
            max_depth: 1,
            lang: "en",
          },
          headers: {
            Accept: `application/json`,
            Authorization: accessToken,
          }
        }
      );
      
      console.log("res.data: ", res) /////////////test
      const processedData = processApiResponseDataCheck(res.data, selectedSchema);
      setDataValidationResponse(processedData);
      console.log("processedData: ", processedData) /////////////test
      setShowModal(true);

    } catch (error) {
      setDataValidationResponse({
        id: selectedSchema.id.toString(),
        description: selectedSchema.description,
        root: {},
        error: "Failed to fetch validation data",
      });
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

  
  return (
    <>
        {isChecking && 
          <div className="flex h-full w-full items-center justify-center bg-gray-900">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin m-10">
            </div>
          </div>
        }

        {!isChecking &&
          <div className="items-center justify-center">  
            <label className="text-md font-medium text-white block pl-1 pt-0">
              Select Schema:
            </label>
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 items-center justify-center mb-1">
              
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

              <div className="h-full w-full flex flex-row  space-x-3">
                <button
                  className="p-1 bg-blue-500 dark:bg-blue-600 text-white rounded-lg font-bold text-base 
                      hover:bg-blue-600 dark:hover:bg-blue-700 
                      active:scale-95 active:bg-blue-700 dark:active:bg-blue-800 
                      transition-all duration-150 ease-in-out"
                  onClick={handleSchemaValidationBySchemaID}
                  disabled={isChecking}
                >
                Check Schema
                </button>

                <button
                  className="p-2.5 bg-green-500 dark:bg-green-600 text-white rounded-lg font-bold text-base 
                      hover:bg-green-600 dark:hover:bg-green-700 
                      active:scale-95 active:bg-green-700 dark:active:bg-green-800 
                      transition-all duration-150 ease-in-out"
                  onClick={handleDataValidationBySchemaID}
                  disabled={isChecking}
                >
                Check Data
                </button>

              </div>

            </div>

          </div>
        }
    </>
  );
}