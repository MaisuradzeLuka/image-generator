import express from "express";
import dalleRoutes from "./routes/dalleRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
import connectToDB from "./mongodb/connectToDb.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/dalle", dalleRoutes);
app.use("/api/v1/post", postRoutes);

app.listen(process.env.PORT || 5000, () => {
  connectToDB();
});
