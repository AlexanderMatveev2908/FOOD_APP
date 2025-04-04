import {
  allFields,
  fieldsDividedByArea,
  totLenUserDetails,
} from "../../../../../core/config/fieldsArr/fields.ts";
import { UserDetailsFieldType } from "../../../../../core/config/fieldsArr/typesFields.ts";
import {
  UserDataFormType,
  UserProfileActions,
  UserProfileFormType,
} from "./types";

export const getRespectiveVals = (
  currFieldsArea: UserDetailsFieldType[],
  user: UserProfileFormType["user"]
) => {
  let obj;

  Object.keys(user).forEach((key) => {
    if ([...currFieldsArea.map((el) => el.field)].includes(key))
      obj = { ...obj, [key]: user[key as keyof typeof user] };
  });

  return obj;
};

export const getRespectiveVals_2 = (
  currFieldsArea: UserDetailsFieldType[],
  user: UserProfileFormType["user"]
) => {
  let respectiveVals;

  for (const key in user) {
    if (currFieldsArea.map((field) => field.field).includes(key)) {
      respectiveVals = {
        ...respectiveVals,
        [key]: user[key as keyof typeof user],
      };
    }
  }

  return respectiveVals;
};

export const validateVals = (
  respectiveVals: { [key: string]: string },
  currArea: UserDetailsFieldType[]
) => {
  let isCurrFormValid = true;

  for (let i = 0; i < currArea.length; i++) {
    const currReg = currArea[i].reg;

    if (!currReg.test(respectiveVals[currArea[i].field])) {
      isCurrFormValid = false;
    }
  }

  return isCurrFormValid;
};

export const handleErr = (
  dispatch,
  name: string,
  value: string,
  currField: UserDetailsFieldType
) => {
  dispatch({
    type: UserProfileActions.SET_ERR,
    payload: {
      field: name,
      msg: currField.reg.test(value ?? "") ? null : currField.msg,
    },
  });

  dispatch({
    type: UserProfileActions.SET_REQUIRED,
    payload: {
      field: name,
      required: value ? null : `${currField.label} is required`,
    },
  });
};

export const handleBtns = (
  dispatch,
  state,
  name?: string,
  value?: string,
  curr?: number
) => {
  const currFieldsArea = fieldsDividedByArea[curr ?? state.currForm.curr];

  const respectiveVals = getRespectiveVals_2(currFieldsArea, state.user);

  if (name !== undefined && value !== undefined) respectiveVals[name] = value;

  const isCurrFormValid = validateVals(respectiveVals, currFieldsArea);

  dispatch({
    type: UserProfileActions.SET_NEXT_DISABLED,
    payload: {
      isNextDisabled: !isCurrFormValid,
    },
  });
};

export const handleChange = (
  dispatch,
  cbErr,
  cbBtns,
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const { name, value } = e.target;

  const [currField] = allFields.filter((field) => field.field === name);

  cbErr(name, value, currField);

  cbBtns(name, value);

  dispatch({
    type: UserProfileActions.UPDATE_FIELD,
    payload: { field: name, val: value },
  });
};

export const handlePrev = (dispatch, curr) =>
  curr > 0
    ? dispatch({
        type: UserProfileActions.SET_CURR,
        payload: { curr: "PREV" },
      })
    : undefined;

export const handleNext = (dispatch, currForm, cbBtns) => {
  if (currForm.curr < totLenUserDetails - 1 && !currForm.isNextDisabled)
    dispatch({
      type: UserProfileActions.SET_CURR,
      payload: { curr: "NEXT" },
    });

  cbBtns(undefined, undefined, currForm.curr + 1);
};

export const setDetailsFields = (dispatch, details: UserDataFormType) =>
  dispatch({
    type: UserProfileActions.SET_FETCHED_DATA,
    payload: {
      user: details,
    },
  });
