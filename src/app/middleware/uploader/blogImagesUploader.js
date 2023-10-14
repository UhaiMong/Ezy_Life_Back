import ApiError from "../../../errors/ApiError.js";
import uploader from "../../../utils/fileUpload.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

function uploadImage(req, res, next) {
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
        next();
      } else {
        req.author_img = author_img[0].filename;
        req.image = image[0].filename;

        next();
      }
    }
  });
}

// Middleware to delete an image
function deleteImage(image) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  // Check if req.image exists and is a valid image filename
  if (image) {
    const imagePath = path.join(
      __dirname,
      "../../..",
      "./uploads/blogs/",
      image
    );
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err}`);
      }
    });
  }
}

export const BlogImage = { uploadImage, deleteImage };
