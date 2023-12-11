import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({

   fullName: {
    type: String,
    required: true,
    maxlength: 25,
    minlength: 2,
    unique: true,
    trim :true
  },
  displayName: {
    type: String,
    required: true,
    maxlength: 15,
    minlength: 2,
    unique: true,
    trim :true
  },
  title : {
    type: String,
    required : true,
    enum: ['Developer', 'UX Designer', 'DevOps Engineer', 'System Admin', 'Developer Intern', 'Business Executive', 'HR', 'Team Lead', 'Manager'],
    trim : true
  },
  email: {
    type: String,
    unique: true, 
    trim :true,
    required: [true, 'Email required']

  },
  phone: {
    type: Number,
    unique: true,
    required: true,
    validate : {
      validator : Number.isInteger,
      message   : '{VALUE} is not an integer value'
    },
    trim :true
  },
  role: {
    type: String,
    enum:['admin','employee'],
    trim :true
  },
  password: {
    type: String,
    required: true,
    trim :true
  },
  profilePicture :{
    type : String
  },
  userverified: {
    email: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: Boolean,
      default: false,
    },
  },
  userverifytoken: {
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
  }
},
  { timestamps: true });

  export default mongoose.model("Admin", adminSchema, "admins");

