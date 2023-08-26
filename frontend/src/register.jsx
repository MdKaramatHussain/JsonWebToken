import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [value, setValues] = useState({
    name: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate()
  const handleSubmit = (event) => {
    console.log("Success")
    event.preventDefault();
    axios.post('http://localhost:4000/register', value) //values
      .then(res => {
        if (res.data.Status === "Success") {
          console.log("Axios in Register method")
          navigate('/login');
        } else {
          alert("Error");
        }
      })
      .then(err => console.log(err));
  }

  return (

    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="name"><strong>Name:</strong></label>
            <input type="text" placeholder='Enter Name' name='name' onChange={e => setValues({ ...value, name: e.target.value })} className='form-control rounded-0' />
          </div>
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
          <Link to='/login' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
        </form>

      </div>

    </div>
  )
}

export default Register;