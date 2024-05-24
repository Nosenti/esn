import { createContext, useContext, useState } from "react";

export const SpeedContext = createContext();

export const useSpeedContext = () => {
  return useContext(SpeedContext);
};

export const SpeedContextProvider = ({ children }) => {
  const [speedTest, setSpeedTest] = useState(false);

  return (
    <SpeedContext.Provider value={{ speedTest, setSpeedTest }}>
      {children}
    </SpeedContext.Provider>
  );
};
