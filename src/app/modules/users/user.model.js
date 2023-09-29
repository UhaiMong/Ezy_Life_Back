import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
    },
    nid: {
      type: String,
    },
    drivingLicense: {
      type: String,
    },
    gender: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.methods.isUserExist = async function (email) {
//   return await User.findOne({ email }, { email: 1, password: 1, role: 1 });
// };

// userSchema.pre("save", async function (next) {
//   this.password = await bcrypt.hash(
//     this.password,
//     Number(config.bcrypt_rounds)
//   );
//   next();
// });

// userSchema.methods.isPasswordMatched = async function (
//   givenPassword,
//   savedPassword
// ) {
//   return await bcrypt.compare(givenPassword, savedPassword);
// };

export const User = model("User", userSchema);
