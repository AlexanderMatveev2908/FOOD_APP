import express from "express";
import { verifyAccessToken } from "../../middleware/general/verifyAccessToken.js";
import { asyncWrapper } from "../../middleware/general/asyncWrapper.js";
import { getCartUser } from "../../controllers/cartControllers/get.js";
import {
  decQtyCart,
  delCart,
  delItem,
  incQtyCart,
  updateQtyByInput,
  updateQtyIntervalFormFront,
} from "./../../controllers/cartControllers/update.js";
import { validateDishId } from "../../middleware/cart/validateDishId.js";

const router = express.Router();

router
  .route("/")
  .get(verifyAccessToken, asyncWrapper(getCartUser))
  .post(verifyAccessToken, validateDishId, asyncWrapper(incQtyCart))
  .put(verifyAccessToken, validateDishId, asyncWrapper(decQtyCart));

router.put(
  "/del-item",
  verifyAccessToken,
  validateDishId,
  asyncWrapper(delItem)
);
router.put(
  "/put-input",
  verifyAccessToken,
  validateDishId,
  asyncWrapper(updateQtyByInput)
);

router.put(
  "/put-int",
  verifyAccessToken,
  validateDishId,
  asyncWrapper(updateQtyIntervalFormFront)
);

router.delete("/del-cart", verifyAccessToken, asyncWrapper(delCart));

export default router;
