const express = require("express");
const router = express.Router();
const {getBankDetails, registerUser} = require('../controllers/bankController')

router.post("/register", registerUser);
router.get("/:bank_id", getBankDetails);

module.exports = router;
