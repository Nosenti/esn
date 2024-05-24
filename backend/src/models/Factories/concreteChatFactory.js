import ChatFactory from "./ChatFactory.js";
import PrivateMessageChat from "../classes/privateChat.js";
import publicMessageChat from "../classes/publicChat.js";

class concreteChatFactory extends ChatFactory {
  constructor() {
    super();
  }

  createObject(type, options) {
    switch (type) {
      case "publicMessage":
        return new publicMessageChat(options.senderId, options.message);
      case "privateChat":
        return new PrivateMessageChat(
          options.senderId,
          options.receiver_id,
          options.message,
        );
      default:
        throw new Error(`Invalid Chat Object type: ${type}`);
    }
  }
}

export default concreteChatFactory;
