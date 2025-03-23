import express from "express";
import { asyncWrapper } from "../../middleware/general/asyncWrapper.js";
import { makeLimiter } from "../../utils/makeLimiter.js";
import { validatorRegister } from "../../middleware/auth/validateRegister.js";
import { validatorLogin } from "../../middleware/auth/validateLogin.js";
import { validatorVerify } from "../../middleware/auth/validatorVerify.js";
import { validatorRecoverPwd } from "../../middleware/auth/validatorRecoverPwd.js";
import { refreshToken } from "../../controllers/authControllers/refresh.js";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../../controllers/authControllers/basicAuth.js";
import { sendEmailUser } from "../../controllers/authControllers/sendEmail.js";
import {
  verifyAccount,
  verifyRecoverPwd,
} from "../../controllers/authControllers/verify.js";
import { recoverPwd } from "../../controllers/authControllers/recoverPwd.js";
import { validatorSendEmail } from "../../middleware/auth/validatorSendEmail.js";
import { HOUR } from "../../config/constants/time.js";

const router = express();

router.get("/refresh", asyncWrapper(refreshToken));

router.post("/register", validatorRegister, asyncWrapper(registerUser));
router.post(
  "/login",
  makeLimiter({ max: 5 }),
  validatorLogin,
  asyncWrapper(loginUser)
);
router.post("/logout", asyncWrapper(logoutUser));

router.post(
  "/send-email",
  makeLimiter({ max: 5, ms: HOUR }),
  validatorSendEmail,
  asyncWrapper(sendEmailUser)
);

router.post(
  "/verify-account",
  makeLimiter({ max: 5, ms: HOUR }),
  validatorVerify,
  asyncWrapper(verifyAccount)
);
router.post(
  "/verify-recover-pwd",
  makeLimiter({ max: 5, ms: HOUR }),
  validatorVerify,
  asyncWrapper(verifyRecoverPwd)
);

router.patch("/recover-pwd", validatorRecoverPwd, asyncWrapper(recoverPwd));

export default router;
