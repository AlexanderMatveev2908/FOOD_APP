import { useForm } from "react-hook-form";
import { useScrollTop } from "../../../hooks/useScrollTop";
import { useEffect, useState } from "react";
import { useChangeVisibilityPwd } from "./../AuthenticateFields/authHooks/useChangeVisibilityPwd";

export type RegisterFormType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
};

export const useRegisterCustom = () => {
  const [isPwdVisible, setIsPwdVisible] = useState(false);
  const [isConfirmPwdVisible, setIsConfirmPwdVisible] = useState(false);

  const { handleChangePwdVisibility, handleChangeConfirmPwdVisibility } =
    useChangeVisibilityPwd({
      isPwdVisible,
      setIsPwdVisible,
      isConfirmPwdVisible,
      setIsConfirmPwdVisible,
    });

  useScrollTop();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    formState: { errors },
    setFocus,
  } = useForm<RegisterFormType>({ mode: "onChange" });

  useEffect(() => {
    setFocus("firstName");
  }, [setFocus]);

  const pwd = watch("password");

  useEffect(() => {
    if (pwd) trigger("confirmPassword");
  }, [pwd, trigger]);

  return {
    register,
    errors,
    watch,
    trigger,
    isPwdVisible,
    isConfirmPwdVisible,
    handleChangePwdVisibility,
    handleChangeConfirmPwdVisibility,
  };
};
