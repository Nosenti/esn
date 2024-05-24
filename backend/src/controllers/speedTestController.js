import axios from "axios";
import speedTestMiddleware from "./../utils/SpeedTestMiddleware.js";
import Citizen from "../models/Citizen.js";
import { getJwtToken } from "../utils/jwt.utils.js";
import connectDb from "../config/dbConnection.js";
// import { databaseInstance } from "../config/dbConnection.js";
const backendUrl = process.env.BACKEND_URL;

import {
  connect,
  disconnect,
  dropCollections,
} from "./../config/inMemoryDB.js";

// Function to generate a random message of 20 characters
const generateRandomMessage = () => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let message = "";
  for (let i = 0; i < 20; i++) {
    message += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return message;
};

// Function to issue a POST request
const sendPostRequest = async (token) => {
  try {
    const message = generateRandomMessage();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Include JWT token in headers
        "Content-Type": "application/json", // Set content type
      },
    };
    await axios.post(
      `http://localhost:8000/speed-test/messages`,
      { message },
      config,
    );
    console.log("POST request sent:", message);
    incrementPostRequestsCounter(); // Increment POST requests counter
  } catch (error) {
    console.error("Error sending POST request:", error.message);
  }
};

// Function to issue a GET request
const sendGetRequest = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Include JWT token in headers
        "Content-Type": "application/json", // Set content type
      },
    };

    const response = await axios.get(
      `http://localhost:8000/speed-test/messages`,
      config,
    );
    incrementGetRequestsCounter(); // Increment GET requests counter
  } catch (error) {
    console.error("Error sending GET request:", error.message);
  }
};

let continueSpeedTest = true;
// Function to start the speed test and track duration
const startSpeedTest = async (req, res) => {
  try {
    await disconnect();
    await connect();

    process.env.MODE = "speed-test";

    const user = await Citizen.create({
      username: "testuser",
      password: "testpassword",
    });

    // const senderId = user._id;
    const token = getJwtToken(user._id);

    const { duration, interval } = req.body;
    testStartTime = new Date();
    speedTestMiddleware.startSpeedTest(); // Start speed test using middleware
    let elapsedTime = 0; // Initialize elapsed time
    let postCounter = 0;

    // Function to send POST request with interval
    const sendPostRequestWithInterval = () => {
      // Check if test duration has elapsed
      if (
        elapsedTime > duration * 1000 ||
        postCounter >= 1000 ||
        !continueSpeedTest
      ) {
        return; // Stop sending requests
      }
      sendPostRequest(token); // Send POST request
      postCounter++; // Increment post counter
      setTimeout(sendPostRequestWithInterval, interval * 1000); // Call the function recursively after the interval
      elapsedTime += interval * 1000; // Update elapsed time
    };

    // Start sending POST requests with interval
    sendPostRequestWithInterval();
    elapsedTime = 0;

    // Function to send GET request with interval
    const sendGetRequestWithInterval = () => {
      // Check if test duration has elapsed
      if (elapsedTime > duration * 1000 || !continueSpeedTest) {
        return; // Stop sending requests
      }
      sendGetRequest(token); // Send GET request
      setTimeout(sendGetRequestWithInterval, interval * 1000); // Call the function recursively after the interval
      elapsedTime += interval * 1000; // Update elapsed time
    };

    // Start sending GET requests with interval
    sendGetRequestWithInterval();

    // Stop the test after the specified duration
    setTimeout(async () => {
      const totalTime = calculateTestDuration(); // Calculate test duration

      // // Return response with counts
      res.status(200).json({
        message: "Speed test performed successfully.",
        postRequestsPerSecond: (postRequestsCompleted / totalTime).toFixed(2),
        GetRequestsPerSecond: (getRequestsCompleted / totalTime).toFixed(2),
      });

      postRequestsCompleted = 0;
      getRequestsCompleted = 0;
    }, duration * 1000);
    // res.status(200).json({ message: "Speed test initiated successfully." });
  } catch (error) {
    console.error("Error starting speed test:", error.message);
    res.status(400).json({ error: "Invalid request parameters." });
  }
};

// Function to calculate elapsed time since test start
const calculateTestDuration = () => {
  const elapsedTime = new Date() - testStartTime; // Elapsed time in milliseconds
  console.log("Test duration:", elapsedTime / 1000, "seconds");
  updateThroughputMetrics(elapsedTime / 1000);
  tearDown();
  return elapsedTime / 1000;
};

// Increment POST requests counter
const incrementPostRequestsCounter = () => {
  postRequestsCompleted++;
  // updateThroughputMetrics();
};

// Increment GET requests counter
const incrementGetRequestsCounter = () => {
  getRequestsCompleted++;
  // updateThroughputMetrics();
};

// Function to update throughput metrics
const updateThroughputMetrics = (elapsedTime) => {
  console.log(
    "POST requests completed per second:",
    postRequestsCompleted / elapsedTime,
  );
  console.log(
    "GET requests completed per second:",
    getRequestsCompleted / elapsedTime,
  );
  // speedTestMiddleware.endSpeedTest();
};

const tearDown = async () => {
  speedTestMiddleware.endSpeedTest();
  await disconnect();
  await connectDb();
  delete process.env.MODE;
  // await databaseInstance.connectDb();
};

const terminateTest = async (req, res) => {
  try {
    continueSpeedTest = false;
    await tearDown();
    res.status(200).json({ stop_message: "Speed test terminated Gracefully." });
  } catch (error) {
    res.status(400).json({ stop_message: "Error terminating the speed test." });
  }
  continueSpeedTest = true;
};

// Define variables
let testStartTime;
let postRequestsCompleted = 0;
let getRequestsCompleted = 0;

// Export controller functions
export {
  startSpeedTest,
  terminateTest,
  calculateTestDuration,
  generateRandomMessage,
  sendPostRequest,
  tearDown,
  sendGetRequest,
  incrementPostRequestsCounter,
  incrementGetRequestsCounter,
};
