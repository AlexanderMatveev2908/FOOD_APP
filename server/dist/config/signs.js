import { isDev } from "./currMode.js";
export const EXPIRY_ACCESS = isDev ? "15m" : "15m"; //basic access token
export const ACCESS_SIGN = process.env.JWT_ACCESS_SIGN;
const GEN_EXPIRY_AUTH = () => new Date(Date.now() + 1000 * 60 * 15); //verify-email, recover-pwd
const GEN_EXPIRY_NEWSLETTER = () => new Date(Date.now() + 1000 * 60 * 30); // newsletter unsubscribe
const GEN_EXPIRY_MANAGE_ACCOUNT = () => new Date(Date.now() + 1000 * 60 * 15); // manage-account
const GEN_EXPIRY_VERIFY_NEW_EMAIL = () => new Date(Date.now() + 1000 * 60 * 15); // verify-new-email
export const GEN_EXPIRY_REFRESH = () => isDev
    ? new Date(Date.now() + 1000 * 60 * 60 * 24) // refresh token for access token
    : new Date(Date.now() + 1000 * 60 * 60 * 24);
export const GET_SIGN = (type) => type === "auth"
    ? process.env.AUTH_SIGN
    : type === "manageAccount"
        ? process.env.MANAGE_ACCOUNT_SIGN
        : type === "verifyNewEmail"
            ? process.env.VERIFY_NEW_EMAIL_SIGN
            : process.env.NEWSLETTER_SIGN;
export const GET_EXPIRY = (type) => type === "auth"
    ? GEN_EXPIRY_AUTH()
    : type === "manageAccount"
        ? GEN_EXPIRY_MANAGE_ACCOUNT()
        : type === "verifyNewEmail"
            ? GEN_EXPIRY_VERIFY_NEW_EMAIL()
            : GEN_EXPIRY_NEWSLETTER();
