import express from "express";
import cors from "cors"
import config from "config";

import publicRouter from "./controllers/public/index.js"

import { logger } from "./middlewares/Logger/loggerMiddleware.js";
import authMiddleware from "./middlewares/auth/authMiddleware.js";
import adminController from "./controllers/admin/adminController.js"
import employeeController from "./controllers/employees/employeeController.js"
import projectRouter from "./controllers/projects/index.js"
import "./utils/dbConnect.js";



// Create an instance of Express
const app = express();
app.use(cors({
  origin : [`http://${config.get("URL")}`],
 methods: ['GET', 'POST','PUT',"DELETE"],
 credentials : true
}))

const PORT = process.env.PORT || config.get("PORT") || 3000;

// Middleware - Parse incoming requests as JSON
app.use(express.json());

app.use(logger);
// Define routes
app.get("/", (req, res) => {
  res.status(200).send(`Server is Running`);
});

app.use("/auth", publicRouter);

app.use(authMiddleware);

app.use("/admin", adminController)
app.use("/employee", employeeController);
app.use("/projects", projectRouter)
// Handle 404 errors - Route not found
app.use((req, res, next) => {
  res.status(404).send("404 - Not Found");
});

// Handle other errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("500 - Internal Server Error");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT 🚀 ${PORT}`);
});
