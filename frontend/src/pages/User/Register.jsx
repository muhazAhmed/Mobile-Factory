import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import form from "../.././images/form.svg"

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/api/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='form'>
      <div className='img'>
        <img src={form} alt="svg"/>
      </div>
      <div className='form-main'>
      <form className='form-txt' data-aos="zoom-in">
      <h1>REGISTER</h1>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="number"
          placeholder="phone"
          name="phone"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />

        <button onClick={handleSubmit} className='form-btn' >Register</button>
        <span style={{"fontSize" : "0.8rem"}}>
          Aldready a member?{" "}
          <Link
            style={{ textDecoration: "none", color: "#536DFE", "backgroundColor": "inherit" }}
            to="/login"
          >
            Login here
          </Link>
        </span>
      </form></div>
    </div>
  )
}

export default Register
