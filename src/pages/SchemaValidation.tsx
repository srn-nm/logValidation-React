import { useState } from "react";
import SchemaFilters from "../components/SchemaFilters";
import SchemaValidationDetails from "../components/SchemaValidationDetails";
import type SchemaValidationResponseType from "../types/SchemaValidationResponseType";
import type DataValidationResponseType from "../types/DataValidationResponseType";

export default function SchemaValidation() {
    const [schemaValidationResponse, setSchemaValidationResponse] = useState< SchemaValidationResponseType | null>(null);
    const [dataValidationResponse, setDataValidationResponse] = useState< DataValidationResponseType | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [isChecking, setIsChecking] = useState(false);


    const closeModal = () => {
    setShowModal(false);
    setDataValidationResponse(null);
    setSchemaValidationResponse(null);
    };

    const openModal = () => {
        setSchemaValidationResponse(null);
        setDataValidationResponse(null);
        setIsChecking(true);
        setShowModal(false);
    };

    return (
        <div className="flex flex-row">
            <div className="flex flex-col w-full p-5 gap-5">
                <div className="w-full px-4 bg-gray-900 p-3 rounded-lg shadow-lg border border-gray-700 flex-col">
                    <SchemaFilters isChecking={isChecking} openModal={openModal} setShowModal={setShowModal} setSchemaValidationResponse={setSchemaValidationResponse} setIsChecking={setIsChecking} setDataValidationResponse={setDataValidationResponse}/>
                </div>
                <SchemaValidationDetails showModal={showModal} schemaValidationResponse={schemaValidationResponse} dataValidationResponse={dataValidationResponse} closeModal={closeModal}/>
            </div>
        </div>
    )
};