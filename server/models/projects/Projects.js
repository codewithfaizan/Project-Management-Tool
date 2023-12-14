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
        enum: ['Pending', 'Completed', 'Not Started', 'Cancelled', 'In Progress'],
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: '_id'
    },
    assignedTo: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        
    },
    endDate: {
        type: String,
     
    },

},
    { timestamps: true });

export default mongoose.model("Projects", projectSchema, "projects");

