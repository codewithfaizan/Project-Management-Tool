import express from "express";
import bcrypt from "bcrypt"

import randomString from "../../utils/randomString.js";
import userModel from "../../models/users/Users.js";
import verifyRole from "../../middlewares/verifyRole/verifyRole.js";


const router = express.Router();

router.get("/getemployeebyid/:id", async (req, res) => {
    try {
        const { id } = req.params
        const getEmployee = await userModel.findById(id);

        // if id = req.params.id and in the mongodb method .({id}) then this error
        // Cast to ObjectId failed for value "6525a9bbe9980949920c2e0" (type string) at path "_id" for model "Books"
        if (!getEmployee) {
            return res.status(404).json({ error: "Id not found" })
        };
        // console.log(getEmployee)
        return res.status(200).json({ message: "Employee Data Fetched", response: getEmployee });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
});

router.put("/updateemployee/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let updateEmployee = req.body;

        let employeeData = await userModel.findByIdAndUpdate(id, updateEmployee);
 
        if (!employeeData) {
            return res.status(404).json({ error: "Employee Not found" })
        }
        return res.status(200).json({ msg: "Employee updated Successfully"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
});

app.use(verifyRole);
router.post("/addemployee", async (req, res) => {
    try {
        let newEmployee = new userModel(req.body);

        let emailCheck = await userModel.findOne({ email: newEmployee.email });
        if (emailCheck) {
            return res.status(409).json({ error: "Email already Exist" });
        };

        let phoneCheck = await userModel.findOne({ phone: newEmployee.phone });
        if (phoneCheck) {
            return res.status(409).json({ error: "Phone Already Exist" });
        }
        let hashpassword = await bcrypt.hash(newEmployee.password, 10);
        newEmployee.password = hashpassword;

        newEmployee.userverifytoken.phone = randomString(10);
        newEmployee.userverifytoken.email = randomString(10);

        // newEmployee.role = "employee";
        newEmployee.role = "employee"
        newEmployee.createdBy = req.payload.user_id
        await newEmployee.save();
        console.log(newEmployee)
        res.status(200).json({ message: "Employee Added Successfully", res: newEmployee });
        // return res.status(200).json({ "message": "Admin Added Successfully", response: newAdmin });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ "error": "This Internal Server Error" });
    }
});

router.get("/getallemployees", async (req, res) => {
    try {
        let allEmployees = await userModel.find({ role: "employee" })
        res.status(200).json({ success: true, message: "All Employees Fetched", lenghtOfUsers: allEmployees.length, response: allEmployees })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ "error": "Internal Server Error" })
    }
});

router.delete("/deleteemployeebyid/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deleteData = await userModel.findByIdAndDelete(id);

        if (!deleteData) {
            return res.status(404).json({ error: "Id Not Found" })
        }
        return res.status(200).json({ message: "Employee Deleted" })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
});

router.delete("/deleteallemployees", async (req, res) => {
    try {
        await userModel.deleteMany({});

        res.status(200).json({ message: "All Employees Deleted" })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
});



export default router;