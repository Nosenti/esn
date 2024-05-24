class ChatFactory {
  constructor() {
    if (this.constructor === ChatFactory) {
      throw new Error("Abstract class ChatFactory can't be instantiated.");
    }
  }

  // Abstract ChatFactory method to be implemented by concrete subclasses
  createObject(type, options) {
    throw new Error("Method 'createObject' must be implemented.");
  }
}

export default ChatFactory;
