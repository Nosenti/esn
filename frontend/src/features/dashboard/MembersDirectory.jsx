import { useContext, useEffect } from "react";
import ExistingUsersContext from "../../context/ExistingUsersContext.jsx";
import Member from "./Member.jsx";

function MembersDirectory({ isOpen, onClose,t}) {
  const { sortedUsers, fetchSortedUsers } = useContext(ExistingUsersContext);

  useEffect(() => { 
    if (isOpen) {
      fetchSortedUsers()
    }   
  },[isOpen, sortedUsers])

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end md:items-center justify-end"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg h-full md:h-auto md:max-h-screen md:w-1/3 w-full p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-screen">
          <div className="flex flex-col flex-grow overflow-auto">
            <div className="py-5 px-5 border-b fixed top-0 w-full bg-white">
              <div className="flex justify-between font-sans">
                <div className="text-gray-900">{t('Citizen Directory')}</div>
                <div onClick={onClose}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-colorGreyInput"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="ml-3 mt-16 mb-4">
              <div className="flex justify-start font-semibold">
                <div className="mr-2 text-gray-900">{t('Citizens')}</div>
                <div className="mr-2 text-gray-600">
                  {sortedUsers?.length}
                </div>
              </div>
              {sortedUsers?.map((user, index) => {
                return <Member key={index} user={user} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MembersDirectory;
