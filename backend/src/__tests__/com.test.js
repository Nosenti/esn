// it("should pass", () => {
//   console.log("home");
// });

import { connect, disconnect, dropCollections } from "../config/inMemoryDB.js";
import supertest from "supertest";
import app from "../../app.js";
import Citizen from "../models/Citizen.js";
import bcrypt from "bcryptjs";
import { getJwtToken } from "../utils/jwt.utils.js";
import fs from "fs";
import { bannedUsernames } from "../models/data/bannedUsernames.js";
import { jest } from "@jest/globals";
import AuthController from "../controllers/JoinCommunityController.js";
import { ObjectId } from "mongodb";

// console.log(process.env.JWT_SECRET);
describe("users", () => {
  beforeAll(async () => await connect());
  afterAll(async () => await disconnect());
  afterEach(async () => await dropCollections());

  describe("Get Active/Inactive Users", () => {
    let token;
    beforeEach(async () => {
      const Adminuser = await Citizen.create({
        username: "AdminUser",
        password: "adminpassword",
        role: "administrator",
        isActive: true,
      });
      token = getJwtToken(Adminuser._id);
    });

    it("Should Get Active Users", async () => {
      const response = await supertest(app)
        .get(`/api/v1/citizens/active`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
    });

    it("should return error response when an error occurs", async () => {
      // Mock the request and response objects
      const req = { query: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock the find method of Citizen model to throw an error
      const originalFind = Citizen.find;
      Citizen.find = jest.fn().mockImplementation(() => {
        throw new Error("Mocked error");
      });

      // Call the function to test
      await AuthController.getActiveUsers(req, res);

      // Restore the original find method
      Citizen.find = originalFind;

      // Expect that the status code is not 200, indicating an error
      expect(res.status).not.toHaveBeenCalledWith(200);

      // Expect that the status code is 400 and the error message is returned
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: "auth-failure",
        error: "Mocked error",
      });
    });
  });

  describe("User profile Activation end points", () => {
    let token, user;

    const objectId = new ObjectId();

    beforeEach(async () => {
      const Adminuser = await Citizen.create({
        username: "AdminUser",
        password: "adminpassword",
        role: "administrator",
        isActive: true,
      });
      token = getJwtToken(Adminuser._id);

      user = await Citizen.create({
        username: "normalUser",
        password: "userpassword",
        isActive: false,
      });
    });

    it("should Activate Account", async () => {
      const response = await supertest(app)
        .patch(`/api/v1/citizens/${user._id}/active`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
    });

    it("Should through Error 404 if User does not exist", async () => {
      const response = await supertest(app)
        .patch(`/api/v1/citizens/${objectId}/active`)
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
      expect(response.body.message).toBe("User does not exist");
    });

    it("should return error response when an error occurs", async () => {
      // Mock the request and response objects
      const req = { params: { id: "someUserId" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock the findById method of Citizen model to throw an error
      const originalFindById = Citizen.findById;
      Citizen.findById = jest.fn().mockImplementation(() => {
        throw new Error("Mocked error");
      });

      // Call the function to test
      await AuthController.activateAccount(req, res);

      // Restore the original findById method
      Citizen.findById = originalFindById;

      // Expect that the status code is 500 and the error message is returned
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error activating account",
        error: "Mocked error",
      });
    });

    it("Should set the citizen to Active only if it is not already", async () => {
      const userId = user._id;

      const userToActive = await Citizen.findById(userId);
      if (userToActive) {
        userToActive.isActive = true;
        await userToActive.save();

        const response = await supertest(app)
          .patch(`/api/v1/citizens/${userToActive._id}/active`)
          .set("Authorization", `Bearer ${token}`)
          .expect(400);

        expect(response.body.message).toBe("User account is already active.");
      } else {
        console.log("User To Active not found");
      }
    });
  });

  describe("User profile Desactivation end points", () => {
    let token, user;

    const objectId = new ObjectId();

    beforeEach(async () => {
      const Adminuser = await Citizen.create({
        username: "AdminUser",
        password: "adminpassword",
        role: "administrator",
        isActive: true,
      });
      token = getJwtToken(Adminuser._id);

      user = await Citizen.create({
        username: "normalUser",
        password: "userpassword",
        isActive: true,
      });
    });

    it("should Activate Account", async () => {
      const response = await supertest(app)
        .patch(`/api/v1/citizens/${user._id}/inactive`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
    });

    it("Should through Error 404 if User does not exist", async () => {
      const response = await supertest(app)
        .patch(`/api/v1/citizens/${objectId}/active`)
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
      expect(response.body.message).toBe("User does not exist");
    });

    it("should return error response when an error occurs", async () => {
      // Mock the request and response objects
      const req = { params: { id: "someUserId" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock the findById method of Citizen model to throw an error
      const originalFindById = Citizen.findById;
      Citizen.findById = jest.fn().mockImplementation(() => {
        throw new Error("Mocked error");
      });

      // Call the function to test
      await AuthController.activateAccount(req, res);

      // Restore the original findById method
      Citizen.findById = originalFindById;

      // Expect that the status code is 500 and the error message is returned
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error activating account",
        error: "Mocked error",
      });
    });

    it("Should set the citizen to inActive only if it is not already", async () => {
      const userId = user._id;

      const userToActive = await Citizen.findById(userId);
      if (userToActive) {
        userToActive.isActive = false;
        await userToActive.save();

        const response = await supertest(app)
          .patch(`/api/v1/citizens/${userToActive._id}/inactive`)
          .set("Authorization", `Bearer ${token}`)
          .expect(400);

        expect(response.body.message).toBe("User account is already inactive.");
      } else {
        console.log("User To De-Active not found");
      }
    });
  });

  describe("User profile Administration middlewares", () => {
    it("should call next() if user account is active", () => {
      const req = { user: { isActive: true } };
      const res = {};
      const next = jest.fn(); // Mock next function

      AuthController.ensureActiveUser(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next).toHaveBeenCalledTimes(1);
    });

    it("should return 403 error if user account is inactive", () => {
      const req = { user: { isActive: false } }; // Assuming user account is inactive
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
      const next = jest.fn(); // Mock next function

      AuthController.ensureActiveUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        status: "auth-failure",
        error: "Your account is inactive. Please contact support.",
      });
      expect(next).not.toHaveBeenCalled(); // Ensure next() is not called
    });

    it("should call next() if user is an administrator", () => {
      const req = { role: "administrator" };
      const res = {};
      const next = jest.fn(); // Mock next function

      AuthController.isAdmin(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next).toHaveBeenCalledTimes(1);
    });

    it("should return 403 error if user is not an administrator", () => {
      const req = { role: "citizen" }; // Assuming user is not an administrator
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
      const next = jest.fn(); // Mock next function

      AuthController.isAdmin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        status: "auth-failure",
        error: "Access denied. Requires admin role.",
      });
      expect(next).not.toHaveBeenCalled(); // Ensure next() is not called
    });

    it("should return 403 if user is not logged in", async () => {
      const nonExistentUserId = "nonExistentUserId";
      const response = await supertest(app)
        .patch(`/api/v1/citizens/${nonExistentUserId}/active`)
        .expect(403);

      expect(response.body.error).toBe(
        "You are not logged in! Please log in to get access.",
      );
    });
  });

  describe("get users route", () => {
    afterEach(async () => await dropCollections());
    it("should return a 200", async () => {
      await supertest(app).get(`/api/v1/homepage`).expect(200);
    });

    it("should respond with status 200 and return usernames and citizens", async () => {
      // Create some sample data
      const sampleCitizens = [
        {
          username: "user1",
          password: await bcrypt.hash("password1", 12),
          status: "online",
        },
        {
          username: "user2",
          password: await bcrypt.hash("password2", 12),
          status: "offline",
        },
      ];
      await Citizen.create(sampleCitizens);

      const response = await supertest(app).get("/api/v1/homepage");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("usernames");
      expect(response.body).toHaveProperty("citizens");
      expect(response.body.usernames).toEqual(
        expect.arrayContaining(["user1", "user2"]),
      );
      expect(response.body.citizens.length).toBe(2); // Check if both citizens are returned
    });

    it("should return error response when an error occurs", async () => {
      // Mock the request and response objects
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock the find method of Citizen model to throw an error
      const originalFind = Citizen.find;
      Citizen.find = jest.fn().mockImplementation(() => {
        throw new Error("Mocked error");
      });

      // Call the function to test
      await AuthController.getHome(req, res);

      // Restore the original find method
      Citizen.find = originalFind;

      // Expect that the status code is not 200, indicating an error
      expect(res.status).not.toHaveBeenCalledWith(200);

      // Expect that the status code is 400 and the error message is returned
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: "auth-failure",
        error: "Mocked error",
      });
    });
  });

  describe("POST /citizens", () => {
    afterEach(async () => await dropCollections());
    it("'should sign up a new user with valid credentials'", async () => {
      const username = "testuser";
      const password = "testpassword";

      const response = await supertest(app)
        .post("/api/v1/citizens")
        .send({ username, password })
        .expect(201);

      expect(response.body.status).toBe("signed-up");
      expect(response.body).toHaveProperty("user");
      expect(response.body.user.username).toBe(username);
      expect(response.body.user.status).toBe("online");
      expect(response.body.user.password).toBeUndefined();

      const savedUser = await Citizen.findOne({ username });
      expect(savedUser).toBeDefined();
    });

    it("should return error response when an error occurs", async () => {
      // Mock the request and response objects
      const req = { body: { username: "testUser", password: "password" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock the findOne method of Citizen model to throw an error
      const originalFindOne = Citizen.findOne;
      Citizen.findOne = jest.fn().mockImplementation(() => {
        throw new Error("Mocked error");
      });

      // Call the function to test
      await AuthController.Signup(req, res);

      // Restore the original findOne method
      Citizen.findOne = originalFindOne;

      // Expect that the status code is 400 and the error message is returned
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: "auth-failure",
        error: "Mocked error",
      });
    });

    it("Should throw an error if the password is less than 4 characters", async () => {
      // Attempt to sign up with password less than 4 characters
      const response = await supertest(app)
        .post("/api/v1/citizens")
        .send({ username: "existinguser", password: "wr" })
        .expect(400);
      expect(response.body.status).toBe("auth-failure");
      expect(response.body.error).toBe(
        "Citizen validation failed: password: At least Four characheter for the password",
      );
    });

    it("should log in an existing user if the password is correct", async () => {
      // Create an existing user
      const existingUser = {
        username: "existinguser",
        password: "existingpassword",
      };
      await Citizen.create(existingUser);

      // Attempt to log in with correct password
      const response = await supertest(app)
        .post("/api/v1/citizens")
        .send(existingUser)
        .expect(201);

      expect(response.body.status).toBe("loged-in");
      expect(response.body).toHaveProperty("user");
      expect(response.body.user.username).toBe(existingUser.username);
      expect(response.body.user.status).toBe("online");
      expect(response.body.user.password).toBeUndefined();

      // Verify the user is marked as online in the database
      const updatedUser = await Citizen.findOne({
        username: existingUser.username,
      });
      expect(updatedUser.status).toBe("online");
    });

    describe("username validation test", () => {
      it("Throw an error if the username is less than three characters", async () => {
        const username = "t";
        const password = "testpassword";

        const response = await supertest(app)
          .post("/api/v1/citizens")
          .send({ username, password })
          .expect(400);
        expect(response.body.error).toBe(
          "Citizen validation failed: username: At least three characheter",
        );
      });

      it("Throw an error if a banned username is used", async () => {
        const randomIndex = Math.floor(Math.random() * bannedUsernames.length);
        const bannedUsername = bannedUsernames[randomIndex];

        const password = "testpassword";
        console.log(bannedUsername);
        const response = await supertest(app)
          .post("/api/v1/citizens")
          .send({ username: bannedUsername, password })
          .expect(400);

        expect(response.body.error).toBe(
          "Citizen validation failed: username: This Username is banned and not allowed",
        );
      });
    });

    describe("Pasword validation tests", () => {
      let existingUser;
      beforeEach(async () => {
        // Create a mock user
        existingUser = {
          username: "existinguser",
          password: "existingpassword",
        };
        await Citizen.create(existingUser);
      });

      afterEach(async () => await dropCollections());

      it("shouldn't log in an existing user if the password is blank", async () => {
        // Attempt to log in with blank password
        const response = await supertest(app)
          .post("/api/v1/citizens")
          .send({ username: "existinguser" })
          .expect(400);
        expect(response.body.status).toBe("auth-failure");
        expect(response.body.error).toBe("wrong credentials");
      });

      it("Should throw an error if the password is wrong", async () => {
        // Attempt to log in with wrong password
        const response = await supertest(app)
          .post("/api/v1/citizens")
          .send({ username: "existinguser", password: "wrongpassword" })
          .expect(400);
        expect(response.body.status).toBe("auth-failure");
        expect(response.body.error).toBe("wrong credentials");
      });
    });
  });

  describe("GET /citizens", () => {
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

    it("should return all directory when authenticated", async () => {
      const response = await supertest(app)
        .get("/api/v1/citizens")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      // .expect(403);

      //   expect(response.body).toHaveProperty([]);
    });

    it("should return a 403 error when not authenticated", async () => {
      const response = await supertest(app).get("/api/v1/citizens").expect(403);

      expect(response.body.status).toBe("auth-failure");
      expect(response.body.error).toBe(
        "You are not logged in! Please log in to get access.",
      );
    });

    it("should return a 403 error when the user has been deleted", async () => {
      // Delete the user from the database
      await Citizen.deleteMany();

      const response = await supertest(app)
        .get("/api/v1/citizens")
        .set("Authorization", `Bearer ${token}`)
        .expect(403);

      expect(response.body.status).toBe("auth-failure");
      expect(response.body.error).toBe(
        "The User belonging to this token does no longer exist",
      );
    });
  });

  describe("GET /logout", () => {
    let token;

    beforeEach(async () => {
      // Create a mock user
      const user = await Citizen.create({
        username: "testuser",
        password: "testpassword",
        status: "online",
      });

      const response = await supertest(app)
        .post("/api/v1/citizens")
        .send({ username: "testuser", password: "testpassword" });

      token = response.body.token;
    });

    afterEach(async () => await dropCollections());

    it("should log out a logged-in user successfully", async () => {
      const response = await supertest(app)
        .get("/api/v1/logout")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(response.body.message).toBe("Logged out");

      // Verify the user's status is updated to 'offline' in the database
      const user = await Citizen.findOne({ username: "testuser" });
      expect(user.status).toBe("offline");
    });
  });
});
