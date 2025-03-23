var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import { checkUserProperty } from "../../utils/checkers/myRestaurants.js";
import User from "../../models/User.js";
import mongoose from "mongoose";
import { makeQueriesMyRestaurants } from "../../utils/makeQueries/myRestaurants.js";
import Restaurant from "../../models/Restaurant.js";
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
import Order from "../../models/Order.js";
import Review from "../../models/Review.js";
import { makeSortersMyRest } from "../../utils/makeSorters/myRest.js";
import { makeSorters } from "./../../../src/utils/makeSorters/general";
export const getMyRestaurants = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const { userId } = req;
    const query = makeQueriesMyRestaurants(req);
    const sorter = makeSorters(req, "restaurants.");
    const totDocuments = yield Restaurant.countDocuments({
      owner: new mongoose.Types.ObjectId(userId),
    });
    if (!totDocuments)
      return res.status(200).json({ restaurants: [], totDocuments: 0 });
    const { limit, skip } = calcPagination(req);
    const result = yield User.aggregate([
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
          "restaurants.avgPrice": makeAvgMyRest(
            "$restaurants.dishes",
            ".price"
          ),
          "restaurants.avgQuantity": makeAvgMyRest(
            "$restaurants.dishes",
            ".quantity"
          ),
        },
      },
      makeLookUp("restaurants", "orders"),
      {
        $set: Object.assign(
          { "restaurants.ordersCount": { $size: "$restaurants.orders" } },
          makeOrdersStatusFields()
        ),
      },
      makeLookUp("restaurants", "reviews"),
      {
        $set: Object.assign(
          Object.assign(
            { "restaurants.reviewsCount": { $size: "$restaurants.reviews" } },
            makeReviewsCountFields()
          ),
          {
            "restaurants.avgRating": makeAvgMyRest(
              "$restaurants.reviews",
              ".rating"
            ),
          }
        ),
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
    const restaurants =
      (_b =
        (_a = result[0]) === null || _a === void 0
          ? void 0
          : _a.paginatedRes[0]) === null || _b === void 0
        ? void 0
        : _b.restaurants;
    const nHits =
      (_e =
        (_d =
          (_c = result === null || result === void 0 ? void 0 : result[0]) ===
            null || _c === void 0
            ? void 0
            : _c.count) === null || _d === void 0
          ? void 0
          : _d[0]) === null || _e === void 0
        ? void 0
        : _e.nHits;
    const totPages = Math.ceil(
      (nHits !== null && nHits !== void 0 ? nHits : 0) / limit
    );
    return res.status(200).json({
      success: true,
      restaurants,
      totDocuments,
      totPages,
      nHits,
    });
  });
export const getMySingleRestaurantInfoToUpdate = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { user, restaurant } = yield checkUserProperty(req, res);
    if ([user, restaurant].some((el) => !el)) return;
    return res.status(200).json({ success: true, restaurant });
  });
export const getMySingleRestaurant = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const { userId } = req;
    const { restId } = req.params;
    const hasDocuments = yield Restaurant.countDocuments({
      owner: new mongoose.Types.ObjectId(userId),
    });
    if (!hasDocuments) return badRequest(res);
    yield Order.find({});
    yield Review.find({});
    const restaurant = yield Restaurant.findOne({
      owner: new mongoose.Types.ObjectId(userId),
      _id: new mongoose.Types.ObjectId(restId),
    })
      .populate("dishes")
      .populate("orders")
      .populate("reviews")
      .lean();
    if (!restaurant) return baseErrResponse(res, 404, "Restaurant not found");
    restaurant.dishesCount =
      (_a = restaurant.dishes) === null || _a === void 0 ? void 0 : _a.length;
    restaurant.avgPrice = restaurant.dishesCount
      ? ((_b = restaurant.dishes) === null || _b === void 0
          ? void 0
          : _b.reduce((acc, curr) => acc + curr.price, 0)) /
        restaurant.dishesCount
      : 0;
    restaurant.avgQuantity = restaurant.dishesCount
      ? ((_c = restaurant.dishes) === null || _c === void 0
          ? void 0
          : _c.reduce((acc, curr) => acc + curr.quantity, 0)) /
        restaurant.dishesCount
      : 0;
    let i = 0;
    restaurant.ordersCount =
      (_d = restaurant.orders) === null || _d === void 0 ? void 0 : _d.length;
    restaurant.ordersByStatus = [];
    while (i < statusVars.length) {
      restaurant.ordersByStatus.push({
        status: `${statusVars[i]}`,
        count: restaurant.ordersCount
          ? (_e = restaurant.orders) === null || _e === void 0
            ? void 0
            : _e.filter((order) => order.status === statusVars[i]).length
          : 0,
      });
      i++;
    }
    i = 0;
    restaurant.reviewsCount =
      (_f = restaurant.reviews) === null || _f === void 0 ? void 0 : _f.length;
    restaurant.reviewsByRating = [];
    while (i < countRatingVars.length) {
      restaurant.reviewsByRating.push({
        rating: `rating_${countRatingVars[i]}`,
        count: restaurant.reviewsCount
          ? (_g = restaurant.reviews) === null || _g === void 0
            ? void 0
            : _g.filter(
                (review) =>
                  review.rating === countRatingVars[countRatingVars[i]]
              ).length
          : 0,
      });
      i++;
    }
    restaurant.avgRating = restaurant.reviewsCount
      ? ((_h = restaurant.reviews) === null || _h === void 0
          ? void 0
          : _h.reduce((acc, curr) => acc + curr.rating, 0)) /
        restaurant.reviewsCount
      : 0;
    return res.status(200).json({ success: true, restaurant });
  });
