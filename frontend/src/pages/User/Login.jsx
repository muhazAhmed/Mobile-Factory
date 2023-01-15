import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import form from "../.././images/form.svg"
import {AuthContext} from "../../context/AuthContext.jsx"


const Login = () => {
  const [input, setInputs] = useState({
    email : "",
    password : ""
  })

  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const {login} = useContext(AuthContext)

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(input)
      navigate("/dashboard");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className='form'>
      <div className='img'>
        <img src={form} alt="svg"/>
      </div>
      <div className='form-main'>
      <form className='form-txt' data-aos="zoom-in">
      <h1>LOGIN</h1>
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />

        <button onClick={handleSubmit} className='form-btn' >Login</button>
        {err && <p style={{"color" : "red", "fontWeight" : "bolder"}}>{err}</p>}
        <span style={{"fontSize" : "0.8rem"}}>
          New member?{" "}
          <Link
            style={{ textDecoration: "none", color: "#536DFE", "backgroundColor": "inherit" }}
            to="/register"
          >
            Register here
          </Link>
        </span>
      </form></div>
    </div>
  )
}

export default Login
