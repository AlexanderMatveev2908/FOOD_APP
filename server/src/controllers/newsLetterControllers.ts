import { Request, Response } from "express";
import { RequestWithUserId } from "../middleware/general/verifyAccessToken.js";
import User from "../models/User.js";
import { checkTokenSHA, genTokenSHA } from "../utils/token.js";
import NonLoggedUserNewsLetter from "../models/UserNewsLetter.js";
import {
  baseErrResponse,
  unauthorizedErr,
  userNotFound,
} from "../utils/baseErrResponse.js";
import { sendSubScriptionNewsLetterConfirmed } from "../utils/mail.js";

export const toggleUserNewsLetter = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { type } = req.body;

  const { token, hashedToken, expiryVerification } = genTokenSHA("newsletter");

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        hasSubscribedToNewsletter: type === "subscribe",
        "tokens.unSubScribeNewsLetter.hashed": hashedToken,
        "tokens.unSubScribeNewsLetter.expiry": expiryVerification,
      },
    },
    { new: true, select: "hasSubscribedToNewsletter firstName lastName email" }
  );

  if (!updatedUser) return userNotFound(res);

  await sendSubScriptionNewsLetterConfirmed(
    updatedUser,
    token,
    "logged",
    "subscribe"
  );

  return res.status(200).json({
    msg: "User toggled to newsletter",
    success: true,
  });
};

export const subscribeNonLoggedUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email } = req.body;

  const { token, hashedToken, expiryVerification } = genTokenSHA("newsletter");

  const existingUser = await User.findOne({ email });
  const existingSubscription = await NonLoggedUserNewsLetter.findOne({
    email,
  }).lean();

  if (existingUser) {
    if (existingUser.hasSubscribedToNewsletter) {
      return baseErrResponse(res, 409, "User already subscribed");
    } else {
      existingUser.hasSubscribedToNewsletter = true;
      existingUser.tokens.unSubScribeNewsLetter = {
        hashed: hashedToken,
        expiry: expiryVerification,
      };

      await existingUser.save();

      await sendSubScriptionNewsLetterConfirmed(
        existingUser,
        token,
        "logged",
        "subscribe"
      );

      return res.status(200).json({
        msg: "User subscribed to newsletter",
        success: true,
      });
    }
  } else if (existingSubscription) {
    return baseErrResponse(res, 409, "User already subscribed");
  }

  const newUser = await NonLoggedUserNewsLetter.create({
    email,
    hashedTokenToUnsubscribe: hashedToken,
    tokenExpiry: expiryVerification,
  });

  await sendSubScriptionNewsLetterConfirmed(
    newUser,
    token,
    "non-logged",
    "subscribe"
  );

  return res.status(201).json({
    msg: "User subscribed to newsletter",
    success: true,
  });
};

export const unsubScribeNewsLetterViaEmailLinkLogged = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId, token } = req.body;

  const user = await User.findById(userId);

  if (!user) return userNotFound(res);
  if (!user.hasSubscribedToNewsletter)
    return baseErrResponse(res, 403, "User not subscribed to newsletter");
  if (!user.tokens.unSubScribeNewsLetter?.hashed)
    return unauthorizedErr(res, "Verification token not emitted");

  const isExpired =
    new Date(user.tokens.unSubScribeNewsLetter?.expiry ?? 0).getTime() <
    Date.now();
  const isMatch = checkTokenSHA(
    token,
    user.tokens.unSubScribeNewsLetter?.hashed ?? "",
    "newsletter"
  );
  if (isExpired || !isMatch) {
    user.tokens.unSubScribeNewsLetter = {
      hashed: null,
      expiry: null,
    };

    await user.save();

    return unauthorizedErr(res, isExpired ? "Token Expired" : "Invalid Token");
  }

  user.hasSubscribedToNewsletter = false;
  user.tokens.unSubScribeNewsLetter = {
    hashed: null,
    expiry: null,
  };

  await user.save();

  return res.status(200).json({
    msg: "User unsubscribed to newsletter",
    success: true,
  });
};

export const unsubScribeNewsLetterViaEmailLinkNonLogged = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { token, userId } = req.body;

  const user = await NonLoggedUserNewsLetter.findById(userId);
  if (!user) return userNotFound(res);
  if (!user?.hashedTokenToUnsubscribe)
    return unauthorizedErr(res, "Verification token not emitted");

  const isMatch = checkTokenSHA(
    token,
    user.hashedTokenToUnsubscribe,
    "newsletter"
  );
  const isExpired = new Date(user?.tokenExpiry ?? 0).getTime() < Date.now();
  if (!isMatch || isExpired) {
    user.tokenExpiry = null;
    user.hashedTokenToUnsubscribe = null;

    await user.save();

    return unauthorizedErr(res, isExpired ? "Token Expired" : "Invalid Token");
  }

  const result = await NonLoggedUserNewsLetter.deleteOne({ email: user.email });
  if (result?.deletedCount !== 1) return userNotFound(res);
  else
    return res
      .status(200)
      .json({ msg: "User unsubscribed to newsletter", success: true });
};

export const sendEmailUnsubscribeRetry = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email } = req.body;

  const { token, hashedToken, expiryVerification } = genTokenSHA("newsletter");

  const existingNonLoggedUser = await NonLoggedUserNewsLetter.findOne({
    email,
  });
  if (!existingNonLoggedUser) {
    const loggedUser = await User.findOne({ email });

    if (!loggedUser) userNotFound(res);
    if (!loggedUser?.hasSubscribedToNewsletter)
      return baseErrResponse(res, 403, "User not subscribed");

    loggedUser.tokens.unSubScribeNewsLetter = {
      hashed: hashedToken,
      expiry: expiryVerification,
    };

    await loggedUser.save();

    await sendSubScriptionNewsLetterConfirmed(
      loggedUser,
      token,
      "logged",
      "unsubscribe"
    );

    return res.status(200).json({
      msg: "Email sent to unsubscribe",
      success: true,
    });
  } else {
    existingNonLoggedUser.hashedTokenToUnsubscribe = hashedToken;
    existingNonLoggedUser.tokenExpiry = expiryVerification;

    await existingNonLoggedUser.save();

    await sendSubScriptionNewsLetterConfirmed(
      existingNonLoggedUser,
      token,
      "non-logged",
      "unsubscribe"
    );

    return res.status(200).json({
      msg: "Email sent to unsubscribe",
      success: true,
    });
  }
};
