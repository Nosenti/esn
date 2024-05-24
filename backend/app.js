import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import session from "express-session";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import userRoutes from "./src/routes/userRoutes.js";
import chatRoutes from "./src/routes/chatRoutes.js";
import privateRoute from "./src/routes/privateRouteChat.js";
import announcementRoutes from "./src/routes/announcementRoutes.js";
import supportAvailabilityRoutes from "./src/routes/supportAvailabilityRoutes.js";
import emergencyRoute from "./src/routes/EmergencyRoute.js";
import { swaggerOptions } from "./swagger.js";
import cookieParser from "cookie-parser";
import SpeedTestMiddleware from "./src/utils/SpeedTestMiddleware.js";
import speedTestRoutes from "./src/routes/speedTestRoutes.js";

import { makeRecipients } from "./src/utils/mail.js";

// dotenv.config({ path: "./config.env" });
const frontendUrl = process.env.FRONTEND_URL;

const SESSION_SECRET = process.env.SESSION_SECRET;

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    // origin: "https://s24fseesnrw1.onrender.com",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(SpeedTestMiddleware.checkSpeedTestInProgress);

makeRecipients();
// Swagger setup
const specs = swaggerJsdoc(swaggerOptions);

app.use("/api/v1/api-documentation", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/v1", userRoutes);
app.use("/api/v1/messages", chatRoutes);
app.use("/api/v1/message", privateRoute);
app.use("/api/v1/announcements", announcementRoutes);
app.use("/speed-test", speedTestRoutes);
app.use("/api/v1/support-availability", supportAvailabilityRoutes);
app.use("/api/v1/emergency", emergencyRoute);

export default app;
