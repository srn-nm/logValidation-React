import { useNavigate } from "react-router-dom";

export default function Dashboard() {

    const navigate = useNavigate();

    const handleGoToSchemaValidation = () => {
        navigate("/SchemaValidation"); 
    };

    return (
        <>
        <div className="flex flex-row space-x-3 items-center justify-center">
            <button
            className="flex p-2.5 bg-blue-500 dark:bg-blue-600 text-white rounded-lg font-bold text-base 
                hover:bg-blue-600 dark:hover:bg-blue-700 
                active:scale-95 active:bg-blue-700 dark:active:bg-blue-800 
                transition-all duration-150 ease-in-out"
            onClick={handleGoToSchemaValidation}
            >
            Check Schema
            </button>
        </div>
        </>
    );
}