class Chat {
  constructor(senderId) {
    if (this.constructor === Chat) {
      throw new Error("Abstract classes Chat can't be instantiated.");
    }
    this.senderId = senderId;
  }

  saveChat() {
    throw new Error("Method 'saveChat' must be implemented. ");
  }

  getChats() {
    throw new Error("Method 'getChats' must be implemented. ");
  }

  getAllChatsOfUser(userId) {
    throw new Error("Method 'getAllChatsOfUser' must be implemented. ");
  }

  getPrivateChatsBetweenUsers(userId, otherUserId) {
    throw new Error(
      "Method 'getPrivateChatsBetweenUsers' must be implemented. ",
    );
  }
}

export default Chat;
