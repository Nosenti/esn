import SupportAvailability from "../models/supportAvailability.js";
import { validationResult } from "express-validator";
import { SupportAvailabilityService } from "../services/supportAvailabilityService.js";
import { deliverEmail, makeRecipients, makeEmailBody } from "../utils/mail.js";

export class SupportAvailabilityController {
  static async saveSupportAvailability(req, res) {
    
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
      }
      const { startDate, endDate, phone, email, sendEmail } = req.body;
      const supportAvailability = new SupportAvailability({senderId: req.user.id, username: req.user.username, sendEmail, endDate, phone, email, startDate});

      const response = await supportAvailability.save();
      const recipients = await makeRecipients()
      const emailBody = makeEmailBody(response)

      if (recipients.length){
        deliverEmail(recipients, emailBody)
      }
      res.status(201).json({ message: "Support availability saved successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message }); 
      console.log(error)     
    }
  }
  static async getAllSupportAvailability(req, res) {
    try {
        const supportAvailability = await SupportAvailabilityService.getSupportAvailability();
        supportAvailability.username = req.user.username
        return res
        .status(200)
        .json({ message: "Fetched old SupportAvailability", supportAvailability });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
        message: "Failed to fetch old SupportAvailabilitys",
      });
    }
  }
  static async deleteSupportAvailability(req, res) {
    try {
      const { id } = req.params;
      const deletedSupportAvailability = await SupportAvailabilityService.deleteSupportAvailability(id);
      if (!deletedSupportAvailability) {
        return res.status(404).json({ message: "Support availability not found" });
      }
      res.status(200).json({ message: "Support availability deleted successfully" });
    } catch (error) {     
      res.status(500).json({ message: error.message });
    }
  }  
  static async updateSupportAvailability(req, res) {
    try {
      const { id } = req.params; 
      const { startDate, endDate, phone, email } = req.body; 
      const updatedSupportAvailabilityObj = { senderId: req.user.id, username: req.user.username, startDate, endDate, phone, email, startDate };
      const response = await SupportAvailabilityService.updateSupportAvailability(id, updatedSupportAvailabilityObj);

      if (!response) {
        return res.status(404).json({ message: "Support availability not found" });
      }
      const recipients = await makeRecipients()
      const emailBody = makeEmailBody(response)
      deliverEmail(recipients, emailBody)
      res.status(200).json({ message: "Support availability updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
