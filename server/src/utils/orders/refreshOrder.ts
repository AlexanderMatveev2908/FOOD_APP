import { Response } from "express";
import Order, { OrderItem, OrderType } from "../../models/Order.js";
import Restaurant, { RestaurantType } from "../../models/Restaurant.js";
import User from "../../models/User.js";
import { baseErrResponse } from "../baseErrResponse.js";
import { makeMongoId } from "../dbPipeline/general.js";
import { RequestWithUserId } from "./../../middleware/general/verifyAccessToken.js";
import Dish, { DishType } from "../../models/Dish.js";
import Coupon, { CouponType } from "../../models/Coupon.js";

export const checkIsOpen = (rest: RestaurantType) => {
  let isOpen = true;

  const open = rest.openHours.openTime;
  const close = rest.openHours.closeTime;
  const now =
    new Date().getHours() * 60 +
    new Date().getMinutes() +
    rest.delivery.estTimeDelivery;

  if (open !== close) {
    if (open < close) isOpen = now >= open && now < close;
    else isOpen = now >= open || now < close;
  }

  return isOpen;
};

export const checkDataExistOrder = async (
  req: RequestWithUserId,
  res: Response
) => {
  const { userId } = req;
  const { orderId } = req.query;

  try {
    const order = (await Order.findOne({
      _id: makeMongoId(orderId as string),
      userId: makeMongoId(userId as string),
    }).lean()) as unknown as OrderType;

    if (!order) {
      await User.findByIdAndUpdate(userId, {
        $pull: { orders: makeMongoId(orderId as string) },
      });
      throw new Error("Order not found");
    }

    const restaurant = (await Restaurant.findById(
      order.restaurantId
    ).lean()) as RestaurantType | null;
    if (!restaurant) {
      await Order.findByIdAndDelete(order._id);
      await User.findByIdAndUpdate(userId, {
        $pull: { orders: order._id },
      });
      throw new Error("Restaurant not found");
    }

    return {
      order,
      restaurant,
    };
  } catch (err: any) {
    return baseErrResponse(res, 404, err.message);
  }
};

export const getFreshItemsStock = async (order: OrderType) => {
  const orderItemsFresh: OrderItem[] = await Promise.all(
    order.items.map(async (el: OrderItem) => {
      const dish = (await Dish.findById(el.dishId).lean()) as DishType | null;
      if (!dish || !dish.quantity) return null;

      return {
        ...el,
        quantity: Math.min(el.quantity, dish.quantity),
      };
    })
  ).then((items) => items.filter((el) => !!el));

  const newQty = orderItemsFresh.reduce(
    (acc, curr: OrderItem) => acc + curr.quantity,
    0
  );
  const oldQty = order.items.reduce(
    (acc: number, curr: OrderItem) => acc + curr.quantity,
    0
  );

  return { orderItemsFresh, oldQty, newQty };
};

export const handleCouponOrder = async (
  coupon: CouponType,
  newTotPrice: number,
  orderItemsFresh: OrderItem[]
) => {
  let resetCoupon = false;
  let expiredCoupon = false;
  let discount = 0;

  const isPriceCOndOk = newTotPrice >= coupon.minCartPrice;
  const isStillValid = new Date(coupon.expiryDate).getTime() > Date.now();

  if ((!isPriceCOndOk || !orderItemsFresh.length) && isStillValid) {
    resetCoupon = true;

    await Coupon.findByIdAndUpdate(coupon._id, {
      isActive: true,
    });
  } else if (!isStillValid) {
    expiredCoupon = true;

    await Coupon.findByIdAndUpdate(coupon._id, {
      isActive: false,
    });
  } else {
    discount = +((newTotPrice / 100) * coupon.discount).toFixed(2);
  }

  return {
    resetCoupon,
    expiredCoupon,
    discount,
  };
};
