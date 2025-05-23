import { Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import Order, { OrderType } from "../../models/Order.js";
import { makeQMyOrders } from "../../utils/makeQueries/myOrders.js";
import { makeSorters } from "../../utils/makeSorters/general.js";
import {
  heapDiscountAsc,
  heapDiscountDesc,
  mergeSortPrice,
  quickSortDate,
} from "./funnyRecursive.js";
import { calcPagination } from "../../utils/makeQueries/calcPagination.js";
import { handleNoHits } from "../../utils/handleNoHits.js";
import { makeMongoId } from "../../utils/dbPipeline/general.js";
import { badRequest, baseErrResponse } from "../../utils/baseErrResponse.js";
import { ObjectId } from "mongoose";
import { ReviewType } from "../../models/Review.js";
import { RestaurantType } from "../../models/Restaurant.js";

const getCreatedAt = (el: OrderType) => new Date(el.createdAt);
const getUpdatedAt = (el: OrderType) => new Date(el.updatedAt);

export const getOrders = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;

  const queryObj = makeQMyOrders(req);
  const sortObj = makeSorters(req, "");
  const { limit, skip } = calcPagination(req);

  const totDocuments = await Order.countDocuments({
    userId: makeMongoId(userId ?? ""),
  });
  const nHits = await Order.countDocuments(queryObj);
  if (!totDocuments) return handleNoHits(res, totDocuments);

  let orders = (await Order.find(queryObj)
    .skip(skip)
    .limit(limit)
    .populate({
      path: "restaurantId",
      populate: {
        path: "reviews",
      },
    })
    .lean()) as OrderType[] | [];
  if (!orders.length) return handleNoHits(res, totDocuments);

  if (sortObj?.createdAt)
    orders = quickSortDate(orders, sortObj.createdAt, getCreatedAt);
  if (sortObj?.updatedAt)
    orders = quickSortDate(orders, sortObj.updatedAt, getUpdatedAt);
  if (sortObj?.price) orders = mergeSortPrice(orders, sortObj.price);

  if (sortObj?.discount)
    if (sortObj?.discount === 1) heapDiscountAsc(orders);
    else if (sortObj?.discount === -1) heapDiscountDesc(orders);

  let i = orders.length - 1;

  do {
    const curr = orders[i];
    curr.isAdmin = curr.userId + "" === userId;

    curr.hasLeftReview = (curr?.restaurantId as any)?.reviews?.some(
      (review: ReviewType) => review.user + "" === userId
    );

    curr.restaurantId = curr?.restaurantId
      ? ({
          _id: (curr.restaurantId as any)?._id,
          delivery: (curr.restaurantId as any)?.delivery,
        } as any)
      : null;
    i--;
  } while (i >= 0);

  const totPages = Math.ceil(nHits / limit);

  return res.status(200).json({
    success: true,
    message: "Orders retrieved successfully",
    totDocuments,
    totPages,
    nHits,
    orders,
  });
};

export const getOrderStatus = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { orderId } = req.params;

  const order = (await Order.findOne({
    userId: makeMongoId(userId ?? ""),
    _id: makeMongoId(orderId),
  }).lean()) as OrderType | null;
  if (!order) return baseErrResponse(res, 404, "Order not found");
  if (["pending", "cancelled"].includes(order.status)) return badRequest(res);

  return res.status(200).json({
    success: true,
    message: "Order ok",
    status: order.status,
  });
};
