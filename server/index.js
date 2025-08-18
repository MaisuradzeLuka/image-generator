import express from "express";
import dalleRoutes from "./routes/dalleRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
import connectToDb from "./mongodb/connectToDb.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/dalle", dalleRoutes);

app.listen(process.env.PORT || 5000, () => {
  connectToDb();
});
