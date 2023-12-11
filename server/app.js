import express from "express";
import config from "config";
import cors from "cors"

import "./utils/dbConnect.js";

// Create an instance of Express
const app = express();

const PORT = process.env.PORT || config.get("PORT") || 3000;

// Middleware - Parse incoming requests as JSON
app.use(express.json());

app.use(cors("*"));
// Define routes
app.get("/", (req, res) => {
  res.status(200).send(`Server is Running`);
});

// app.use("/admin", adminRoute)

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
