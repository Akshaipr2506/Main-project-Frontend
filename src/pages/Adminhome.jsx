import React, { useEffect, useState } from 'react';


import { getAdminUserApi } from '../services/allApi';


function AdminHome() {
 

  const [getUsers, setGetUsers] = useState([])

  const handlegetUsers = async () => {
    try {
      const response = await getAdminUserApi()
      console.log(response);

      setGetUsers(response.data)

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    handlegetUsers()
  }, [])
  return (

    <>
      <div className="container mt-5">
        <h1 className="text-center mb-4 fw-bold">Admin Dashboard</h1>

        {/* Users Table */}
        <div className="mb-5">
          <h2 className="mb-3 fw-bold">Users</h2>
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {getUsers.length > 0 ? (
                getUsers.map((item, index) => (
                  <tr key={item._id}> 
                    <td>{index + 1}</td> 
                    <td>{item.username}</td> 
                    <td>{item.email}</td> 

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">No Users</td> {/* Moved "No Users" inside table */}
                </tr>
              )}


            </tbody>
          </table>
        </div>

       
      </div>

      
    </>


  );
}

export default AdminHome;
