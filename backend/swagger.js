const backendUrl = process.env.BACKEND_URL

export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API for Emergency Social Network (ESN) Application",
      version: "1.0.0",
      description:
        "ESN is a social network that citizens can use during emergency situations.",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
      {
        url: "https://fse-rw-s24-rw1-backend.onrender.com",
      },
    ],
  },
  apis: ["./src/docs/*.js"],
  explorer: true,
};

export default swaggerOptions;
