import express from "express";
import AuthController from "./../controllers/JoinCommunityController.js";
import {
  createServiceProvider,
  reportEmergency,
} from "./../controllers/serviceProvidersCtrl.js";

const router = express.Router();

router.route("/serviceProvider").post(createServiceProvider);

router.route("/reportEmergency").post(reportEmergency);

export default router;
