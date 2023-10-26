import { PrescriptionImage } from "../../middleware/uploader/uploadPrescription.js";
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
const deletePrescription = async (id) => {
  const prescription = await Prescription.findById({ _id: id });

  if (!prescription) {
    throw new ApiError(httpStatus.NOT_FOUND, "Prescription Not Found");
  }

  if (prescription.image) {
    PrescriptionImage.deleteImage(prescription.image);
  }

  const result = await Prescription.findByIdAndDelete({ _id: id });
  return result;
};

export const PrescriptionService = {
  addPrescription,
  getAllPrescription,
  getSinglePrescription,
  deletePrescription,
};
