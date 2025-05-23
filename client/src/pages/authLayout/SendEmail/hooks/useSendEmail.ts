import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useCreateTanStackSendEmail } from "./useCreateTanStackSendEmail";
import { validateStrWithArr } from "../../../../utils/allUtils/validateData";
import { sendUserEmailAPI } from "../../../../core/api/api";

export type SendEmailFormType = {
  email: string;
};

export const useSendEmail = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const from = location?.state?.from;
  const type = searchParams.get("type");

  const canStay =
    validateStrWithArr(["/auth/register", "/auth/login"], from) &&
    validateStrWithArr(["recover-pwd", "verify-account"], type ?? "");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm<SendEmailFormType>({ mode: "onChange" });

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const { mutate, isPending } = useCreateTanStackSendEmail({
    reset,
    callAPI: sendUserEmailAPI,
    from,
    type,
  });

  const handleSubmitEmail = handleSubmit((formData: SendEmailFormType) => {
    mutate({ email: formData.email });
  });

  return {
    register,
    errors,
    canStay,
    type,
    isPending,
    handleSubmitEmail,
  };
};
