import { BikeRent } from "./bike.model.js";

const bookBikeRent = async (payload) => {
  const result = await BikeRent.create(payload);
  return result;
};

export const BikeRentService = { bookBikeRent };
