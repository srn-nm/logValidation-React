import { CheckIcon } from "@heroicons/react/20/solid";
import type SchemaValidationResponse from "../../types/SchemaValidationResponseType"


export default function ModalSchemaTable ({SchemaValidationResponse}: {SchemaValidationResponse: SchemaValidationResponse}) {

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
        <>
            {SchemaValidationResponse.root && SchemaValidationResponse.root.length > 0 ? (
                    <div className="bg-gray-800 rounded-xl p-5">
                      <h4 className="font-medium text-gray-400 mb-4 text-xl">
                        Validation Issues ({SchemaValidationResponse.root.length})
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                          <thead>
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">#</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Code</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Level</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Detail</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-700">
                            {SchemaValidationResponse.root.map((error: any, index: number) => (
                              <tr key={index} className="hover:bg-gray-700/50 transition-colors">
                                <td className="px-4 py-3 text-gray-400 font-mono">
                                  {index + 1}
                                </td>
                                <td className="px-4 py-3 font-mono">
                                  <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full">
                                    {error.code}
                                  </span>
                                </td>
                                <td className="px-4 py-3">
                                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(error.level)}`}>
                                    {error.level}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-gray-300">
                                  {error.detail?.en || error.detail}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-800 rounded-xl p-8 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                        <CheckIcon className="h-8 w-8 text-green-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">No Issues Found!</h3>
                      <p className="text-gray-400">
                        The schema has passed all validation checks.
                      </p>
                      {SchemaValidationResponse.note && (
                        <p className="text-gray-500 mt-2 text-sm">
                          {SchemaValidationResponse.note}
                        </p>
                      )}
                    </div>
                  )}
        </>
    );
}