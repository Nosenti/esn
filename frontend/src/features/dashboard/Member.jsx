/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import leoImage from "./../../assets/images/leo.jpg";
import okayImage from "../../assets/icon/okay.png";
import helpImage from "../../assets/icon/help.png";
import emergencyImage from "../../assets/icon/emergency.png";
import { useTranslation } from "react-i18next";


function Member({ user }) {
    const { t } = useTranslation()
  return (
    <>
      {user.username ? (
        <div className={`flex flex-row mt-2`}>
          <img
            className="object-cover h-10 rounded-lg m-2 flex-shrink-0"
            src={leoImage}
            alt="profile"
          />
          <div className="w-full flex justify-between">
            <div className="flex flex-col ml-4">
              <div className="font-bold text-gray-900">{user.username}</div>
              <div className="flex gap-4">
                <div
                  className={`font-normal ${
                    user.status === "offline"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {user.status}
                </div>
                <div>
                  {user.healthStatus === "OK" ? (
                    <img src={okayImage} alt="" className="w-6 h-6" />
                  ) : user.healthStatus === "Help" ? (
                    <img src={helpImage} alt="" className="w-6 h-6" />
                  ) : user.healthStatus === "Emergency" ? (
                    <img src={emergencyImage} alt="" className="w-6 h-6" />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
          <div className="text-gray-900">{t("No users available")}</div>
      )}
    </>
  );
}
export default Member;
