import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addRegDetailsApi } from "../services/allApi";

function Registration() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [regDetails, setRegDetails] = useState({
    phone: "",
    address: "",
    service: "",
    license: "",
    imageOne: "",
    imageTwo: "",
    imageThree: "",
    latitude: "",
    longitude: "",
  });

  const handleFile = (e) => {
    const { name, files } = e.target;
    setRegDetails((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegDetails((prev) => ({ ...prev, [name]: value }));
  };
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Latitude:", latitude, "Longitude:", longitude);
        
        setRegDetails((prev) => ({ ...prev, latitude, longitude }));
  
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`
          );
          const data = await response.json();
          if (data?.display_name) {
            setRegDetails((prev) => ({ ...prev, address: data.display_name }));
          }
        } catch (error) {
          console.error("Error fetching address:", error);
          alert("Error fetching address. Please enter manually.");
        }
      },
      (error) => {
        console.error("Location Error:", error);
        alert("Failed to get location. Please enter your address manually.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };
  
  

  const addRegDetails = async () => {
    const { phone, address, service, license, imageOne, imageTwo, imageThree, latitude, longitude } =
      regDetails;

    if (!phone || !address || !service || !license || !imageOne || !imageTwo || !imageThree) {
      alert("Please fill out all required fields!");
      return;
    }

    setLoading(true);
    const reqBody = new FormData();
    reqBody.append("phone", phone);
    reqBody.append("address", address);
    reqBody.append("service", service);
    reqBody.append("license", license);
    reqBody.append("imageOne", imageOne);
    reqBody.append("imageTwo", imageTwo);
    reqBody.append("imageThree", imageThree);
    reqBody.append("latitude", latitude);
    reqBody.append("longitude", longitude);

    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await addRegDetailsApi(reqBody, reqHeader);
        if (result.status === 200) {
          sessionStorage.setItem("existingServices", JSON.stringify(result.data.existingService))
          alert("Registration successful!");
          setTimeout(() => {
            navigate("/servicehome");
          }, 2000);
          
        } else {
          alert("Something went wrong. Please try again.");
        }
      } catch (error) {
        console.error("Registration Error:", error);
        alert("Error submitting form.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container mt-5" style={styles.container}>
      <h2 className="text-center mb-4" style={styles.heading}>
        Service Center Registration
      </h2>
      <form className="p-4 border rounded bg-light" style={styles.form}>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            required
            value={regDetails.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="service" className="form-label">
            What Services Do You Provide?
          </label>
          <textarea
            className="form-control"
            id="service"
            name="service"
            placeholder="Describe the services you provide"
            rows="3"
            required
            value={regDetails.service}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="license" className="form-label">
            Upload License
          </label>
          <input type="file" className="form-control" id="license" name="license" required onChange={handleFile} />
        </div>

        <div className="mb-3">
          <label className="form-label">Upload Shop Photos</label>
          <input type="file" name="imageOne" className="form-control mb-2" required onChange={handleFile} />
          <input type="file" name="imageTwo" className="form-control mb-2" required onChange={handleFile} />
          <input type="file" name="imageThree" className="form-control mb-2" required onChange={handleFile} />
        </div>

        {/* Address & Location Button */}
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address / Landmark
          </label>
          <textarea
            className="form-control"
            id="address"
            name="address"
            rows="3"
            required
            value={regDetails.address}
            onChange={handleChange}
            readOnly
          ></textarea>
        </div>
        <button type="button" className="btn btn-secondary mb-3" onClick={getCurrentLocation}>
          Get Current Location
        </button>

        <button onClick={addRegDetails} type="button" className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

// Internal Styles
const styles = {
  container: { maxWidth: "600px", margin: "0 auto" },
  heading: { fontWeight: "bold" },
  form: { background: "#f8f9fa", boxShadow: "0px 4px 8px rgba(0,0,0,0.1)" },
};

export default Registration;
