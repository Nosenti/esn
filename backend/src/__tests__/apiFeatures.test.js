import APIFeatures from "../utils/apiFeatures";
import { jest } from "@jest/globals";
import Citizen from "../models/Citizen";
import { connect, disconnect, dropCollections } from "../config/inMemoryDB.js";

describe("APIFeatures", () => {
  beforeAll(async () => await connect());
  afterAll(async () => await disconnect());
  afterEach(async () => await dropCollections());
  describe("sort()", () => {
    it("should sort the query if sort parameter is provided", async () => {
      const query = Citizen.find();
      const queryString = {
        sort: "isActive,-country",
      };
      const apiFeatures = new APIFeatures(query, queryString);

      const results = apiFeatures.sort();

      expect(results).toBeDefined();
    });

    it("should do Field Limiting", async () => {
      const query = Citizen.find();
      const queryString = {
        sort: "isActive,country",
      };
      const apiFeatures = new APIFeatures(query, queryString);

      const results = apiFeatures.fieldLimiting();

      expect(results).toBeDefined();
    });

    it("should exclude certain fields from query object", () => {
      const queryString = {
        page: 1,
        sort: "field1",
        limit: 10,
        fields: "field1,field2",
        otherField: "value",
      };
      const query = Citizen.find();
      const apiFeatures = new APIFeatures(query, queryString);

      apiFeatures.filter();

      // Check if excluded fields are removed from the query object
      expect(apiFeatures.queryString).toEqual(queryString);
    });

    it("should limit fields in the query if fields parameter is provided", () => {
      const queryString = {
        fields: "field1,field2",
      };

      const mockQuery = {
        select: jest.fn(),
      };

      const apiFeatures = new APIFeatures(mockQuery, queryString);

      apiFeatures.fieldLimiting();

      // Check if select() method is called with the expected argument
      expect(mockQuery.select).toHaveBeenCalledWith("field1 field2");
    });

    it("should not modify the query if fields parameter is not provided", () => {
      const queryString = {};

      const mockQuery = {
        select: jest.fn(),
      };

      const apiFeatures = new APIFeatures(mockQuery, queryString);

      apiFeatures.fieldLimiting();

      // Check that select() method is not called
      expect(mockQuery.select).not.toHaveBeenCalled();
    });

    it("should correctly handle empty fields parameter", () => {
      const queryString = {
        fields: "",
      };

      const mockQuery = {
        select: jest.fn(),
      };

      const apiFeatures = new APIFeatures(mockQuery, queryString);

      apiFeatures.fieldLimiting();

      // Check that select() method is not called
      expect(mockQuery.select).not.toHaveBeenCalled();
    });
  });
});
