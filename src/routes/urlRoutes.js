const express = require("express");
const router = express.Router();
const {
  getBankDetails,
  registerUser,
  uploadData,
  getAllDetails
} = require("../controllers/bankController");

const upload = require("../middlewares/multer");
router.post("/register", registerUser);
router.get("/:bank_id", getBankDetails);
router.post("/upload", upload.single("image"), uploadData);
router.get('/', getAllDetails);
module.exports = router;
