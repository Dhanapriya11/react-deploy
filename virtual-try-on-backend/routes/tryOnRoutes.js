const express = require("express");
const multer = require("multer");
const Item = require("../models/Item");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

// Add an item
router.post("/add", upload.single("image"), async (req, res) => {
  const { name, description, category } = req.body;
  const newItem = new Item({
    name,
    description,
    category,
    imageUrl: `/uploads/${req.file.filename}`,
  });
  await newItem.save();
  res.json(newItem);
});

// Get all items
router.get("/", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

module.exports = router;
