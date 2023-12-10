// Import required modules
import express from "express";
import config from "config";

// DB Connect in Config Folder

import "./utils/dbConnect.js";

// Create an instance of Express
const app = express();
const PORT = process.env.PORT || config.get("PORT");

// Middleware - Parse incoming requests as JSON
app.use(express.json());

// Define routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Example route with a parameter
app.get("/hello/:name", (req, res) => {
  const { name } = req.params;
  res.send(`Hello, ${name}!`);
});

// Example route for handling POST requests
app.post("/greet", (req, res) => {
  const { name } = req.body;
  if (name) {
    res.json({ message: `Hello, ${name}!` });
  } else {
    res
      .status(400)
      .json({ error: "Name parameter is missing in the request body." });
  }
});

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
