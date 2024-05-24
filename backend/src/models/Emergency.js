import mongoose from "mongoose";

const emergencySchema = new mongoose.Schema({
  witnessName: {
    type: String,
    required: true,
  },
  ssn: {
    type: String,
    required: true,
  },
  emergencyType: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  witnessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Citizen", // Reference to the Citizen model
    required: true,
  },
});

const emergency = mongoose.model("emergency", emergencySchema);

export default emergency;
