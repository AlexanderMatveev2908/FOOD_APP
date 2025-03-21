import { FormProvider } from "react-hook-form";
import LoaderPageReact from "../../../UI/components/loaders/LoaderPageReact/LoaderPageReact";
import { useAddDish } from "./useAddDish";
import MyDishesForm from "../../../UI/forms/MyDishes/MyDishesForm";
import ErrEmoji from "../../../UI/components/ErrEmoji";
import { useScrollTop } from "../../../core/hooks/useScrollTop";

const AddDish = () => {
  useScrollTop();

  const {
    isPendingIds,
    formContext,
    restInfo,
    isSuccessIds,
    handleSave,
    isPending,
  } = useAddDish();

  return isPendingIds ? (
    <LoaderPageReact />
  ) : (
    <div className="w-full grid grid-cols-1 gap-5 justify-items-center">
      <span className="txt__04">Add Dish</span>
      {isSuccessIds && restInfo?.length ? (
        <FormProvider {...formContext}>
          <MyDishesForm
            {...{
              formContext,
              restInfo,
              handleSave,
              isPending,
            }}
          />
        </FormProvider>
      ) : (
        <ErrEmoji {...{ txt: "We did not found any restaurant 🤔" }} />
      )}
    </div>
  );
};
export default AddDish;
