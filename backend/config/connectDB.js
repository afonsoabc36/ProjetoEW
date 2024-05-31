const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to database...");
    console.log("DATABASE_URI=", process.env.DATABASE_URI);
    if (!process.env.DATABASE_URI) {
      throw new Error("DATABASE_URI is not defined");
    }
    await mongoose.connect(process.env.DATABASE_URI);
    console.log(
      `Database connected successfully to ${process.env.DATABASE_URI} 🍺🚀`
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
