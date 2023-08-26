import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function Login() {
  const [value, setValues] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()
  //  axios.defaults.withCredentials = true;
  const handleSubmit = (event) => {
    console.log("Login page")
    event.preventDefault();
    axios.post('http://localhost:4000/login', value) //values
      .then(res => {
        console.log(value.email)
        if (res.data.Status === "Success") {
          navigate('/');
          console.log(res.data.Status)
        } else {
          alert(res.data.Error);
          console.log(res.data.Status)
        }
      })
      .then(err => console.log(err));
  }


  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Sign-In</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="email"><strong>Email:</strong></label>
            <input type="email" placeholder='Enter Email' name='email' onChange={e => setValues({ ...value, email: e.target.value })} className='from-control-rounded-0' />
          </div>
          <div className='mc-3'>
            <label htmlFor="password"><strong>Password:</strong></label>
            <input type="password" placeholder='Enter Password' name='password' onChange={e => setValues({ ...value, password: e.target.value })} className='form-control rounded-0' />
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'>Log in</button>
          <p>You are agree to our terms and policies</p>
          <Link to='/register' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'> Create Account </Link>
        </form>

      </div>

    </div>
  )
}

export default Login