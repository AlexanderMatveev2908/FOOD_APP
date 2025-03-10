/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { HandleErrType } from "../../../../hooks/useHandleErr";
import { ShowToastType } from "../../../../types/toastTypes";
import { useUser } from "../../../../hooks/useGlobal";
import { newsLetterToggleLoggedAPI } from "../../../../api/newsLetter";
import { CurrUserType } from "../../../../types/userTypes";
export const useToggleNewsLetter = ({
  showToastMsg,
  handleErrAPI,
}: {
  handleErrAPI: HandleErrType;
  showToastMsg: ShowToastType;
}) => {
  const { setCurrUser } = useUser();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ type }: { type: "subscribe" | "unsubscribe" }) =>
      newsLetterToggleLoggedAPI({ type }),
    onSuccess: (data) => {
      setCurrUser({ user: data?.user as CurrUserType | null });
      showToastMsg(
        `You have ${
          data?.user?.hasSubscribedToNewsletter ? "subscribed" : "unsubscribed"
        } to our newsletter successfully`,
        "SUCCESS"
      );
    },
    onError: (err: any) => {
      if (err?.response?.status === 401) handleErrAPI({ err });
      else showToastMsg(err?.response?.data?.msg || err.message, "ERROR");
    },
  });

  return {
    mutate,
    isPending,
  };
};
