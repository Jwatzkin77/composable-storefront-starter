import { useContext, createContext } from "react";
import { StoreSettings } from "@/lib/bc-client/queries/getGlobalData";

export const GlobalDataContext = createContext<Partial<{ settings: StoreSettings | undefined }>>({});

export const useGlobalData = () => useContext(GlobalDataContext);
