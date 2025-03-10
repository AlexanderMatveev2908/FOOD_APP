/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  unSubScribeViaLinkLoggedAPI,
  unSubscribeViaLinkNonLoggedAPI,
} from "../../../../api/newsLetter";
import { useEffect } from "react";
import { useToast } from "../../../../hooks/useGlobal";
import { REG_MONGO, REG_TOKEN } from "../../../../constants/regex";
import { isValidStr, validateStrWithArr } from "../../../../utils/validateStr";
import { useScrollTop } from "../../../../hooks/useScrollTop";
import { useHandleErr } from "../../../../hooks/useHandleErr";

export const useVerifyUnsubScribeNewsLetter = () => {
  useScrollTop();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { showToastMsg } = useToast();
  const { handleErrAPI } = useHandleErr();

  const typeUser = searchParams.get("typeUser");
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");

  const canStay =
    validateStrWithArr(["non-logged", "logged"], typeUser ?? "") &&
    isValidStr(token ?? "", REG_TOKEN) &&
    isValidStr(userId ?? "", REG_MONGO);

  const { isError, error, isSuccess } = useQuery({
    queryKey: ["unSubscribeViaLink", userId, token, typeUser],
    queryFn: () =>
      typeUser === "logged"
        ? unSubScribeViaLinkLoggedAPI({
            userId: userId ?? "",
            token: token ?? "",
          })
        : unSubscribeViaLinkNonLoggedAPI({
            userId: userId ?? "",
            token: token ?? "",
          }),
    enabled: !!canStay,
  });

  useEffect(() => {
    const handleSideEffects = () => {
      if (isError) {
        if ((error as any)?.response?.status === 401) {
          navigate(`/newsletter/notice-unsubscribe-with-retry?success=false`, {
            state: { from: location.pathname },
            replace: true,
          });

          showToastMsg((error as any)?.response?.data?.msg, "ERROR");
        } else {
          handleErrAPI({ err: error, push: true });
        }
      } else if (isSuccess) {
        navigate("/newsletter/notice-unsubscribe-with-retry?success=true", {
          state: { from: location.pathname },
          replace: true,
        });
        showToastMsg("Subscription deleted successfully", "SUCCESS");
      }
    };

    handleSideEffects();
  }, [
    isError,
    error,
    showToastMsg,
    navigate,
    typeUser,
    location.pathname,
    isSuccess,
    handleErrAPI,
  ]);

  return { canStay };
};
