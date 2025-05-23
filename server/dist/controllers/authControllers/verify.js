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
import { checkTokenSHA, genAccessJWT, genTokenJWE } from "../../utils/token.js";
import { baseErrResponse, unauthorizedErr, userNotFound, } from "../../utils/baseErrResponse.js";
import { isDev } from "../../config/currMode.js";
export const verifyAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const { userId, token } = req.body;
    const user = yield User.findById(userId);
    if (!user)
        return userNotFound(res);
    if (user.isVerified)
        return baseErrResponse(res, 409, "User already verified");
    if (!((_a = user.tokens.verifyAccount) === null || _a === void 0 ? void 0 : _a.hashed))
        return unauthorizedErr(res, "Verification token not emitted");
    const isMatch = checkTokenSHA(token, (_c = (_b = user.tokens.verifyAccount) === null || _b === void 0 ? void 0 : _b.hashed) !== null && _c !== void 0 ? _c : "", "auth");
    const isExpired = ((_f = new Date((_e = (_d = user.tokens.verifyAccount) === null || _d === void 0 ? void 0 : _d.expiry) !== null && _e !== void 0 ? _e : 0)) === null || _f === void 0 ? void 0 : _f.getTime()) < Date.now();
    if (isExpired || !isMatch) {
        user.tokens.verifyAccount = {
            hashed: null,
            expiry: null,
        };
        yield user.save();
        return unauthorizedErr(res, isExpired ? "VERIFY TOKEN EXPIRED" : "VERIFY TOKEN INVALID");
    }
    user.isVerified = true;
    user.tokens.verifyAccount = {
        hashed: null,
        expiry: null,
    };
    const accessToken = genAccessJWT(user._id);
    const { jwe, expiry } = yield genTokenJWE(user._id);
    user.tokens.refresh = {
        hashed: jwe,
        expiry: expiry,
    };
    yield user.save();
    res.cookie("refreshToken", jwe, {
        httpOnly: true,
        secure: isDev,
        expires: expiry,
    });
    return res.status(200).json({ success: true, accessToken });
});
export const verifyRecoverPwd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const { userId, token } = req.body;
    const user = yield User.findById(userId);
    if (!user)
        return userNotFound(res);
    if (!user.isVerified)
        return baseErrResponse(res, 403, "User not verified");
    if (!((_a = user.tokens.recoverPwd) === null || _a === void 0 ? void 0 : _a.hashed))
        return unauthorizedErr(res, "Verification token not emitted");
    const isExpired = ((_d = new Date((_c = (_b = user.tokens.recoverPwd) === null || _b === void 0 ? void 0 : _b.expiry) !== null && _c !== void 0 ? _c : 0)) === null || _d === void 0 ? void 0 : _d.getTime()) < Date.now();
    const isMatch = checkTokenSHA(token, (_e = user.tokens.recoverPwd.hashed) !== null && _e !== void 0 ? _e : "", "auth");
    if (isExpired || !isMatch) {
        user.tokens.recoverPwd = {
            hashed: null,
            expiry: null,
        };
        yield user.save();
        return unauthorizedErr(res, isExpired ? "VERIFY TOKEN EXPIRED" : "VERIFY TOKEN INVALID");
    }
    return res.status(200).json({ success: true });
});
