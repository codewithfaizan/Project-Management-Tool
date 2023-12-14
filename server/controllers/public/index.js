import express from "express";
import config from "config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import cookieParser from "cookie-parser";

import userModel from "../../models/users/Users.js";
import randomString from "../../utils/randomString.js";
import generateRandomOTP from "../../utils/generateOTP.js";

import {
  RegisterValidations,
  errorMiddelware,
  LoginValidations,
} from "../../middlewares/Validations/index.js";

import sendMail from "../../utils/sendEmail.js";
import sendSMS from "../../utils/sendSMS.js";

const router = express.Router();

router.use(cookieParser());

router.post(
  "/register",
  RegisterValidations(),
  errorMiddelware,
  async (req, res) => {
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

      const otp = await generateRandomOTP();

      // //---------------sendSMS------------------------------
      // sendSMS({
      //   body: `Hi ${userData.fullName}, Please click the given link to verify your phone
      //   ${config.get("URL")}/auth/verify/phone/${phoneToken}
      //   Your OTP to verify Phone is ${otp}`,
      //   to: userData.phone,
      // });
      //  console.log(`Mobile Link is - http://${config.get("URL")}/auth/verify/phone/${phoneToken}`)

      await userData.save();
      res.status(200).json({
        success: true,
        message: "User Added Successfully",
        data: userData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

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
    return res.status(401).end("Token Expired!");
  }

  let findEmail = await userModel.findOne({
    "userverifytoken.email": verifyToken.emailCode,
  });
  console.log(`findEmail -`, findEmail);

  if (findEmail.userverified.email == true) {
    return res.status(200).json({ success: "Email already Verified" });
  }

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
    return res.status(401).end("Token Expired!");
  }

  let findPhone = await userModel.findOne({
    "userverifytoken.phone": verifyToken.phoneCode,
  });
  console.log(`findPhone -`, findPhone);

  if (findPhone.userverified.phone == true) {
    return res.status(200).json({ success: "Email already Verified" });
  }

  findPhone.userverified.phone = true;
  findPhone.save();
  return res.status(200).end("<h1> Phone Verified Sucvessfully </h1>");
});

router.post("/login", LoginValidations(), errorMiddelware, async (req, res) => {
  try {
    const userData = req.body;

    const checkEmail = await userModel.findOne({ email: userData.email });
    // console.log(`checkEmail : ${checkEmail}`)
    if (checkEmail) {
      let isFound = await bcrypt.compare(
        userData.password,
        checkEmail.password
      );
      if (isFound) {
        const payload = {
          user_id: checkEmail._id,
          role: checkEmail.role,
        };
        const token = jwt.sign(payload, config.get("SECRET-KEY.JWT"), {
          expiresIn: "60m",
        });
        // console.log(token)
        const encryptedToken = CryptoJS.AES.encrypt(
          token,
          config.get("SECRET-KEY.CRYPTO")
        ).toString();
        return res
          .status(200)
          .cookie(encryptedToken)
          .json({
            success: true,
            message: "Logged in Successfully",
            encryptedToken,
          });
      }
      return res.status(401).json({ error: "Wrong Password" });
    } else {
      return res.status(409).json({ message: "Email Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/forgetpassword", async (req, res) => {
  try {
    const userData = req.body;

    const checkEmail = await userModel.findOne({ email: userData.email });
    // console.log(`checkEmail- ${checkEmail}`);
    if (checkEmail) {
      var OTP = await generateRandomOTP();

      sendMail({
        subject: "Reset Password",
        to: userData.email,
        body: `Hi ${userData.fullName} <br/> 
      
        <br/> Your OTP is ${OTP}`,
      });
      // // console.log(`Email Link is - http://${config.get("URL")}/users/verify/email/${emailToken}`)
      // // Link to reset password is <a href = 'http://${config.get("URL")}/auth/verify/email/${emailToken}'> link </a>
      let data = {
        code : OTP,
        email : userData.email
      }
      res.cookie(
        "data",
        data,
        { expires: new Date(Date.now() + 180000), httpOnly: true },
        { domain: "/auth/forgetpassword/resetpassword" }
      );
      res.json({ message: "OTP sent to Mail" });
      // return res.redirect(`/auth/forgetpassword/resetpassword/${checkEmail._id}`);
    } else {
      return res.status(409).json({ message: "Email Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/forgetpassword/resetpassword/:email", async (req, res) => {
  try {
    const cookie = req.cookies;
    // console.log(`cookie is ${cookie.data.email}`);
    // console.log(`cookie is ${cookie.data.code}`);

    const email = req.params.email;
    if(email !== cookie.data.email) return res.status(404).json({error : "Invalid Email"});

    const { code, newPassword, confirmPassword } = req.body;
    // console.log(code, newPassword, confirmPassword);
    // console.log()
    if (code === cookie.data.code) {
        if (newPassword !== confirmPassword)
        // const isMatch = await bcrypt.compare(userData.password, userData.confirmPassword);
        return res.status(404).json({ error: "Password did not Match" });

        let hashpassword = await bcrypt.hash(newPassword, 10);
        await userModel.findOneAndUpdate(
        { email: email },
        { $set: { password: hashpassword } },
        { new: true }
      );
      res.clearCookie(
        "data", { domain: "/auth/forgetpassword" }
      );
      const cookie = req.cookies;
      // console.log(`cookie is ${cookie.otp}`)
      return res.status(200).json({ message: "Password Changed Successfully" });
      // //  _id, {password:hashedpassword}, {new:true}
      // }
    }
    return res.json({ error: "Invalid OTP" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        error: error.message,
        message: "Internal Server Error",
      });
  }
});

export default router;
