import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Citizen",
      required: true,
    },

    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
  },
  { timestamps: true },
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
