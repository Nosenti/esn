import connectDb from "./../config/dbConnection.js";
import { connect, disconnect, dropCollections } from "../config/inMemoryDB.js";

describe("Connection to Atlas MongoDB", () => {
  beforeAll(async () => await connect());
  afterAll(async () => await disconnect());

  describe("Connect to the DB", () => {
    it("connectToDatabase", async () => {
      await disconnect();
      await connectDb();
    });
  });
});
