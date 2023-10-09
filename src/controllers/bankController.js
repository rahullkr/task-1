import express from "express";
import BankModel from "../models/bankModels.js";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/fileUpload.js";
import { authSchema } from "../helpers/validationSchema.js";

const generateToken = (id) => {
  // 1. what do you want to create the token with, 2. the tool with the help of which it will create the token, 3. expiring time
  return jwt.sign({ id }, process.env.JWT_SECRETS, { expiresIn: "30m" });
};

const registerUser = async (req, res) => {
  // For registration, you have to check 3 things
  // 1- if either of them is not provided, return an error;
  // 2- if the email exists
  // 3- if the password satisfies the condition
  const result = await authSchema.validateAsync(req.body);
  // const { name, email, password } = req.body;

  //  console.log(result);
  // if (!name || !email || !password) {
  //   res.status(400);
  //   throw new Error("please fill in all the details");
  // }
  // if (password.length < 8) {
  //   res.status(400);
  //   throw new Error("password must be at least 8 characters");
  // }

  const userExist = await BankModel.findOne({ email: result.email });
  if (userExist) {
    res.status(400);
    throw new Error("email already exists");
  }

  const user = await BankModel.create({
    name: result.name,
    email: result.email,
    password: result.password,
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
  // Filtering
  // const { name } = req.query;
  // // console.log(name)
  // const filter = name ? { name: { $regex: new RegExp(name, 'i') } } : {};

  // try {
  //   const details = await BankModel.find(filter);
  //   res.status(200).json(details);
  // } catch (error) {

  //   res.status(500).json({ error: 'Internal Server Error' });
  // }

  // Sorting

  // const sortOptions = { name: -1 };
  // try {
  //   const details = await BankModel.find({}).sort(sortOptions);
  //   res.status(200).json(details);
  // } catch (error) {
  //   res.status(500).json({ error: 'Internal Server Error' });
  // }

  // Pagination
  try {
    // Retrieve the 'page' query parameter
    const { page } = req.query;
    const dataPerPage = 2;

    const skipCount = (page - 1) * dataPerPage;

    const details = await BankModel.find().skip(skipCount).limit(dataPerPage);

    res.status(200).json({
      details,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await BankModel.findOne({ email });
  // console.log(user._id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const token = generateToken(user._id);
  // console.log(token);

  const link = `http://localhost:3000/beanbyte.com/banks/resetpassword/${user._id}/${token}`;
  console.log(link);
  res.send(link);
};

const resetPassword = async (req, res) => {
  const { id, token } = req.params;

  //now we have to check if the coming id exists in the database or not

  const user = await BankModel.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  try {
    jwt.verify(token, process.env.JWT_SECRETS, (err) => {
      if (err) {
        return res.status(400).json({ message: "Invalid token" });
      }
    });
  } catch (error) {
    console.log(error.message);
  }

  res.send("got the id and token ");
};
export {
  getBankDetails,
  registerUser,
  uploadData,
  getAllDetails,
  forgetPassword,
  resetPassword,
};
