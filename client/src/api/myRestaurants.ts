import { foodAppInstance } from "../config/constants/axiosInstance";
import { ReturnAPIBasic } from "../types/API";
import { MyRestaurantType } from "../types/myRestaurants";

export const createRestaurantAPI = async (
  formData: FormData
): Promise<ReturnAPIBasic & { restId: string }> => {
  const { data } = await foodAppInstance.post("/my-restaurants", formData);

  return data;
};

export const getMyRestaurantsAPI = async (): Promise<
  ReturnAPIBasic & { totRestaurants: number; restaurants: MyRestaurantType[] }
> => {
  const { data } = await foodAppInstance.get("/my-restaurants");

  return data;
};

export const getInfoRestaurantAPI = async (id: string) => {
  const { data } = await foodAppInstance.get(
    `/my-restaurants/info-restaurant/${id}`
  );

  return data;
};

export const updateRestaurantAPI = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}): Promise<ReturnAPIBasic> => {
  const { data } = await foodAppInstance.patch(
    `/my-restaurants/${id}`,
    formData
  );

  return data;
};
