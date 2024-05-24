import express from "express";
import AuthController from "../controllers/JoinCommunityController.js";
import { AnnouncementController } from "../controllers/announcementController.js";

const router = express.Router();

router
  .route("/")
  .get(AuthController.protect, AnnouncementController.getAllAnnouncement)
  .post(AuthController.protect, AuthController.isCoordinatorOrAdmin, AnnouncementController.saveAnnouncement);

export default router;