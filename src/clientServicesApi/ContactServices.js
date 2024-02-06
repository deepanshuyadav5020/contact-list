import axios from "axios";

// import React from 'react';

const REST_API_BASE_URL = "http://localhost:8080/api/contact";

export const getData = async () => {
  // getting data from axios call
  try {
    const response = await axios.get(REST_API_BASE_URL); //wait till data comes
    console.log("response", response); // log the response
    return response;
  } catch (error) {
    console.log("Error", error);
  }
};

