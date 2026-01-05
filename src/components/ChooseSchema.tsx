import { useState, type JSXElementConstructor, type Key, type ReactElement, type ReactNode, type ReactPortal } from "react";
import { Field, Label, Input } from "@headlessui/react";
import clsx from "clsx";
import axios from "axios"

export default function ChooseSchema() {
    const [schema, setSchema] = useState("");
    const [isChecking, setIsChecking] = useState(false);
    const [data, setData] = useState<any | null >(null);


    const handleCheckSchema = async () => {
        setData("")
        setIsChecking(true);

        try {
            const res = await axios.get(
            "http://172.16.20.134:8080/api/v1/data/validation/schema/160",
            {
                params: {
                calc_validation: false,
                deep_check: false,
                max_depth: 1,
                lang: "en",
                },
                headers: {
                Accept: `application/json`,
                Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZWVkYTJlNi00M2EwLTQ4ZDUtOGRiMi1hYWRlMjExYjQ0ZWIiLCJleHAiOjE3NjgyMjM1MzgsImlhdCI6MTc2NzYxODczOCwibmJmIjoxNzY3NjE4NzM4LCJqdGkiOiJmN2Q2MDlmYS02YTIyLTRjMmMtOGFlNS1jNDA2YWU3NzI3YjMiLCJyb2xlcyI6WyJ1c2VyIl0sInNjb3BlcyI6WyJyZXBvcnQ6cmVhZCIsInJlcG9ydDp3cml0ZSIsInRlbXBsYXRlOnJlYWQiLCJ0ZW1wbGF0ZTp3cml0ZSJdfQ.Vt72jELV2tyYvIBTV2LsJMs-Y2c_m_jJhWpoE48JIMLOFifL5Cf9VFcPMAEYuV6SZNoqOua1QVHL8036XniifxJBy5QHVFQZIw9FUrJaF0BdOB4vbkJO4n33cZ8yzziVqKQAjtuACb7_ihf5rbfhDUywJYRx789w6f1Z85DXJbsUXihDngZSBpgIm-d-W-9B04AomX0O6b_Wjp44xmHOsQPx8Yqo9lbIjAz13SV-1mrxPwWEzbMiQz3vwjtrEpL95YAxiWzXmcFIDhTRHs6MhEyWZP1cJKYfN390ECIOX7BMfEZ6aDSiU3fQ_slmRs-xXjac1CSrBiXuQLPgaPsUEg`,
                }
            }
            );

            setData(res.data);

        } catch (error) {
            console.error("Error checking schema:"+  error);
        } finally {
            setIsChecking(false);
        }
    };

    return (
        <div>

            <div className="w-full max-w-md px-4 bg-gray-900 p-5 rounded-lg shadow-lg border border-gray-700 flex-col ">
                {isChecking && 
                    <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-900">
                        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin m-10">
                        </div>
                    </div>
                }

                {!isChecking &&
                <>
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
                </>
                }
            </div>
            {data && (
                    <pre className="mt-4 text-sm text-white">
                        {JSON.stringify(data, null, 2)}
                    </pre>
                )}  
        </div>
    );
}