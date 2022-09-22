dotenv.config();
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";

import servicesRouter from "./routes/servicesRouter.js";
import uploadRouter from "./routes/uploadRouter.js";
import wishListRouter from "./routes/wishListRouter.js";
import userRouter from "./routes/userRouter.js";

import payRouter from "./routes/payMethodRouter.js";
import checkoutRouter from "./routes/checkoutRouter.js";
import feedbackRouter from "./routes/feedbackRoute.js";

const app = express();
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(bodyParser.json());
//Routes
app.use("/services", servicesRouter);
app.use("/image", uploadRouter);
app.use("/wishlist", wishListRouter);
app.use("/user", userRouter);
app.use("/bank", payRouter);
app.use("/checkout", checkoutRouter);
app.use("/orders", checkoutRouter);
app.use("/feedback", feedbackRouter);

// Connect to MongoDB
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => {
    console.log("MongoDB connection Failed...", err.message);
    process.exit();
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
