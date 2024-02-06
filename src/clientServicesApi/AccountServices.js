import axios from 'axios';

const REST_API_BASE_URL_ACCOUNT = 'http://localhost:8080/api/account'; 


export const getAccountDetails = async (accountNo) => {
  try {
    const response = await axios.get(`${REST_API_BASE_URL_ACCOUNT}/${accountNo}`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching account details:', error);
    throw error; 
  }
};

