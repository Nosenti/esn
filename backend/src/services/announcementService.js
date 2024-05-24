import Announcement from "../models/Announcement.js";

export class AnnouncementService {
  static async saveAnnouncement(newAnnouncement) {
    const announcement = await Announcement.create(newAnnouncement);
    return announcement;
  }
  static async getAnnouncements() {
    const announcement = await Announcement.find();
    // .sort({ createdAt: 1 })
    // .populate({
    //   path: "senderId",
    // })
    // .exec();
    return { announcement };
  }
}
