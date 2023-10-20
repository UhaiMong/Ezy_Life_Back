import { Prescription } from "./prescription.model.js";

const addPrescription = async (payload) => {
  const result = (await Prescription.create(payload)).populate("user");
  return result;
};

const getAllPrescription = async () => {
  const result = await Prescription.find().populate("user");
  return result;
};

const getSinglePrescription = async (id) => {
  const result = await Prescription.findOne({ _id: id }).populate("user");
  return result;
};

export const PrescriptionService = {
  addPrescription,
  getAllPrescription,
  getSinglePrescription,
};
