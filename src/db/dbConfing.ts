import mongoose from "mongoose";
/* 
    Creates a instance of the connection object
*/
export async function dbConnect() {
  try {
    await mongoose.connect(
      "mongodb://mongo:1PWm23BqTrSiZBV91PPg@containers-us-west-47.railway.app:7447"
    );
    const connection = mongoose.connection;
    connection.on("connected", () => console.log("DB connected successfully"));
    connection.on("error", () => {
      console.log("ErrorConnectng to DB");
      process.exit(1);
    });
  } catch (err) {
    console.log("Something went wrong");
  }
}
