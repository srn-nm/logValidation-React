import { createContext } from "react";

export interface SchemaContextType {
  selectedSchema: string;
  setSelectedSchema: React.Dispatch<React.SetStateAction<string>>;
}

const DataContext = createContext<SchemaContextType | undefined>(undefined);

export default DataContext;