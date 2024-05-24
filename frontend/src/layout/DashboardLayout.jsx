import { Outlet } from "react-router-dom";
// import Sidebar from "../components/Sidebar.jsx";
import { useSpeedContext } from "../context/speedTestContext.jsx";
import ErrorPage503 from "../pages/ErrorPage503.jsx";
import Sidebar from "./sidebar/index.jsx";

const DashboardLayout = () => {
  const { speedTest } = useSpeedContext();
  if (speedTest) {
    return <ErrorPage503 />;
  }
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col bg-[#F8F7FC] flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
