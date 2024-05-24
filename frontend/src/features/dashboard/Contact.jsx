/* eslint-disable react/prop-types */
import group from "../../assets/images/group.jpg";
import { useTranslation } from 'react-i18next'


const Contact = ({ name, status, isPublic, onClick, count, healthStatus }) => {
    const { t } = useTranslation()
  return (
    <div className="px-5 py-1" onClick={onClick}>
      <div className="flex py-2 px-2 gap-4 rounded-lg bg-[#E7ECF0]">
        <div className="py-3">
          <img src={group} alt="profile" className="w-10 h-10 rounded-lg" />
        </div>
        <div className="flex flex-1 justify-between flex-row items-center">
          <div className="flex flex-col justify-center">
            <div>
              <p> {name} </p>
              {isPublic ? (
                <p className="text-[12px] text-opacity-40">{count} {t("member")}(s)</p>
              ) : (
                ""
              )}

              <div className="gap-1">
                <span
                  className={`rounded-xl text-[10px] ${
                    status === "offline"
                      ? "text-[#DD6B20] bg-[#FEEBC8]"
                      : "text-[#6A7FE2] bg-[#D4DBFD]"
                  } px-2 py-1 ${isPublic ? "hidden" : ""}`}
                >
                  {status}
                </span>

                {/* <span className="rounded-xl text-[10px] text-[#DD6B20] bg-[#FEEBC8] px-2 py-1">
                offline
              </span> */}
              </div>
            </div>
          </div>
          <div>
            <p
              className={`${
                healthStatus === "Emergency"
                  ? "text-[#EB6060]"
                  : healthStatus === "OK"
                  ? "text-green-700"
                  : "text-[#DD6B20]"
              } text-[10px]`}
            >
              {healthStatus}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
