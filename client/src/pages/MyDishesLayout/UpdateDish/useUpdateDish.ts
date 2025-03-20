/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@tanstack/react-query";
import { useGetRestaurantsIds } from "../../../core/hooks/useGetRestaurantsIds";
import {
  useFormsCustom,
  usePopup,
  useToast,
} from "../../../core/hooks/useGlobal";
import { useNavigate, useParams } from "react-router-dom";
import { REG_MONGO } from "../../../core/config/constants/regex";
import {
  deleteDishAPI,
  getInfoMyDishAPI,
  updateDishAPI,
} from "../../../core/api/APICalls/myDishes";
import { useEffect } from "react";
import { useHandleErr } from "../../../core/hooks/useHandleErr";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { useScrollTop } from "../../../core/hooks/useScrollTop";
import { prepareFormDataMyDishUpdate } from "../../../utils/allUtils/prepareFormData";

export const useUpdateDish = () => {
  const { formContextMyDishesUpdate: formContext, formContextMyDishesSearch } =
    useFormsCustom();
  const { handleErrAPI } = useHandleErr();
  const { showToastMsg } = useToast();
  const { setPopup, popup } = usePopup();

  useScrollTop();

  const { setValue, reset } = formContext;

  const params = useParams();
  const navigate = useNavigate();

  const dishId = params?.dishId;
  const canStay = REG_MONGO.test(dishId ?? "");

  const { isPendingIds, restInfo, isSuccessIds } = useGetRestaurantsIds();

  const {
    data: dataInfo,
    isPending: isPendingInfo,
    isSuccess: isSuccessInfo,
    isError: isErrorInfo,
    error: errorInfo,
  } = useQuery({
    queryKey: ["myDishInfo", dishId],
    queryFn: () => getInfoMyDishAPI(dishId ?? ""),
    enabled: canStay,
  });

  useEffect(() => {
    const handleSideEffectsGetInfo = () => {
      if (isErrorInfo) {
        handleErrAPI({ err: errorInfo as ErrFoodApp });
      } else if (isSuccessInfo && Object.keys(dataInfo ?? {}).length) {
        console.log(dataInfo);
        const {
          dish: {
            name = "",
            price = 0,
            quantity = 0,
            images = [],
            restaurant = "",
          } = {},
        } = dataInfo ?? {};

        reset({
          restaurant,
          items: [
            {
              name,
              price: price + "",
              quantity: quantity + "",
              images,
            },
          ],
        });
      }
    };

    handleSideEffectsGetInfo();
  }, [
    handleErrAPI,
    isSuccessInfo,
    isErrorInfo,
    errorInfo,
    dataInfo,
    dishId,
    setValue,
    reset,
  ]);

  const { mutate: mutateUpdate, isPending } = useMutation({
    mutationFn: ({ formData, id }: { formData: FormData; id: string }) =>
      updateDishAPI({ formData, id }),
    onSuccess: (data) => {
      showToastMsg("Dish updated successfully", "SUCCESS");

      // i use this from bigger scope
      reset();

      // these below smaller scope
      const { setValue } = formContextMyDishesSearch;

      setValue("searchVals", ["id"]);
      setValue("search", data.dishId);
      setValue("updatedAtSort", ["desc"]);

      navigate("/my-dishes", { replace: true });
    },
    onError: (err: ErrFoodApp) => {
      handleErrAPI({ err });
    },
  });

  const handleSave = formContext.handleSubmit((formDataHook) => {
    const formData = prepareFormDataMyDishUpdate(formDataHook);
    mutateUpdate({ formData, id: dishId ?? "" });
  });

  const { mutate, isPending: isPendingDelete } = useMutation({
    mutationFn: () => {
      setPopup({
        ...popup,
        isPending: true,
      } as any);
      return deleteDishAPI(dishId ?? "");
    },
    onSuccess: () => {
      showToastMsg("Dish deleted successfully", "SUCCESS");
      reset();
      navigate("/my-dishes", { replace: true });
    },
    onError: (err: ErrFoodApp) => {
      handleErrAPI({ err });
    },
    onSettled: () => setPopup(null),
  });

  const handleDeletePopup = () => {
    mutate();
  };
  const handleOpenPopup = () => {
    setPopup({
      txt: "delete this dish ?",
      greenLabel: "I change idea",
      redLabel: "Delete dish",
      isPending: isPendingDelete,
      confirmAction: handleDeletePopup,
    });
  };

  return {
    formContext,
    handleSave,
    isPendingPage: isPendingIds || isPendingInfo,
    restInfo,
    isSuccessIds,
    canStay,
    handleOpenPopup,
    isPending,
  };
};
