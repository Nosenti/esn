import React, { useState, useEffect, useContext } from "react";
import Input from "../../components/Input.jsx";
import Contact from "./Contact.jsx";
import { useTranslation } from "react-i18next";
import ExistingUsersContext from "../../context/ExistingUsersContext.jsx";

function Messages({ onChatSelect }) {
  const { t } = useTranslation();
  const [searchKey, setSearchKey] = useState("");
  const {
    sortedUsers,
    fetchSortedUsers,
    results,
    fetchSearchResults,
  } = useContext(ExistingUsersContext);

  const selectPublicChat = () => {
    onChatSelect({ chatType: "public" });
  };

  useEffect(() => {
    fetchSortedUsers();
  }, [sortedUsers]);

  const selectPrivateChat = (id, username) => {
    onChatSelect({
      chatType: "private",
      receiverId: id,
      receiverUsername: username,
    });
  };

  const handleSearch = () => {
    fetchSearchResults(searchKey);
  };

  return (
    <div className="relative flex flex-col h-screen w-full">
      <div className="py-5 px-5 border-b absolute top-0 w-full z-10 bg-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="font-bold text-lg">{t("Messages")}</span>
            <span className="ml-2 text-sm text-gray-500">12</span>
          </div>
          <div className="px-5 py-4 w-full md:w-auto">
            <Input
              onChange={(e) => setSearchKey(e.target.value)}
              value={searchKey}
              placeholder={t("Search")}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </div>
        </div>
      </div>
      {!searchKey ? (
        <div className="flex flex-col flex-grow overflow-auto pt-20 mt-12">
          <div className="cursor-pointer">
            <Contact
              name="FSE Community"
              isPublic={true}
              count={sortedUsers?.length}
              onClick={selectPublicChat}
            ></Contact>
          </div>
          {sortedUsers?.map((contact) => (
            <div key={contact._id} className="cursor-pointer">
              <Contact
                name={contact.username}
                status={contact.status}
                healthStatus={contact.healthStatus}
                onClick={() => selectPrivateChat(contact._id, contact.username)}
              />
            </div>
          ))}
        </div>
      ) : results?.count === 0 ? (
        <div className="flex flex-col flex-grow overflow-auto pt-20 mt-12">
          <div className="flex justify-center items-center h-1/2">
            <p>{t("No results found")}</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col flex-grow overflow-auto pt-20 mt-12">
          {results?.data?.map((contact) => (
            <div key={contact._id} className="cursor-pointer">
              <Contact
                name={contact.username}
                status={contact.status}
                healthStatus={contact.healthStatus}
                onClick={() => selectPrivateChat(contact._id, contact.username)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Messages;
