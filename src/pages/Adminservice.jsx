import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { getAdminServicerApi, servicerApprovalApi } from '../services/allApi';
import { serverUrl } from '../services/serverUrl';

function Adminservice() {
  const [show, setShow] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState(""); // To store selected license image
  const [getServicers, setGetServicers] = useState([]);
  const [status,setStatus]=useState("")

  // Function to handle modal show with selected license image
  const handleShow = (license) => {
    setSelectedLicense(license);
    setShow(true);
  };
console.log(selectedLicense);

  const handleClose = () => setShow(false);

  // Fetch service centers
  const handlegetservicers = async () => {
    try {
      const response = await getAdminServicerApi();
      console.log(response.data);
      setGetServicers(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleApproval = async (id, status) => {
    const reqBody = { status };
    const result = await servicerApprovalApi(id, reqBody);
    if (result.status === 200) {
      alert(`The User is ${status} successfully`);
      setStatus(result);
    }
  };

  useEffect(() => {
    handlegetservicers();
  }, [status]);

  return (
    <div>
      {/* Service Centers Table */}
      <div className="container mt-5">
        <h2 className="mb-3 fw-bold text-center">Service Centers</h2>
        <div className="table-responsive mt-3" style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Shop Name</th>
                <th>Email</th>
                <th>Service</th>
                <th>Phone</th>
                <th>License</th>
                <th>Location/Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getServicers.length > 0 ? (
                getServicers.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.shopName}</td>
                    <td>{item.email}</td>
                    <td>{item.service}</td>
                    <td>{item.phone}</td>
                    <td>
                      <button className="btn btn-info btn-sm" onClick={() => handleShow(item.license)}>
                        View
                      </button>
                    </td>
                    <td>{item.address}</td>
                    <td>
                    <button
  onClick={() => handleApproval(item._id, "Accepted")}
  className={`btn btn-sm me-2 ${item.status === "Rejected" ? "btn-danger" : "btn-warning"}`}
  disabled={item.status === "Rejected"}
>
  {item.status === "Rejected" ? "Rejected" : item.status === "Accepted" ? "Approved" : "Approve"}
</button>
                     {item.status=="Pending"&& <button className="btn btn-danger btn-sm"onClick={()=>handleApproval(item._id,"Rejected")} >Reject</button>}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">No Service Centers Available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for License Image */}
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>License</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedLicense ? (
            <img src={`${serverUrl}/license/${selectedLicense}`} alt="License" className="w-100" />
          ) : (
            <p>No License Image Available</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Adminservice;
