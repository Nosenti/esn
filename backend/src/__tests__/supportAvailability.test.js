import { connect, disconnect, dropCollections } from "../config/inMemoryDB.js";
import supertest from "supertest";
import app from "../../app.js";
import SupportAvailability from "../models/supportAvailability.js";
import Citizen from "../models/Citizen.js";
import { getJwtToken } from "../utils/jwt.utils.js";
import { SupportAvailabilityService } from "../services/supportAvailabilityService.js";
import { ObjectId } from "mongodb";
import { jest } from "@jest/globals";

describe("SupportAvailabilityController", () => {
  beforeAll(async () => await connect());
  afterAll(async () => await disconnect());
  afterEach(async () => await dropCollections());

  describe("Support Availability unit tests", () => {
    it("should create a new schedule", async () => {
      const schedule = {
        senderId: new ObjectId(),
        username: "testuser",
        startDate: Date.now(),
        endDate: Date.now(),
        phone: "089999999999",
        email: "test@gmail.com",
        sendEmail: true,
      };

      const savedSchedule =
        await SupportAvailabilityService.saveSupportAvailability(schedule);
      expect(savedSchedule).toBe;
    });

    it("should return error in case of an issue", async () => {
      const schedule = {
        senderId: new ObjectId(),
        username: "testuser",
        startDate: Date.now(),
        endDate: Date.now(),
        phone: "089999999999",
        email: "test@gmail.com",
        sendEmail: true,
      };

      const originalFindById = SupportAvailability.findByIdAndUpdate;
      SupportAvailability.findByIdAndUpdate = jest
        .fn()
        .mockImplementation(() => {
          throw new Error("Mocked error");
        });
      const user_id = new ObjectId();

      await expect(
        SupportAvailabilityService.updateSupportAvailability(user_id, schedule),
      ).rejects.toThrow("Failed to update support availability: Mocked error");

      // Restore the original implementation after the test
      SupportAvailability.findByIdAndUpdate = originalFindById;
    });

    it("should return error in case of a delete issue", async () => {
      const originalFindByIdAndDelete = SupportAvailability.findByIdAndDelete;
      SupportAvailability.findByIdAndDelete = jest
        .fn()
        .mockImplementation(() => {
          throw new Error("Mocked error");
        });

      const user_id = new ObjectId();

      await expect(
        SupportAvailabilityService.deleteSupportAvailability(user_id),
      ).rejects.toThrow("Failed to delete support availability: Mocked error");

      // Restore the original implementation after the test
      SupportAvailability.findByIdAndDelete = originalFindByIdAndDelete;
    });
  });

  describe("POST /api/v1/support-availability", () => {
    let token;

    beforeEach(async () => {
      const user = await Citizen.create({
        username: "testuser",
        password: "testpassword",
      });
      token = getJwtToken(user._id);
    });

    it("should save support availability", async () => {
      const requestBody = {
        startDate: new Date(),
        endDate: new Date(),
        phone: "123456789",
        email: "test@example.com",
        sendEmail: true,
      };

      const response = await supertest(app)
        .post("/api/v1/support-availability")
        .set("Authorization", `Bearer ${token}`)
        .send(requestBody)
        .expect(201);

      expect(response.body).toHaveProperty(
        "message",
        "Support availability saved successfully",
      );
    });
    it("should return 400 for posting with wrong email format", async () => {
      const requestBody = {
        startDate: new Date(),
        endDate: new Date(),
        phone: "123456789",
        email: "invalidemail", // Invalid email format
        sendEmail: true,
      };

      const response = await supertest(app)
        .post("/api/v1/support-availability")
        .set("Authorization", `Bearer ${token}`)
        .send(requestBody)
        .expect(400);

      expect(response.body).toHaveProperty("message");
    });
  });

  describe("GET /api/v1/support-availability", () => {
    let token;

    beforeEach(async () => {
      const user = await Citizen.create({
        username: "testuser",
        password: "testpassword",
      });
      token = getJwtToken(user._id);

      await SupportAvailability.create({
        senderId: user._id,
        username: user.username,
        startDate: new Date(),
        endDate: new Date(),
        phone: "123456789",
        email: "test@example.com",
        sendEmail: true,
      });
    });

    it("should get all support availability", async () => {
      const response = await supertest(app)
        .get("/api/v1/support-availability")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(response.body).toHaveProperty(
        "message",
        "Fetched old SupportAvailability",
      );
    });
  });

  describe("DELETE /api/v1/support-availability/:id", () => {
    let token;
    let supportAvailabilityId;

    beforeEach(async () => {
      const user = await Citizen.create({
        username: "testuser",
        password: "testpassword",
      });
      token = getJwtToken(user._id);
      const supportAvailability = await SupportAvailability.create({
        senderId: user._id,
        username: user.username,
        startDate: new Date(),
        endDate: new Date(),
        phone: "123456789",
        email: "test@example.com",
        sendEmail: true,
      });
      supportAvailabilityId = supportAvailability._id;
    });

    it("should delete support availability", async () => {
      const response = await supertest(app)
        .delete(`/api/v1/support-availability/${supportAvailabilityId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(response.body).toHaveProperty(
        "message",
        "Support availability deleted successfully",
      );
    });
    it("should return 404 for deleting non-existing support availability", async () => {
      // Assuming nonExistingId does not correspond to any existing support availability
      const nonExistingId = "65f55cf4c69f177cc546f049";

      const response = await supertest(app)
        .delete(`/api/v1/support-availability/${nonExistingId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(404);

      expect(response.body).toHaveProperty(
        "message",
        "Support availability not found",
      );
    });
  });

  describe("PUT /api/v1/support-availability/:id", () => {
    let token;
    let supportAvailabilityId;

    beforeEach(async () => {
      const user = await Citizen.create({
        username: "testuser",
        password: "testpassword",
      });
      token = getJwtToken(user._id);

      const supportAvailability = await SupportAvailability.create({
        senderId: user._id,
        username: user.username,
        startDate: new Date(),
        endDate: new Date(),
        phone: "123456789",
        email: "test@example.com",
        sendEmail: true,
      });
      supportAvailabilityId = supportAvailability._id;
    });

    it("should update support availability", async () => {
      // Define the request body
      const requestBody = {
        startDate: new Date(),
        endDate: new Date(),
        phone: "123456789",
        email: "test@example.com",
        sendEmail: true,
      };

      const response = await supertest(app)
        .put(`/api/v1/support-availability/${supportAvailabilityId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(requestBody)
        .expect(200);

      expect(response.body).toHaveProperty(
        "message",
        "Support availability updated successfully",
      );
    });
    it("should return 404 for updating non-existing support availability", async () => {
      const nonExistingId = "65f55cf4c69f177cc546f049";
      const requestBody = {
        startDate: new Date(),
        endDate: new Date(),
        phone: "123456789",
        email: "test@example.com",
        sendEmail: true,
      };

      const response = await supertest(app)
        .put(`/api/v1/support-availability/${nonExistingId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(requestBody)
        .expect(404);

      expect(response.body).toHaveProperty(
        "message",
        "Support availability not found",
      );
    });
  });
});
