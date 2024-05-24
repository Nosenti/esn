/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import profile from "../../assets/images/profile.png";
import group from "../../assets/images/group.jpg";
import Input from "../../components/Input.jsx";
import io from "socket.io-client";
import api from "../../utils/api.js";
import PropTypes from "prop-types";
import moment from "moment";
import { getSearchResults } from "../../services/AppServices.js";
import makeConfig from "../../utils/helpers.js";
import { useTranslation } from 'react-i18next'
import toast from "react-hot-toast";

const apiUrl = import.meta.env.VITE_API_URL;

const Chat = ({
  userData,
  chatType,
  receiverId = null,
  receiverUsername = null,
}) => {
  const socket = io.connect(`${apiUrl}/api/v1/`, {
    autoConnect: false,
  });
  const { t } = useTranslation()
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [results, setResults] = useState([]);
  const config = makeConfig()

  // load older message.
  useEffect(() => {
    
    let isActive = true;
    const getMessages = async () => {      
      const endpoint = chatType === "public" ? "/messages" : "/message";
      config.params = chatType === "private" ? { receiverId } : {};
      try {
        const response = await api.get(endpoint, config);
        // response?.data?.message?toast.success(response?.data?.message):''
        if (chatType === "public") {
          setMessages(
            response.data.messages.chats ? response.data.messages.chats : []
          );
          return;
        } else if (chatType === "private") {
          const filteredChats = response.data.chats.filter(
            (chat) =>
              (chat.senderId._id === userData._id &&
                chat.receiver_id._id === receiverId) ||
              (chat.senderId._id === receiverId &&
                chat.receiver_id._id === userData._id)
          );
          setMessages(filteredChats);
          return;
        }

        return response.data;
      } catch (err) {
        console.error("Error fetching messages:", err);
        throw err;
      }
    };
    getMessages();



    socket.on("receive_message", (newMessage) => {
      console.log(newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    return () => {
      isActive = false;
      socket.off("receive_message");
    };
  }, [chatType, receiverId,messages]);

  const handleInputChange = (e) => setMessage(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      message,
      senderId: {
        _id: userData._id,
        username: userData.username,
      },
      receiver_id: receiverId,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    const endpoint = chatType === "public" ? "/messages" : "/message";
    const payload = chatType === "private" ? { ...newMessage } : { message };

    try {
      const res = await api.post(endpoint, payload, config);
      toast.success(res?.data?.message)
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Search messages
  const handleSearch = async () => {
    try {
      const results = await getSearchResults(searchKey);
      setResults(results);
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <>
      <div className={`h-screen flex flex-col`}>
        <div className="flex flex-row justify-between ite">
          <div className="w-full flex gap-4 justify-between py-4 px-5 border-b">
            <img src={group} alt="Img" className="w-10 h-10 rounded-lg" />
            <div className="flex-1">
              {chatType === "public" ? (
                <>
                  <p>CMU FSE Community </p> <small> online</small>
                </>
              ) : (
                <p>{receiverUsername}</p>
              )}
            </div>
            {/* {chatType === "public" ? ( */}
            <div className="flex flex-row justify-between">
              <div className="px-3 py-2 w-full">
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
            {/* ) : (
              ""
            )} */}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto chat-messages">
          <div className="flex flex-col justify-end px-5">
            {messages?.map((message, index) => (
              <div key={message._id} className="py-3">
                <div
                  className={`gap-4 ${
                    message.senderId?._id === userData._id
                      ? "flex flex-row-reverse"
                      : "flex"
                  }`}
                >
                  <div className="min-w-10 h-10">
                    {index === 0 ||
                    messages[index - 1].senderId?._id !==
                      message.senderId?._id ? (
                      <div className="py-2">
                        <img
                          src={profile}
                          alt="user"
                          className="min-w-10 h-10 rounded-lg"
                        />
                      </div>
                    ) : null}
                  </div>

                  <div
                    className={` flex rounded-xl flex-1 ${
                      message.senderId?._id === userData._id
                        ? "justify-end"
                        : "justify-start"
                    } `}
                  >
                    <div
                      className={`rounded-xl py-2 px-4 w-[60%] flex flex-col relative  ${
                        message.senderId?._id === userData._id
                          ? "bg-[#748CF8] text-white"
                          : "bg-[#F3F3F3]"
                      }`}
                    >
                      <div className="font-bold">
                        <small>
                          {message.senderId?._id === userData._id
                            ? "Me"
                            : `${message.senderId?.username}`}
                        </small>
                      </div>
                      <p className="pb-2">{message.message}</p>
                      <small className="absolute bottom-1 right-3">
                        {moment(message.createdAt).format("YYYY-MM-DD HH:mm")}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex-none">
          <form onSubmit={handleSubmit}>
            <div className="flex p-5 justify-between">
              <div className="flex justify-center align-middle p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M11.97 12V15.5C11.97 17.43 13.54 19 15.47 19C17.4 19 18.97 17.43 18.97 15.5V10C18.97 6.13 15.84 3 11.97 3C8.09997 3 4.96997 6.13 4.96997 10V16C4.96997 19.31 7.65997 22 10.97 22"
                    stroke="#626B71"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <Input
                placeholder="Type message"
                onChange={handleInputChange}
                onKeyDown={handleInputChange}
                value={message}
              />
              <div>
                <button
                  type="submit"
                  className="bg-inherit absolute hover:bg-[#F3F3F3] w-[7%] right-5 bottom-8 shadow-inherit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M16.1401 2.96001L7.11012 5.96001C1.04012 7.99001 1.04012 11.3 7.11012 13.32L9.79012 14.21L10.6801 16.89C12.7001 22.96 16.0201 22.96 18.0401 16.89L21.0501 7.87001C22.3901 3.82001 20.1901 1.61001 16.1401 2.96001ZM16.4601 8.34001L12.6601 12.16C12.5101 12.31 12.3201 12.38 12.1301 12.38C11.9401 12.38 11.7501 12.31 11.6001 12.16C11.4606 12.0189 11.3824 11.8284 11.3824 11.63C11.3824 11.4316 11.4606 11.2412 11.6001 11.1L15.4001 7.28001C15.6901 6.99001 16.1701 6.99001 16.4601 7.28001C16.7501 7.57001 16.7501 8.05001 16.4601 8.34001Z"
                      fill="#748CF8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
Chat.propTypes = {
  userData: PropTypes.any.isRequired,
  chatType: PropTypes.oneOf(["public", "private"]).isRequired,
  receiverId: PropTypes.string,
};
