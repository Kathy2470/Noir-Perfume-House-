const express = require("express");
const router = express.Router();

const { getProducts, createProduct, getProductById } = require("../controllers/productController");

router.get("/", getProducts);
router.get("/:id", getProductById); // ✅ ADD THIS
router.post("/", createProduct);

module.exports = router;
