// Login.js

import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/login.css';
import axios from 'axios';
//import AdminBackground from '../Images/AdminBackground.jpg';
import { faUser, faLock, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8080/hello/login', {
        username: formData.username,
        password: formData.password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        // If the response is OK, navigate to the admin page
        navigate('/admin');
      } else {
        // If the response is not OK, set an error
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  useEffect(() => {
    setError(null);
  }, [formData]);

  return (
    <>
    {/* <style>
      {`
        body {
          background-image: url(${AdminBackground});
          background-size: cover;
          margin: 0;
          padding: 0;
        }
      `}
    </style> */}
    <div className="login-card">
    <div className="login-card-content">
      <div className="header">
        <div className="logo">
          <div>company logo</div>
        </div>
        <h2><span className="highlight">CraftBurst</span></h2>
      </div>
      <form className="form" onSubmit={handleSubmit}>

      <div className="form">
      <div className="form-field username">
  <div className="icon">
    <FontAwesomeIcon icon={faUser} />
  </div>
  <input type="text" placeholder="Username" name="username" value={formData.username} onChange={handleChange}/>
</div>
<div className="form-field password">
  <div className="icon">
    <FontAwesomeIcon icon={faLock} />
  </div>
  <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange}/>
</div>

<button type="submit">
  <FontAwesomeIcon icon={faSignInAlt} /> Login
</button>
      </div>
      </form>
    </div>
  </div>
</>
    
  );
};

export default Login;
