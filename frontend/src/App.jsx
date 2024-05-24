import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/Routes.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { ExistingUsersProvider } from "./context/ExistingUsersContext.jsx";
import { SpeedContextProvider } from "./context/speedTestContext.jsx";
import { UserLanguageProvider } from "./context/UserLanguageContext.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserLanguageProvider>
          <SpeedContextProvider>
            <ExistingUsersProvider>
              <UserProvider>
                <AppRoutes />
              </UserProvider>
            </ExistingUsersProvider>
          </SpeedContextProvider>
        </UserLanguageProvider>
      </BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 8000,
          },
          className: "text-base max-w-md py-4 px-6 bg-gray-50 text-gray-700",
        }}
      />
    </>
  );
}

export default App;
