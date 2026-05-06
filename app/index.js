import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import productRoute from "./routes/products.js";
import cors from "cors";
import auth from "./middleware/auth.js";

dotenv.config();
let app = express();

app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Mongodb connected!");
  })
  .catch((err) => console.log(err.message));

app.use(express.json());

app.use(authRoute);
app.use(auth);
app.use(productRoute);

export default app;
