const express = require("express");
const BankModel = require("../models/bankModels");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  //1. what do you want to create the token with, 2. the tool with the help of which it will create the token, 3. expiring time
  return jwt.sign({ id }, process.env.JWT_SECRETS, { expiresIn: "1d" });
};

const registerUser = async (req, res) => {
  // for register, you have to check 3 things
  // 1- if either of them is not provided return error;
  // 2- if email exists
  // 3- if password satisfies the condition
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please fill all the details");
  }
  if (password.length < 8) {
    res.status(400);
    throw new Error("password must be of 8 characters");
  }

  const userExist = await BankModel.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("email already exists");
  }

  const user = await BankModel.create({
    name,
    email,
    password,
  });
  const token = generateToken(user._id);
  if (user) {
    const { name, email } = user;
    res.status(201).json({
      name,
      email,
      
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
};

const getBankDetails = (req, res) => {
  const id = req.params.id;
  res.status(200).send(`the bank_id is ${id}`);
};

module.exports = {
  getBankDetails,
  registerUser,
};
