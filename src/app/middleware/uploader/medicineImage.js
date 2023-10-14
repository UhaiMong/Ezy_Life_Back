import ApiError from "../../../errors/ApiError.js";
import uploader from "../../../utils/fileUpload.js";

function medicineImage(req, res, next) {
  const upload = uploader(
    "medicines",
    ["image/jpeg", "image/jpg", "image/png"],
    1000000,
    "Only .jpg, jpeg or .png format allowed!"
  );

  // call the middleware function with single file field
  upload.single("img")(req, res, (err) => {
    if (err) {
      throw new ApiError(500, err.message);
    } else {
      if (!req.file) {
        // No file was uploaded
        throw new ApiError(400, "No file selected");
      }

      req.image = req.file.filename;

      next();
    }
  });
}

export default medicineImage;
