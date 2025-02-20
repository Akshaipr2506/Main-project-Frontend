import React, { useState, useEffect, useContext } from "react";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { serverUrl } from "../services/serverUrl";
import { editServiceApi, getFeedApi, getServiceRequestApi, handlestatusapi } from "../services/allApi";
import { sendRequestContext } from "../context/contextShare";


function Servicehome() {
  const [serviceDetails, setServiceDetails] = useState({});
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({});
  const [editStatus, setEditStatus] = useState("")
  const [requests, setRequests] = useState([]);
  console.log(requests);
  const [reqStatus, setReqStatus] = useState("")
  const { sendResponse } = useContext(sendRequestContext)

  const [feeds, setfeeds] = useState([])
  console.log(feeds);


  // Fetch service details from sessionStorage

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(sendResponse);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/servicelogin";
  };
  useEffect(() => {
    const storedDetails = JSON.parse(sessionStorage.getItem("existingServices"));
    if (storedDetails) {
      setServiceDetails(storedDetails);
      setFormData(storedDetails);
      fetchServiceRequests(storedDetails._id);

      getFeedbacks(storedDetails._id)

      const interval = setInterval(() => {
        fetchServiceRequests(storedDetails._id);
      }, 20000);

      return () => clearInterval(interval);
    }
  }, [editStatus, reqStatus, sendResponse]);

  const handleInputChange = (e) => {
    const { id, value, files } = e.target;
    if (files) {
      // If the input is a file upload
      setFormData((prev) => ({ ...prev, [id]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleEdit = async () => {
    try {
      // Prepare form data
      const updatedData = new FormData();
      for (const key in formData) {
        updatedData.append(key, formData[key]);
      }

      // Call API
      const response = await editServiceApi(serviceDetails._id, updatedData, {
        "Content-Type": "multipart/form-data",
      });

      if (response.status == 200) {
        alert("Service details updated successfully!");
        console.log(response.data);
        setEditStatus(response)
        setServiceDetails(response.data); // Update UI with the new details
        sessionStorage.setItem("existingServices", JSON.stringify(response.data));
        handleClose();
      } else {
        alert("Failed to update service details. Please try again.");
      }
    } catch (error) {
      console.error("Error updating service details:", error);
      alert("An error occurred. Please try again.");
    }
  };

  //get all requests
  const fetchServiceRequests = async (servicerId) => {
    try {
      const token = sessionStorage.getItem('token')
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await getServiceRequestApi(reqHeader);

      if (response.status === 200) {
        console.log(response.data);

        setRequests(response.data);
        //console.log(requests);

      } else {
        console.error("Failed to fetch requests");
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  //get feedbacks
  const getFeedbacks = async () => {
    try {
      const token = sessionStorage.getItem('token')
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const result = await getFeedApi(reqHeader)

      if (result.status == 200) {
        console.log(result.data);

        setfeeds(result.data)


      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  }


  const handleStatus = async (id, req) => {
    let reqBody = {};
    if (req.status == "Pending") {
      reqBody = {
        status: "Accepted"


      }
    }
    else if (req.status == "Accepted") {
      reqBody = {
        status: "Finished"

      }
    }
    console.log(reqBody);

    const result = await handlestatusapi(id, reqBody)
    console.log(result);
    setReqStatus(result)

  }


  //console.log(serviceDetails._id);


  return (
    <>
      <div
        style={{
          backgroundImage: "url('https://www.shutterstock.com/image-photo/car-tires-pile-service-center-600nw-2390596145.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          color: "#fff",
          padding: "20px",
        }}
      >
        {/* Header Section */}
        <div
          className="d-flex justify-content-between align-items-center p-3 rounded shadow-sm"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "#f8f9fa",
          }}
        >
          <h1 className="m-0">Welcome, {serviceDetails.ownername}!</h1>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>



        {/* Service Details Section */}
        <div className="container my-5">
          <div
            className="card shadow p-4 rounded"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "#f8f9fa",
            }}
          >
            <h2 className="text-center mb-4 text-warning">Your Service Details</h2>
            <div className="row">
              <div className="col-md-6 d-flex justify-content-center align-items-center">
                <Carousel
                  className="shadow-lg rounded"
                  style={{ maxWidth: "100%", margin: "0 auto", backgroundColor: "rgba(0, 0, 0, 0.6)" }}
                >
                  <Carousel.Item interval={1000}>
                    <img
                      src={`${serverUrl}/license/${serviceDetails.imageOne}` || "https://via.placeholder.com/800x400"}
                      alt="First slide"
                      className="d-block w-100 rounded"
                      style={{ height: "500px", objectFit: "cover" }}
                    />
                  </Carousel.Item>
                  <Carousel.Item interval={1000}>
                    <img
                      src={`${serverUrl}/license/${serviceDetails.imageTwo}` || "https://via.placeholder.com/800x400"}
                      alt="Second slide"
                      className="d-block w-100 rounded"
                      style={{ height: "500px", objectFit: "cover" }}
                    />
                  </Carousel.Item>
                  <Carousel.Item interval={1000}>
                    <img
                      src={`${serverUrl}/license/${serviceDetails.imageThree}` || "https://via.placeholder.com/800x400"}
                      alt="Third slide"
                      className="d-block w-100 rounded"
                      style={{ height: "500px", objectFit: "cover" }}
                    />
                  </Carousel.Item>
                </Carousel>
              </div>
              <div className="col-md-6">
                <ul className="list-group border-0">
                  <li className="list-group-item bg-transparent text-light">
                    <strong>Shop Name:</strong> {serviceDetails.shopname}
                  </li>
                  <li className="list-group-item bg-transparent text-light">
                    <strong>Owner Name:</strong> {serviceDetails.ownername}
                  </li>
                  <li className="list-group-item bg-transparent text-light">
                    <strong>Phone:</strong> {serviceDetails.phone}
                  </li>
                  <li className="list-group-item bg-transparent text-light">
                    <strong>Email:</strong> {serviceDetails.email}
                  </li>
                  <li className="list-group-item bg-transparent text-light">
                    <strong>Address:</strong> {serviceDetails.address}
                  </li>
                  <li className="list-group-item bg-transparent text-light">
                    <strong>Service Offered:</strong> {serviceDetails.service}
                  </li>
                  <li className="list-group-item bg-transparent text-light d-flex align-items-center">
                    <strong>License:</strong>
                    <img
                      src={`${serverUrl}/license/${serviceDetails.license}` || "https://via.placeholder.com/100"}
                      alt="License"
                      className="img-thumbnail ms-3"
                      style={{ width: "100px" }}
                    />
                  </li>
                </ul>
                <div className="mt-4 text-center">
                  <Button onClick={handleShow} variant="warning" className="px-4 py-2">
                    Edit Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Requests Section */}
        <div className="container my-5">
          <div
            className="card shadow p-4 rounded"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "#f8f9fa",
            }}
          >
            <h2 className="text-center mb-4 text-warning">User Requests</h2>
            <div className="row">
              {requests.length > 0 ? (
                requests.map((req, index) => (
                  <div key={req._id || index} className="col-md-4 mb-4">
                    <div className="card shadow-sm border-0 rounded" style={{ backgroundColor: "#212529", color: "#fff" }}>
                      <div className="card-body">
                      <p className="card-text">
                          <strong>Name:</strong> {req.username}
                        </p>
                        <p className="card-text">
                          <strong>Description:</strong> {req.issue}
                        </p>
                        <p className="card-text">
                          <strong>Phone:</strong> {req.userPhone}
                        </p>
                        <p className="card-text">
                          <strong>Location:</strong>{" "}
                          {req.location?.formattedAddress || req.landmark || "No location provided"}
                        </p>
                        {(req.status === 'Pending' || req.status === 'Accepted') && (
                          <button
                            className="btn btn-warning w-100"
                            onClick={() => handleStatus(req._id, req)}
                          >
                            {req.status !== "Accepted" ? "Accept" : "Finish"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center w-100">No requests available</p>
              )}
            </div>
          </div>
        </div>

        {/* feedbacks */}
        <div className="container my-5">
          <div
            className="card shadow p-4 rounded"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "#f8f9fa",
            }}
          >
            <h2 className="text-center mb-4 text-warning">User Feedbacks</h2>

            <div className="row">
              {feeds.length > 0 ? (
                feeds.map((feed, index) => (
                  <div className="col-md-4 mb-4" key={index}>
                    <div
                      className="card shadow-sm border-0 rounded"
                      style={{ backgroundColor: "#212529", color: "#fff" }}
                    >
                      <div className="card-body">
                        <p className="card-text">{feed.feedback}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col text-center">
                  <p className="text-light">No feedbacks available</p>
                </div>
              )}
            </div>
          </div>
        </div>


        {/* Edit Modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Service Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form >
              {/* Shop Name */}
              <div className="mb-3">
                <label htmlFor="shopname" className="form-label">
                  Shop Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="shopname"
                  value={formData.shopname}
                  onChange={handleInputChange}
                />
              </div>

              {/* Owner Name */}
              <div className="mb-3">
                <label htmlFor="ownername" className="form-label">
                  Owner Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="ownername"
                  value={formData.ownername}
                  onChange={handleInputChange}
                />
              </div>

              {/* License Image */}
              <div className="mb-3">
                <label htmlFor="license" className="form-label">
                  License Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="license"
                  onChange={handleInputChange}
                />
              </div>

              {/* Additional Images */}
              {["imageOne", "imageTwo", "imageThree"].map((image, index) => (
                <div className="mb-3" key={image}>
                  <label htmlFor={image} className="form-label">
                    Upload Additional Image {index + 1}
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id={image}
                    onChange={handleInputChange}
                  />
                </div>
              ))}

              {/* Services Provided */}
              <div className="mb-3">
                <label htmlFor="service" className="form-label">
                  Services Provided
                </label>
                <textarea
                  className="form-control"
                  id="service"
                  rows="3"
                  value={formData.service}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              {/* Phone Number */}
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <Button variant="primary" type="button" onClick={handleEdit}>
                Save Changes
              </Button>
            </form>
          </Modal.Body>
        </Modal>

      </div>
    </>
  );
}

export default Servicehome;
