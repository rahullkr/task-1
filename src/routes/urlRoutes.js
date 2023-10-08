const express = require("express");
const router = express.Router();
const {
  getBankDetails,
  registerUser,
  uploadData,
} = require("../controllers/bankController");

const upload = require("../middlewares/multer");
router.post("/register", registerUser);
router.get("/:bank_id", getBankDetails);
router.post("/upload", upload.single("image"), uploadData);

module.exports = router;
