import { FC } from "react";
import ButtonAnimated from "../../../components/buttons/ButtonAnimated/ButtonAnimated";
import BasePwdField from "../../../components/commonCompForms/BasePwdField/BasePwdField";
import { Navigate } from "react-router-dom";
import PasswordChecker from "../../../components/commonCompForms/PasswordChecker/PasswordChecker";
import GeneratePwd from "../../../components/commonCompForms/GeneratePwd/GeneratePwd";
import { useRecoverPwd } from "./hooks/useRecoverPwd";
import PasswordLength from "../../../components/commonCompForms/PasswordLength/PasswordLength";
import {
  confirmPwdField,
  pwdFieldToCreate,
} from "../../../config/fieldsArr/authFieldsUser";
import SpinnerBtnReact from "../../../components/loaders/SpinnerBtnReact/SpinnerBtnReact";

const RecoverPwd: FC = () => {
  const {
    register,
    errors,
    watch,
    isPwdVisible,
    isConfirmPwdVisible,
    handleChangePwdVisibility,
    handleChangeConfirmPwdVisibility,
    canStay,
    isPending,
    handleSubmitRecoverPwd,
    customConfirmPwd,
  } = useRecoverPwd();

  return !canStay ? (
    <Navigate to="/" replace />
  ) : (
    <div className="w-full grid grid-cols-1 gap-y-10 items-center">
      <div className="w-full flex justify-center">
        <span className="txt__04">Recover Password</span>
      </div>

      <div className="w-full justify-self-center max-w-[600px] grid grid-cols-1 border-2 border-orange-500 rounded-xl p-10">
        <div className="w-full grid grid-cols-1">
          <form
            onSubmit={handleSubmitRecoverPwd}
            className="grid grid-cols-1 w-full gap-y-8"
          >
            <BasePwdField
              {...{
                register,
                errors,
                isVisible: isPwdVisible,
                handleChangeVisibility: handleChangePwdVisibility,
                field: pwdFieldToCreate,
              }}
            />
            {!!Object.keys(errors?.password ?? {}).length && (
              <div className="w-full grid grid-cols-2 gap-5 sm:grid-cols-4">
                <PasswordChecker {...{ watch }} />
                <PasswordLength {...{ watch }} />
              </div>
            )}

            <GeneratePwd />

            <BasePwdField
              {...{
                register,
                errors,
                custom: customConfirmPwd,
                isVisible: isConfirmPwdVisible,
                handleChangeVisibility: handleChangeConfirmPwdVisibility,
                field: confirmPwdField,
              }}
            />

            {isPending ? (
              <SpinnerBtnReact />
            ) : (
              <div className="w-full mt-2 max-w-[250px] md:max-w-[300px] justify-self-center flex justify-center">
                <ButtonAnimated
                  {...{
                    styleTxt: "txt__02 z-40 relative",
                    label: "Change Password",
                    type: "submit",
                  }}
                />
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
export default RecoverPwd;
