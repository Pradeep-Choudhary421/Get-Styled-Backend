const UserSch = require("../Models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

const createUser = async (req, res) => {
  const data = req.body;
  const newUser = new UserSch(data);
  try {
    const emailexist = await UserSch.findOne({
      email: req.body.email,
    });
    if (emailexist) {
      return res.status(400).json({
        message: "User Already Exist",
      });
    }
    const hashedpassword = await bcrypt.hash(data.password, 10);
    newUser.password = hashedpassword;
    const numberexist = await UserSch.findOne({
      phone_no: req.body.phone_no,
    });

    if (numberexist) {
      return res.status(400).json({
        message: "Number Already Exist",
      });
    }
    await newUser.save();
    return res.status(201).json({
      message: "User created successfully",
      success: true,
      result: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const getallusers = async (req, res) => {
  try {
    const users = await UserSch.find({});
    return res.status(200).json({
      message: "Data Fetched Successfully",
      result: users,
      count: users.length,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
const updateUser = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!newPassword) {
    return res.status(400).json({
      message: "New password is required",
    });
  }

  try {
    const user = await UserSch.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const hashedpassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedpassword;

    await user.save();
    return res.status(200).json({
      message: "Password Updated Successfully",
      result: user,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserSch.findOne({
      _id: id,
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    await UserSch.findByIdAndDelete(id);
    return res.status(200).json({
      message: "User Deleted Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserSch.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: '24h',
    });
    res.status(200).cookie("token", token).json({
      success: true,
      message:"Login Success",
      user,
      token,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


const sendOtp = async (req, res) => {
  const { email } = req.body;
  const user = await UserSch.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }
  let otp = Math.floor(1000 + Math.random() * 900000);
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pradeep9783552320@gmail.com",
      pass: "amtb ohys vkcl tgya",
    },
  });
  let mailingDeatils = {
    from: "pradeep9783552320@gmail.com",
    to: email,
    subject: "OTP to reset your password",
    text: `Your OTP is ${otp}`,
  };

  mailTransporter.sendMail(mailingDeatils, function (err, data) {
    if (err) {
      res.stauts(500).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "OTP sent to your email",
        otp,
        user,
      });
    }
  });
};
module.exports = { createUser, getallusers, updateUser, deleteUser, login, sendOtp };
