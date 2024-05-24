import EmergencySP from "../models/serviceProvider.js";
import nodemailer from "nodemailer";
import emergency from "../models/Emergency.js";
import EmergencyServiceMapping from "../models/EmergencyServiceMapping.js";

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "kennyrogers330@gmail.com",
    pass: "unfa wpzs ewsy lpow",
  },
});

const createServiceProvider = async (req, res) => {
  try {
    // Extract data from request body
    const { institution, serviceType, phone, email, location } = req.body;
    if (!institution || !serviceType || !phone || !email || !location) {
      return res.status(401).json({
        message: `The emergency service provider is missing critical details`,
      });
    }

    const [latitude, longitude] = location
      .split(",")
      .map((coord) => parseFloat(coord.trim()));

    const esp = new EmergencySP({
      institutionName: institution,
      serviceType,
      phoneNumber: phone,
      emailAddress: email,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    });

    // console.log(esp);
    await esp.save();

    // Respond with success message
    res.status(201).json({
      message: "Emergency Service Provider created successfully",
      data: esp,
    });
  } catch (error) {
    console.error("Error creating Emergency Service Provider:", error.message);
    res
      .status(error.statusCode || 500)
      .json({ message: "Internal server error" });
  }
};

const reportEmergency = async (req, res) => {
  try {
    const { citizenName, ssn, emType, geolocation, requestFor, userId } =
      req.body;
    const [latitude, longitude] = geolocation
      .split(",")
      .map((coord) => parseFloat(coord.trim()));

    if (
      !citizenName ||
      !ssn ||
      !emType ||
      !latitude ||
      !longitude ||
      !requestFor ||
      !userId
    ) {
      console.log(citizenName, ssn, emType, geolocation, requestFor, userId);
      return res.status(401).json({
        message: `The emergency is missing critical details`,
      });
    }

    const ReportedEmergency = new emergency();

    ReportedEmergency.witnessName = citizenName;
    ReportedEmergency.ssn = ssn;
    ReportedEmergency.emergencyType = emType;
    ReportedEmergency.witnessId = userId;
    ReportedEmergency.location = {
      type: "Point",
      coordinates: [longitude, latitude],
    };

    // Save the emergency
    await ReportedEmergency.save();

    // Initialize array to store promises
    const promises = [];

    // Set maximum distance in meters (adjust as needed)
    const maxDistanceInMeters = 10000;

    // Find nearest service providers for each type requested
    requestFor.forEach((serviceType) => {
      const promise = EmergencySP.findOne({
        serviceType,
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [longitude, latitude],
            },
            $maxDistance: maxDistanceInMeters, // Maximum distance limit
          },
        },
      });
      promises.push(promise);
    });

    // Wait for all promises to resolve
    const nearestServiceProviders = await Promise.all(promises);

    // Initialize response object
    const response = {};
    const unavailableService = [];
    let mssg = "";

    // Add the nearest service providers to the response object
    requestFor.forEach((serviceType, index) => {
      if (nearestServiceProviders[index] == null) {
        unavailableService.push(serviceType);
        return;
      } else {
        response[serviceType] = nearestServiceProviders[index];
      }
    });

    if (unavailableService.length > 0) {
      if (!response || Object.keys(response).length === 0) {
        return res.status(401).json({
          message: `All Service Providers requested are not available in your region`,
        });
      } else {
        unavailableService.forEach((service) => {
          mssg += `The ${service} Service Provider requested for is unavailable in this region\n`;
        });
      }
    }

    // Initialize array to store mapping promises
    const mappingPromises = [];

    // Iterate over the response object to create mapping documents
    for (const [serviceType, serviceProvider] of Object.entries(response)) {
      if (serviceProvider) {
        const mapping = new EmergencyServiceMapping({
          emergencyId: ReportedEmergency._id,
          serviceProviders: [serviceProvider._id],
        });
        mappingPromises.push(mapping.save());
      }
    }

    // Wait for all mapping documents to be saved
    await Promise.all(mappingPromises);

    // Construct Google Maps link
    const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

    for (let [key, value] of Object.entries(response)) {
      // Create email message options
      const mailOptions = {
        from: "kennyrogers330@gmail.com",
        to: value.emailAddress,
        subject: "Emergency Service Needed",
        text: `Your urgent support is needed at the location ${geolocation}. Click the following link to view the location on Google Maps: ${googleMapsLink}. The emergency type is ${emType}.`,
      };

      // Send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error occurred:", error);
        }
        // else {
        //   console.log("Email sent:", info.response);
        // }
      });
    }

    // Respond with the details of nearest service providers
    return res.status(200).json({ response });
  } catch (error) {
    console.error("Error reporting emergency:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { createServiceProvider, reportEmergency };
