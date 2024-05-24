import Chat from "../../Interfaces/Chat.js";
import ChatMessage from "../publicMessage.js";

class publicMessageChat extends Chat {
  constructor(senderId, message) {
    super(senderId);
    this.message = message;
  }

  async saveChat(newChat) {
    const chat = await ChatMessage.create(newChat);
    return chat;
  }

  async getChats() {
    const totalChats = await ChatMessage.countDocuments();
    const chats = await ChatMessage.find()
      .sort({ createdAt: 1 })
      .populate({
        path: "senderId",
        select:
          "-password -authCode -mustUpdatePassword -lastTimePasswordUpdated",
      })
      .exec();
    return { totalChats, chats };
  }
}

export default publicMessageChat;
