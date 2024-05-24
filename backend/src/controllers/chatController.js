import { SocketUtil } from "../utils/socketUtils.js";
import { ChatService } from "../services/chatServices.js";
import i18n from "../i18n.config.mjs";
import getPreferredLanguage from "../utils/getPreferredLanguage.js";
import { LocaleService } from "../utils/localeService.mjs";

const localeService = new LocaleService(i18n);

export class ChatController {
  static async saveMessage(req, res) {
    const preferredLanguage = await getPreferredLanguage(req.user.id);
    localeService.setLocale(preferredLanguage);
    try {
      const newMessage = {
        type: "publicMessage",
        senderId: req.user.id,
        message: req.body.message,
      };

      SocketUtil.socketEmit("receive_message", newMessage);

      const savedMessage = await ChatService.saveChat(newMessage);

      return res
        .status(200)
        .json({
          message: localeService.translate("Message sent successfully."),
          newMessage: savedMessage,
        });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({
        error: err.message,
        message: localeService.translate("Failed to send a new message"),
      });
    }
  }

  static async setPrivateMessage(req, res) {
    const preferredLanguage = await getPreferredLanguage(req.user.id);
    localeService.setLocale(preferredLanguage);
    try {
      const chat = {
        type: "privateChat",
        senderId: req.user.id,
        receiver_id: req.body.receiver_id,
        message: req.body.message,
      };
      SocketUtil.socketEmit("receive_message", chat);
      const newChat = await ChatService.savePrivateChat(chat);

      return res
        .status(200)
        .json({
          message: localeService.translate("Private message sentsuccessfully."),
          newChat: newChat,
        });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
        message: localeService.translate("Failed to send a private message"),
      });
    }
  }

  static async getPrivateChats(req, res) {
    const preferredLanguage = await getPreferredLanguage(req.user.id);
    localeService.setLocale(preferredLanguage);
    try {
      const otherUserId = req.params.id;
      const chats = await ChatService.getPrivateChatsBetweenUsers(
        req.user.id,
        otherUserId,
      );

      return res
        .status(200)
        .json({
          message: localeService.translate(
            "Fetched private chats successfully",
          ),
          count: chats.length,
          chats,
        });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
        message: localeService.translate("Failed to fetch private chats"),
      });
    }
  }

  static async getAllChatsForUser(req, res) {
    try {
      const chats = await ChatService.getAllChatsOfUser(req.user.id);

      return res
        .status(200)
        .json({ status: "success", count: chats.length, chats });
    } catch (err) {
      return res.status(500).json({
        status: "error",
        error: err.message,
        message: "Failed to fetch chats",
      });
    }
  }

  // static async getConversationWithUser(req, res) {
  //   try {
  //     const otherUserId = req.params.id;
  //     const chats = await ChatService.getPrivateChatsBetweenUsers(
  //       req.user.id,
  //       otherUserId,
  //     );

  //     return res
  //       .status(200)
  //       .json({ message: "Fetched conversation", count: chats.length, chats });
  //   } catch (err) {
  //     return res.status(500).json({
  //       error: err.message,
  //       message: "Failed to fetch conversation",
  //     });
  //   }
  // }

  static async getMessages(req, res) {
    const preferredLanguage = await getPreferredLanguage(req.user.id);
    localeService.setLocale(preferredLanguage);
    try {
      //   const { offset } = req.query;
      const limit = req.query.limit || 30;

      const messages = await ChatService.getChats();

      return res
        .status(200)
        .json({
          message: localeService.translate("Fetched old messages successfully"),
          messages,
        });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
        message: localeService.translate("Failed to fetch old messages"),
      });
    }
  }
}
