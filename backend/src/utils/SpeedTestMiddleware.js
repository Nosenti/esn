// SpeedTestMiddleware.js

class SpeedTestMiddleware {
  constructor() {
    this.isSpeedTestInProgress = false;
    this.socketId = null;
    this.checkSpeedTestInProgress = this.checkSpeedTestInProgress.bind(this); // Binding the context
  }

  // Middleware function to check if the speed test is in progress
  checkSpeedTestInProgress(req, res, next) {
    if (
      this.isSpeedTestInProgress &&
      !req.originalUrl.startsWith("/speed-test")
      // req.originalUrl !== "/speed-test/messages"
    ) {
      return res.status(503).json({
        error: "Service temporarily unavailable due to speed test.",
        speedTest: true,
      });
    }
    next();
  }

  // Method to start the speed test
  startSpeedTest() {
    this.isSpeedTestInProgress = true;
  }

  endSpeedTest() {
    this.isSpeedTestInProgress = false;
  }
}

// Create and export a singleton instance of the middleware
export default new SpeedTestMiddleware();
