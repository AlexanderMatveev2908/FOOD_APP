import express from "express";
import authRouter from "./allRoutes/auth.js";
import userRouter from "./allRoutes/user.js";
import newsLetterRouter from "./allRoutes/newsLetter.js";
import myRestaurantsRouter from "./allRoutes/myRestaurants.js";
import routerMyDishes from "./allRoutes/myDishes.js";
import searchRouter from "./allRoutes/search.js";
import { verifyAccessToken } from "../middleware/general/verifyAccessToken.js";
import { asyncWrapper } from "../middleware/general/asyncWrapper.js";
import proxyRouter from "./allRoutes/proxy.js";
import { isDev } from "../config/currMode.js";
import { corsMiddleware } from "../middleware/general/corsMiddleware.js";
import { helmetMid } from "../middleware/general/helmet.js";
// @ts-ignore
import xss from "xss-clean";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import { logReq } from "../middleware/onlyDev/logQuery.js";
import cartRouter from "./allRoutes/cart.js";
import ordersRouter from "./allRoutes/orders.js";
import { webhook } from "../controllers/webhook.js";
import routerManageOrders from "./allRoutes/manageOrders.js";
import myRevRouter from "./allRoutes/myReviews.js";
const router = express.Router();
router.use(helmetMid);
router.use(corsMiddleware);
router.use(xss());
router.use(mongoSanitize());
router.post("/webhook", express.raw({ type: "application/json" }), webhook);
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());
router.use(logReq);
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/newsletter", newsLetterRouter);
router.use("/my-restaurants", verifyAccessToken, myRestaurantsRouter);
router.use("/my-dishes", verifyAccessToken, routerMyDishes);
router.use("/search", searchRouter);
router.use("/my-cart", cartRouter);
router.use("/my-orders", verifyAccessToken, ordersRouter);
router.use("/manage-orders", verifyAccessToken, routerManageOrders);
router.use("/my-reviews", verifyAccessToken, myRevRouter);
if (isDev)
    router.use("/proxy", asyncWrapper(proxyRouter));
export default router;
