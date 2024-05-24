import express from "express";
import {
  startSpeedTest,
  terminateTest,
} from "./../controllers/speedTestController.js";
import { ChatController } from "../controllers/chatController.js";
import AuthController from "../controllers/JoinCommunityController.js";

const router = express.Router();

router.post("/", startSpeedTest);

router.get("/", terminateTest);

router
  .route("/messages")
  .get(AuthController.protect, ChatController.getMessages)
  .post(AuthController.protect, ChatController.saveMessage);

export default router;
