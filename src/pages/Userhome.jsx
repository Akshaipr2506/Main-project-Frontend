import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { getServicersApi, getUserRequestApi } from '../services/allApi';
import { serverUrl } from '../services/serverUrl';
import { Link, useNavigate } from 'react-router-dom';

function Userhome() {
  const [username, setUsername] = useState('');
  const [servicers, setServicers] = useState([]);
  const [search, setSearch] = useState('');
  const [showLocationModal, setShowLocationModal] = useState(true);
  const [userLocation, setUserLocation] = useState("");
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const navigate = useNavigate();


useEffect(() => {
  // Fetch User Data
   if (sessionStorage.getItem('existingUsers')) {
      const user = JSON.parse(sessionStorage.getItem('existingUsers'));
      setUsername(user.username);
      
    }


  // Fetch Location
  const storedLocation = sessionStorage.getItem('userLocation');
  if (storedLocation) {
    const locationData = JSON.parse(storedLocation);
    setLat(locationData.latitude);
    setLon(locationData.longitude);
    setUserLocation(locationData?.locationName);
  
    getAllServicers('');
  } else {
    fetchUserLocation();
  }
}, []);

useEffect(() => {
  getAllServicers(search);
}, [search]); // Runs when search input changes

const handleSearchChange = (e) => {
  setSearch(e.target.value);
};

  const getAllServicers = async (searchKey) => {
    try {
      const response = await getServicersApi(searchKey);
      const allServicers = response.data;
      
      // Get user location from sessionStorage and parse it
      const userlocation = JSON.parse(sessionStorage.getItem('userLocation'));
      
      if (!userlocation || !userlocation.latitude || !userlocation.longitude) {
        console.error("User location not found or invalid");
        return;
      }
  
      console.log("User Location:", userlocation);
  
      // Filter servicers within 5km
      const nearbyServicers = allServicers.filter(servicer => {

  
        const distance = getDistance(
          { lat: userlocation.latitude, lng: userlocation.longitude },
          { lat: servicer.location.latitude, lng: servicer.location.longitude }
        );
  
        return distance <= 5; // 5km radius
      });
  
      setServicers(nearbyServicers);
      console.log("Nearby Servicers:", nearbyServicers);
      
    } catch (error) {
      console.error("Error fetching servicers:", error);
    }
  };
  
  // Haversine formula to calculate distance between two coordinates
  const getDistance = (location1, location2) => {
    const R = 6371; // Radius of Earth in km
    const dLat = (location2.lat - location1.lat) * (Math.PI / 180);
    const dLon = (location2.lng - location1.lng) * (Math.PI / 180);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(location1.lat * (Math.PI / 180)) * Math.cos(location2.lat * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    return R * c; // Distance in km
  };
  
  

  // Fetch user location
  const fetchUserLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLat(latitude);
          setLon(longitude);
          console.log(latitude,longitude)
          reverseGeocode(latitude, longitude);
                  // 🔄 Reload page after setting location

        },
        (error) => {
          console.error('Error getting location:', error);
          setUserLocation('Location access denied');
          setShowLocationModal(false);
        },
        { enableHighAccuracy: true }  // 🔥 Ensures precise location data
      );
      
    } else {
      setUserLocation('Geolocation not supported');
      setShowLocationModal(false);
      
    }
  };
  

  // Reverse Geocoding to get exact location
  const reverseGeocode = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=en`
      );
      const data = await response.json();
      
      console.log('Reverse Geocode Response:', data); // 🔍 Debugging output
      
      const locationName = data.display_name || 'Unknown Location';
      setUserLocation(locationName);
  
    const locationData = { latitude: lat, longitude: lon, locationName };
    sessionStorage.setItem('userLocation', JSON.stringify(locationData));
      
      setShowLocationModal(false);
       window.location.reload();
    } catch (error) {
      console.error('Error fetching location name:', error);
      setUserLocation('Unknown Location');
      setShowLocationModal(false);
    }
  };
  
  

  // const handleSearchChange = (e) => {
  //   setSearch(e.target.value);
  //   getAllServicers(e.target.value);
  // };

  const handleLogout = () => {
    sessionStorage.removeItem('existingUsers'); // Remove user details
    sessionStorage.removeItem('token'); // Remove authentication token
    sessionStorage.removeItem('userLocation'); // Remove location details
    navigate('/login');
  };

 

  return (
    <>
      {/* Location Request Modal */}
      {!lat && !lon && ( <Modal show={showLocationModal} onHide={() => setShowLocationModal(false)} centered>

        <Modal.Header closeButton>
          <Modal.Title>Allow Location Access</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>We need your location to show nearby service centers.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLocationModal(false)}>
            Deny
          </Button>
          <Button variant="primary" onClick={fetchUserLocation}>
            Allow
          </Button>
        </Modal.Footer>
      </Modal>)
}
      {/* Main UI */}
      <div
  className="container-fluid"
  style={{
    minHeight: '100vh',  // Ensures it at least covers the full viewport height
    width: '100vw',
    backgroundImage:
      "url('https://static.vecteezy.com/system/resources/previews/024/614/308/non_2x/abandoned-car-factory-old-steel-machinery-ruined-workshop-unhygienic-occupation-generated-by-ai-free-photo.jpg')",
    backgroundSize: 'cover',  // Ensures it fills the entire area
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
>
        <div className="row">
          <div className="row align-items-center text-white mt-5">
            {/* Current Location (Left) */}
            <div className="col-3 text-start p-5">
              <p className="mb-0 fw-bold">
                <FontAwesomeIcon icon={faLocationDot} size="lg" /> {userLocation}
              </p>
            </div>

            {/* Welcome Message (Center) */}
            <div className="col-6 text-center">
              <h1>Welcome {username}</h1>
              <p style={{ fontSize: '20px' }}>Here are some service centers to help you</p>
              <div className="mt-4">
                <input
                  type="text"
                  className="form-control text-dark border-light"
                  placeholder="Search your service..."
                  value={search}
                  onChange={handleSearchChange}
                  style={{
                    borderRadius: '25px',
                    padding: '10px 20px',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            {/* Logout Button (Right) */}
            <div className="col-3 text-end p-5">
              <button
                className="btn btn-outline-light fw-bold"
                onClick={handleLogout}
                style={{
                  borderWidth: '2px',
                  padding: '6px 12px',
                  fontSize: '16px',
                }}
              >
                Logout
              </button>
            </div>
          </div>

          {/* Card Section */}
          {servicers?.map((item) => (
            <div className="col-md-3 d-flex justify-content-center align-items-center my-5" key={item._id}>
              <Card style={{ width: '18rem' }}>
                <Card.Img
                  className="p-3"
                  variant="top"
                  src={`${serverUrl}/license/${item.imageOne}`}
                />
                <Card.Body>
                  <Card.Title>{item.shopname}</Card.Title>
                  <Card.Text>{item.service}</Card.Text>
                  <Link to={'/viewdetails'} state={{ servicer: item }}>
                    <Button variant="primary">View More...</Button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Userhome;
