import express from "express";
import {
  getBankDetails,
  registerUser,
  uploadData,
  getAllDetails,
} from "../controllers/bankController.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/:bank_id", getBankDetails);
router.post("/upload", upload.single("image"), uploadData);
router.get("/", getAllDetails);

export default router;
