import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: ''
  });

  const [error, setError] = useState({});

  const validation = () => {
    const tempError = {};
    if (!formValues.username) tempError.username = "Name is required";
    if (!formValues.email) {
      tempError.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      tempError.email = "Email is not valid";
    }
    if (!formValues.password) {
      tempError.password = "Password is required";
    } else if (formValues.password.length < 8) {
      tempError.password = "Password must be at least 8 characters long";
    }
    if (!formValues.confirmpassword) {
      tempError.confirmpassword = "Confirm password is required";
    } else if (formValues.password !== formValues.confirmpassword) {
      tempError.confirmpassword = "Passwords do not match";
    }

    setError(tempError);
    return Object.keys(tempError).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validation()) {
      const existingEntries = JSON.parse(localStorage.getItem('formEntries')) || [];
      const newEntries = [...existingEntries, formValues];
      localStorage.setItem('formEntries', JSON.stringify(newEntries));

      setFormValues({
        username: '',
        email: '',
        password: '',
        confirmpassword: ''
      });

      navigate('/RegisterSuccessful');
    }
  };

  return (
    <div>
      <div className="container pt-5 text-right">
        <form onSubmit={handleSubmit} className="col-6 mx-auto">
          <div className="form-group mb-3 mt-3">
            <label htmlFor="fullname" className="form-label">Full Name:</label>
            <input type="text"
              className="form-control"
              id="fullname"
              placeholder="Enter Name"
              name="username"
              value={formValues.username}
              onChange={handleChange}
            />
            {error.username && <p className='errors'>{error.username}</p>}
          </div>
          <div className="form-group mb-3 mt-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Enter Email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
            {error.email && <p className='errors'>{error.email}</p>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter Password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
            />
            {error.password && <p className='errors'>{error.password}</p>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Enter Confirm Password"
              name="confirmpassword"
              value={formValues.confirmpassword}
              onChange={handleChange}
            />
            {error.confirmpassword && <p className='errors'>{error.confirmpassword}</p>}
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
