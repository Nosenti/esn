import express from "express";
import AuthController from "../controllers/JoinCommunityController.js";
import { SupportAvailabilityController } from "../controllers/supportAvailabilityController.js";
import { body, param } from 'express-validator';
const router = express.Router();

const addSupportAvailabilityRules = [
  body("startDate").notEmpty().withMessage("Validation Error: Start Date should not be empty"),
  body("endDate").notEmpty().withMessage("Validation Error: End Date should not be empty"),
  body("phone").notEmpty().withMessage("Validation Error: Phone number should not be empty"),
  body("email").isEmail().withMessage("Validation Error: Email address should be a valid email")
]

router
  .route("/")
  .get(AuthController.protect, SupportAvailabilityController.getAllSupportAvailability)
  .post(AuthController.protect, addSupportAvailabilityRules, SupportAvailabilityController.saveSupportAvailability)
router
  .route("/:id")
  .delete(AuthController.protect, SupportAvailabilityController.deleteSupportAvailability)
  .put(AuthController.protect, SupportAvailabilityController.updateSupportAvailability);

export default router;