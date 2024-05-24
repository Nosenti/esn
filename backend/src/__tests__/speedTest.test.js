import connectDb from "./../config/dbConnection.js";
import { connect, disconnect, dropCollections } from "../config/inMemoryDB.js";
import Citizen from "../models/Citizen.js";
import { getJwtToken } from "../utils/jwt.utils.js";

describe("Connection to Atlas MongoDB", () => {
  beforeAll(async () => await connect());
  afterAll(async () => await disconnect());
  // afterEach(async () => await dropCollections());

  describe("Connect to the DB", () => {
    it("connectToDatabase", async () => {
      await disconnect();
      await connectDb();
    });
  });

  describe("sendPostRequest function", () => {
    let token;

    beforeEach(async () => {
      const user = await Citizen.create({
        username: "testuser",
        password: "testpassword",
      });
      token = getJwtToken(user._id);
    });

    it("should send a POST request with the correct message and headers", async () => {});
  });
});
