import { useNavigate } from "react-router-dom";
import { useToast, useUser } from "./useGlobal";
import { useCallback } from "react";
import { ErrFoodApp } from "../../types/allTypes/API";

export type HandleErrType = ({
  err,
  push,
  toast,
}: {
  err: ErrFoodApp;
  push?: boolean;
  toast?: boolean;
}) => void;

export const useHandleErr = () => {
  const { showToastMsg } = useToast();
  const navigate = useNavigate();
  const { logoutUser } = useUser();

  const handleErrAPI = useCallback(
    ({
      err,
      push = false,
      toast = true,
    }: {
      err: ErrFoodApp;
      push?: boolean;
      toast?: boolean;
    }) => {
      console.log(err);

      const msg = err?.response?.data?.msg || err.message;
      const url = err?.response?.config?.url || "";
      const status = err?.response?.status;

      if (url === "/auth/refresh") {
        logoutUser();
        navigate("/", { replace: true });
        showToastMsg("SESSION EXPIRED", "ERROR");
      } else if ([401, 403, 429].includes(status ?? 400)) {
        if (["USER DOES NOT EXIST", "USER NOT VERIFIED"].includes(msg))
          logoutUser();

        navigate("/", { replace: true });
        showToastMsg(msg, "ERROR");
      } else {
        if (push) navigate("/", { replace: true });
        if (toast) showToastMsg(msg, "ERROR");
      }
    },
    [navigate, showToastMsg, logoutUser]
  );

  return { handleErrAPI };
};
