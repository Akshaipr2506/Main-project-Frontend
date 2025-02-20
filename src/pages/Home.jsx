import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'


function Home() {
  return (
    <div>
      <Header/>
      <main
        className="d-flex justify-content-center align-items-center vh-100"
        style={{
          backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20240929/pngtree-workflow-automation-virtual-gear-tech-image-image_16285499.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="text-center text-white">
          <h1 className="fw-bold" style={{fontSize:'70px'}}>Welcome to E-Workshop</h1>
          <p className="lead" style={{fontSize:'30px'}}>Find the perfect workshop and service center near you.</p>
          {/* <button className="btn btn-primary fw-bold">Get Started</button> */}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Home