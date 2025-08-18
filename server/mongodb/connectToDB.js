import mongoose, { mongo } from "mongoose";

const connectToDB = () => {
  try {
    mongoose.set("strictQuery", false);

    mongoose.connect(process.env.MONGODB_CONNECTION_URL);
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
};

export default connectToDB;
