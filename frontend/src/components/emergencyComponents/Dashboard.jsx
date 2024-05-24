import { useState } from "react";
import { SpinnerLoading } from "./../SpinnerLoader";
import axios from "axios";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";
import LocationSearch from "./LocationSearch";

import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const apiUrl = import.meta.env.VITE_API_URL;

const Dashboard = ({ latitude, longitude }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [addResponder, setaddResponder] = useState(false);
  const [reportIncident, setReportIncident] = useState(false);
  const [home, setHome] = useState(true);

  const [institution, setInstitution] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");

  const [citizenName, setCitizenName] = useState("");
  const [ssn, setSSN] = useState("");
  const [emType, setEmType] = useState("");
  const [geolocation, setGeolocation] = useState("");
  const [requestFor, setRequestFor] = useState([]);
  const [emergencyResponse, setEmergencyResponse] = useState();
  const [results, setResults] = useState(false);

  const [pos, setPos] = useState({
    lat: -1.9606133622557391,
    lng: 30.103109650044605,
  });

  const MAPS_API_KEY = import.meta.env.VITE_MAPS_API_KEY;

  const MAP_ID = import.meta.env.VITE_MAP_ID;

  const [address, setAddress] = useState("");

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const ll = await getLatLng(results[0]);
    console.log(ll);
    setAddress(value);
    setLocation(`${ll.lat}, ${ll.lng}`);
    setGeolocation(`${ll.lat}, ${ll.lng}`);
    setPos(ll);
  };

  let storedUser = JSON.parse(localStorage.getItem("user"));

  const userId = storedUser.user._id;

  const handleCheckboxChange = (value) => {
    if (requestFor.includes(value)) {
      setRequestFor(requestFor.filter((item) => item !== value));
    } else {
      setRequestFor([...requestFor, value]);
    }
  };

  const handleSubmitResponder = async (event) => {
    event.preventDefault();
    console.log({
      institution,
      serviceType,
      phone,
      email,
      location,
    });

    const postData = {
      institution,
      serviceType,
      phone,
      email,
      location,
    };

    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/emergency/serviceProvider`,
        postData
      );
      if (response.data !== null) {
        toast.success("Service Provider Created Successfully");
      }
    } catch (error) {
      console.log("Error capturing service provider", error.message);
      toast.error("Error Creating service Provider");
    }

    setInstitution("");
    setServiceType("");
    setPhone("");
    setEmail("");
    setLocation("");

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setHome(true);
      setaddResponder(false);
    }, 2 * 1000);
  };

  const handleReportIncident = async (event) => {
    event.preventDefault();
    console.log({ citizenName, ssn, emType, geolocation, requestFor });

    setIsLoading(true);
    const postData = {
      citizenName,
      ssn,
      emType,
      geolocation,
      requestFor,
      userId,
    };
    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/emergency/reportEmergency`,
        postData
      );
      if (response.data !== null) {
        toast.success("Emergency Reported Successfully");
        setEmergencyResponse(response.data);
        setResults(true);
      }
    } catch (error) {
      console.log("Error Reporting Emergency service", error);
      toast.error(
        `Error Reporting Emergency service: ${error.response.data.message}`
      );
    }
    setTimeout(() => {
      setIsLoading(false);
      setGeolocation(`${latitude}, ${longitude}`);
      // setHome(true);

      setReportIncident(false);
    }, 2 * 1000);
  };

  const handleAddResponder = () => {
    setIsLoading(true);
    setHome(false);
    setTimeout(() => {
      setIsLoading(false);
      setLocation(`${latitude}, ${longitude}`);
      setaddResponder(true);
    }, 2 * 1000);
  };

  const handleReportEmergency = () => {
    setCitizenName(storedUser.user.username);
    setIsLoading(true);
    setHome(false);
    setTimeout(() => {
      setIsLoading(false);
      setGeolocation(`${latitude}, ${longitude}`);
      setReportIncident(true);
    }, 2 * 1000);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div>
          <SpinnerLoading />
        </div>
      </div>
    );
  }

  if (home) {
    return (
      <div className="max-w-md mx-auto my-6 p-2 bg-white rounded-md shadow-md">
        <div className="px-3 py-1 text-blue-500 mb-4">
          <h1 className="text-lg font-semibold">Emergency Portal</h1>
          <hr />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white mb-1 py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            onClick={handleAddResponder}
          >
            Add Emergency Responder
          </button>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white mb-1 py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            onClick={handleReportEmergency}
          >
            Report Emergency
          </button>
        </div>
      </div>
    );
  }

  if (addResponder) {
    return (
      <div>
        <LocationSearch
          address={address}
          setAddress={setAddress}
          handleSelect={handleSelect}
          MAPS_API_KEY={MAPS_API_KEY}
          MAP_ID={MAP_ID}
          pos={pos}
        />
        <div className="w-full">
          <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
            <div className="px-3 py-1 text-blue-500 mb-4">
              <h1 className="text-lg font-semibold">
                Register Emergency Service Provider
              </h1>
              <hr />
            </div>

            <form onSubmit={handleSubmitResponder}>
              <div className="mb-4">
                <label
                  htmlFor="institution"
                  className="block text-sm font-semibold mb-2 text-gray-700"
                >
                  Institution Name
                </label>
                <input
                  type="text"
                  id="institution"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="bg-slate-100 text-slate-500 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 w-full"
                  placeholder="Enter institution name"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="service-type"
                  className="block text-sm font-semibold mb-2 text-gray-700"
                >
                  Service Type
                </label>
                <select
                  id="service-type"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="bg-slate-100 text-slate-500 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 w-full"
                  required
                >
                  <option value="" disabled>
                    Select service type
                  </option>
                  <option value="Hospital">Hospital</option>
                  <option value="Police Station">Police Station</option>
                  <option value="First Aid">First Aid Team</option>
                  <option value="Fire Station">Fire Station</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold mb-2 text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-slate-100 text-slate-500 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 w-full"
                  placeholder="Enter phone number"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold mb-2 text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-100 text-slate-500 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 w-full"
                  placeholder="Enter email address"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="location"
                  className="block text-sm font-semibold mb-2 text-gray-700"
                >
                  Location (Latitude, Longitude)
                </label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-slate-100 text-slate-500 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 w-full"
                  placeholder="Enter location"
                  required
                />
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
  if (reportIncident) {
    return (
      <div>
        <LocationSearch
          address={address}
          setAddress={setAddress}
          handleSelect={handleSelect}
          MAPS_API_KEY={MAPS_API_KEY}
          MAP_ID={MAP_ID}
          pos={pos}
        />
        <div className="w-full">
          <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
            <div className="px-3 py-1 text-blue-500 mb-4">
              <h1 className="text-lg font-semibold">Report An Emergency</h1>
              <hr />
            </div>

            <form onSubmit={handleReportIncident}>
              <div className="mb-4">
                <label
                  htmlFor="citizenName"
                  className="block text-sm font-semibold mb-2 text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="citizenName"
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                  className="bg-slate-100 text-slate-500 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 w-full"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="ssn"
                  className="block text-sm font-semibold mb-2 text-gray-700"
                >
                  SSN
                </label>
                <input
                  type="text"
                  id="ssn"
                  value={ssn}
                  onChange={(e) => setSSN(e.target.value)}
                  className="bg-slate-100 text-slate-500 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 w-full"
                  placeholder="Enter you Social Security Number"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="emType"
                  className="block text-sm font-semibold mb-2 text-gray-700"
                >
                  Emergency Type
                </label>
                <select
                  id="emType"
                  value={emType}
                  onChange={(e) => setEmType(e.target.value)}
                  className="bg-slate-100 text-slate-500 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 w-full"
                  required
                >
                  <option value="" disabled>
                    Select Emergency type
                  </option>
                  <option value="Traffic Road Accident">
                    Traffic Road Accident
                  </option>
                  <option value="Fire Outbreak">Fire Outbreak</option>
                  <option value="Natural Disaster">Natural Disaster</option>
                  <option value="Health Emergency">Health Emergency</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="geolocation"
                  className="block text-sm font-semibold mb-2 text-gray-700"
                >
                  Geo Location (Latitude, Longitude)
                </label>
                <input
                  type="text"
                  id="geolocation"
                  value={geolocation}
                  onChange={(e) => setGeolocation(e.target.value)}
                  className="bg-slate-100 text-slate-500 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 w-full"
                  placeholder="Enter location"
                  required
                />
              </div>

              <div className="mb-4 ">
                <fieldset>
                  <div className="mb-4">
                    <fieldset>
                      <legend className="block text-gray-700 font-bold mb-2">
                        Request For:
                      </legend>
                      <div className="flex flex-wrap">
                        <label
                          htmlFor="req-hospital"
                          className="inline-flex items-center mr-6"
                        >
                          <input
                            type="checkbox"
                            id="req-hospital"
                            checked={requestFor.includes("Hospital")}
                            onChange={() => handleCheckboxChange("Hospital")}
                            className="form-checkbox text-gray-700 h-5 w-5"
                          />
                          <span className="ml-2 text-slate-500">Hospital</span>
                        </label>
                        <label
                          htmlFor="req-police"
                          className="inline-flex items-center mr-6"
                        >
                          <input
                            type="checkbox"
                            id="req-police"
                            checked={requestFor.includes("Police Station")}
                            onChange={() =>
                              handleCheckboxChange("Police Station")
                            }
                            className="form-checkbox text-gray-700 h-5 w-5"
                          />
                          <span className="ml-2 text-slate-500">
                            Police Station
                          </span>
                        </label>
                        <label
                          htmlFor="req-firstAid"
                          className="inline-flex items-center mr-6"
                        >
                          <input
                            type="checkbox"
                            id="req-firstAid"
                            checked={requestFor.includes("First Aid")}
                            onChange={() => handleCheckboxChange("First Aid")}
                            className="form-checkbox text-gray-700 h-5 w-5"
                          />
                          <span className="ml-2 text-slate-500">First Aid</span>
                        </label>
                        <label
                          htmlFor="req-fireStation"
                          className="inline-flex items-center"
                        >
                          <input
                            type="checkbox"
                            id="req-fireStation"
                            checked={requestFor.includes("Fire Station")}
                            onChange={() =>
                              handleCheckboxChange("Fire Station")
                            }
                            className="form-checkbox text-gray-700 h-5 w-5"
                          />
                          <span className="ml-2 text-slate-500">
                            Fire Station
                          </span>
                        </label>
                      </div>
                    </fieldset>
                  </div>
                </fieldset>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Report Emergency
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (results) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        <div className="px-3 py-1 text-blue-500 mb-4">
          <h1 className="text-lg font-semibold">Emergency Services Called</h1>
          <hr />
        </div>

        <div>
          <ul className="list-none">
            {Object.keys(emergencyResponse.response).map((serviceType) => (
              <li
                key={serviceType}
                className="mb-4 border-b-2 border-gray-200 py-2"
              >
                <h3 className="text-xl font-semibold text-blue-600">
                  {serviceType}
                </h3>
                <p className="text-gray-700">
                  Institution Name:{" "}
                  <span className="font-medium">
                    {emergencyResponse.response[serviceType].institutionName}
                  </span>
                </p>
                <p className="text-gray-700">
                  Phone Number:{" "}
                  <span className="font-medium">
                    {emergencyResponse.response[serviceType].phoneNumber}
                  </span>
                </p>
                <p className="text-gray-700">
                  Email Address:{" "}
                  <span className="font-medium">
                    {emergencyResponse.response[serviceType].emailAddress}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
};

Dashboard.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
};

export default Dashboard;
