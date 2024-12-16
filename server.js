const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err.message));


app.use(express.json()); 
app.use(express.static(path.join(__dirname, "public"))); 


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});


const apiRoutes = require("./routes/api");
app.use("/api", apiRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


