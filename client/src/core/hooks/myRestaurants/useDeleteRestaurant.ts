import { useNavigate, useParams } from "react-router-dom";
import { PopupPayloadSetter } from "../../../types/types";
import { deleteRestaurantAPI } from "../../api/api";
import { usePopup } from ".././useGlobal";
import { useMutation } from "@tanstack/react-query";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { useGetFavHooks } from "../useGetFavHooks";

export const useDeleteRestaurant = () => {
  const { popup, setPopup } = usePopup();
  const { showToastMsg, handleErrAPI } = useGetFavHooks();

  const restId = useParams()?.restId;
  const navigate = useNavigate();

  const { mutate: mutateDelete, isPending: isPendingDelete } = useMutation({
    mutationFn: () => {
      setPopup({ ...(popup as PopupPayloadSetter), isPending: true });

      return deleteRestaurantAPI(restId ?? "");
    },
    onSuccess: () => {
      showToastMsg("Restaurant deleted", "SUCCESS");
      navigate("/my-restaurants", { replace: true });
    },
    onError: (err: ErrFoodApp) => {
      handleErrAPI({ err });
    },
    onSettled: () => setPopup(null),
  });

  const handleDelete = () => {
    mutateDelete();
  };
  const handleClickToOpenPopup = () => {
    setPopup({
      txt: "delete this restaurant?",
      redLabel: "Delete restaurant",
      isPending: isPendingDelete,
      confirmAction: handleDelete,
    });
  };

  return { handleClickToOpenPopup };
};
