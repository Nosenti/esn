/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";

const AnnouncementList = ({ announcements, onAnnouncementClick }) => {
  const { t } = useTranslation();
  const formattedTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleString();
  };

  return (
    <div className="p-4 flex-1 overflow-y-auto chat-messages">
      {announcements?.map((announcement) => (
        <div
          key={announcement?._id}
          className="announcement-box rounded-2xl"
          onClick={() => onAnnouncementClick(announcement)}
        >
          <div className="flex">
            <div className="flex justify-center items-center w-[15%] ">
              <p className="bg-blue-500 rounded-full h-10 w-10 text-center p-2">
                {announcement?.senderId?.username?.charAt(0).toUpperCase()}
              </p>
            </div>
            <div className="w-[85%]">
              <div className="px-6 py-4">
                <div className="font-bold text-lg mb-2">
                  {announcement?.title}
                </div>
                <p className="text-gray-700 text-[10px]">
                  {formattedTime(announcement?.createdAt)}
                </p>
                <p className="text-[14px]">
                  {announcement.announcement?.substring(0, 30)}
                </p>
                {/* {announcement.announcement.length > 30 && ( */}
                <button
                  onClick={() => onAnnouncementClick(announcement)}
                  className="text-blue-600"
                >
                  {t("Read More")}
                </button>
                {/* <button
                  onClick={() => onAnnouncementClick(announcement)}
                  className="text-blue-600"
                >
                  Read More
                </button> */}
                {/* )} */}
              </div>
            </div>
          </div>

          {/* <div className="announcement-profile">
            {announcement.senderId.username.charAt(0).toUpperCase()}
          </div> */}
          {/* <div className="announcement-header">
            <span>Posted by: {announcement.senderId.username}</span>
            <br></br>
            <span>Timestamp: {announcement.createdAt}</span>
          </div> */}
          {/* <div className="announcement-content">
            <p>
              <strong> Title: {announcement.title} </strong>
            </p>
            <p>{announcement.announcement}</p>
          </div> */}
        </div>
      ))}
      <style>
        {`
          .announcement-box {
            border: 1px solid #ccc;
            padding: 10px;
            margin-bottom: 10px;
          }

          .announcement-profile {
            width: 40px;
            height: 40px; 
            background-color: blue ; 
            border-radius: 50%; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            color: white; 
            font-size: 20px; 
            margin-right: 10px;
          }
        `}
      </style>
    </div>
  );
};

export default AnnouncementList;
