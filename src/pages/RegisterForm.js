import React, { useState } from "react";
// import { Route, Routes } from "react-router-dom";
import "./RegisterForm.css";
import axios from "axios";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    accountNo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/contact", [formData], {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Registration Successful");
      setFormData({
        firstName: "",
        lastName: "",
        mobile: "",
        accountNo: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Registration Failed");
    }
  };

  return (
    <div>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Mobile:</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            pattern="[0-9]{10}"
            required
          />
        </div>
        <div>
          <label>Account Number:</label>
          <input
            type="text"
            name="accountNo"
            value={formData.accountNo}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" class="form-submit-btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
