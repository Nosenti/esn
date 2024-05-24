import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Citizen",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  announcement: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Announcement = mongoose.model("Announcement", AnnouncementSchema);

export default Announcement;
