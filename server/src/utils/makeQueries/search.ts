import { query, Request } from "express";

const makeQueryRange_v_2 = (
  queryObj: any,
  vals: string,
  rangeName: string,
  limit: number
) => {
  const ranges = vals.split(",");

  let i = 0;
  do {
    const [min, max] = ranges[i].split("-").map((el) => +el);

    if ([min, max].some((v) => isNaN(+v))) continue;

    const conditions: any = [];
    if (max === limit)
      conditions.push({ [`restaurant.${rangeName}`]: { $gte: min } });
    else
      conditions.push({
        [`restaurant.${rangeName}`]: { $gte: min, $lte: max },
      });

    if (queryObj?.$and?.length) queryObj.$and.push(...conditions);
    else queryObj.$and = conditions;

    i++;
  } while (i < ranges.length);
};

export const makeQuerySearchAllUsers = (req: Request) => {
  const { categories, avgRatingRange, avgPriceRange } = req.query;

  const queryObj: any = {};

  for (const key of ["country", "state", "city"]) {
    if (req.query[key])
      queryObj[`restaurant.address.${key}`] = {
        $regex: `.*${req.query[key]}.*`,
        $options: "i",
      };

    if (req.query["name"]) {
      queryObj[`restaurant.name`] = {
        $regex: `.*${req.query["name"]}.*`,
        $options: "i",
      };
    }
  }

  if (categories)
    queryObj[`restaurant.categories`] = {
      $in: (categories as string)?.split(","),
    };

  if (avgPriceRange)
    makeQueryRange_v_2(queryObj, avgPriceRange as string, "avgPrice", 100);
  if (avgPriceRange)
    makeQueryRange_v_2(queryObj, avgRatingRange as string, "avgRating", 5);

  return Object.keys(queryObj).length ? queryObj : null;
};
