import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import { OrderItem, OrderType } from "../../models/Order.js";
import { RestaurantType } from "../../models/Restaurant.js";

export const filterManageOrders = (
  req: RequestWithUserId,
  orders: OrderType[]
) => {
  const { userId } = req;
  const {
    search,
    searchVals,
    ordersStatus,
    categories,
    minPrice,
    maxPrice,
    minQuantity,
    maxQuantity,
  } = req.query;

  const filtered = orders.filter((el: OrderType) => {
    let matchTxt: boolean = true;
    if (search && searchVals) {
      if (!["id", "restaurantId"].includes(searchVals as string)) {
        if (searchVals === "restaurantName")
          matchTxt = new RegExp(`.*${search}.*`, "i").test(
            el["restaurantName" as keyof OrderType] + ""
          );
        else {
          matchTxt = new RegExp(`.*${search}.*`, "i").test(
            (el.restaurantId ?? {})?.[searchVals as any]
          );
        }
      } else {
        if (searchVals === "id") matchTxt = el._id + "" === search;
        else matchTxt = ((el.restaurantId as any) ?? {})?._id + "" === search;
      }
    }

    let matchCat: boolean = true;
    if (categories)
      matchCat = (categories as string)
        .split(",")
        .some((val) => (el.restaurantId as any)?.categories?.includes(val));

    let matchStatus: boolean = true;
    if (ordersStatus)
      matchStatus = (ordersStatus as string)
        .split(",")
        .some((val) => el.status === val);

    const totPrice = el.totPrice + el.delivery - el.discount;
    let matchMinPrice: boolean = true;
    if (minPrice) matchMinPrice = totPrice >= +minPrice;
    let matchMaxPrice: boolean = true;
    if (maxPrice) matchMaxPrice = totPrice <= +maxPrice;

    const totQty = el.items.reduce(
      (acc: number, curr: OrderItem) => acc + curr.quantity,
      0
    );
    let matchMinQTy: boolean = true;
    if (minQuantity) matchMinQTy = totQty >= +minQuantity;
    let matchMaxQTy: boolean = true;
    if (maxQuantity) matchMaxQTy = totQty <= +maxQuantity;

    el.isAdmin = el.userId + "" === userId;

    return (
      matchTxt &&
      matchCat &&
      matchStatus &&
      matchMinPrice &&
      matchMaxPrice &&
      matchMinQTy &&
      matchMaxQTy
    );
  });

  return { filtered };
};
