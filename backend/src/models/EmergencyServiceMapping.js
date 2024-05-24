import mongoose from "mongoose";

const emergencyServiceMappingSchema = new mongoose.Schema({
  emergencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Emergency",
    required: true,
  },
  serviceProviders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmergencySP",
    },
  ],
});

const EmergencyServiceMapping = mongoose.model(
  "EmergencyServiceMapping",
  emergencyServiceMappingSchema,
);

export default EmergencyServiceMapping;
