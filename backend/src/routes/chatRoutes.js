import express from "express";
import AuthController from "../controllers/JoinCommunityController.js";
import { ChatController } from "../controllers/chatController.js";

const router = express.Router();

router
  .route("/")
  .get(AuthController.protect, ChatController.getMessages)
  .post(AuthController.protect, ChatController.saveMessage);

export default router;
