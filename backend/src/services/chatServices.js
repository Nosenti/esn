import ChatMessage from "../models/publicMessage.js"; // Import the Mongoose Chat model
import PrivateChat from "../models/privateMessage.js";
import concreteChatFactory from "../models/Factories/concreteChatFactory.js";

const Chat = new concreteChatFactory();

export class ChatService {
  static async saveChat(newChat) {
    const message = Chat.createObject(newChat.type, newChat);
    const chat = await message.saveChat(message);
    return chat;
  }

  static async savePrivateChat(newChat) {
    const message = Chat.createObject(newChat.type, newChat);
    const myChat = await message.saveChat(message);
    return myChat;
  }

  // get a conversation between a user and another user
  static async getPrivateChatsBetweenUsers(userId, otherUserId) {
    const message = Chat.createObject("privateChat", {});
    const chats = await message.getPrivateChatsBetweenUsers(
      userId,
      otherUserId,
    );
    // console.log(chats);
    return chats;
  }

  // get chats of a user
  static async getAllChatsOfUser(userId) {
    const message = Chat.createObject("privateChat", {});
    const chats = await message.getAllChatsOfUser(userId);
    return chats;
  }

  static async getOneChat(id) {
    const newChat = await ChatMessage.findById(id)
      .populate({
        path: "citizen",
        select:
          "-password -authCode -mustUpdatePassword -lastTimePasswordUpdated",
      })
      .exec();
    return newChat;
  }

  static async getChats() {
    const message = Chat.createObject("publicMessage", {});
    const body = await message.getChats();
    const { totalChats, chats } = body;
    return { totalChats, chats };
  }
}
