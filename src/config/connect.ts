import mongoose from "mongoose";
import "colors";

const { MONGO_URI } = process.env;

const connectToDatabase = async (): Promise<void> => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.log(err)
    console.log(`database connection failed. exiting now...`);
    process.exit(1);
  }
};

export default connectToDatabase;
