import mongoose from "mongoose";
/*
    Creates a instance of the connection object
*/
export async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONOGO_CONNECT_URL || "");
    const connection = mongoose.connection;
    connection.on("connected", () => console.log("DB connected successfully"));
    connection.on("error", () => {
      console.log("ErrorConnectng to DB");
      process.exit(1);
    });
  } catch (err) {
    console.log("Something went wrong,Could not connect to database");
  }
}
