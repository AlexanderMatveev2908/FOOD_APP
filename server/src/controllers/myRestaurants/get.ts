import { Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import { checkUserProperty } from "../../utils/checkers/myRestaurants.js";
import User from "../../models/User.js";
import mongoose from "mongoose";

export const getMyRestaurants = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;

  const result = await User.aggregate([
    // search user restaurants by his id string converted to ObjectId for mongo
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
    // with unwind we can process each el similar to a map in js
    { $unwind: "$restaurants" },
    // we add necessary fields here to not do it in frontend and get values already processed
    {
      $lookup: {
        from: "dishes",
        localField: "restaurants.dishes",
        foreignField: "_id",
        as: "restaurants.dishes",
      },
    },
    {
      $addFields: {
        "restaurants.dishesCount": { $size: "$restaurants.dishes" },
      },
    },

    {
      $lookup: {
        from: "orders",
        localField: "restaurants.orders",
        foreignField: "_id",
        as: "restaurants.orders",
      },
    },
    {
      $addFields: {
        "restaurants.ordersCount": { $size: "$restaurants.orders" },
      },
    },

    {
      $lookup: {
        from: "reviews",
        localField: "restaurants.reviews",
        foreignField: "_id",
        as: "restaurants.reviews",
      },
    },
    {
      $addFields: {
        "restaurants.reviewsCount": { $size: "$restaurants.reviews" },
      },
    },

    // make our operations of sorting before group cause after is not possible modifying their order
    { $sort: { "restaurants.createdAt": -1 } },
    // after unwind we need an array of els again cause is easier to work with
    {
      $group: {
        _id: "$_id",
        restaurants: { $push: "$restaurants" },
      },
    },
    // facet runs multiples query in parallel so is pretty fast but they must be independent one by other
    {
      $facet: {
        paginatedRes: [
          {
            $project: {
              restaurants: 1,
              _id: 0,
            },
          },
        ],
        // we will need it for pagination in frontend
        totCount: [
          {
            $count: "count",
          },
        ],
      },
    },
  ]);
  // most of cases $ is used for dynamic fields, to access property of obj and create new fields

  const nHits = result[0]?.totCount?.[0]?.count;
  const restaurants = result[0]?.paginatedRes?.[0]?.restaurants;

  if (!nHits)
    return res
      .status(200)
      .json({ success: true, restaurants: [], totRestaurants: 0 });

  return res.status(200).json({
    success: true,
    restaurants,
    totRestaurants: nHits,
  });
};

export const getMySingleRestaurant = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { user, restaurant } = await checkUserProperty(req, res);
  if ([user, restaurant].some((el) => !el)) return;

  return res.status(200).json({ success: true, restaurant });
};
