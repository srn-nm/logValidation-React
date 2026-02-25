import { useParams, useNavigate } from "react-router-dom";

export default function DataDetail() {
    const { id } = useParams(); // dynamic id from URL
    const navigate = useNavigate();

    return (
        <div className="flex flex-row">
            <div className="flex flex-col w-full p-5 gap-5">
                <div className="w-full px-4 bg-gray-900 p-3 rounded-lg shadow-lg border border-gray-700 flex-col">
                    <p>Details for data with id: {id}</p>
                    <button onClick={() => navigate(-1)}>Go Back</button>
                </div>
            </div>
        </div>
    )
};