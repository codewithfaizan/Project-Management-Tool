import express from "express";

import projectModel from "../../models/projects/Projects.js";

import {
    projectValidations, errorMiddelware
  
  } from "../../middlewares/Validations/index.js";
const router = express.Router();

router.get("/getbyid/:id", async (req, res) => {
    try {
        const { id } = req.params
        const projectData = await projectModel.findById(id);

        // if id = req.params.id and in the mongodb method .({id}) then this error
        // Cast to ObjectId failed for value "6525a9bbe9980949920c2e0" (type string) at path "_id" for model "Books"
        if (!projectData) {
            return res.status(404).json({ error: "Id not found" })
        };
        // console.log(projectData)
        return res.status(200).json({ message: "Employee Data Fetched", response: projectData });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
});

router.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const projectData = req.body;

        let newProject = await projectModel.findByIdAndUpdate(id, projectData);
 
        if (!newProject) {
            return res.status(404).json({ error: "Project Not found" })
        }
        return res.status(200).json({ msg: "Project Updated Successfully"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
});

router.post("/add",projectValidations(),errorMiddelware, async (req, res) => {
    try {
        let projectData = new projectModel(req.body);

        projectData.createdBy = req.payload.user_id;

        await projectData.save();
        // console.log(projectData);

        res.status(200).json({ message: "Project Added Successfully", res: projectData });
        // return res.status(200).json({ "message": "Admin Added Successfully", response: newAdmin });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ "error": "This Internal Server Error" });
    }
});

router.get("/getall", async (req, res) => {
    try {
        const allProjects = await projectModel.find({ })
        res.status(200).json({ success: true, message: "All Projects Fetched", lenghtOfUsers: allProjects.length, response: allProjects })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ "error": "Internal Server Error" })
    }
});

router.delete("/deletebyid/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deleteData = await projectModel.findByIdAndDelete(id);

        if (!deleteData) {
            return res.status(404).json({ error: "Id Not Found" })
        }
        return res.status(200).json({ message: "Project Deleted" })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
});

router.delete("/deleteall", async (req, res) => {
    try {
        await projectModel.deleteMany({});

        res.status(200).json({ message: "All Projects Deleted" })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
});



export default router;