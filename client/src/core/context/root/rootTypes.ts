import { UseFormReturn } from "react-hook-form";
import {
  PopupActionTypes,
  PopupStateType,
  PopupValsType,
} from "../../../types/allTypes/popup";
import {
  ToastActionTypes,
  ToastStateType,
  ToastValsType,
} from "../../../types/allTypes/toastTypes";
import {
  UserActionTypes,
  UserStateType,
  UserValsType,
} from "../../../types/allTypes/userTypes";
import { FormSearchType } from "../../../types/allTypes/restAdmin";
import { DishMenuFormType } from "../../../types/types";

export type RootStateType = {
  toastState: ToastStateType;
  userState: UserStateType;
  popupState: PopupStateType;
};

export type RootActionTypes =
  | ToastActionTypes
  | UserActionTypes
  | PopupActionTypes;

export type RootValsType = {
  toastState: ToastValsType;
  userState: UserValsType;
  popupState: PopupValsType;
  formsState: {
    formContextMyRestaurants: UseFormReturn<FormSearchType>;
    formContextMyDishesAddItem: UseFormReturn<DishMenuFormType>;
  };
};
