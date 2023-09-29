import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: false,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
      unique: true,
    },
    nid: {
      type: String,
      unique: true,
    },
    drivingLicense: {
      type: String,
      unique: true,
    },
    gender: {
      type: String,
      unique: true,
    },
    role: {
      type: String,
      unique: true,
    },
    photoURL: {
      type: String,
      unique: true,
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
