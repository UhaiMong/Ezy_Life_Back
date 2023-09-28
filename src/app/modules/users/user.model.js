import { Schema, model } from "mongoose";
import config from "../../../config/index.js";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
      select: 0,
    },
    role: {
      type: String,
      default: "user",
    },
    profileImage: {
      type: String,
    },
    // faculty: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Faculty",
    // },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.isUserExist = async function (email) {
  return await User.findOne({ email }, { email: 1, password: 1, role: 1 });
};

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_rounds)
  );
  next();
});

userSchema.methods.isPasswordMatched = async function (
  givenPassword,
  savedPassword
) {
  return await bcrypt.compare(givenPassword, savedPassword);
};

export const User = model("User", userSchema);
