import { useContext, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import logo from "../../assets/icon/Logo.png";
import { IoIosLogOut } from "react-icons/io";
import { HiOutlineUser } from "react-icons/hi2";
import { RiShareForwardLine } from "react-icons/ri";
import { FaTachometerAlt } from "react-icons/fa";
import { MdAccountBox } from "react-icons/md";
import { TfiAnnouncement, TfiAlarmClock } from "react-icons/tfi";
import { AiOutlineAppstore } from "react-icons/ai";
import { MdMenu } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import { NavLink, useNavigate } from "react-router-dom";
import ExistingUsersContext from "../../context/ExistingUsersContext";
import { UserContext } from "../../context/UserContext";
import { logout } from "../../services/AuthServices";
import Modal from "../../components/Modal";
import api from "../../utils/api";
import Dashboard from "../../components/emergencyComponents/Dashboard.jsx";
import SupportAvailability from "../../pages/SupportAvailability.jsx";
import SupportAvailabilityForm from "../../pages/SupportAvailabilityForm.jsx";
import makeConfig from "../../utils/helpers.js";
import StatusRules from "../../components/statusRules";
import LanguageSelector from "../../components/LanguageDropdown";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { updateUserHealthStatus } = useContext(ExistingUsersContext);
  const { currentUser } = useContext(UserContext);
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const sidebarRef = useRef();

  const { t } = useTranslation();
  const [annoucementModal, setAnnouncementModal] = useState(false);
  const [isSupportAvailabilityModalOpen, setIsSupportAvailabilityModalOpen] =
    useState(false);
  const [isEmergModalOpen, setIsEmergModalOpen] = useState(false);
  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);
  const [showForm1, setShowForm1] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

  const config = makeConfig();

  const userData = currentUser.user;
  const id = userData._id;

  const updateStatus = async (status) => {
    try {
      await api.put(
        `/citizens/${id}/status`,
        {
          healthStatus: status,
        },
        config
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleStatusClick = (status) => {
    updateStatus(status);
    updateUserHealthStatus(userData?.username, status);
    setIsStatusModalOpen(false);
    toast.success("Status Updated successfully");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to close the sidebar when a link is clicked
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

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
      toast.success("Logged out successfully");
      navigate("/login", { replace: true });
      window.location.reload();
    } catch (e) {
      console.error("Error during logout:", e);
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

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  return (
    <>
      <div>
        {isSmallScreen && (
          <div className="m-3 md:hidden" onClick={toggleSidebar}>
            <MdMenu size={25} />
          </div>
        )}
        <motion.div
          ref={sidebarRef}
          variants={Nav_animation}
          initial={{ x: isTabletMid ? -250 : 0 }}
          animate={isSidebarOpen ? "open" : "closed"}
          className={`bg-blue-500 text-white shadow-xl z-[999] max-w-[16rem] w-[16rem] overflow-hidden md:relative fixed h-screen flex flex-col justify-between ${
            isSmallScreen ? "hidden" : ""
          }`}
        >
          <div>
            <div className="flex items-center gap-2.5 font-medium border-b py-3 border-slate-300  mx-3">
              <img src={logo} width={45} alt="Logo" />
              <span className="text-xl whitespace-pre">FSE Chat</span>
            </div>

            <div className="flex flex-col  h-full">
              <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   md:h-[68%] h-[70%] flex-grow sm:px-1 sm:text-[0.7rem]">
                <li>
                  <NavLink
                    to={"/"}
                    onClick={closeSidebar}
                    className="link flex items-center hover:bg-blue-700 space-x-2 px-2 py-3 rounded-lg"
                  >
                    <AiOutlineAppstore size={23} className="min-w-max mr-2" />
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/users"}
                    onClick={closeSidebar}
                    className="link flex items-center hover:bg-blue-700 space-x-2 px-2 py-3 rounded-lg"
                    // activeClassName="active-link"
                  >
                    <HiOutlineUser size={23} className="min-w-max mr-2" />
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={() => {
                      setIsStatusModalOpen(true), closeSidebar();
                    }}
                    className="link flex items-center hover:bg-blue-700 space-x-2 px-2 py-3 rounded-lg"
                  >
                    <RiShareForwardLine size={24} className="min-w-max mr-2" />
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/announcements"}
                    onClick={closeSidebar}
                    className="link flex items-center hover:bg-blue-700 space-x-2 px-2 py-3 rounded-lg"
                    // activeclassName="active-link"
                  >
                    <TfiAnnouncement size={24} className="min-w-max mr-2" />
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={() => {
                      handleSupportAvailability(), closeSidebar();
                    }}
                    className="link flex items-center hover:bg-blue-700 space-x-2 px-2 py-3 rounded-lg"
                    // activeclassName="active-link"
                  >
                    <TfiAlarmClock size={24} className="min-w-max mr-2" />
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/speed-test-interface"}
                    onClick={() => navigate("/speed-test-interface")}
                    className="link flex items-center hover:bg-blue-700 space-x-2 px-2 py-3 rounded-lg"
                    // activeclassName="active-link text-red-500"
                  >
                    <FaTachometerAlt size={24} className="min-w-max mr-2" />
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={() => {
                      setIsEmergModalOpen(true);
                      closeSidebar();
                    }}
                    className="link flex items-center hover:bg-blue-700 space-x-2 px-2 py-3 rounded-lg"
                  >
                    <TfiAlarmClock size={24} className="min-w-max mr-2" />
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/ctitizen-profile"}
                    className="link flex items-center hover:bg-blue-700 space-x-2 px-2 py-3 rounded-lg"
                    // activeclassName="active-link text-red-500"
                    onClick={closeSidebar}
                  >
                    <MdAccountBox size={24} className="min-w-max mr-2" />
                  </NavLink>
                </li>

                <li>
                  <LanguageSelector />
                </li>

                <li className="">
                  <button
                    onClick={() => {
                      handleLogout();
                      closeSidebar();
                    }}
                    className="link flex items-center hover:bg-red-500 space-x-2 px-2 py-3 rounded-lg"
                  >
                    <IoIosLogOut size={24} className="min-w-max mr-2" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p className="text-lg font-semibold mb-6 text-gray-700">
          Are you sure you want to log out?
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleConfirmLogout}
            className="px-4 py-2 bg-green-500 text-white rounded-lg focus:outline-none"
          >
            Yes
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg focus:outline-none"
          >
            No
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
      >
        <p className="text-lg font-semibold mb-6 text-gray-700">
          Select your status
        </p>
        <StatusRules handleStatusClick={handleStatusClick} />
      </Modal>
      <Modal
        isOpen={isEmergModalOpen}
        onClose={() => setIsEmergModalOpen(false)}
      >
        <div className="flex justify-center mt-2 space-x-4">
          <Dashboard latitude={latitude} longitude={longitude} />
        </div>
      </Modal>
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
    </>
  );
};

export default Sidebar;
