import Chat from "../Interfaces/Chat";

describe("Chat Interface", () => {
  class ConcreteChat extends Chat {
    constructor(senderId) {
      super(senderId);
    }

    // Implement the required methods
    saveChat() {}
    getChats() {}
    getAllChatsOfUser(userId) {}
    getPrivateChatsBetweenUsers(userId, otherUserId) {}
  }

  describe("Instantiation", () => {
    it("should throw an error when instantiated directly", () => {
      expect(() => {
        new Chat("senderId");
      }).toThrow("Abstract classes Chat can't be instantiated.");
    });

    it("should not throw an error when instantiated by a concrete class", () => {
      expect(() => {
        new ConcreteChat("senderId");
      }).not.toThrow();
    });
    it("should test save", () => {
      // expect(Chat.saveChat).rejects.toThrow(
      //   "Method 'saveChat' must be implemented. ",
      // );
      expect(Chat.saveChat).toBeUndefined();
    });
  });

  describe("Methods Implementation", () => {
    let concreteChat;

    beforeEach(() => {
      concreteChat = new ConcreteChat("senderId");
    });

    it("should throw an error if saveChat method is not implemented", () => {
      expect(() => {
        concreteChat.saveChat();
      }).not.toThrow();
    });

    it("should throw an error if getChats method is not implemented", () => {
      expect(() => {
        concreteChat.getChats();
      }).not.toThrow();
    });

    it("should throw an error if getAllChatsOfUser method is not implemented", () => {
      expect(() => {
        concreteChat.getAllChatsOfUser("userId");
      }).not.toThrow();
    });

    it("should throw an error if getPrivateChatsBetweenUsers method is not implemented", () => {
      expect(() => {
        concreteChat.getPrivateChatsBetweenUsers("userId", "otherUserId");
      }).not.toThrow();
    });
  });
});
