dotenv.config();
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import fileUpload from "express-fileupload";

const app = express();
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

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
