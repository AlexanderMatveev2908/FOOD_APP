import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "./../../../core/hooks/useGlobal";
import { useHandleErr } from "./../../../core/hooks/useHandleErr";
import { sendEmailUnsubscribeAPI } from "../../../core/api/api";
import { ErrFoodApp } from "../../../types/allTypes/API";

type UnsubscribeEmailFormType = {
  email: string;
};

export const useNoticeUnSubscribe = () => {
  const { showToastMsg } = useToast();
  const { handleErrAPI } = useHandleErr();

  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const success = searchParams.get("success");

  const canStay = location?.state?.from === "/newsletter/verify-unsubscribe";

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<UnsubscribeEmailFormType>({ mode: "onChange" });

  const { mutate, isPending } = useMutation({
    mutationFn: ({ email }: { email: string }) =>
      sendEmailUnsubscribeAPI({
        email,
      }),
    onSuccess: () => {
      reset();
      showToastMsg("Email sent successfully", "SUCCESS");
      navigate("/notice-email?type=sentEmailUnsubscribe", {
        state: { from: location.pathname },
      });
    },
    onError: (err: ErrFoodApp) => {
      handleErrAPI({ err });
    },
  });

  const handleSubmitEmail = handleSubmit((data) => {
    mutate({
      email: data.email,
    });
  });

  return { canStay, success, register, errors, handleSubmitEmail, isPending };
};
