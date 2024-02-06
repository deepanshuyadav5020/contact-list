import React, { useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

const AccountForm = () => {
  const { contactId } = useParams();
    const [formData, setFormData] = useState({
        accountType: "",
        branch: "",
        location: "",
        contact_id : contactId,
        balance: "",
        accountHolder:"",
        accountNo:""
      });
    
      const handleChange = (e) =>{
            const {name,value} = e.target;
            setFormData({...formData, [name] : value});
      }
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          console.log(formData);
          console.log(contactId);
          await axios.post(`http://localhost:8080/api/account/${contactId}`, [formData], {
            headers: {
              "Content-Type": "application/json",
            },
          });
          alert("Registration Successful");
          setFormData({
            accountType: "",
        branch: "",
        location: "",
        contact_id : contactId,
        balance: "",
        accountHolder:"",
        accountNo:""
                  });
        } catch (error) {
          console.error("Error:", error);
          alert("Registration Failed");
        }
      };

  return (
    <>
    <h2>AccountForm</h2>
    <p>Contact ID: {contactId}</p>

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
       <div>
          <label>accountNo</label>
          <input
          type= "text"
          name="accountNo"
          value= {formData.accountNo}
          onChange={handleChange}
          required
          />
       </div>
       <div>
          <label>accountHolder</label>
          <input
          type= "text"
          name="accountHolder"
          value= {formData.accountHolder}
          onChange={handleChange}
          required
          />
       </div>
       <div>
          <label>balance</label>
          <input
          type= "text"
          name="balance"
          value= {formData.balance}
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
