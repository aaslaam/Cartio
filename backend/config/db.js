import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {

    mongoose.connection.on("connected", () => {
      console.log("DB Connected");
    });
  await mongoose.connect(`${process.env.MONGODB_URI}/Cartio-cluster`);
  } catch (error) {
    process.exit(1);
  }
};