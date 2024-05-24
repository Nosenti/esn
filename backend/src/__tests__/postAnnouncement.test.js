import { connect, disconnect, dropCollections } from "../config/inMemoryDB.js";
import supertest from "supertest";
import app from "../../app.js";
import Citizen from "../models/Citizen.js";
import { getJwtToken } from "./../utils/jwt.utils.js";
import { AnnouncementService } from "../services/announcementService.js";
import { AnnouncementController } from "../controllers/announcementController.js";
import { jest } from "@jest/globals";

// console.log(process.env.JWT_SECRET);
describe("Announcement", () => {
  beforeAll(async () => await connect());
  afterAll(async () => await disconnect());
  afterEach(async () => await dropCollections());

  let token;
  let announcement;

  beforeEach(async () => {
    const user = await Citizen.create({
      username: "testuser",
      password: "testpassword",
    });
    token = getJwtToken(user._id);
    announcement = {
      senderId: user._id,
      title: "A1",
      announcement: "Announcement",
    };
  });

  afterEach(async () => await dropCollections());

  it("Getting Announcements", async () => {
    const response = await supertest(app)
      .get(`/api/v1/announcements`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.body.message).toEqual(
      "Announcements retrieved successfully",
    );
    expect(response.statusCode).toEqual(200);
    expect(response.body.message).toBeDefined();
  });

  // it("Post announcement", async () => {
  //   const response = await supertest(app)
  //     .post("/api/v1/announcements")
  //     .set("Authorization", `Bearer ${token}`)
  //     .send(announcement);

  //   expect(response.body.message).toEqual("Announcement sent successfully.");
  //   expect(response.statusCode).toEqual(200);

  //   const createdAnnouncement = response.body.newAnnouncement;
  //   expect(String(createdAnnouncement.senderId)).toEqual(
  //     String(announcement.senderId),
  //   );
  //   expect(createdAnnouncement.title).toEqual(announcement.title);
  //   expect(createdAnnouncement.announcement).toEqual(announcement.announcement);
  // });

  it("should return a 500 status code and an error message when getAllAnnouncement throws an error", async () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const req = {
      user: {
        id: "123",
      },
    };
    AnnouncementService.getAnnouncements = jest
      .fn()
      .mockRejectedValueOnce(new Error("Some error"));

    await AnnouncementController.getAllAnnouncement(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Some error",
      message: "Failed to fetch announcements",
    });
  });

  it("should return a 500 status code and an error message when save Announcement throws an error", async () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const req = {
      user: {
        id: "123",
      },
      body: {
        title: "A1",
        announcement: "Announcement",
      },
    };
    AnnouncementService.saveAnnouncement = jest
      .fn()
      .mockRejectedValueOnce(new Error("Some error"));

    await AnnouncementController.saveAnnouncement(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
