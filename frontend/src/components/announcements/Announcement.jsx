import { useContext, useState } from "react";
import PostAnnouncement from "./PostAnnouncement";
import AnnouncementList from "./AnnouncementList";
import useAnnouncement from "../../features/hooks/useAnnouncement";
import { IoMdAdd } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../context/UserContext.jsx";

const Announcement = () => {
  const { currentUser } = useContext(UserContext);
  console.log("currUser_: ", currentUser);
  console.log();
  const { t } = useTranslation();
  const [showPostAnnouncement, setShowPostAnnouncement] = useState(false);
  const { handleCreateAnnouncement, announcements, loading } =
    useAnnouncement();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAnnouncementClick = (announcement) => {
    setSelectedAnnouncement(announcement);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredAnnouncements = announcements.filter((announcement) =>
    announcement.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={"h-full max-h-full flex relative"}>
      <div className="w-[35%] h-full flex flex-col border-r ">
        <div className="p-4 flex border-b justify-between">
          <p className="p-2">{t("Announcements")}</p>
          {currentUser.role === "coordinator" ||
          currentUser.role === "administrator" ? (
            <div className="relative flex justify-end">
              <div
                className="group cursor-pointer bg-colorBluePrimary rounded-full p-2 hover:bg-gray-300"
                onClick={() => setShowPostAnnouncement(!showPostAnnouncement)}
              >
                <IoMdAdd size={24} className="text-white" />
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded-md opacity-0 transition-opacity duration-300 ease-in-out pointer-events-none group-hover:opacity-100">
                  Add Announcement
                </span>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder={t("Search")}
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 m-4 rounded-xl border w-[80%]"
          />
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : filteredAnnouncements.length > 0 ? (
          <AnnouncementList
            announcements={filteredAnnouncements}
            onAnnouncementClick={handleAnnouncementClick}
          />
        ) : (
          <p>{t("No matching announcements found.")}</p>
        )}

        {/* {announcements.length > 0 ? (
          <AnnouncementList
            announcements={announcements}
            onAnnouncementClick={handleAnnouncementClick}
          />
        ) : (
          <p>No public announcements yet.</p>
        )} */}
      </div>
      <div className="w-[65%] p-4 bg-blue">
        {selectedAnnouncement ? (
          <div>
            <h2 className="font-bold text-lg mb-2">
              {selectedAnnouncement.title}
            </h2>
            <p className="text-[14px]">{selectedAnnouncement.announcement}</p>
          </div>
        ) : (
          <div className="w-full h-full[url('../../assets/group.jpg')] bg- opacity-35">
            {" "}
            1
          </div>
        )}
      </div>
      <PostAnnouncement
        show={showPostAnnouncement}
        setShow={setShowPostAnnouncement}
        onCreate={handleCreateAnnouncement}
      />
    </div>
  );
};

export default Announcement;
