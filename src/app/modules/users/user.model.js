import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: false,
    },
    email: {
      type: String,
      unique: true,
    },
    phoneNumber: {
      type: String,
      unique: false,
    },
    nid: {
      type: String,
      unique: false,
    },
    drivingLicense: {
      type: String,
      unique: false,
    },
    gender: {
      type: String,
      unique: false,
    },
    role: {
      type: String,
      unique: false,
    },
    photoURL: {
      type: String,
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model("User", userSchema);

// Specify the field names for which you want to remove the unique indexes
const fieldsToRemoveIndexes = [
  "phoneNumber",
  "name",
  "drivingLicense",
  "nid",
  "gender",
  "role",
  "photoURL",
  "password",
];

fieldsToRemoveIndexes.forEach((fieldName) => {
  User.collection.dropIndex({ [fieldName]: 1 }, (error, result) => {});
});
