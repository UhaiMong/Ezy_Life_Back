import ApiError from "../../../errors/ApiError.js";
import uploader from "../../../utils/fileUpload.js";

function blogImageUploader(req, res, next) {
  const upload = uploader(
    "blogs",
    ["image/jpeg", "image/jpg", "image/png"],
    1000000,
    "Only .jpg, jpeg or .png format allowed!"
  );

  // call the middleware function with two file fields
  upload.fields([
    { name: "author_img", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ])(req, res, (err) => {
    if (err) {
      throw new ApiError(500, err.message);
    } else {
      const author_img = req.files["author_img"];
      const image = req.files["image"];

      if (!author_img || !image) {
        // One or both files were not uploaded
        throw new ApiError(400, "Both files are required");
      }

      req.author_img = author_img[0].filename;
      req.image = image[0].filename;

      next();
    }
  });
}

export default blogImageUploader;
