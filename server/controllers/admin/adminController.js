import express from "express";

import userModel from "../../models/users/Users.js";

const router = express.Router();

router.post("/adduser", async (req, res) => {
    try {
        const payload = req.payload;
        console.log(`payload - ${payload.user_id}`)

        const newUser = req.body;

        let userData = await userModel.findOne({ user: payload.user_id }).populate(
            "user", ["firstname", "phone", "email"]
        );
        console.log(`userData - ${userData}`)

        userData.push(newUser);

        console.log(`userData - ${userData}`)
        // await userModel.create(newUser);
        await userData.save();
        res.status(200).json({ msg: "User Added Successfully", response: newUser });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;