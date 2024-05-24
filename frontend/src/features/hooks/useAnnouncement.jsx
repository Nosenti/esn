import { useContext, useState, useEffect } from "react";
import api from "../../utils/api";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-hot-toast";
import makeConfig from "../../utils/helpers";

const useAnnouncement = () => {
  const { currentUser } = useContext(UserContext);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const config = makeConfig()

  useEffect(() => {
    getOldAnnouncement();
  }, []);

  const handleCreateAnnouncement = async (announcement) => {
    setLoading(true);
    await postAnnouncement(announcement);
    getOldAnnouncement();
    setLoading(false);
  };

  const getOldAnnouncement = async () => {
    setLoading(true);
    try {
      const res = await api.get("/announcements", config);
      setAnnouncements(res?.data?.announcements?.announcement);
      toast.success(res?.data?.message);
    } catch (error) {
      console.error("Error retrieving old announcement:", error);
    }
    setLoading(false);
  };

  const postAnnouncement = async (announcement) => {
    try {
      const res = await api.post("/announcements", {
        senderId: currentUser?.user?._id,
        title: announcement.title,
        announcement: announcement.announcement,
      }, config);
      toast.success(res.data?.message);
    } catch (error) {
      console.error("Error posting announcement:", error);
    }
  };

  return { handleCreateAnnouncement, announcements, loading };
};

export default useAnnouncement;
