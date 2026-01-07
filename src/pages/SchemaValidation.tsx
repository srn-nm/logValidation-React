import ChooseSchema from "../components/ChooseSchema";

export default function SchemaValidation() {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="w-full max-w-md p-5 -mt-60">
                <ChooseSchema />
            </div>
        </div>
    );
}