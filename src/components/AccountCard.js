import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { getAccountDetails } from "../clientServicesApi/AccountServices.js";

import axios from 'axios';

// const REST_API_BASE_URL_ACCOUNT = 'http://localhost:8080/api/account'; 


export const getAccountDetails = async (accountNo) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/account/${accountNo}`);
    console.log(response);
    return response.data; 
  } catch (error) {
    console.error('Error fetching account details:', error);
    throw error; 
  }
};


const AccountDetails = () => {
  const { accountNo } = useParams();
  const [accountDetails, setAccountDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAccountDetails(accountNo);
      console.log(data);
      setAccountDetails(data);
    };
    fetchData();
  }, [accountNo]);

  if (!accountDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>Account Details</h2>
      <p>Account No: {accountDetails.accountNo}</p>
      <p>Balance: {accountDetails.balance}</p>
      <p>Balance: {accountDetails.accountType}</p>
    </div>
  );
};

export default AccountDetails;

// AccountDetails.js

