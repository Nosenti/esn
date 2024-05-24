import SearchService from "../services/searchServices.js";

const searchController = async (req, res) => {
  try {
    const key = req.params.key;
    const citizenData = await SearchService.searchCitizens(key);
    const messageData = await SearchService.searchMessages(key);

    res.json({
      status: "success",
      count: citizenData.length + messageData.length,
      data: citizenData,
      messages: messageData,
    });
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).json({
      status: "error",
      message: "An error occurred during the search.",
    });
  }
};

export default searchController;
