import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getFeedApi, getFeedBackApi, getUserRequestApi, reqApi, sendFeedbackApi } from '../services/allApi';
import { serverUrl } from '../services/serverUrl';
import { sendRequestContext } from '../context/contextShare';

function ViewDetails() {
  const { setSendResponse } = useContext(sendRequestContext)
  const location = useLocation();
  const servicer = location.state?.servicer;

  const [show, setShow] = useState(false);
  const [requestData, setRequestData] = useState({
    name: '',
    phone: '',
    issue: ''
  });
  const [userRequests, setUserRequests] = useState([]);
  const [feeds, setfeeds] = useState([])
  //console.log(userRequests);


  // Retrieve user's location from session storage
  const storedUserLocation = sessionStorage.getItem('userLocation');
  const userLocation = storedUserLocation ? JSON.parse(storedUserLocation) : {};
  const { latitude, longitude, locationName } = userLocation;

  const user = sessionStorage.getItem("existingUsers")
  //console.log(user);

  const userId = user ? JSON.parse(user) : {};
  const { _id } = userId
  //console.log(_id);


  console.log(feeds);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchUserRequests(user._id)
    }, 5000);

    
    
    getFeedbacks(servicer._id)
    return () => clearInterval(interval);
  }, [])


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [sendfeedback, setSendFeedback] = useState("")
  console.log(sendfeedback);

  const [feedStatus, setFeedSatus] = useState(false)


  // Handle input changes
  const handleChange = (e) => {
    setRequestData({ ...requestData, [e.target.name]: e.target.value });
  };

  // Confirm request submission
  const handleConfirmRequest = async () => {
    const finalRequest = {
      username: requestData.name,
      userPhone: requestData.phone,
      issue: requestData.issue,
      landmark: locationName, // Auto-filled location name
      location: {
        latitude,
        longitude
      },
      servicerId: servicer._id,
      userId: _id
    };
    console.log(finalRequest);

    try {
      const response = await reqApi(finalRequest);
      console.log('Request sent successfully:', response.data);
      alert('Service request sent successfully!');
      setSendResponse(response.data)
      handleClose();
      fetchUserRequests();
    } catch (error) {
      console.error('Axios Error:', error);
      if (error.response) {
        console.error('Server responded with:', error.response.data);
      }
      alert('Failed to send request. Please try again.');
    }
  };

  if (!servicer) {
    return <h2 className="text-center text-danger mt-5">No service center selected</h2>;
  }

  //get all requests
  const fetchUserRequests = async () => {
    try {
      const token = sessionStorage.getItem('token')
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await getUserRequestApi(servicer._id);
      if (response.status === 200) {
        console.log(response.data);
        setUserRequests(response.data)
      }
      else {
        console.error('failed to fetch')
      }
    }
    catch (error) {
      console.error("error fetching", error);
    }
  };

  //send feedback
  const handleFeedback = async () => {
    const finalFeed = {
      feedback: sendfeedback,
      servicerId: servicer._id
    }
    console.log(finalFeed);

    try {
      const response = await sendFeedbackApi(finalFeed)
      console.log('feedback sent successfully:', response);
      alert('Service feedback sent successfully!');
      setSendFeedback("")
      setFeedSatus(true)
    } catch (error) {
      console.error('Axios Error:', error);
      if (error.response) {
        console.error('Server responded with:', error.response.data);
      }
      alert('Failed to send request. Please try again.');
    }
  }

  //get feedbacks
  const getFeedbacks = async (servicerId) => {
    try {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const result = await getFeedBackApi(servicerId, reqHeader); // Pass servicerId

      if (result.status == 200) {
        console.log(result.data);
        setfeeds(result.data); // Update state
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };



  return (
    <>
      <h1 className="text-center my-3">
        Welcome to <span className="text-primary">{servicer.shopname}</span>
      </h1>

      {/* Carousel Section */}
      <Carousel className="mt-4 shadow-lg rounded" style={{ maxWidth: '100%', margin: '0 auto' }}>
        {[servicer.imageOne, servicer.imageTwo, servicer.imageThree].map((image, index) => (
          <Carousel.Item key={index} interval={1000}>
            <img
              src={`${serverUrl}/license/${image}`}
              alt={`Slide ${index + 1}`}
              className="d-block w-100 rounded"
              style={{ height: '500px', objectFit: 'cover' }}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Service Details */}
      <div className="container mt-4 border shadow">
        <div className='row'>
          <div className="col-md-6 p-5">
            <h3 className='text-center'>{servicer.shopname}</h3>
            <p><strong>Service:</strong> {servicer.service}</p>
            <p><strong>Location:</strong> {servicer.address}</p>
            <p><strong>Contact:</strong> {servicer.phone}</p>

            {/* Confirm Request Button */}
            <Button variant="success" onClick={handleShow} className="my-3">Send Request</Button>
          </div>
          <div className="col-md-6 p-5">
            <h3 className="text-center">Valuable Feedbacks from our customers</h3>
            {feeds && feeds.length > 0 ? (
              feeds.map((feed, index) => (
                <div key={index} className="border shadow p-3 my-5">
                  <p>
                    <strong>{feed.feedback}</strong>
                  </p>
                </div>
              ))
            ) : (
              <p>No feedback available.</p>
            )}
          </div>

        </div>

      </div>

      <div className='container p-5 border my-5 shadow'>
        <h1>Your Requests</h1>
        {userRequests.length > 0 ? userRequests?.map((item) => (
          <div className='border p-3 mt-5'>
            <p><strong>location:</strong>{item.landmark}</p>
            <p><strong>Issue:</strong>{item.issue}</p>
            <p><strong>Status:</strong>{item.status}</p>
          </div>
        )) :
          <p>No requests</p>
        }
      </div>
      {userRequests.length > 0 ? (
        userRequests.map((item, index) =>
          item.status === 'Finished' && !feedStatus && (
            <div key={index} className="container border shadow rounded my-5 p-5">
              <h1>Status of your Request</h1>
              <h5>{item.status}</h5>

              <div className="bg-success p-5 mt-3">
                <h1 className="text-light">🎊 Hurray... Your work is done 🎊</h1>
                <input
                  type="text"
                  placeholder="How was your experience?"
                  className="form-control my-3"
                  value={sendfeedback}
                  onChange={(e) => setSendFeedback(e.target.value)}
                />
                <button className="btn btn-warning rounded" onClick={handleFeedback}>Send feedback</button>
              </div>
            </div>
          )
        )
      ) : (
        <p>No status</p>
      )}


      {/* Modal for Request */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>How can we help you?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="form-control mt-3"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Contact Number"
              className="form-control mt-3"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="issue"
              placeholder="Mention your issue"
              className="form-control mt-3"
              onChange={handleChange}
              required
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleConfirmRequest}>Confirm Request</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewDetails;
