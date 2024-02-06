import React, { useState } from "react";
import axios from "axios";
const AccountForm = () => {
    const [formData, setFormData] = useState({
        accountType: "",
        branch: "",
        location: "",
       
      });
    
      const handleChange = (e) =>{
            const {name,value} = e.target;
            setFormData({...formData, [name] : value});
      }
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post("http://localhost:8080/api/account", [formData], {
            headers: {
              "Content-Type": "application/json",
            },
          });
          alert("Registration Successful");
          setFormData({
            accountType: "",
            branch: "",
            loaction: ""
                  });
        } catch (error) {
          console.error("Error:", error);
          alert("Registration Failed");
        }
      };

  return (
    <>
    <h2>AccountForm</h2>
    <form onSubmit={handleSubmit}>
      <div>
          <label>AccountType</label>
          <input
          type= "text"
          name="accountType"
          value= {formData.accountType}
          onChange={handleChange}
          required
          />
      </div>
      <div>
          <label>Branch</label>
          <input
          type= "text"
          name="branch"
          value= {formData.branch}
          onChange={handleChange}
          required
          />
      </div>
      <div>
          <label>Location</label>
          <input
          type= "text"
          name="location"
          value= {formData.location}
          onChange={handleChange}
          required
          />
       </div>
       <button type="submit" class="form-submit-btn">Register</button>
    </form>
  
  </> 
  );
};

export default AccountForm
