//This test suit is no longer being recognized by jest for mysterious reasons, It was replaced by com.test

it("should pass", () => {
  console.log("home");
});

// import { connect, disconnect, dropCollections } from "../config/inMemoryDB.js";
// import supertest from "supertest";
// import app from "../../app.js";
// import Citizen from "../models/Citizen.js";
// import bcrypt from "bcryptjs";
// import { getJwtToken } from "../utils/jwt.utils.js";
// import fs from "fs";
// import { bannedUsernames } from "../models/data/bannedUsernames.js";

// // console.log(process.env.JWT_SECRET);
// describe("users", () => {
//   beforeAll(async () => await connect());
//   afterAll(async () => await disconnect());
//   afterEach(async () => await dropCollections());

//   describe("get users route", () => {
//     afterEach(async () => await dropCollections());
//     it("should return a 200", async () => {
//       await supertest(app).get(`/api/v1/homepage`).expect(200);
//     });

//     it("should respond with status 200 and return usernames and citizens", async () => {
//       // Create some sample data
//       const sampleCitizens = [
//         {
//           username: "user1",
//           password: await bcrypt.hash("password1", 12),
//           status: "online",
//         },
//         {
//           username: "user2",
//           password: await bcrypt.hash("password2", 12),
//           status: "offline",
//         },
//       ];
//       await Citizen.create(sampleCitizens);

//       const response = await supertest(app).get("/api/v1/homepage");

//       expect(response.status).toBe(200);
//       expect(response.body).toHaveProperty("usernames");
//       expect(response.body).toHaveProperty("citizens");
//       expect(response.body.usernames).toEqual(
//         expect.arrayContaining(["user1", "user2"]),
//       );
//       expect(response.body.citizens.length).toBe(2); // Check if both citizens are returned
//     });
//   });

//   describe("POST /citizens", () => {
//     afterEach(async () => await dropCollections());
//     it("'should sign up a new user with valid credentials'", async () => {
//       const username = "testuser";
//       const password = "testpassword";

//       const response = await supertest(app)
//         .post("/api/v1/citizens")
//         .send({ username, password })
//         .expect(201);

//       expect(response.body.status).toBe("signed-up");
//       expect(response.body).toHaveProperty("user");
//       expect(response.body.user.username).toBe(username);
//       expect(response.body.user.status).toBe("online");
//       expect(response.body.user.password).toBeUndefined();

//       const savedUser = await Citizen.findOne({ username });
//       expect(savedUser).toBeDefined();
//     });

//     it("Should throw an error if the password is less than 4 characters", async () => {
//       // Attempt to sign up with password less than 4 characters
//       const response = await supertest(app)
//         .post("/api/v1/citizens")
//         .send({ username: "existinguser", password: "wr" })
//         .expect(400);
//       expect(response.body.status).toBe("auth-failure");
//       expect(response.body.error).toBe(
//         "Citizen validation failed: password: At least Four characheter for the password",
//       );
//     });

//     it("should log in an existing user if the password is correct", async () => {
//       // Create an existing user
//       const existingUser = {
//         username: "existinguser",
//         password: "existingpassword",
//       };
//       await Citizen.create(existingUser);

//       // Attempt to log in with correct password
//       const response = await supertest(app)
//         .post("/api/v1/citizens")
//         .send(existingUser)
//         .expect(201);

//       expect(response.body.status).toBe("loged-in");
//       expect(response.body).toHaveProperty("user");
//       expect(response.body.user.username).toBe(existingUser.username);
//       expect(response.body.user.status).toBe("online");
//       expect(response.body.user.password).toBeUndefined();

//       // Verify the user is marked as online in the database
//       const updatedUser = await Citizen.findOne({
//         username: existingUser.username,
//       });
//       expect(updatedUser.status).toBe("online");
//     });

//     describe("username validation test", () => {
//       it("Throw an error if the username is less than three characters", async () => {
//         const username = "t";
//         const password = "testpassword";

//         const response = await supertest(app)
//           .post("/api/v1/citizens")
//           .send({ username, password })
//           .expect(400);
//         expect(response.body.error).toBe(
//           "Citizen validation failed: username: At least three characheter",
//         );
//       });

//       it("Throw an error if a banned username is used", async () => {
//         const randomIndex = Math.floor(Math.random() * bannedUsernames.length);
//         const bannedUsername = bannedUsernames[randomIndex];

//         const password = "testpassword";
//         console.log(bannedUsername);
//         const response = await supertest(app)
//           .post("/api/v1/citizens")
//           .send({ username: bannedUsername, password })
//           .expect(400);

//         expect(response.body.error).toBe(
//           "Citizen validation failed: username: This Username is banned and not allowed",
//         );
//       });
//     });

//     describe("Pasword validation tests", () => {
//       let existingUser;
//       beforeEach(async () => {
//         // Create a mock user
//         existingUser = {
//           username: "existinguser",
//           password: "existingpassword",
//         };
//         await Citizen.create(existingUser);
//       });

//       afterEach(async () => await dropCollections());

//       it("shouldn't log in an existing user if the password is blank", async () => {
//         // Attempt to log in with blank password
//         const response = await supertest(app)
//           .post("/api/v1/citizens")
//           .send({ username: "existinguser" })
//           .expect(400);
//         expect(response.body.status).toBe("auth-failure");
//         expect(response.body.error).toBe("wrong password");
//       });

//       it("Should throw an error if the password is wrong", async () => {
//         // Attempt to log in with wrong password
//         const response = await supertest(app)
//           .post("/api/v1/citizens")
//           .send({ username: "existinguser", password: "wrongpassword" })
//           .expect(400);
//         expect(response.body.status).toBe("auth-failure");
//         expect(response.body.error).toBe("wrong password");
//       });
//     });
//   });

//   describe("GET /citizens", () => {
//     let token;

//     beforeEach(async () => {
//       // Create a mock user
//       const user = await Citizen.create({
//         username: "testuser",
//         password: "testpassword",
//       });
//       token = getJwtToken(user._id);
//     });

//     afterEach(async () => await dropCollections());

//     it("should return all directory when authenticated", async () => {
//       const response = await supertest(app)
//         .get("/api/v1/citizens")
//         .set("Authorization", `Bearer ${token}`)
//         .expect(200);

//       expect(response.body).toHaveProperty("citizens");
//     });

//     it("should return a 403 error when not authenticated", async () => {
//       const response = await supertest(app).get("/api/v1/citizens").expect(403);

//       expect(response.body.status).toBe("auth-failure");
//       expect(response.body.error).toBe(
//         "You are not logged in! Please log in to get access.",
//       );
//     });

//     it("should return a 403 error when the user has been deleted", async () => {
//       // Delete the user from the database
//       await Citizen.deleteMany();

//       const response = await supertest(app)
//         .get("/api/v1/citizens")
//         .set("Authorization", `Bearer ${token}`)
//         .expect(403);

//       expect(response.body.status).toBe("auth-failure");
//       expect(response.body.error).toBe(
//         "The User belonging to this token does no longer exist",
//       );
//     });
//   });

//   describe("GET /logout", () => {
//     let token;

//     beforeEach(async () => {
//       // Create a mock user
//       const user = await Citizen.create({
//         username: "testuser",
//         password: "testpassword",
//         status: "online",
//       });

//       const response = await supertest(app)
//         .post("/api/v1/citizens")
//         .send({ username: "testuser", password: "testpassword" });

//       token = response.body.token;
//     });

//     afterEach(async () => await dropCollections());

//     it("should log out a logged-in user successfully", async () => {
//       const response = await supertest(app)
//         .get("/api/v1/logout")
//         .set("Authorization", `Bearer ${token}`)
//         .expect(200);

//       expect(response.body.message).toBe("Logged out");

//       // Verify the user's status is updated to 'offline' in the database
//       const user = await Citizen.findOne({ username: "testuser" });
//       expect(user.status).toBe("offline");
//     });
//   });
// });
