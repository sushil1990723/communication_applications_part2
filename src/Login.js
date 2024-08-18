import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [loginValue, setLoginValue] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginValue({
      ...loginValue,
      [name]: value
    });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem('formEntries')) || [];
    console.log('storedUsers', storedUsers);
    const user = storedUsers.find(
      (user) =>
        user.email === loginValue.email && user.password === loginValue.password
    );
    if (user) {
      localStorage.setItem('logdinuser', JSON.stringify(user));
      navigate('/LoginSuccessful'); 
    } else {      
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <div className="container pt-5  col-6 mx-auto">
        <h1 className="text-center">Login</h1>

        <div className="container pt-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 mt-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input type="text" className="form-control" id="loginEmail" placeholder="Enter email" name="email" value={loginValue.email} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="pwd" className="form-label">Password:</label>
              <input type="password" className="form-control" id="loginPassword" placeholder="Enter password" 
                name="password" value={loginValue.password} onChange={handleChange} />
            </div>
            {error && <p className='errors'>{error}</p>}            
            <button type="submit" className='btn btn-primary'>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
