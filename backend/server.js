import app from "./app.js";
import { config } from "dotenv";
config();
import connectDb from "./src/config/dbConnection.js";
// import { databaseInstance } from "./src/config/dbConnection.js";

import { Server } from "socket.io";
import http from "http";
import { SocketUtil } from "./src/utils/socketUtils.js";
const frontendUrl = process.env.FRONTEND_URL;
import { connect } from "./src/config/inMemoryDB.js";

// dotenv.config({ path: "./config.env" });


const cloudinary = process.env.CLOUD_NAME;

const port = process.env.PORT || 3000;

const httpServer = http.createServer(app);
SocketUtil.config(httpServer);
export const io = new Server(httpServer, {
  cors: {
    origin: frontendUrl,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

process.env.NODE_ENV === "speed-test"
  ? connect()
  : // : databaseInstance.connectDb();
    connectDb();

httpServer.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

