import React, { useState, useEffect } from "react";
import LinearLoader from "../components/LinearLoader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const SpeedTestResults = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [speedTestResults, setSpeedTestResults] = useState(null);

  useEffect(() => {
    fetchSpeedTestResults();
  }, []);

  const fetchSpeedTestResults = async () => {
    try {
      // API call to get speed test results
      const response = await axios.get("/speed-test");
      setSpeedTestResults(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching speed test results:", error);
      setLoading(false);
    }
  };
  const handleEndSpeedTest = async () => {
    try {
      const response = await axios.get(`${apiUrl}/speed-test`);
      console.log(response.data);
    } catch (error) {
      console.error("Error stopping speed test:", error);
    }
  };

  return (
    <div className="h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Speed Test Results
      </h2>

      <div className="flex justify-center items-center mt-20">
        <LinearLoader style={{ margin: "0 auto" }} />
      </div>
      <div className="mt-8">
        {speedTestResults ? (
          <div className="p-4 border rounded bg-gray-100">
            {/*posting results*/}
            <h3 className="text-lg font-semibold mb-2">
              Your Speed Test Results:
            </h3>
            <p>
              POST requests per second: {speedTestResults.postRequestsPerSecond}
            </p>
            <p>
              GET requests per second: {speedTestResults.getRequestsPerSecond}
            </p>
            <p>{speedTestResults.message}</p>
          </div>
        ) : (
          <p className="text-lg text-center">
            No speed test results available.
          </p>
        )}
      </div>

      {/* End test button*/}
      <button
        onClick={handleEndSpeedTest}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-8 justify-center"
      >
        End Speed Test
      </button>
    </div>
  );
};

export default SpeedTestResults;
