import express from "express";
import Product from "../models/productsSchema.js";
import auth from "../middleware/auth.js";
import checkAdmin from "../middleware/checkAdmin.js";
let route = express.Router();

route.get("/products", auth, async (req, res) => {
  let { title, color, minPrice, maxPrice, category, page, limit } = req.query;
  console.log(page, limit);

  let skip = (page - 1) * limit;
  let filter = {};

  if (title) {
    filter.title = { $regex: title, $options: "i" };
  }
  if (color) {
    filter.color = color;
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  try {
    let products = await Product.find(filter).skip(skip).limit(limit);
    res.send(products);
  } catch (err) {
    console.log(err.message);
  }
});

route.get("/products/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    res.send(product);
  } catch (err) {
    console.log(err.message);
  }
});

route.post("/products", auth, checkAdmin, async (req, res) => {
  try {
    let product = new Product(req.body);
    await product.save();
    res.send("Product created!");
  } catch (err) {
    console.log(err.message);
  }
});

route.put("/products/:id", async (req, res) => {
  try {
    let uProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.send({ message: "Product updated", uProduct });
  } catch (err) {
    console.log(err.message);
  }
});

route.delete("/products/:id", auth, checkAdmin, async (req, res) => {
  try {
    let dProduct = await Product.findByIdAndDelete(req.params.id);
    res.send({ message: "Product deleted", dProduct });
  } catch (err) {
    console.log(err.message);
  }
});

export default route;
