/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  REG_MONGO,
  REG_PRICE,
  REG_QTY,
  REG_SEARCH,
} from "../../core/config/constants/regex";
import { SearchMyDishesFormType } from "../../types/allTypes/myDishes";

const genericCheck = (
  pair: [string, any],
  formDataHook: SearchMyDishesFormType
) => {
  if (!pair[1]) return false;

  if (["search", "searchVals"].includes(pair[0])) {
    if (
      !formDataHook.searchVals?.length ||
      !formDataHook.search ||
      !REG_SEARCH.test(formDataHook.search) ||
      (["id", "restaurantId"].includes(formDataHook.searchVals?.[0]) &&
        !REG_MONGO.test(formDataHook.search))
    )
      return false;
  }

  return true;
};

export const createURLParams = (formDataHook) => {
  const params = new URLSearchParams();

  for (const pair of Object.entries(formDataHook ?? {})) {
    if (!genericCheck(pair, formDataHook)) continue;

    if (Array.isArray(pair[1])) {
      if (pair[1]?.length) params.append(pair[0], pair[1].join(","));
    } else {
      params.append(pair[0], pair[1] as string);
    }
  }
  return params;
};

export const createURLParamsMyDishes = (formDataHook) => {
  const params = new URLSearchParams();

  if (!formDataHook) return params;

  for (const pair of Object.entries(formDataHook ?? {})) {
    if (!pair[1]) continue;

    if (!genericCheck(pair, formDataHook)) continue;

    if (Array.isArray(pair[1])) {
      if (pair[1]?.length) params.append(pair[0], pair[1].join(", "));
    } else {
      if (["minPrice", "maxPrice"].includes(pair[0])) {
        if (!REG_PRICE.test((pair[1] as string) ?? "")) continue;

        if (
          ([formDataHook.minPrice, formDataHook.maPrice].every((el) => !!el) &&
            pair[0] === "minPrice" &&
            +pair[1] > +formDataHook.maxPrice) ||
          (pair[0] === "maxPrice" && +pair[1] < formDataHook.minPrice)
        )
          continue;
      }
      if (["minQuantity", "maxQuantity"].includes(pair[0])) {
        if (!REG_QTY.test((pair[1] as string) ?? ""))
          if (
            ([formDataHook.minQuantity, formDataHook.maxQuantity].every(
              (el) => !!el
            ) &&
              pair[0] === "minQuantity" &&
              +pair[1] > +formDataHook.maxQuantity) ||
            (pair[0] === "maxQuantity" && +pair[1] < +formDataHook.minQuantity)
          )
            continue;
      }

      params.append(pair[0], pair[1] as string);
    }
  }
  return params;
};
