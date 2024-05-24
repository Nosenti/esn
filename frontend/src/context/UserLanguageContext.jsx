import React, { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import api from '../utils/api'

const UserLanguageContext = createContext()

export const UserLanguageProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [language, setLanguage] = useState('')

  const fetchUser = async (id) => {
    try {
      const response = await api.get(`/citizens/${id}`)
      setUser(response)
      setLanguage(response?.data.language)
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }

  return (
    <UserLanguageContext.Provider
      value={{
        user,
        language,
        fetchUser,
      }}
    >
      {children}
    </UserLanguageContext.Provider>
  )
}

export default UserLanguageContext

UserLanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
