import { Parcel } from "./parcel.model.js";

const bookParcel = async (payload) => {
  const result = (await Parcel.create(payload)).populate("user");
  return result;
};

export const ParcelService = { bookParcel };
