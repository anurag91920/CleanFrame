import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  // navigate hook

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage('');

  try {
    const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/users/register`, form);
    localStorage.setItem('token', res.data.token);
    setMessage('Registered successfully!');
    navigate('/');  // सीधे homepage पर redirect
  } catch (err) {
    if (err.response?.data?.message) {
      setMessage(err.response.data.message);
    } else if (err.response?.data?.errors) {
      setMessage(err.response.data.errors[0].msg);
    } else {
      setMessage('Registration failed');
    }
  }
};


  return (
    <div className="auth-container">
      <h2 className="form-title">Register</h2>
      {message && <p className="form-message">{message}</p>}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Username</label>
          <input
            name="username"
            placeholder="Enter username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="form-button">Register</button>
      </form>
    </div>
  );
};

export default Register;
