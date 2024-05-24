import { connect, disconnect, dropCollections } from "../config/inMemoryDB.js";
import supertest from "supertest";
import app from "../../app.js";
import Citizen from "../models/Citizen.js";
import { getJwtToken } from "../utils/jwt.utils.js";

describe("Search Information", () => {
  beforeAll(async () => await connect());
  afterAll(async () => await disconnect());
  afterEach(async () => await dropCollections());

  describe("GET /search Citizens", () => {
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

    it("should return users when authenticated", async () => {
      const response = await supertest(app)
        .get("/api/v1/search/tw")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(response.body).toHaveProperty("count");
      expect(response.body.status).toBe("success");
    });

    it("should return a 403 error when not authenticated", async () => {
      const response = await supertest(app)
        .get("/api/v1/search/tw")
        .expect(403);

      expect(response.body.status).toBe("auth-failure");
      expect(response.body.error).toBe(
        "You are not logged in! Please log in to get access.",
      );
    });

    it("should return a 403 error when the user has been deleted", async () => {
      await Citizen.deleteMany();

      const response = await supertest(app)
        .get("/api/v1/search/tw")
        .set("Authorization", `Bearer ${token}`)
        .expect(403);

      expect(response.body.status).toBe("auth-failure");
      expect(response.body.error).toBe(
        "The User belonging to this token does no longer exist",
      );
    });
  });
  describe("GET /search Messages", () => {
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

    it("should return users when authenticated", async () => {
      const response = await supertest(app)
        .get("/api/v1/search/morning")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(response.body).toHaveProperty("count");
      expect(response.body.status).toBe("success");
    });

    it("should return a 403 error when not authenticated", async () => {
      const response = await supertest(app)
        .get("/api/v1/search/morning")
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
        .get("/api/v1/search/morning")
        .set("Authorization", `Bearer ${token}`)
        .expect(403);

      expect(response.body.status).toBe("auth-failure");
      expect(response.body.error).toBe(
        "The User belonging to this token does no longer exist",
      );
    });
  });
});
