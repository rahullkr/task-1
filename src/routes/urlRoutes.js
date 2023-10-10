import express from "express";
import {
  getBankDetails,
  registerUser,
  uploadData,
  getAllDetails,
  forgetPassword,
  resetPassword,


} from "../controllers/bankController.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/:bank_id", getBankDetails);
router.post("/upload", upload.single("image"), uploadData);
router.get("/", getAllDetails);
router.post('/forgetpassword', forgetPassword);
router.post('/resetpassword/:id/:token',resetPassword);


export default router;
