import mongoose from "mongoose";

const eSpSchema = new mongoose.Schema({
  institutionName: {
    type: String,
    required: true,
  },
  serviceType: {
    type: String,
    enum: ["Hospital", "Police Station", "First Aid", "Fire Station"],
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true, // Assuming email addresses should be unique for each emergency service provider
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
});

// Index for geospatial queries based on location
eSpSchema.index({ location: "2dsphere" });

const EmergencySP = mongoose.model("EmergencySP", eSpSchema);

export default EmergencySP;
