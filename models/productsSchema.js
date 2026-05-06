import mongoose from "mongoose"

let ProductSchema = mongoose.Schema({
  img: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  color: String,
  desc: String,
});

let Product = mongoose.model("Products", ProductSchema)

export default Product