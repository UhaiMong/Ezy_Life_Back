import { Percel } from "./parcel.model.js";

const bookPercel = async (payload) => {
  const result = (await Percel.create(payload)).populate("user");
  return result;
};

export const ParcelService = { bookPercel };
