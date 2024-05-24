import { connect, disconnect, dropCollections } from "../config/inMemoryDB.js";
import Citizen from "../models/Citizen.js";
import ShareStatusServices from "../services/shareStatusServices.js";
import shareStatusController from "../controllers/shareStatusController.js";
import { ObjectId } from "mongodb";
import { jest } from "@jest/globals";

describe("ShareStatusServices", () => {
  beforeAll(async () => await connect());
  afterAll(async () => await disconnect());
  afterEach(async () => await dropCollections());

  describe("should update the health status of the citizen", () => {
    let anyuser;
    beforeEach(async () => {
      anyuser = await Citizen.create({
        username: "anyUser",
        password: "anypassword",
        healthStatus: "OK",
      });
    });

    it("Test 1", async () => {
      // Define the new status
      const newStatus = {
        senderId: anyuser._id,
        status: "Emergency",
      };

      const updatedStatus = await ShareStatusServices(newStatus);

      // Retrieve the citizen from the database to verify the updated health status
      const updatedCitizen = await Citizen.findById(anyuser._id);

      // Assert that the health status is updated correctly
      expect(updatedCitizen.healthStatus).toBe(newStatus.status);
    });

    describe("Share Status Controller", () => {
      let anyuser, req, res;
      req = {
        params: {
          id: new ObjectId(),
        },
        body: {
          healthStatus: "OK",
        },
      };

      res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
      it("Should Share Status", async () => {
        await shareStatusController(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
      });
    });
  });
});
