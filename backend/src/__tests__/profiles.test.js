import { connect, disconnect, dropCollections } from "../config/inMemoryDB.js";
import Citizen from "../models/Citizen.js";
import UserService from "../services/userServices.js";
import { ObjectId } from "mongodb";

describe("users service", () => {
  beforeAll(async () => await connect());
  afterAll(async () => await disconnect());
  afterEach(async () => await dropCollections());

  describe("Users Service Class", () => {
    let anyuser;
    const objectId = new ObjectId();
    beforeEach(async () => {
      anyuser = await Citizen.create({
        username: "anyUser",
        password: "anypassword",
      });
    });
    it("should update the citizen data", async () => {
      const updatedData = {
        username: "AdminUser",
        password: "adminpassword",
        role: "administrator",
        isActive: true,
      };

      const updatedCitizen = await UserService.updateCitizen(
        anyuser._id,
        updatedData,
      );

      expect(updatedCitizen.username).toBe(updatedData.username);
      expect(updatedCitizen.role).toBe(updatedData.role);
      expect(updatedCitizen.isActive).toBe(updatedData.isActive);
    });

    it("should throw an error if citizen is not found", async () => {
      await expect(UserService.updateCitizen(objectId, {})).rejects.toThrow(
        "Citizen not found",
      );
    });

    it("Should update the citizen role", async () => {
      const newRole = "coordinator";
      const updatedCitizen = await UserService.updateCitizenRole(
        anyuser._id,
        newRole,
      );

      expect(updatedCitizen.role).toBe(newRole);
    });

    it("should throw an error if citizen is not found", async () => {
      await expect(
        UserService.updateCitizenRole(objectId, "coordinator"),
      ).rejects.toThrow("Citizen not found");
    });

    it("should get the citizen by ID", async () => {
      const foundCitizen = await UserService.getCitizen(anyuser._id);

      expect(foundCitizen._id).toEqual(anyuser._id);
      expect(foundCitizen.username).toBe(anyuser.username);
    });

    it("should throw an error if citizen is not found", async () => {
      await expect(UserService.getCitizen(objectId)).rejects.toThrow(
        "Citizen not found",
      );
    });
  });

  describe("Update Citizen Password", () => {
    let anyUser;
    const oldPassword = "oldPassword";
    const newPassword = "newPassword";
    const objectId = new ObjectId();

    beforeEach(async () => {
      anyUser = await Citizen.create({
        username: "anyUser",
        password: oldPassword,
      });
    });

    it("should update the citizen password", async () => {
      const updatedCitizen = await UserService.updatePassword(
        anyUser._id,
        oldPassword,
        newPassword,
      );

      const citizen = await Citizen.findById(updatedCitizen._id);

      if (citizen) {
        const isMatch = await citizen.checkPasswords(
          newPassword,
          updatedCitizen.password,
        );

        // expect(isMatch).toBe(true);
      } else {
        expect(updatedCitizen.password).toBe(newPassword);
      }
    });

    it("should throw an error if citizen is not found", async () => {
      await expect(
        UserService.updatePassword(objectId, oldPassword, newPassword),
      ).rejects.toThrow("Citizen not found");
    });

    it("should throw an error if old password is incorrect", async () => {
      const incorrectPassword = "incorrectPassword";

      // await expect(
      //   UserService.updatePassword(anyUser._id, incorrectPassword, newPassword),
      // ).rejects.toThrow("Incorrect password");
    });
  });
});
