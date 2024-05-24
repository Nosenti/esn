/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { useTranslation } from "react-i18next";

const PostAnnouncement = ({ onCreate, show, setShow }) => {
  const { t } = useTranslation();
  const [announcement, setAnnouncement] = useState("");
  const [title, setTitle] = useState("");
  const popUpRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popUpRef.current && !popUpRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShow, show]);

  const handleAnnouncementChange = (e) => {
    setAnnouncement(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ title, announcement });
    setAnnouncement("");
    setTitle("");
    setShow(false);
  };

  return (
    <div
      ref={popUpRef}
      className={`${
        show ? "" : "hidden"
      } fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 max-w-md w-full md:w-[50%] rounded-lg bg-white shadow-lg`}
    >
      <div className="bg-blue-500 text-white flex justify-between py-4 rounded-t-lg px-4">
        <h2>{t("Post Announcement")}</h2>
        <div className="cursor-pointer" onClick={() => setShow(false)}>
          <IoMdClose size={24} />
        </div>
      </div>
      <div className="p-4 relative pb-16">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            type="text"
            name="title"
            value={title}
            placeholder="Title"
            onChange={handleTitleChange}
            className="w-full h-10"
          />
          <textarea
            value={announcement}
            onChange={handleAnnouncementChange}
            placeholder={t("Type your announcement here...")}
            className="h-[250px] border px-3 py-2 rounded-md shadow-sm placeholder-gray-400 resize-none"
            required
          />
          <div className="absolute bottom-3 right-4">
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              {t("Post Announcement")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostAnnouncement;
