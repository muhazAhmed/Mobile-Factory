import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Background from "../.././images/background.png"
import {AuthContext} from "../../context/AuthContext"
const Home = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className='home'>
      <img src={Background} alt='bckg' />
    <div className='home-txt'>
      <div>
        <h1>Welcome to Mobile Factory</h1>
        </div>
      <div>
        <h3>Find any brand Smarphone of your choice, and get a greate deal. <br/>Checkout directly from official site.</h3>
        </div>
      <div>
      {currentUser ? (
        <Link
          to="/dashboard"
          style={{ textDecoration: "none" }}
          data-aos="slide-up"
        >
          <button className="btn-home">Dashboard</button>
        </Link>
      ) : (
        <Link className="link" to="/login">
          <button className="btn-home">Proceed</button>
        </Link>
      )}
        </div>
    </div> 
  </div>
  )
}

export default Home
