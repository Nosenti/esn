import okayImage from "../assets/icon/okay.png";
import helpImage from "../assets/icon/help.png";
import emergencyImage from "../assets/icon/emergency.png";
import { useTranslation } from "react-i18next";

// const {t} = useTranslation()

// export const statusRules = [
//   { label: t("OK"), color: "green", icon: okayImage },
//   { label: t("Help"), color: "yellow", icon: helpImage },
//   { label: t("Emergency"), color: "red", icon: emergencyImage },
// ];

const StatusRules = ({handleStatusClick}) => {
  const { t } = useTranslation(); 

  const statusRules = [
    { label: t('OK'), color: 'green', icon: okayImage },
    { label: t('Help'), color: 'yellow', icon: helpImage },
    { label: t('Emergency'), color: 'red', icon: emergencyImage },
  ];

    return (
      <div className="flex justify-center space-x-4">
        {statusRules.map((rule, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-white rounded-lg focus:outline-none`}
            style={{ backgroundColor: rule.color }}
            onClick={() => handleStatusClick(rule.label)}
          >
            <img src={rule.icon} alt={rule.label} className="w-6 h-6 mr-2" />
            {rule.label}
          </button>
        ))}
      </div>
    )

};

export default StatusRules;
