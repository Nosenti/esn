import LanguageService from "../services/languageService.js";

const languageController = async(req,res) => {
    const language = {
        citizenId: req.params.id,
        language: req.body.language,
    };
    const savedLanguage = await LanguageService(language)

      return res
        .status(200)
        .json({ message: "Language updated.", newlanguage: savedLanguage });
}

export default languageController