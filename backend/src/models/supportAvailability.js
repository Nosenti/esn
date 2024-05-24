
import mongoose from "mongoose";

const supportAvailabilitySchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Citizen', 
    required: true
  },
  username: {
    type: String,
    default: true,
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },

  sendEmail: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const SupportAvailability = mongoose.model('supportAvailability', supportAvailabilitySchema);

export default SupportAvailability;