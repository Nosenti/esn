import React, { useState, useEffect } from "react";
import { RiPencilLine, RiDeleteBinLine } from "react-icons/ri";
import api from "../utils/api";
import makeConfig from "../utils/helpers";
import { format } from "date-fns";
import Modal from "../components/Modal";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

function SupportAvailability({
  isOpened,
  onClosed,
  showForm1,
  setShowForm1,
  openForm,
  config,
  onOpenList,
  setUpdateData,
}) {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemId, setItemId] = useState("");

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("support-availability", config);
        setCurrentUser(response.data.supportAvailability.username);
        setData(response.data.supportAvailability.supportAvailability);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (isOpened) {
      fetchData();
    }
  }, [isOpened, config, isDeleteModalOpen]);

  const handleOpenForm = () => {
    onClosed();
    openForm();
  };

  const handleEdit = (item) => {
    setUpdateData(item);
    openForm();
    onClosed();
  };

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(
        `support-availability/${itemId}`,
        config
      );
      if (response.status === 200) {
        console.log(
          `Support Availability with ID ${itemId} deleted successfully`
        );
        setIsDeleteModalOpen(false);
        onOpenList();
      } else {
        console.error(`Error deleting Support Availability with ID ${itemId}`);
      }
    } catch (error) {
      console.error(
        `Error deleting Support Availability with ID ${itemId}:`,
        error
      );
    }
  };

  if (!isOpened) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center md:items-center justify-center ${
        isTabletOrMobile ? "p-4" : ""
      }`}
      onClick={onClosed}
    >
      <div
        className={`relative bg-white rounded-lg h-full md:h-auto md:max-h-screen ${
          isTabletOrMobile ? "w-full" : "md:w-3/4"
        } p-4`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-screen">
          <div className="py-16">
            <div className="py-5 px-5 border-b top-0 bg-white flex justify-between">
              <div className="font-sans"></div>
              <div>
                <button
                  onClick={handleOpenForm}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                >
                  {t("Add Support Availability")}
                </button>
              </div>
            </div>
            <div className="px-5 py-5 overflow-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Username
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      End Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((item) => (
                    <tr key={item._id}>
                      <td className="px-6 py-4 whitespace-nowrap bg-gray-100 text-gray-800">
                        {item.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap bg-gray-100 text-gray-800">
                        {format(new Date(item.startDate), "dd-MMMM-yyyy HH:mm")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap bg-gray-100 text-gray-800">
                        {format(new Date(item.endDate), "dd-MMMM-yyyy HH:mm")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap bg-gray-100 text-gray-800">
                        {item.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap bg-gray-100 text-gray-800">
                        {item.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap bg-gray-100 text-gray-800">
                        {currentUser === item.username && (
                          <div className="flex">
                            <button
                              onClick={() => handleEdit(item)}
                              className="mr-2 bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out flex items-center"
                            >
                              <RiPencilLine size={18} />
                            </button>
                            <button
                              onClick={() => {
                                setItemId(item._id);
                                setIsDeleteModalOpen(true);
                              }}
                              className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition duration-300 ease-in-out flex items-center"
                            >
                              <RiDeleteBinLine size={18} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <div>
            <p className="text-lg font-semibold mb-6 text-gray-700">
              Do you want to delete the selected support availability ?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-green-500 text-white rounded-lg focus:outline-none"
              >
                Yes
              </button>
              <button
                onClick={onOpenList}
                className="px-4 py-2 bg-red-500 text-white rounded-lg focus:outline-none"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default SupportAvailability;
