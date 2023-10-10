import mongoose from "mongoose";

const bankSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please add an email"],  
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minLength: [8, "Password must be more than 8 characters"],
  },
});

const BankModel = mongoose.model("BankModel", bankSchema);

export default BankModel;
