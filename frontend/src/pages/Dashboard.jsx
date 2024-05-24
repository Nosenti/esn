import React, { useContext, useState } from "react";
import Chat from "../features/dashboard/Chat.jsx";
import Messages from "../features/dashboard/Messages.jsx";
import { UserContext } from "../context/UserContext.jsx";
import WelcomeWindow from "../features/dashboard/WelcomeWindow.jsx";
import ClosedChat from "../components/ClosedChat.jsx";
import { useMediaQuery } from "react-responsive";
import { IoMdArrowBack } from "react-icons/io";

function Dashboard() {
  const { currentUser } = useContext(UserContext);
  const [show, setShowMember] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [recipientId, setRecipientId] = useState(null);
  const [receiverUsername, setReceiverUsername] = useState(null);

  const [showWelcome, setshowWelcome] = useState(
    !localStorage.getItem("welcomeShown")
  );

  const showHideWelcome = () => {
    setshowWelcome(!showWelcome);
    setShowMember(!show);
    setShowButtons(!showButtons);

    localStorage.setItem("welcomeShown", "true");
  };

  const handleBackClick = () => {
    setActiveChat(null);
  };

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1224px)" });

  const handleChatSelection = ({ chatType, receiverId, receiverUsername }) => {
    console.log("Selection: ", { chatType, receiverId, receiverUsername });
    setActiveChat(chatType);
    setRecipientId(receiverId);
    setReceiverUsername(receiverUsername);
    setshowWelcome(false);
  };

  return (
    <>
      {showWelcome && (
        <div className="flex justify-center h-full max-h-full items-center">
          <div>
            <WelcomeWindow
              toggleWelcome={showHideWelcome}
              visibilityWelcome={showWelcome}
            />
          </div>
        </div>
      )}

      {isBigScreen && (
        <div className="flex flex-row justify-between h-screen">
          <div className="border-r-2 w-1/3 h-full overflow-y-auto">
            <Messages onChatSelect={handleChatSelection}></Messages>
          </div>
          <div className="w-2/3 h-full">
            {activeChat ? (
              <Chat
                userData={currentUser.user}
                chatType={activeChat}
                receiverId={recipientId}
                receiverUsername={receiverUsername}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <ClosedChat />
              </div>
            )}
          </div>
        </div>
      )}

      {isTabletOrMobile && (
        <>
          {!activeChat ? (
            <div className="border-b-2 w-full h-full overflow-y-auto">
              <Messages onChatSelect={handleChatSelection}></Messages>
            </div>
          ) : (
            <div className="w-full h-full">
              <button onClick={handleBackClick}>
                <IoMdArrowBack size={24} />
              </button>
              <Chat
                userData={currentUser.user}
                chatType={activeChat}
                receiverId={recipientId}
                receiverUsername={receiverUsername}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Dashboard;
