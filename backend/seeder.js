// backend/seeder.js

const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/Product");
const connectDB = require("./config/db");

// Sample products
const products = [
  {
    name: "Dior Sauvage",
    brand: "Dior",
    category: "Men",
    price: 280000,
    size: "20ml",
    image: "images/dior-savage.jpg",
    description: "Fresh spicy fragrance for confident men.",
    featured: true,
    active: true
  },
  {
    name: "Chanel Bleu",
    brand: "Chanel",
    category: "Men",
    price: 300000,
    size: "20ml",
    image: "images/blue.jpg",
    description: "Woody aromatic scent with elegance.",
    featured: true,
    active: true
  },
  {
    name: "YSL Libre Intense",
    brand: "YSL",
    category: "Women",
    price: 450000,
    size: "90ml",
    image: "images/libre_yves.jpg",
    description: "A bold floral fragrance blending lavender, orange blossom and warm vanilla.",
    featured: true,
    active: true
  },
  {
    name: "Montblanc Explorer",
    brand: "Montblanc",
    category: "Men",
    price: 380000,
    size: "100ml",
    image: "images/montblanc.jpg",
    description: "Woody aromatic scent inspired by adventure and exploration.",
    featured: true,
    active: true
  }
];

const seedDB = async () => {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany();

    // Insert new products
    await Product.insertMany(products);

    console.log("Database seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Seeder failed:", error);
    process.exit(1);
  }
};

seedDB();
