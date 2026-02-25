import type DataValidationResponse from "../types/DataValidationResponseType";
import type SchemaValidationData from "../types/SchemaValidationResponseType";
import ModalContentData from "./DataValidationBySchemaID/ModalContentData";
import ModalContentSchema from "./SchemaValidationBySchemaID/ModalContentSchema";
import ModalHeaderData from "./DataValidationBySchemaID/ModalHeaderData";
import ModalHeaderSchema from "./SchemaValidationBySchemaID/ModalHeaderSchema";

interface Props {
    showModal: boolean;
    schemaValidationResponse: SchemaValidationData | null ; 
    dataValidationResponse: DataValidationResponse | null ;
    closeModal: () => void;
}

export default function SchemaValidationDetails({showModal, schemaValidationResponse, dataValidationResponse, closeModal} : Props) {
    
    return (
       <>
        {showModal && schemaValidationResponse && (
            <div className="w-full px-4 bg-gray-900 p-1 rounded-lg shadow-lg border border-gray-700 flex-col ">
                <div className="w-full flex flex-col gap-5 items-center justify-center rounded-lg shadow-lg">  
                  <ModalHeaderSchema validationResponse={schemaValidationResponse} closeModal={closeModal}/>
                  <ModalContentSchema validationResponse={schemaValidationResponse}/> 
                </div>
            </div>
        )}
        {showModal && dataValidationResponse && (
           <div className="w-full px-4 bg-gray-900 p-1 rounded-lg shadow-lg border border-gray-700 flex-col ">
                <div className="w-full flex flex-col gap-5 items-center justify-center rounded-lg shadow-lg">  
                <ModalHeaderData validationResponse={dataValidationResponse} closeModal={closeModal} />
                <ModalContentData validationResponse={dataValidationResponse} /> 
                </div>
            </div>
        )}
       </> 
    );
}