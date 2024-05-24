import logo from "../assets/icon/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { HiOutlineUser } from "react-icons/hi2";
import { RiShareForwardLine } from "react-icons/ri";
import { FaTachometerAlt } from "react-icons/fa";
import { TfiAnnouncement, TfiAlarmClock } from "react-icons/tfi";
import { AiFillAlert } from "react-icons/ai";
import { useState, useEffect } from "react";
import api from "../utils/api";
import { UserContext } from "../context/UserContext.jsx";
import { useContext } from "react";
import ExistingUsersContext from "../context/ExistingUsersContext.jsx";
import { logout } from "../services/AuthServices.js";
import Modal from "./Modal.jsx";
import MembersDirectory from "../features/dashboard/MembersDirectory.jsx";
import { toast } from "react-hot-toast";
import SidebarItem from "./SidebarItem.jsx";
import SupportAvailability from "../pages/SupportAvailability.jsx";
import SupportAvailabilityForm from "../pages/SupportAvailabilityForm.jsx";
import makeConfig from "../utils/helpers.js";
import Dashboard from "./emergencyComponents/Dashboard.jsx";
import StatusRules from "./statusRules.jsx";
import LanguageSelector from "./LanguageDropdown.jsx";
import { useTranslation } from "react-i18next";

const mapping = true;

const Sidebar = () => {
  const { t } = useTranslation();
  const { updateUserHealthStatus } = useContext(ExistingUsersContext);
  const { currentUser } = useContext(UserContext);
  const [annoucementModal, setAnnouncementModal] = useState(false);
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isSupportAvailabilityModalOpen, setIsSupportAvailabilityModalOpen] =
    useState(false);
  const [isEmergModalOpen, setIsEmergModalOpen] = useState(false);
  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);
  const [showForm1, setShowForm1] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [sortedUsers, setSortedUsers] = useState([]);

  const config = makeConfig();

  const userData = currentUser.user;
  const id = userData._id;

  const updateStatus = async (status) => {    
    try {
      await api.put(`/citizens/${id}/status`, {
        healthStatus: status
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // const handleStatusClick = (status) => {
  //   updateStatus(status);
  //   setIsStatusModalOpen(false);
  //   updateUserHealthStatus(userData.username, status);
  //   toast.success(t("Status Updated successfully"));
  // };

  const handleSupportAvailability = () => {
    setIsSupportAvailabilityModalOpen(true);
  };

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  const handleConfirmLogout = async () => {
    setIsModalOpen(false);
    try {
      await logout();
      setCurrentUser(null);
      toast.success(t("Logged out successfully"));
      navigate("/login", { replace: true });
      window.location.reload();
    } catch (e) {
      console.error(t("Error during logout:"), e);
    }
  };

  useEffect(() => {
    const logoutIfInactive = () => {
      const timeout = setTimeout(async () => {
        try {
          await logout();
          setCurrentUser(null);
          localStorage.clear();
        } catch (e) {
          console.error(t("Error during logout:"), e);
        }
      }, 300000);

      return () => clearTimeout(timeout);
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        logoutIfInactive();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    input1: "",
    input2: "",
  });

  const menuItems = [
    {
      path: "/dashboard",
      name: t("Dashboard"),
      icon: <img src={logo} alt="Icon" />,
    },
  ];

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          alert(error.message);
        }
      );
    } else {
      // Geolocation is not available
      alert("Geolocation is not supported in this browser.");
    }
  }, []);

  return (
    <>
      <div className="flex flex-col justify-between h-full bg-blue-500 text-white">
        <div className="p-4 space-y-4">
          {menuItems.map((item) => (
            <Link
              to={item.path}
              key={item.path}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
          <div className="">
            <button
              onClick={() => setIsUsersModalOpen(true)}
              className={`flex items-center space-x-2 p-2 rounded-lg ${
                isUsersModalOpen ? "bg-blue-700" : ""
              } hover:bg-blue-700 transition-colors duration-200`}
            >
              <HiOutlineUser size={24} />
              <span className="font-medium">{t("Users")} </span>
            </button>
          </div>

          <SidebarItem
            modalOpen={isStatusModalOpen}
            title={t("Share status")}
            onClick={() => setIsStatusModalOpen(true)}
          >
            <RiShareForwardLine size={24} />
          </SidebarItem>

          <SidebarItem
            title={t("Speed Test")}
            onClick={() => navigate("/speed-test-interface")}
          >
            <FaTachometerAlt size={24} />
          </SidebarItem>

          <SidebarItem
            title={t("Announcements")}
            onClick={() => navigate("/announcements")}
          >
            <TfiAnnouncement size={24} />
          </SidebarItem>
          <div className="">
            <button
              onClick={handleSupportAvailability}
              className={`flex items-center space-x-2 p-2 rounded-lg ${
                isSupportAvailabilityModalOpen ? "bg-blue-700" : ""
              } hover:bg-blue-700 transition-colors duration-200`}
            >
              <TfiAlarmClock size={24} />
              <span className="font-medium">
                {t("Manage Support Availability")}
              </span>
            </button>
          </div>

          <SidebarItem
            modalOpen={isEmergModalOpen}
            title="Emergency"
            onClick={() => setIsEmergModalOpen(true)}
          >
            <AiFillAlert size={24} />
          </SidebarItem>
          <LanguageSelector />
          {/* <h2>{t('hello_world')}</h2> */}
        </div>

        <div className="p-4">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 p-2 w-full rounded-lg hover:bg-red-500 transition-colors duration-200"
          >
            <IoIosLogOut size={24} />
            <span className="font-medium">{t("Logout")}</span>
          </button>
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <p className="text-lg font-semibold mb-6 text-gray-700">
            {t("Are you sure you want to log out?")}
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleConfirmLogout}
              className="px-4 py-2 bg-green-500 text-white rounded-lg focus:outline-none"
            >
              {t("Yes")}
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg focus:outline-none"
            >
              {t("No")}
            </button>
          </div>
        </Modal>
        <Modal
          isOpen={isStatusModalOpen}
          onClose={() => setIsStatusModalOpen(false)}
        >
          <p className="text-lg font-semibold mb-6 text-gray-700">
            {t("Select your status")}
          </p>
          <div>
            <StatusRules handleStatusClick={handleStatusClick} />
          </div>
        </Modal>

        <Modal
          isOpen={isEmergModalOpen}
          onClose={() => setIsEmergModalOpen(false)}
        >
          <div className="flex justify-center mt-2 space-x-4">
            <Dashboard latitude={latitude} longitude={longitude} />
          </div>
        </Modal>

        <MembersDirectory
          isOpen={isUsersModalOpen}
          onClose={() => setIsUsersModalOpen(false)}
          t={t}
        />
        <SupportAvailability
          isOpened={isSupportAvailabilityModalOpen}
          onClosed={() => setIsSupportAvailabilityModalOpen(false)}
          onOpenList={() => setIsSupportAvailabilityModalOpen(true)}
          showForm1={showForm1}
          openForm={() => setShowForm1(true)}
          config={config}
          updateData={updateData}
          setUpdateData={setUpdateData}
        />
        <SupportAvailabilityForm
          showForm1={showForm1}
          closeForm={() => setShowForm1(false)}
          onOpenListModel={() => setIsSupportAvailabilityModalOpen(true)}
          config={config}
          updateData={updateData}
          setUpdateData={setUpdateData}
          openForm={() => setShowForm1(true)}
        />
      </div>
    </>
  );
};

export default Sidebar;
