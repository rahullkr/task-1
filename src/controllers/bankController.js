const express = require("express");
const BankModel = require("../models/bankModels");
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/fileUpload");

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

const uploadData = (req, res) => {
  cloudinary.uploader
    .upload(req.file.path, {
      folder: "Bank Data",
      resource_type: "image",
    })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        success: true,
        message: "Uploaded!",
        data: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error",
      });
    });
};

const getAllDetails = async (req, res) => {
  //  filetering
  // const { name } = req.query;
  // // console.log(name)
  // const filter = name ? { name: { $regex: new RegExp(name, 'i') } } : {};

  // try {
  //   const details = await BankModel.find(filter);
  //   res.status(200).json(details);
  // } catch (error) {

  //   res.status(500).json({ error: 'Internal Server Error' });
  // }

  // sorting

  // const sortOptions = { name: -1 };
  // try {
  //   const details = await BankModel.find({}).sort(sortOptions);
  //   res.status(200).json(details);
  // } catch (error) {
  //   res.status(500).json({ error: 'Internal Server Error' });
  // }

  // pagination
  try {

    // const count = await BankModel.countDocuments({});
    // console.log(count)
    
    const { page } = req.query;
    const dataPerPage = 2;
    const details = await BankModel.find()
      .skip(page * dataPerPage)
      .limit(dataPerPage);
    // console.log(details);

    res.status(200).json({
      details,
    });

  } catch (error) {

    res.status(500).json({ error: "Internal Server Error" });
  }
  res.send("couting done");
};
module.exports = {
  getBankDetails,
  registerUser,
  uploadData,
  getAllDetails,
};
