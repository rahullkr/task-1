const express = require("express");
const router = express.Router();
const {getBankDetails} = require('../controllers/bankController')

router.get("/:bank_id", getBankDetails);


module.exports = router;
