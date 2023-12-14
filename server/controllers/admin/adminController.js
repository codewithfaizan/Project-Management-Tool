import express from "express";
import bcrypt from "bcrypt"

import randomString from "../../utils/randomString.js";
import userModel from "../../models/users/Users.js";

const router = express.Router();

router.post("/addadmin", async (req, res) => {
    try {
        let newAdmin = new userModel(req.body);
    
        let emailCheck = await userModel.findOne({ email: newAdmin.email });
        if (emailCheck) {
            return res.status(409).json({ error: "Email already Exist" });
        };

        let phoneCheck = await userModel.findOne({ phone: newAdmin.phone });
        if (phoneCheck) {
            return res.status(409).json({ error: "Phone Already Exist" });
        }
        let hashpassword = await bcrypt.hash(newAdmin.password, 10);
        newAdmin.password = hashpassword;

        newAdmin.userverifytoken.phone = randomString(10);
        newAdmin.userverifytoken.email = randomString(10);

        await newAdmin.save();
        console.log(newAdmin)
        res.status(200).json({ message: "Admin Added Successfully", res: newAdmin });
        // return res.status(200).json({ "message": "Admin Added Successfully", response: newAdmin });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ "error": "This Internal Server Error" });
    }
});

router.get("/getalladmin", async (req, res) => {
    try {
        let allAdmins = await userModel.find({ role: "admin" })
        res.status(200).json({ success: true, message: "All Admins Fetched", lenghtOfUsers: allAdmins.length, response: allAdmins })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ "error": "Internal Server Error" })
    }
});

router.get("/getadminbyid/:id", async (req, res) => {
    try {
        const { id } = req.params
        const getAdmin = await userModel.findById(id);

        // if id = req.params.id and in the mongodb method .({id}) then this error
        // Cast to ObjectId failed for value "6525a9bbe9980949920c2e0" (type string) at path "_id" for model "Books"
        if (!getAdmin) {
            return res.status(404).json({ error: "Id not found" })
        };
        console.log(getAdmin)
        res.status(200).json(getAdmin);

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
});

router.put("/updateadmin/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let updateAdmin = req.body;

        let adminData = await userModel.findByIdAndUpdate(id, updateAdmin);

        if (!adminData) {
            return res.status(404).json({ error: "Admin Not found" })
        }
        return res.status(200).json({ msg: "Admin updated Successfully" })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
});


router.delete("/deleteadminbyid/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deleteData = await userModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ error: "Id Not Found" })
        }
        res.status(200).json({ msg: "Admin Deleted" })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
});

router.delete("/deletealladmins", async (req, res) => {
    try {
        await userModel.deleteMany({});

        res.status(200).json({ msg: "All Admins Deleted" })
    } catch (error) {

        console.log(error.message);

        res.status(500).json({ error: "Internal Server Error" })
    }
});



export default router;