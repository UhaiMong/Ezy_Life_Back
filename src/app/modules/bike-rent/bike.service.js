import { BikeRent } from "./bike.model.js";

const bookBikeRent = async (payload) => {
  const result = (await BikeRent.create(payload)).populate("user");
  return result;
};

export const BikeRentService = { bookBikeRent };
