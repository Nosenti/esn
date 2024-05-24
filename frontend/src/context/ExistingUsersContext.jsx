import PropTypes from "prop-types";
import { createContext, useState, useEffect } from "react";
import { getExistingUsers } from "../services/AuthServices";
import { getSortedUsers } from "../services/AppServices";
import { getSearchResults } from '../services/AppServices';
import { useSpeedContext } from "./speedTestContext";
const ExistingUsersContext = createContext();

export const ExistingUsersProvider = ({ children }) => {
  const [existingUsers, setExistingUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [results, setResults] = useState([]);
  const [existingUsername, setExistingUsername] = useState([]);
  const { speedTest, setSpeedTest } = useSpeedContext();

  useEffect(() => {
    fetchExistingUsers();
  }, [!speedTest]);
  const fetchExistingUsers = async () => {
    try {
      const users = await getExistingUsers();
      if (!users) {
        setSpeedTest(true);
      } else {
        setExistingUsers(users.citizens);
        setExistingUsername(users.usernames);
      }
    } catch (error) {
      console.error("Error fetching existing users:", error);
    }
  };
  
  const fetchSortedUsers = async () => {
    try {
      const sortedCitizens = await getSortedUsers();
      if (!sortedCitizens) {
        setSpeedTest(true);
      } else {
        setSortedUsers(sortedCitizens);
      }
    } catch (error) {
      console.error("Error fetching existing users:", error);
    }
  }

  const fetchSearchResults = async (searchKey) => {
    try {
      const searchResults = await getSearchResults(searchKey);
      // return searchResults
      setResults(searchResults);
    } catch (error) {
      console.error("Error during search:", error);
    }
  }

  const updateUserHealthStatus = async (username, newHealthStatus) => {
    const updatedUsers = existingUsers?.map((user) =>
      user.username === username
        ? {
            ...user,
            healthStatus: newHealthStatus,
            healthStatusTimestamp: Date.now(),
          }
        : user
    );

    setExistingUsers(updatedUsers);
  };

  return (
    <ExistingUsersContext.Provider
      value={{
        existingUsers,
        existingUsername,
        updateUserHealthStatus,
        fetchExistingUsers,
        sortedUsers,
        fetchSortedUsers,
        results,
        fetchSearchResults,
      }}
    >
      {children}
    </ExistingUsersContext.Provider>
  );
};

export default ExistingUsersContext;

ExistingUsersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
