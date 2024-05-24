import { connect, disconnect, dropCollections } from "../config/inMemoryDB.js";
import { jest } from "@jest/globals";
import { createServiceProvider } from "../controllers/serviceProvidersCtrl.js";
import supertest from "supertest";
import app from "../../app.js";
import Citizen from "../models/Citizen.js";
import EmergencySP from "../models/serviceProvider.js";

describe("emergency", () => {
  beforeAll(async () => await connect());
  afterAll(async () => await disconnect());
  afterEach(async () => await dropCollections());

  describe("Create Service Provider", () => {
    afterEach(async () => await dropCollections());
    it("should return 401 if required fields are missing", async () => {
      const req = { body: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await createServiceProvider(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "The emergency service provider is missing critical details",
      });
    });
  });

  describe("POST Service Provider request", () => {
    it("should create a new emergency service provider", async () => {
      const newServiceProvider = {
        institution: "Test Institution",
        serviceType: "Hospital",
        phone: "1234567890",
        email: "test@example.com",
        location: "1.23456, -1.23456",
      };

      const res = await supertest(app)
        .post("/api/v1/emergency/serviceProvider")
        .send(newServiceProvider);
      expect(res.body).toHaveProperty(
        "message",
        "Emergency Service Provider created successfully",
      );
      expect(res.body.data).toHaveProperty(
        "institutionName",
        newServiceProvider.institution,
      );
    });

    it("should create a new emergency service provider", async () => {
      const newServiceProvider = {
        institution: "Test Institution",
        serviceType: "wrong-service-Type",
        phone: "1234567890",
        email: "test@example.com",
        location: "1.23456, -1.23456",
      };

      const res = await supertest(app)
        .post("/api/v1/emergency/serviceProvider")
        .send(newServiceProvider);

      expect(res.statusCode).toEqual(500);
    });
  });
});

describe("POST Report Emergency", () => {
  beforeAll(async () => await connect());
  afterAll(async () => await disconnect());
  afterEach(async () => await dropCollections());
  it("should report emergency and return nearest service providers", async () => {
    // Create an existing user
    const existingUser = {
      username: "existinguser",
      password: "existingpassword",
    };
    const user = await Citizen.create(existingUser);

    const newServiceProvider = {
      institutionName: "Test Institution",
      serviceType: "Hospital",
      phoneNumber: "1234567890",
      emailAddress: "test@example.com",
      location: {
        type: "Point",
        coordinates: [30.103109650044605, -1.9606133622557391],
      },
    };

    EmergencySP.create(newServiceProvider);

    const emergencyData = {
      citizenName: "John Doe",
      ssn: "123-45-6789",
      emType: "Fire Outbreak",
      geolocation: "-1.9606133622557391, 30.103109650044605",
      requestFor: ["Hospital", "First Aid"],
      userId: user._id,
    };

    const response = await supertest(app)
      .post("/api/v1/emergency/reportEmergency")
      .send(emergencyData)
      .expect(200);
    // Assertions
    expect(response.body).toHaveProperty("response");
  });
});
