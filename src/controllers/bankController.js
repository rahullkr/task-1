const express = require("express");

const getBankDetails = (req, res) => {
  const id = req.params.id;
  res.status(200).send(`the bank_id is ${id}`);
};

module.exports = {
  getBankDetails,
};
