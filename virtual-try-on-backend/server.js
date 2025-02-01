const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const tryOnRoutes = require("./routes/tryOnRoutes");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Database connection
mongoose
  .connect("mongodb://localhost:27017/virtual-try-on", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Routes
app.use("/api/items", tryOnRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
