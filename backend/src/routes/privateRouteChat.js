import express from "express";
import AuthController from "../controllers/JoinCommunityController.js";
import { ChatController } from "../controllers/chatController.js";

const router = express.Router();

router
  .route("/")
  .get(AuthController.protect, ChatController.getAllChatsForUser)
  .post(AuthController.protect, ChatController.setPrivateMessage);

router
  .route("/:id")
  .get(AuthController.protect, ChatController.getPrivateChats);

// router
//   .route("/conversation/:id")
//   .get(AuthController.protect, ChatController.getPrivateChats);

export default router;
