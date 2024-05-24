import Citizen from "../models/Citizen.js";
import ChatMessage from "../models/publicMessage.js";

class SearchService {
  static async searchCitizens(key) {
    return await Citizen.find({
      $or: [
        { username: { $regex: key, $options: "i" } },
        { status: { $regex: key, $options: "i" } },
        { healthStatus: { $regex: key, $options: "i" } },
      ],
    });
  }

  static async searchMessages(key) {
    return await ChatMessage.find({
      message: { $regex: key, $options: "i" },
    });
  }
}

export default SearchService;
