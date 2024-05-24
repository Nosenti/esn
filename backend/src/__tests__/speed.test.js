import { connect, disconnect, dropCollections } from "../config/inMemoryDB.js";
import Citizen from "../models/Citizen.js";
import { getJwtToken } from "../utils/jwt.utils.js";
import axios from "axios";
import { jest } from "@jest/globals";
import connectDb from "./../config/dbConnection.js";

import {
  sendPostRequest,
  sendGetRequest,
  startSpeedTest,
  tearDown,
} from "../controllers/speedTestController.js";

describe("Speed Test controller tests", () => {
  beforeAll(async () => await connect(), 10000);
  afterAll(async () => await disconnect());
  afterEach(async () => await dropCollections());

  let token;

  beforeEach(async () => {
    const user = await Citizen.create({
      username: "testuser",
      password: "testpassword",
    });
    token = getJwtToken(user._id);
  });

  describe("Send Post Request", () => {
    it("should pass", async () => {
      axios.post = jest.fn();
      const generatedMessage = "test message";

      // Mock generateRandomMessage to always return 'test message'
      const originalGenerateRandomMessage = global.generateRandomMessage;
      global.generateRandomMessage = jest.fn(() => generatedMessage);

      // Call the function
      await sendPostRequest(token);

      expect(axios.post).toHaveBeenCalledTimes(1);

      // Restore mocked functions
      global.generateRandomMessage = originalGenerateRandomMessage;
    });

    it("should handle errors properly", async () => {
      // Spy on console.error
      jest.spyOn(console, "error").mockImplementation();

      // Mock axios.post to throw an error
      axios.post = jest.fn().mockRejectedValue(new Error("Request failed"));

      const token = "fake-jwt-token";

      // Call the function
      await sendPostRequest(token);

      // Expect console.error to be called with the error message
      expect(console.error).toHaveBeenCalledWith(
        "Error sending POST request:",
        "Request failed",
      );
    });
  });

  describe("sendGetRequest function", () => {
    it("should send a GET request with the correct headers", async () => {
      // Mock axios.get to return a resolved promise with a dummy response
      axios.get = jest.fn().mockResolvedValue({ data: "dummy data" });

      // Call the function
      await sendGetRequest(token);

      // Expect axios.get to be called with the correct arguments
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:8000/speed-test/messages",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
    });

    it("should handle errors properly", async () => {
      const token = "fake-jwt-token";

      // Mock axios.get to throw an error
      axios.get = jest.fn().mockRejectedValue(new Error("Request failed"));

      // Spy on console.error
      jest.spyOn(console, "error").mockImplementation();

      // Call the function
      await sendGetRequest(token);

      // Expect console.error to be called with the error message
      expect(console.error).toHaveBeenCalledWith(
        "Error sending GET request:",
        "Request failed",
      );
    });
  });
});
