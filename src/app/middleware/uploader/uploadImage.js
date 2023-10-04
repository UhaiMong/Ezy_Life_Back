import ApiError from "../../../errors/ApiError.js";
import uploader from "../../../utils/fileUpload.js";

function avatarUpload(req, res, next) {
  const upload = uploader(
    "images",
    ["image/jpeg", "image/jpg", "image/png"],
    1000000,
    "Only .jpg, jpeg or .png format allowed!"
  );

  // call the middleware function
  upload.any()(req, res, (err) => {
    if (err) {
      throw new ApiError(500, err.message);
    } else {
      next();
    }
  });
}

export default avatarUpload;
