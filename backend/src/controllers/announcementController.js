import i18n from "../i18n.config.mjs";
import { AnnouncementService } from "../services/announcementService.js";
import getPreferredLanguage from "../utils/getPreferredLanguage.js";
import { LocaleService } from "../utils/localeService.mjs";
// import { translateText } from "../utils/translate.js";

const localeService = new LocaleService(i18n);

export class AnnouncementController {
  static async saveAnnouncement(req, res) {
    const preferredLanguage = await getPreferredLanguage(req.user.id);
    localeService.setLocale(preferredLanguage);

    try {
      const newAnnouncement = {
        senderId: req.user.id,
        title: req.body.title,
        announcement: req.body.announcement,
      };

      const savedAnnouncement = await AnnouncementService.saveAnnouncement(newAnnouncement);

      return res.status(200).json({
        message: localeService.translate("Announcement sent successfully."),
        newAnnouncement: savedAnnouncement,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({
        error: err.message,
        message: localeService.translate("Failed to send a new Announcement"),
      });
    }
  }

  static async getAllAnnouncement(req, res) {
    const preferredLanguage = await getPreferredLanguage(req.user.id);
    localeService.setLocale(preferredLanguage);
    
    try {
      let announcements = await AnnouncementService.getAnnouncements();

      // announcements = await translateAnnouncements(announcements, preferredLanguage);
      
      return res.status(200).json({ 
        message: localeService.translate("Announcements retrieved successfully"),
        announcements: announcements
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        error: err.message,
        message: localeService.translate("Failed to fetch announcements"),
      });
    }
  }
}

// async function translateAnnouncements(announcements, targetLanguage) {
//   try {
//     // Assuming AnnouncementService.getAnnouncements() returns an array of announcement objects
//     const translatedAnnouncements = await Promise.all(announcements?.announcement?.map(async (announcement) => {
//       // Translate each announcement text
//       const translatedAnnouncement = {
//         ...announcement,
//         title: await translateText(announcement.title, targetLanguage),
//         announcement: await translateText(announcement.announcement, targetLanguage),
//       };
//       return translatedAnnouncement;
//     }));
//     return translatedAnnouncements;
//   } catch (error) {
//     console.error('Error translating announcements:', error);
//     return announcements; // Return original announcements if translation fails
//   }
// }
