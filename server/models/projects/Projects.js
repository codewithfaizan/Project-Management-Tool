import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({

    projectName: {
        type: String,
        required: true,
        maxlength: 25,
        minlength: 2,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        maxlength: 350,
    },
    status: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    assignedTo: {
        type: String,
        required: true
    },
    startDate : {
        type : String,
        required : true
    },
    endDate: {
        type: String,
        required: true
    }
},
    { timestamps: true });

export default mongoose.model("Admin", projectSchema, "admins");

