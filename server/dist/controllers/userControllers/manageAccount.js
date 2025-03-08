"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRightManageAccount = void 0;
const User_1 = __importDefault(require("../../models/User"));
const baseErrResponse_1 = require("../../utils/baseErrResponse");
const hashPwd_1 = require("../../utils/hashPwd");
const token_1 = require("../../utils/token");
const getRightManageAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { password } = req.body;
    const user = yield User_1.default.findById(userId);
    if (!user)
        return (0, baseErrResponse_1.userNotFound)(res);
    const isMatch = yield (0, hashPwd_1.checkPwdBcrypt)(password, user.password);
    if (!isMatch)
        return (0, baseErrResponse_1.unauthorizedErr)(res, "Invalid password");
    const { token, hashedToken, expiryVerification } = (0, token_1.genTokenSHA)("manageAccount");
    user.tokens.manageAccount = {
        hashed: hashedToken,
        expiry: expiryVerification,
    };
    yield user.save();
    return res.status(200).json({
        success: true,
        manageAccountToken: token,
    });
});
exports.getRightManageAccount = getRightManageAccount;
