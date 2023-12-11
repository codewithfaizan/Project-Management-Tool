import express from "express"
import userModel from "../../models/users/Users.js";
import bcrypt from "bcrypt";
import config from "config";
import jwt from "jwt"

const router = express.Router();

router.post("/register", (req, res) => {
  try {
    let userData = req.body;

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" })
  }
})
