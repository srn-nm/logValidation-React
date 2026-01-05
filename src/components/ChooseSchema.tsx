import { useState } from "react";
import { Field, Label, Input } from "@headlessui/react";
import clsx from "clsx";
import axios from "axios"

export default function ChooseSchema() {
    const [schema, setSchema] = useState("");
    const [isChecking, setIsChecking] = useState(false);

    const handleCheckSchema = async () => {
        setIsChecking(true);
        
        try {
            const res = await axios.get("http://172.16.20.134/api/v1/data/validation/schema/${schema}", {
                params: { calc_validation: false, deep_check: false, max_depth: 1, lang: "en"},
            });
            const data = Array.isArray(res.data) ? res.data : []; 
            console.log(data);               
        } catch (error) {
            console.error("Error checking schema:", error);
        } finally {
            setIsChecking(false);
        }
    };

    return (
        <div>
            <div className="w-full max-w-md px-4 bg-gray-900 p-5 rounded-lg shadow-lg border border-gray-700 flex-col ">
                <Field>
                    <Label className="text-md font-medium text-white">Enter Schema:</Label>
                    <Input
                        value={schema}
                        onChange={(e) => setSchema(e.target.value.trim())}
                        className={clsx(
                            'mt-3 block w-full rounded-lg border border-gray-600 bg-white/5 px-3 py-1.5 text-sm/6 text-white',
                            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                            isChecking && 'opacity-50 cursor-not-allowed'
                        )}
                        placeholder='160'
                        disabled={isChecking}
                    />
                </Field>
                
                <button
                    className="w-full p-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg font-bold text-base 
                    hover:bg-blue-600 dark:hover:bg-blue-700 
                    active:scale-95 active:bg-blue-700 dark:active:bg-blue-800 
                    transition-all duration-150 ease-in-out mt-4"
                    onClick={handleCheckSchema}
                    disabled={!schema.trim() || isChecking}
                    // isLoading={isChecking}
                >
                    Check
                </button>
                
            </div>
        </div>
    );
}