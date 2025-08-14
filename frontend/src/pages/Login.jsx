import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  // navigate hook

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage('');

  try {
    const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/users/login`, form);
    localStorage.setItem('token', res.data.token);
    setMessage('Logged in successfully!');
    navigate('/');  // homepage redirect
  } catch (err) {
    if (err.response?.data?.message) {
      setMessage(err.response.data.message);
    } else if (err.response?.data?.errors) {
      setMessage(err.response.data.errors[0].msg);
    } else {
      setMessage('Login failed');
    }
  }
};


  return (
    <div className="auth-container">
      <h2 className="form-title">Login</h2>
      {message && <p className="form-message">{message}</p>}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
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
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="form-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
