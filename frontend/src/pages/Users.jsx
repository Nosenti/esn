import React, { useState, useContext } from "react";
import ProfileCard from "../components/ProfileCard";
import Input from "../components/Input";
import ExistingUsersContext from "../context/ExistingUsersContext";
import { getSearchResults } from "../services/AppServices";

const Users = ({ currentUser }) => {
  const { existingUsers } = useContext(ExistingUsersContext);
  const [searchKey, setSearchKey] = useState("");
  const [results, setResults] = useState([]);
  const [activeTab, setActiveTab] = useState("active");
  const currUser = currentUser.user;

  console.log("cURRENT_USER: ", currentUser);

  const sortedUsers = existingUsers?.sort((a, b) => {
    if (a.status === "online" && b.status !== "online") {
      return -1;
    } else if (a.status !== "online" && b.status === "online") {
      return 1;
    } else {
      return a.username.localeCompare(b.username);
    }
  });

  const handleSearch = async () => {
    try {
      const results = await getSearchResults(searchKey);
      setResults(results);
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  console.log("Results:", sortedUsers);

  return (
    <div className="flex flex-col h-screen">
      <nav className="p-4 bg-white fixed w-full z-10">
        <div className="flex flex-row justify-between items-center px-8">
          <div className="w-1/3 lg:max-w-md md:w-1/3">
            <Input
              onChange={(e) => setSearchKey(e.target.value)}
              value={searchKey}
              placeholder="Search User"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </div>
          {
            currUser.role == "administrator" && (
              <div className="flex justify-end space-x-4 mr-6">
            <button
              onClick={() => setActiveTab("active")}
              className={`px-4 py-2 rounded-md ${
                activeTab === "active"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveTab("inactive")}
              className={`px-4 py-2 rounded-md ${
                activeTab === "inactive"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              }`}
            >
              Inactive
            </button>
          </div>
            )
          }
          
        </div>
      </nav>
      <div className="mt-24 mx-8 overflow-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {!searchKey ? (
            <>
              {sortedUsers
                .filter((user) => user._id !== currUser._id)
                .filter((user) =>
                  activeTab === "active"
                    ? user.isActive === true
                    : user.isActive !== true
                )
                .map((user, index) => (
                  <ProfileCard key={index} user={user} />
                ))}
            </>
          ) : results?.data?.length === 0 ? (
            <div className="flex flex-col flex-grow overflow-auto pt-20 mt-12">
              <div className="flex justify-center items-center h-1/2">
                <p className="text-gray-700">No results found</p>
              </div>
            </div>
          ) : (
            <>
              {results?.data?.map((user, index) => {
                return <ProfileCard key={index} user={user} />;
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
