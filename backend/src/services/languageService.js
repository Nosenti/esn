import Citizen from '../models/Citizen.js';

const LanguageService = async(language)=> {
    const updatedLanguage = await Citizen.findByIdAndUpdate(
    language.citizenId,
    { $set: { language: language.language } },
    {new: true},
    );
    return updatedLanguage;
  }

export default LanguageService