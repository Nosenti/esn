import Chat from "../../Interfaces/Chat.js";
import PrivateChat from "../privateMessage.js";

class PrivateMessageChat extends Chat {
  constructor(senderId, receiver_id, message) {
    super(senderId);
    this.receiver_id = receiver_id;
    this.message = message;
  }

  async saveChat(newChat) {
    const myChat = await PrivateChat.create(newChat);
    return myChat;
  }

  async getAllChatsOfUser(userId) {
    const chats = await PrivateChat.find({
      $or: [{ senderId: userId }, { receiver_id: userId }],
    })
      .populate("senderId", "username")
      .populate("receiver_id", "username")
      .exec();
    return chats;
  }

  async getPrivateChatsBetweenUsers(userId, otherUserId) {
    const chats = await PrivateChat.find({
      $or: [
        { senderId: userId, receiver_id: otherUserId },
        { senderId: otherUserId, receiver_id: userId },
      ],
    })
      .populate("senderId", "username")
      .populate("receiver_id", "username")
      .exec();
    return chats;
  }
}
export default PrivateMessageChat;
