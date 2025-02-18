const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/UserRoute");

dotenv.config();

const app = express();
app.use(express.json()); // for parsing application/json

// Define routes before starting the server
app.route("/").get((req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", userRoutes); // Mount the user routes at /api/users

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Start the server after all routes are defined
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
