import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { UserContext } from '../context/UserContext'
import api from '../utils/api'
import UserLanguageContext from '../context/UserLanguageContext'
import makeConfig from '../utils/helpers'

const LanguageSelector = () => {
  const { user, fetchUser } = useContext(UserLanguageContext)
  const config = makeConfig()
  const { currentUser } = useContext(UserContext)
  const id = currentUser?.user?._id
  const { i18n } = useTranslation()
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language)
  useEffect(() => {
    if (user) {
      setSelectedLanguage(user?.data?.language)
    }
  }, [user])

  useEffect(() => {
    if (id) {
      fetchUser(id)
    }
  }, [id])

  const handleChange = async (e) => {
    const language = e.target.value
    setSelectedLanguage(language)
    try {
      await api.put(`/citizens/${id}/language`, { language: language },config)
      i18n.changeLanguage(language)
      fetchUser(id) 
      Weglot.switchTo(language);
    } catch (error) {
      console.error('Error updating language:', error)
    }
  }

  return (
    <div className="p-2">
      <select
        className="text-black"
        value={selectedLanguage}
        onChange={handleChange}
      >
        <option value="en">English</option>
        <option value="fr">French</option>
      </select>
    </div>
  );
}

export default LanguageSelector
