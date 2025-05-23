var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { checkTokenJWE, genAccessJWT } from "../../utils/token.js";
import User from "../../models/User.js";
import { unauthorizedErr, userNotFound } from "../../utils/baseErrResponse.js";
export const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { refreshToken } = req.cookies;
    if (!refreshToken)
        return unauthorizedErr(res, "REFRESH TOKEN NOT PROVIDED");
    const payload = yield checkTokenJWE(refreshToken !== null && refreshToken !== void 0 ? refreshToken : "");
    if (!payload) {
        return unauthorizedErr(res, "REFRESH TOKEN INVALID");
    }
    const user = yield User.findById(payload === null || payload === void 0 ? void 0 : payload.userId);
    if (!user)
        return userNotFound(res);
    if (((_c = new Date((_b = (_a = user.tokens.refresh) === null || _a === void 0 ? void 0 : _a.expiry) !== null && _b !== void 0 ? _b : 0)) === null || _c === void 0 ? void 0 : _c.getTime()) < Date.now()) {
        user.tokens.refresh = {
            hashed: null,
            expiry: null,
        };
        yield user.save();
        return unauthorizedErr(res, "REFRESH TOKEN EXPIRED");
    }
    const accessToken = genAccessJWT(user._id);
    return res.status(200).json({ accessToken, success: true });
});
