import SupportAvailability from "../models/supportAvailability.js";

export class SupportAvailabilityService {
  static async saveSupportAvailability(newSupportAvailability) {
    const supportAvailability = await SupportAvailability.create(
      newSupportAvailability,
    );
    return supportAvailability;
  }
  static async getSupportAvailability() {
    const supportAvailability = await SupportAvailability.find()
      .sort({ createdAt: 1 })
      .populate({
        path: "senderId",
      })
      .exec();
    return { supportAvailability };
  }
  static async updateSupportAvailability(id, updatedSupportAvailability) {
    try {
      const supportAvailability = await SupportAvailability.findByIdAndUpdate(
        id,
        updatedSupportAvailability,
        { new: true },
      );
      return supportAvailability;
    } catch (error) {
      throw new Error(
        `Failed to update support availability: ${error.message}`,
      );
    }
  }

  static async deleteSupportAvailability(id) {
    try {
      const deletedSupportAvailability =
        await SupportAvailability.findByIdAndDelete(id);
      return deletedSupportAvailability;
    } catch (error) {
      throw new Error(
        `Failed to delete support availability: ${error.message}`,
      );
    }
  }
}
