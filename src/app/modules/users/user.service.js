import httpStatus from "http-status";
import { User } from "./user.model.js";
import ApiError from "../../../errors/ApiError.js";
import { JWTHelper } from "../../../helpers/jwtHelper.js";
import config from "../../../config/index.js";

const registerUser = async (payload) => {
  const { email, password, name, phoneNumber } = payload;
  const user = new User();
  const isUserExist = await user.isUserExist(email);

  if (isUserExist) {
    throw new ApiError(httpStatus.CONFLICT, "User already exists");
  }

  const newUser = new User({
    email,
    password,
    name,
    phoneNumber,
  });

  await newUser.save();

  // Create access and refresh tokens
  const { email: userEmail, role } = newUser;

  const accessToken = JWTHelper.createToken(
    { userEmail, role },
    config.jwt.secret,
    config.jwt.expireIn
  );

  const refreshToken = JWTHelper.createToken(
    { userEmail, role },
    config.jwt.refreshSecret,
    config.jwt.refresh_expireIn
  );

  return {
    accessToken,
    refreshToken,
    name,
    email,
    phoneNumber,
  };
};

const loginUser = async (payload) => {
  const { email, password } = payload;

  // instance of User model
  const user = new User();

  const isUserExist = await user.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  if (
    isUserExist.password &&
    !user.isPasswordMatched(password, isUserExist.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  const { email: userEmail, role } = isUserExist;

  // create token
  const accessToken = JWTHelper.createToken(
    { userEmail, role },
    config.jwt.secret,
    config.jwt.expireIn
  );

  const refreshToken = JWTHelper.createToken(
    { userEmail, role },
    config.jwt.refreshSecret,
    config.jwt.refresh_expireIn
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const UserService = {
  registerUser,
  loginUser,
};
