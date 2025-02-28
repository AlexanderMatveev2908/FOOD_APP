import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useScrollTop } from "../../../hooks/useScrollTop";

export type LoginFormType = {
  email: string;
  password: string;
};

export const useLoginCustom = () => {
  useScrollTop();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setFocus,
  } = useForm<LoginFormType>({ mode: "onSubmit" });

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  return {
    register,
    errors,
  };
};
