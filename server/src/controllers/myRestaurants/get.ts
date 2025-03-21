import { Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import { checkUserProperty } from "../../utils/checkers/myRestaurants.js";
import User from "../../models/User.js";
import mongoose, { HydratedDocument } from "mongoose";
import { makeQueriesMyRestaurants } from "../../utils/makeQueries/myRestaurants.js";
import Restaurant, { RestaurantType } from "../../models/Restaurant.js";
import { calcPagination } from "../../utils/calcPagination.js";
import {
  countRatingVars,
  makeAvgMyRest,
  makeOrdersStatusFields,
  makeReviewsCountFields,
  statusVars,
} from "../../utils/dbPipeline/myRestaurants.js";
import { makeLookUp } from "../../utils/dbPipeline/general.js";
import { badRequest, baseErrResponse } from "../../utils/baseErrResponse.js";
import Dish, { DishType } from "../../models/Dish.js";
import Order from "../../models/Order.js";
import Review from "../../models/Review.js";
import { makeSortersMyRest } from "../../utils/makeSorters/myRest.js";

export const getMyRestaurants = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;

  const query = makeQueriesMyRestaurants(req);

  const sorter = makeSortersMyRest(req);

  const totDocuments = await Restaurant.countDocuments({
    owner: new mongoose.Types.ObjectId(userId),
  });

  if (!totDocuments)
    return res.status(200).json({ restaurants: [], totDocuments: 0 });

  const { limit, skip } = calcPagination(req);

  const result = await User.aggregate([
    // search user by his id string converted to ObjectId for mongo
    { $match: { _id: new mongoose.Types.ObjectId(userId) } },
    // i choose to challenge myself by using more nested collections, and to get vals from another collections we use first: the local field is the fields that we keep as ref for that other collection documents we want , so  for user i have an arr of ref id in restaurants key, but from point of view of each restaurant, he has just just a simple _id that for him is the one generated by mongoose but for us, the id with we update the user arr for each create or delete
    {
      $lookup: {
        from: "restaurants",
        localField: "restaurants",
        foreignField: "_id",
        as: "restaurants",
      },
    },
    { $unwind: "$restaurants" },
    // with unwind we can process each el with his own
    makeLookUp("restaurants", "dishes"),
    {
      $set: {
        // we add necessary fields here to not do it in frontend and get values already processed
        "restaurants.dishesCount": { $size: "$restaurants.dishes" },
        "restaurants.avgPrice": makeAvgMyRest("$restaurants.dishes", ".price"),
        "restaurants.avgQuantity": makeAvgMyRest(
          "$restaurants.dishes",
          ".quantity"
        ),
      },
    },

    makeLookUp("restaurants", "orders"),
    {
      $set: {
        "restaurants.ordersCount": { $size: "$restaurants.orders" },
        ...makeOrdersStatusFields(),
      },
    },

    makeLookUp("restaurants", "reviews"),
    {
      $set: {
        "restaurants.reviewsCount": { $size: "$restaurants.reviews" },
        ...makeReviewsCountFields(),
        "restaurants.avgRating": makeAvgMyRest(
          "$restaurants.reviews",
          ".rating"
        ),
      },
    },

    ...(query ? [{ $match: query }] : []),
    // make our operations of sorting before group cause after is not possible modifying their order
    ...(sorter ? [{ $sort: sorter }] : []),
    // after unwind we need an array of els again cause is easier to work with

    {
      $facet: {
        count: [
          {
            $group: {
              _id: null,
              nHits: { $sum: 1 },
            },
          },
        ],

        paginatedRes: [
          { $skip: skip },
          { $limit: limit },

          {
            $group: {
              _id: null,
              restaurants: { $push: "$restaurants" },
            },
          },

          {
            $project: {
              _id: 0,
              "restaurants.dishes": 0,
              "restaurants.orders": 0,
              "restaurants.reviews": 0,
            },
          },
        ],
      },
    },
    // facet runs multiples query in parallel so is pretty fast but they must be independent one by other
  ]);

  const restaurants: RestaurantType[] = result[0]?.paginatedRes[0]?.restaurants;
  const nHits = result?.[0]?.count?.[0]?.nHits;
  const totPages = Math.ceil((nHits ?? 0) / limit);

  return res.status(200).json({
    success: true,
    restaurants,
    totDocuments,
    totPages,
    nHits,
  });
};

export const getMySingleRestaurantInfoToUpdate = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { user, restaurant } = await checkUserProperty(req, res);
  if ([user, restaurant].some((el) => !el)) return;

  return res.status(200).json({ success: true, restaurant });
};

export const getMySingleRestaurant = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { restId } = req.params;

  const hasDocuments = await Restaurant.countDocuments({
    owner: new mongoose.Types.ObjectId(userId),
  });

  if (!hasDocuments) return badRequest(res);

  await Order.find({});
  await Review.find({});

  const restaurant = (await Restaurant.findOne({
    owner: new mongoose.Types.ObjectId(userId),
    _id: new mongoose.Types.ObjectId(restId),
  })
    .populate("dishes")
    .populate("orders")
    .populate("reviews")
    .lean()) as RestaurantType | null;

  if (!restaurant) return baseErrResponse(res, 404, "Restaurant not found");

  restaurant.dishesCount = restaurant.dishes?.length;
  restaurant.avgPrice = restaurant.dishesCount
    ? restaurant.dishes?.reduce((acc: any, curr: any) => acc + curr.price, 0) /
      restaurant.dishesCount
    : 0;
  restaurant.avgQuantity = restaurant.dishesCount
    ? restaurant.dishes?.reduce(
        (acc: number, curr: any) => acc + curr.quantity,
        0
      ) / restaurant.dishesCount
    : 0;

  let i = 0;

  restaurant.ordersCount = restaurant.orders?.length;
  restaurant.ordersByStatus = [];
  while (i < statusVars.length) {
    restaurant.ordersByStatus.push({
      status: `${statusVars[i]}`,
      count: restaurant.ordersCount
        ? restaurant.orders?.filter(
            (order: any) => order.status === statusVars[i]
          ).length
        : 0,
    });
    i++;
  }

  i = 0;

  restaurant.reviewsCount = restaurant.reviews?.length;
  restaurant.reviewsByRating = [];
  while (i < countRatingVars.length) {
    restaurant.reviewsByRating.push({
      rating: `rating_${countRatingVars[i]}`,
      count: restaurant.reviewsCount
        ? restaurant.reviews?.filter(
            (review: any) =>
              review.rating === countRatingVars[countRatingVars[i]]
          ).length
        : 0,
    });
    i++;
  }
  restaurant.avgRating = restaurant.reviewsCount
    ? restaurant.reviews?.reduce(
        (acc: any, curr: any) => acc + curr.rating,
        0
      ) / restaurant.reviewsCount
    : 0;

  return res.status(200).json({ success: true, restaurant });
};
