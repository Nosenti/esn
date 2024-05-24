import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RiCalendarLine } from "react-icons/ri";
import api from "../utils/api";
import { format, parseISO } from "date-fns";
import Modal from "../components/Modal.jsx";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

function SupportAvailability1({
  showForm1,
  closeForm,
  onClosed,
  onOpenListModel,
  config,
  updateData,
  openForm,
}) {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isEmailModalOpened, setIsEmailModalOpened] = useState(false);
  const [isConfirmSaveModalOpen, setIsConfirmSaveModalOpen] = useState(false);
  const [sendEmail, setSendEmail] = useState(true);

  useEffect(() => {
    if (showForm1 && updateData) {
      // Parse and format start date
      const parsedStartDate = new Date(updateData.startDate);
      const formattedStartDate = format(parsedStartDate, "dd-MMMM-yyyy HH:mm");

      // Parse and format end date
      const parsedEndDate = new Date(updateData.endDate);
      const formattedEndDate = format(parsedEndDate, "dd-MMMM-yyyy HH:mm");

      setPhone(updateData.phone);
      setEmail(updateData.email);

      console.log(typeof startDate, startDate, typeof startDate);
      setIsEdit(true);
    }
  }, [updateData]);

  const handleUpdate = async () => {
    const today = new Date();
    if (endDate < today || endDate < startDate) {
      toast.error("Start Date cannot be in the past or after the End Date");
      return;
    }
    const payload = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      phone,
      email,
    };
    try {
      await api.put(`support-availability/${updateData._id}`, payload, config);
      closeForm();
      onOpenListModel();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  const handleSubmit = async () => {
    const today = new Date();
    if (endDate < today || endDate < startDate) {
      toast.error("Start Date cannot be in the past or after the End Date");
      return;
    }
    const payload = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      phone,
      email,
      sendEmail,
    };
    try {
      const response = await api.post("support-availability", payload, config);
      closeForm();
      onOpenListModel();
      setIsEmailModalOpen(false);
    } catch (error) {
      const validationError = error.response.data.message;
      if (validationError.includes("Validation Error")) {
        return toast.error(validationError);
      }
      console.log("Error sending message:", error);
    }
  };

  const handleInitialSubmit = () => {
    const today = new Date();
    if (!startDate || !endDate || !phone || !email) {
      return toast.error("Fields should not be empty");
    }
    if (endDate < today || endDate < startDate) {
      toast.error("Start Date cannot be in the past or after End Date");
      return;
    }
    setIsEmailModalOpen(true);
    setIsEmailModalOpened(true);
  };
  const denyReceiveEmail = () => {
    handleSubmit();
  };

  const handleCancel = () => {
    closeForm();
    onOpenListModel();
    setIsEmailModalOpen(false);
  };

  if (!showForm1) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center md:items-center justify-center"
      onClick={closeForm}
    >
      <div
        className="relative bg-white rounded-lg h-full md:h-auto md:max-h-screen md:w-3/4 w-full p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-screen">
          <div className="py-16">
            <div className="px-5 py-5 overflow-auto">
              <div className="w-full max-w-md mx-auto">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex flex-col">
                    <label
                      htmlFor="startDate"
                      className="text-sm font-medium text-gray-500 mb-1"
                    >
                      Start Date
                    </label>
                    <div className="relative">
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="dd-MMMM-YYYY hh:mm"
                        minDate={new Date()}
                        className="border border-gray-300 rounded-md pl-8 pr-2 py-2 focus:outline-none text-gray-600 focus:border-blue-500"
                      />
                      <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                        <RiCalendarLine className="h-6 w-6 text-gray-400 cursor-pointer" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="endDate"
                      className="text-sm font-medium text-gray-500 mb-1"
                    >
                      End Date
                    </label>
                    <div className="relative w-full">
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="dd-MMMM-YYYY hh:mm"
                        minDate={new Date()}
                        className="border border-gray-300 rounded-md pl-8 pr-2 py-2 focus:outline-none text-gray-600 focus:border-blue-500 w-full"
                      />
                      <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                        <RiCalendarLine className="h-6 w-6 text-gray-400 cursor-pointer" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-500 mb-1"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      className="border border-gray-300 rounded-md px-1 py-2 text-gray-600 focus:outline-none focus:border-blue-500"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-500 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="border border-gray-300 rounded-md px-3 py-2 text-gray-600 focus:outline-none focus:border-blue-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  {!isEdit && (
                    <button
                      onClick={handleInitialSubmit}
                      className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-blue-600 transition duration-300 ease-in-out"
                    >
                      {t("Submit")}
                    </button>
                  )}
                  {isEdit && (
                    <button
                      onClick={handleUpdate}
                      className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-blue-600 transition duration-300 ease-in-out"
                    >
                      {t("Update")}
                    </button>
                  )}
                  <button
                    onClick={handleCancel}
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300 ease-in-out"
                  >
                    {t("Cancel")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      >
        <div onClick={(e) => e.stopPropagation()}>
          {isEmailModalOpened && (
            <div>
              <p className="text-lg font-semibold mb-6 text-gray-700">
                {"Do you want to receive new availability on email ?"}
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => {
                    setIsConfirmSaveModalOpen(true);
                    setIsEmailModalOpened(false);
                    setSendEmail(false);
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg focus:outline-none"
                >
                  {t("Yes")}
                </button>
                <button
                  onClick={() => {
                    setIsConfirmSaveModalOpen(true);
                    setIsEmailModalOpened(false);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg focus:outline-none"
                >
                  {t("No")}
                </button>
              </div>
            </div>
          )}
          {isConfirmSaveModalOpen && (
            <div>
              <p className="text-lg font-semibold mb-6 text-gray-700">
                {t("Do you want to save the given Information ?")}
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg focus:outline-none"
                >
                  {t("Yes")}
                </button>
                <button
                  onClick={onOpenListModel}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg focus:outline-none"
                >
                  {t("No")}
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
export default SupportAvailability1;
