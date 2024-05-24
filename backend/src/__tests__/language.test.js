import { connect, disconnect, dropCollections } from "../config/inMemoryDB.js";
import supertest from "supertest";
import app from "../../app.js";
import Citizen from "../models/Citizen.js";
import { getJwtToken } from "./../utils/jwt.utils.js";
import AuthController from "../controllers/JoinCommunityController.js";
import { jest } from "@jest/globals";
import LanguageService from "../services/languageService.js";

describe("AuthController", () => {
  beforeAll(async () => await connect());
  afterAll(async () => await disconnect());
  afterEach(async () => await dropCollections());

  let token, user;
  let id;

  beforeEach(async () => {
    user = await Citizen.create({
      username: "testuser",
      password: "testpassword",
    });
    token = getJwtToken(user._id);
    id = user._id;
  });
  afterEach(async () => await dropCollections());

  it("Getting citizen", async () => {
    const response = await supertest(app)
      .get(`/api/v1/citizens/${id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
  });

  it("udpate language", async () => {
    const language = {
      citizenId: user._id,
      language: "fr",
    };

    const udpatedUser = await LanguageService(language);
  });

  it("Updating Language", async () => {
    const response = await supertest(app)
      .put(`/api/v1/citizens/${id}/language`)
      .set("Authorization", `Bearer ${token}`)
      .send({ language: "fr" });

    expect(response.statusCode).toEqual(200);
  });

  // it("Getting citizen", async () => {
  // const response = await supertest(app)
  //   .get(`/api/v1/citizens/123`)
  //   .set("Authorization", `Bearer ${token}`);

  // expect(response.statusCode).toEqual(500);
  // });

  it("should return a 500", async () => {
    const response = await supertest(app)
      .get(`/api/v1/citizens/123`) // Assuming '123' is a non-existent ID
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(500);
  });
});

// describe("Announcements", () => {
//   beforeAll(async () => await connect());
//   afterAll(async () => await disconnect());
//   afterEach(async () => await dropCollections());

//   describe("GET /announcements ALL", () => {
//       let token;
//       let id;

//     beforeEach(async () => {
//       // Create a mock user
//       const user = await Citizen.create({
//         username: "testuser",
//         password: "testpassword",
//       });
//         token = getJwtToken(user._id);
//         id = user._id;
//     });

//     afterEach(async () => await dropCollections());

//     it("should return preferred language of a user", async () => {
//       const response = await supertest(app)
//         .get(`/api/v1/citizens/${id}/language`)
//         .set("Authorization", `Bearer ${token}`)
//         .expect(200);

//       expect(response.body.message).toBe("Error fetching citizen");
//     });

//     // it("should return a 403 error when not authenticated", async () => {
//     //   const response = await supertest(app)
//     //     .get("/api/v1/announcements/")
//     //     .expect(403);

//     //   expect(response.body.status).toBe("auth-failure");
//     //   expect(response.body.error).toBe(
//     //     "You are not logged in! Please log in to get access.",
//     //   );
//     // });

//     // it("should return a 403 error when the user has been deleted", async () => {
//     //   // Delete the user from the database
//     //   await Citizen.deleteMany();

//     //   const response = await supertest(app)
//     //     .get("/api/v1/announcements/")
//     //     .set("Authorization", `Bearer ${token}`)
//     //     .expect(403);

//     //   expect(response.body.status).toBe("auth-failure");
//     //   expect(response.body.error).toBe(
//     //     "The User belonging to this token does no longer exist",
//     //   );
//     // });
//   });

// //   describe("/ POST Announcement", () => {
// //     let token;
// //     let user;
// //     beforeEach(async () => {
// //       // Create a mock user
// //       user = await Citizen.create({
// //         username: "testuser",
// //         password: "testpassword",
// //       });
// //       token = getJwtToken(user._id);
// //     });

// //     afterEach(async () => await dropCollections());

// //     it("should return all announcements when authenticated", async () => {
// //       // Define the request body
// //       const requestBody = { title: "Announcement", announcement: "Test Announcement" };

// //       const response = await supertest(app)
// //         .post("/api/v1/announcements/")
// //         .set("Authorization", `Bearer ${token}`)
// //         .set("User", JSON.stringify(user))
// //         .send(requestBody)
// //         .expect(200);

// //       expect(response.body).toHaveProperty("announcement");
// //       expect(response.body.announcement).toBe("Announcement sent.");
// //     });
// //   });
// });
