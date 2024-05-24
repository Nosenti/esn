import { useState } from "react";
import speedTestImage from "../assets/images/speedtest.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SpinnerLoading } from "../components/SpinnerLoader";
import { useSpeedContext } from "../context/speedTestContext";
const apiUrl = import.meta.env.VITE_API_URL;

const SpeedTestInterface = () => {
  const navigate = useNavigate();
  const { setSpeedTest } = useSpeedContext();
  const [formData, setFormData] = useState({
    interval: "",
    duration: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [speedTestData, setSpeedTestData] = useState(null);

  const [canTerminate, setcanTerminate] = useState(false);

  const [completed, setcompleted] = useState(false);

  const [stopping, setStopping] = useState(false);

  const [cancelTokenSource, setCancelTokenSource] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTerminate = async () => {
    try {
      if (cancelTokenSource) {
        cancelTokenSource.cancel("Request canceled by user");
      }
      setStopping(true);
      const response = await axios.get(`${apiUrl}/speed-test`);
      console.log(response.data);

      setTimeout(() => {
        setSpeedTestData(response.data);
        setIsLoading(false);
        setcanTerminate(false);
        setStopping(true);
        setcompleted(true);
        setCancelTokenSource(null);
      }, formData.duration * 1000);
    } catch (error) {
      console.error("Error stopping speed test:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (canTerminate) {
      // const { duration, interval } = formData;

      setTimeout(() => handleTerminate(), 2 * 1000);
    } else if (completed) {
      setcompleted(false);
      navigate("/dashboard");
    } else {
      console.log(formData);

      // Frontend
      setSpeedTest(true);
      setIsLoading(true);
      setcanTerminate(true);
      try {
        const source = axios.CancelToken.source();
        setCancelTokenSource(source);
        const response = await axios.post(`${apiUrl}/speed-test`, formData, {
          cancelToken: source.token, // Pass the cancel token
        });

        console.log(response.data);
        setSpeedTestData(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Error starting speed test:", error);
        }
      } finally {
        setTimeout(() => {
          setIsLoading(false);
          setcanTerminate(false);
          setcompleted(true);
        }, formData.duration * 1000);

        // setTimeout(() => setcanTerminate(false), formData.duration * 1000);

        // setTimeout(() => setcompleted(true), formData.duration * 1000);
      }
    }

    // navigate("/speed-test-results");
  };

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        backgroundImage: `url(${speedTestImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
        <div className="p-4 bg-blue-200 rounded-lg w-64 h-70">
          <div className="text-center font-bold mb-4">Speed Test</div>
          <form onSubmit={handleSubmit} style={{ marginLeft: "10px" }}>
            {isLoading ? (
              <SpinnerLoading />
            ) : (
              <div>
                {speedTestData ? (
                  <>
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                      {
                        <h2 className="text-xl font-semibold mb-4">
                          {speedTestData.stop_message ? (
                            <>{speedTestData.stop_message}</>
                          ) : (
                            <>Speed Test Result</>
                          )}
                        </h2>
                      }

                      {speedTestData.postRequestsPerSecond && (
                        <p className="mb-4">
                          <span className="font-semibold">
                            Post Requests Per Second:
                          </span>{" "}
                          {speedTestData.postRequestsPerSecond}
                        </p>
                      )}
                      {speedTestData.GetRequestsPerSecond && (
                        <p className="mb-4">
                          <span className="font-semibold">
                            Get Requests Per Second:
                          </span>{" "}
                          {speedTestData.GetRequestsPerSecond}
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col mb-3">
                      <label htmlFor="interval" className="mb-1">
                        Interval
                      </label>
                      <input
                        type="number"
                        id="interval"
                        name="interval"
                        value={formData.interval}
                        onChange={handleChange}
                        className="mr-2 px-2 py-1 rounded border border-gray-300 mb-2 w-50"
                        min="0"
                        max="100"
                        step="1"
                        required
                      />
                    </div>

                    <div className="flex flex-col mb-3">
                      <label htmlFor="duration" className="mb-1">
                        Duration
                      </label>
                      <input
                        type="number"
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        className="mr-2 px-2 py-1 rounded border border-gray-300 mb-2 w-50"
                        min="1"
                        max="100"
                        step="1"
                        required
                      />
                    </div>
                  </>
                )}
              </div>
            )}
            <div className="flex items-center justify-center">
              {!completed && (
                <button
                  type="submit"
                  className={` bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600 font-bold ${
                    stopping ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {canTerminate ? <>Stop Speed Test</> : <>Start Test</>}
                </button>
              )}
            </div>
          </form>
          <form action="/dashboard">
            <div className="p-3 flex items-center justify-center">
              {/* {completed && ( */}
              <button
                type="submit"
                className={` bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600 font-bold ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                Exit Speed Test
              </button>
              {/* )} */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SpeedTestInterface;
