import { useQuery } from "@tanstack/react-query";
import { useHandleErr } from "./useHandleErr";
import { getCartUserAPI } from "../api/APICalls/cart";
import { useUser } from "./useGlobal";
import { useEffect } from "react";
import { ErrFoodApp } from "../../types/allTypes/API";

export const useGetCart = () => {
  const { isLogged } = useUser();
  const { handleErrAPI } = useHandleErr();

  const { data, isPending, isError, isSuccess, error } = useQuery({
    queryKey: ["myCart"],
    queryFn: getCartUserAPI,
    enabled: isLogged,
  });

  useEffect(() => {
    if (isError) handleErrAPI({ err: error as ErrFoodApp });
    if (isSuccess) console.log(data);
  }, [data, isPending, isError, isSuccess, error, handleErrAPI]);
};
