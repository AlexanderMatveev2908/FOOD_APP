import { useContext } from "react";
import { GlobalContext } from "../context/global/GlobalContext";
import { RootValsType } from "../context/root/rootTypes";
import { ToastValsType } from "../types/toastTypes";

const useGlobal = (): RootValsType => {
  const context = useContext(GlobalContext);

  if (!context)
    throw new Error("useGlobal must be used within a GlobalProvider");

  return context;
};

export const useToast = (): ToastValsType => useGlobal().toastState;
