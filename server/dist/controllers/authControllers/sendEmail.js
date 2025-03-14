var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../../models/User.js";
import { genTokenSHA } from "../../utils/token.js";
import { sendUserEmail } from "../../utils/mail.js";
import { baseErrResponse, userNotFound } from "../../utils/baseErrResponse.js";
export const sendEmailUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const { type } = req.query;
    const user = yield User.findOne({ email });
    if (!user)
        return userNotFound(res);
    if (!user.isVerified && type === "recover-pwd")
        return baseErrResponse(res, 403, "User not verified");
    if (user.isVerified && type === "verify-account")
        return baseErrResponse(res, 409, "User already verified");
    const { token, hashedToken, expiryVerification } = genTokenSHA("auth");
    if (type === "verify-account") {
        user.tokens.verifyAccount = {
            hashed: hashedToken,
            expiry: expiryVerification,
        };
    }
    else if (type === "recover-pwd") {
        user.tokens.recoverPwd = {
            hashed: hashedToken,
            expiry: expiryVerification,
        };
    }
    yield user.save();
    const filteredUser = {
        _id: user._id,
        email: user.email,
    };
    yield sendUserEmail({
        user: filteredUser,
        token,
        type: type,
    });
    return res.status(200).json({ msg: "Email sent successfully" });
});
