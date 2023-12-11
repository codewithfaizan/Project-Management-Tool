import express from "express";
import config from "config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import CryptoJS from "crypto-js";

import userModel from "../../models/users/Users.js";
import randomString from "../../utils/randomString.js";
import generateRandomOTP from "../../utils/generateOTP.js";

import {RegisterValidations, errorMiddelware, LoginValidations} from "../../middlewares/Validations/index.js"

import sendMail from "../../utils/sendEmail.js";
import sendSMS from "../../utils/sendSMS.js";

const router = express.Router();

router.post("/register",RegisterValidations(),errorMiddelware, async (req, res) => {
  try {
    let userData = new userModel(req.body);

    let emailCheck = await userModel.findOne({ email: userData.email });
    if (emailCheck) {
      return res.status(409).json({ error: "Email already Exist" });
    }

    let phoneCheck = await userModel.findOne({ phone: userData.phone });
    if (phoneCheck) {
      return res.status(409).json({ error: "Phone Already Exist" });
    }
    let hashpassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashpassword;

    userData.userverifytoken.phone = randomString(10);
    userData.userverifytoken.email = randomString(10);

    const emailToken = jwt.sign(
      {
        emailCode: userData.userverifytoken.email,
      },
      config.get("SECRET-KEY.JWT"),
      { expiresIn: "2m" }
    );

    const phoneToken = jwt.sign(
      {
        phoneCode: userData.userverifytoken.phone,
      },
      config.get("SECRET-KEY.JWT"),
      { expiresIn: "2m" }
    );

    // // ---------------sendMail--------------------------
    // sendMail({
    //   subject: "Account Verification",
    //   to: userData.email,
    //   body: `Hi ${userData.fullName} <br/> 
    //     Thank you for Signing Up. Click on the <a href = 'http://${config.get("URL")}/auth/verify/email/${emailToken}'> link </a>
    //     to verify your Email Address <br/> `,
    // });
    // console.log(`Email Link is - http://${config.get("URL")}/users/verify/email/${emailToken}`)

    // const otp = await generateRandomOTP();

    // //---------------sendSMS------------------------------
    // sendSMS({
    //   body: `Hi ${userData.fullName}, Please click the given link to verify your phone 
    //   ${config.get("URL")}/auth/verify/phone/${phoneToken} 
    //   Your OTP to verify Phone is ${otp}`,
    //   to: userData.phone,
    // });
    //  console.log(`Mobile Link is - http://${config.get("URL")}/auth/verify/phone/${phoneToken}`)

    await userData.save();
    res
      .status(200)
      .json({
        success: true,
        message: "User Added Successfully",
        data: userData,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

/*
METHOD : GET
PUBLIC
API Endpoint : /user/email/:token
*/

router.get("/verify/email/:token", async (req, res) => {
  let emailToken = req.params.token;
  console.log(`Email Token is ${emailToken}`);

  let verifyToken = jwt.verify(emailToken, config.get("SECRET-KEY.JWT"));

  console.log(`verifyToken = ${verifyToken.emailCode}`);

  res.json(verifyToken.emailCode);

  if (!verifyToken) {
    return res.status(401).end("Token Expired!")
  };

  let findEmail = await userModel.findOne({
    "userverifytoken.email" : verifyToken.emailCode
  });
  console.log(`findEmail -`, findEmail);

  if (findEmail.userverified.email == true) {
    return res.status(200).json({ success: "Email already Verified" });
  };

  findEmail.userverified.email = true;
  findEmail.save();
  return res.status(200).end("<h1> Email Verified Sucvessfully </h1>");
});


router.get("/verify/phone/:token", async (req, res) => {
  let phoneToken = req.params.token;
  console.log(`Phone Token is ${phoneToken}`);

  let verifyToken = jwt.verify(phoneToken, config.get("SECRET-KEY.JWT"));

  console.log(`verifyToken = ${verifyToken.phoneCode}`);

  res.json(verifyToken.phoneCode);

  if (!verifyToken) {
    return res.status(401).end("Token Expired!")
  };

  let findPhone = await userModel.findOne({
    "userverifytoken.phone" : verifyToken.phoneCode
  });
  console.log(`findPhone -`, findPhone);

  if (findPhone.userverified.phone == true) {
    return res.status(200).json({ success: "Email already Verified" });
  };

  findPhone.userverified.phone = true;
  findPhone.save();
  return res.status(200).end("<h1> Phone Verified Sucvessfully </h1>");
})


router.post("/login", (req, res)=> {
  const userData = req.body;
  if(userData.email){

  }
})



export default router;
