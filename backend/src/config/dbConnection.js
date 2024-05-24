import mongoose from "mongoose";

const connectDb = async () => {
  let connect;
  try {
    connect = await mongoose.connect(
      process.env.ATLAS_CON,
      {},
    );
    console.log(
      "Database connected",
      connect.connection.host,
      connect.connection.name,
    );
  } catch (err) {
    console.log("error", err);
    process.exit(1);
  }
  return connect;
};

export default connectDb;

// import mongoose from "mongoose";

// class Database {
//   constructor() {
//     this.connection = null;
//   }

//   async connectDb() {
//     if (!this.connection || process.env.MODE == "speed-test") {
//       try {
//         this.connection = await mongoose.connect(process.env.ATLAS_CON, {});
//         console.log(
//           "Database connected",
//           this.connection.connection.host,
//           this.connection.connection.name,
//         );
//       } catch (err) {
//         throw new Error("Error connecting to database");
//       }
//     }
//     return this.connection;
//   }
// }

// const databaseInstance = new Database();

// export default databaseInstance.connectDb.bind(databaseInstance);
