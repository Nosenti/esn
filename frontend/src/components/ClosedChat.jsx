import { useTranslation } from "react-i18next";

/* eslint-disable react/prop-types */
const ClosedChat = () => {
    const {t} = useTranslation()
    return (
      <div className="flex flex-col w-full">
        <div className="flex self-auto justify-center">
          ESN
        </div>
        <div className="flex self-auto justify-center">
          {t("Send Public and Private Messages.")} 
        </div>
       
      </div>
    );
  };
  
  export default ClosedChat;
  