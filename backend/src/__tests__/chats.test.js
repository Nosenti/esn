import { connect, disconnect, dropCollections } from "../config/inMemoryDB.js";
import supertest from "supertest";
import app from "../../app.js";
import Citizen from "../models/Citizen.js";
import { getJwtToken } from "./../utils/jwt.utils.js";
import { ChatService } from "../services/chatServices.js";
import { ObjectId } from "mongodb";
import { jest } from "@jest/globals";
import concreteChatFactory from "../models/Factories/concreteChatFactory.js";

describe("Messages public", () => {
  beforeAll(async () => await connect());
  afterAll(async () => await disconnect());
  afterEach(async () => await dropCollections());

  describe("GET /public messages", () => {
    let token;

    beforeEach(async () => {
      // Create a mock user
      const user = await Citizen.create({
        username: "testuser",
        password: "testpassword",
      });
      token = getJwtToken(user._id);
    });

    afterEach(async () => await dropCollections());

    it("should return all messages when authenticated", async () => {
      const response = await supertest(app)
        .get("/api/v1/messages/")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(response.body).toHaveProperty("messages");
      expect(response.body.message).toBe("Fetched old messages successfully");
    });

    it("should return a 403 error when not authenticated", async () => {
      const response = await supertest(app)
        .get("/api/v1/messages/")
        .expect(403);

      expect(response.body.status).toBe("auth-failure");
      expect(response.body.error).toBe(
        "You are not logged in! Please log in to get access.",
      );
    });

    it("should return a 403 error when the user has been deleted", async () => {
      // Delete the user from the database
      await Citizen.deleteMany();

      const response = await supertest(app)
        .get("/api/v1/messages/")
        .set("Authorization", `Bearer ${token}`)
        .expect(403);

      expect(response.body.status).toBe("auth-failure");
      expect(response.body.error).toBe(
        "The User belonging to this token does no longer exist",
      );
    });
  });

  describe("/ POST public message", () => {
    let token;
    let user;
    beforeEach(async () => {
      // Create a mock user
      user = await Citizen.create({
        username: "testuser",
        password: "testpassword",
      });
      token = getJwtToken(user._id);
    });

    afterEach(async () => await dropCollections());

    it("should return all messages when authenticated", async () => {
      // Define the request body
      const requestBody = { message: "Test message" };

      const response = await supertest(app)
        .post("/api/v1/messages/")
        .set("Authorization", `Bearer ${token}`)
        .set("User", JSON.stringify(user))
        .send(requestBody)
        .expect(200);

      expect(response.body).toHaveProperty("newMessage");
      expect(response.body.message).toBe("Message sent successfully.");
    });
  });

  describe("saveChat", () => {
    let chatuser;
    beforeEach(async () => {
      // Create a mock user
      chatuser = await Citizen.create({
        username: "testuser",
        password: "testpassword",
      });
    });

    it("Should Save public chat message", async () => {
      const newChat = {
        type: "publicMessage",
        message: "hello world",
        senderId: chatuser._id,
      };

      const savedChat = await ChatService.saveChat(newChat);
      expect(savedChat).toBeDefined();
    });

    it("Should Save private chat message", async () => {
      const newChat = {
        type: "privateChat",
        message: "hello world",
        senderId: chatuser._id,
        receiver_id: new ObjectId(),
      };

      const savedChat = await ChatService.savePrivateChat(newChat);
      expect(savedChat).toBeDefined();
    });

    it("should get a conversation between two users", async () => {
      const user1 = new ObjectId();
      const user2 = new ObjectId();

      // Call the function to get private chats between the two users
      const chats = await ChatService.getPrivateChatsBetweenUsers(user1, user2);

      // Assert that the function returns the predefined mock chats
      expect(chats).toEqual([]);
    });

    it("Should get private Conversations of a user", async () => {
      const user1 = new ObjectId();
      const chats = await ChatService.getAllChatsOfUser(user1);

      expect(chats).toEqual([]);
    });

    it("Get a chat message", async () => {
      const chatId = new ObjectId();
      const chat = await ChatService.getOneChat(chatId);

      expect(chat).toBeNull;
    });
  });
});

describe("Private messages", () => {
  beforeAll(async () => await connect());
  afterAll(async () => await disconnect());

  describe("GET messages of a user", () => {
    let token;
    let user;
    beforeEach(async () => {
      // Create a mock user
      user = await Citizen.create({
        username: "testuser",
        password: "testpassword",
      });
      token = getJwtToken(user._id);
    });
    afterEach(async () => await dropCollections());
    it("", () => {});
  });
});
