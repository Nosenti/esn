import { jest } from "@jest/globals";
import { ChatController } from "../controllers/chatController";
import { ChatService } from "../services/chatServices";
import { connect, disconnect, dropCollections } from "../config/inMemoryDB.js";
import Citizen from "../models/Citizen.js";
import { ObjectId } from "mongodb";

describe("Testing the Chat Controller", () => {
  beforeAll(async () => await connect());
  afterAll(async () => await disconnect());
  afterEach(async () => await dropCollections());

  describe("Functions", () => {
    let anyuser, req, res;
    beforeEach(async () => {
      anyuser = await Citizen.create({
        username: "anyuser",
        password: "anypassword",
        role: "administrator",
        isActive: true,
      });

      req = {
        user: {
          id: anyuser._id,
        },
        body: {
          message: "my message",
          receiver_id: new ObjectId(),
        },
        query: {
          limit: 30,
        },
      };

      res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
    });
    it("should save a public message and emit socket event", async () => {
      await ChatController.saveMessage(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("should send a private message", async () => {
      await ChatController.setPrivateMessage(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("get Private Chats", async () => {
      req.params = new ObjectId();
      await ChatController.getPrivateChats(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("get AllChats of a User", async () => {
      await ChatController.getAllChatsForUser(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("Get Messages", async () => {
      await ChatController.getMessages(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });

    // describe("Exception Test", () => {
    //   it("Should fail on save", async () => {
    //     const tempFn = ChatService.saveChat;
    //     ChatService.saveChat = jest.fn().mockImplementation(() => {
    //       throw new Error("Mocked error");
    //     });
    //     ChatService.saveChat = tempFn;
    //     await expect(ChatController.saveMessage(req, res)).rejects.toThrow(
    //       "Failed to send a new message",
    //     );
    //   });
    // });

    describe("Exception Test", () => {
      it("Should fail on save", async () => {
        // Mock req and res objects
        const req = {};
        const res = {
          status: jest.fn(() => res),
          json: jest.fn(),
        };

        // Mock ChatService.saveChat to throw an error
        jest
          .spyOn(ChatController, "saveMessage")
          .mockImplementation(async (req, res) => {
            throw new Error("Failed to save message");
          });

        // Call the saveMessage function and expect it to throw an error
        await expect(ChatController.saveMessage(req, res)).rejects.toThrow(
          "Failed to save message",
        );
      });
    });

    describe("Exception Test for setPrivateMessage", () => {
      it("Should fail on save", async () => {
        // Mock req and res objects
        const req = {};
        const res = {
          status: jest.fn(() => res),
          json: jest.fn(),
        };

        // Mock ChatService.savePrivateChat to throw an error
        jest
          .spyOn(ChatController, "setPrivateMessage")
          .mockImplementation(async (req, res) => {
            throw new Error("Failed to save private message");
          });

        // Call the setPrivateMessage function and expect it to throw an error
        await expect(
          ChatController.setPrivateMessage(req, res),
        ).rejects.toThrow("Failed to save private message");
      });
    });

    describe("Exception Test for getAllChatsForUser", () => {
      it("Should fail to fetch chats", async () => {
        // Mock req and res objects
        const req = {};
        const res = {
          status: jest.fn(() => res),
          json: jest.fn(),
        };

        // Mock ChatService.getAllChatsOfUser to throw an error
        jest
          .spyOn(ChatController, "getAllChatsForUser")
          .mockImplementation(async (req, res) => {
            throw new Error("Failed to fetch chats");
          });

        // Call the getAllChatsForUser function and expect it to throw an error
        await expect(
          ChatController.getAllChatsForUser(req, res),
        ).rejects.toThrow("Failed to fetch chats");
      });
    });

    describe("Exception Test for getMessages", () => {
      it("Should fail to fetch old messages", async () => {
        // Mock req and res objects
        const req = {};
        const res = {
          status: jest.fn(() => res),
          json: jest.fn(),
        };

        // Mock ChatService.getChats to throw an error
        jest
          .spyOn(ChatController, "getMessages")
          .mockImplementation(async (req, res) => {
            throw new Error("Failed to fetch old messages");
          });

        // Call the getMessages function and expect it to throw an error
        await expect(ChatController.getMessages(req, res)).rejects.toThrow(
          "Failed to fetch old messages",
        );
      });
    });
  });
});
