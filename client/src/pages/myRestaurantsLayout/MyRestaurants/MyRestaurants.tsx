import { FC } from "react";
import RestaurantItem from "./components/RestaurantItem";
import SearchBar from "../../../UI/common/SearchBar/SearchBar";
import {
  myRestFieldsSearch,
  myRestFilters,
  myRestSorters,
} from "./../../../core/config/fieldsArr/allFields/MyRestaurants/filterSort";
import { FormProvider } from "react-hook-form";
import BlockPages from "../../../UI/components/BlockPages/BlockPages";
import ShowNumberHits from "../../../UI/components/ShowNumberHits";
import { useScrollTop } from "../../../core/hooks/UI/useScrollTop";
import { useFormsCustom } from "../../../core/hooks/useGlobal";
import { useCreateQueryHandlers } from "../../../core/hooks/useCreateQueryHandlers";
import { getMyRestaurantsAPI } from "../../../core/api/api";
import ParentContentLoading from "../../../UI/components/ParentContentLoading";

const MyRestaurants: FC = () => {
  useScrollTop();

  const { formContextMyRestaurants: formContext } = useFormsCustom();
  const { watch } = formContext;
  const searchVals = watch("searchVals");
  const search = watch("search");

  const {
    handleSave,
    handleClear,
    propsBlock,
    data,
    isPending,
    isError,
    error,
    isSuccess,
    closeAllDrop,
    id,
  } = useCreateQueryHandlers({
    formCtx: formContext,
    key: "myRestaurantsSearch",
    cbAPI: getMyRestaurantsAPI,
  });

  const { restaurants, totDocuments = 0, totPages = 0, nHits = 0 } = data ?? {};

  return (
    <div className="w-full grid grid-cols-1 justify-items-center gap-5">
      <span className="txt__04">My Restaurants</span>
      <FormProvider {...formContext}>
        <SearchBar
          {...{
            searchFields: myRestFieldsSearch,
            sorters: myRestSorters,
            filters: myRestFilters,
            formContext,
            handleSave,
            handleClear,
            isPending,
            closeAllDrop,
            id,
          }}
        />
      </FormProvider>

      {isSuccess && (
        <ShowNumberHits
          {...{
            nHits: nHits,
            totDocuments,
            search,
            searchVal: searchVals?.[0],
          }}
        />
      )}

      <ParentContentLoading {...{ isPending, isError, error }}>
        {!!restaurants?.length && (
          <div className="container__cards__grid">
            {restaurants?.map((rest) => (
              <RestaurantItem key={rest._id} {...{ rest }} />
            ))}
          </div>
        )}
      </ParentContentLoading>

      <BlockPages {...{ ...propsBlock, totPages }} />
    </div>
  );
};
export default MyRestaurants;
