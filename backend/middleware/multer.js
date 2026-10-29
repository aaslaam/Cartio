import multer from "multer";
// multer storage conf
const storage = multer.diskStorage({
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage });

export default upload;
