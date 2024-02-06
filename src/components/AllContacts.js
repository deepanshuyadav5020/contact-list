import React, { useState, useEffect, useCallback } from "react";
import { getData } from "../clientServicesApi/ContactServices.js";
import { Link } from "react-router-dom";
import "../components/AllContacts.css";
import axios from "axios";
import "../components/Modal.css";

const AllContacts = () => {
  const [contacts, setContacts] = useState([]); // state to hold each contact
  const [modal, setModal] = useState(false);
  const [updatedContact, setUpdatedContact] = useState({
    id: null,
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    accountNo: "",
  });

  const handleDeleteContact = async (contactId) => {
    try {
      // Send a DELETE request to the server to delete the contact
      await axios.delete(`http://localhost:8080/api/contact/${contactId}`);

      // Update the contacts state by removing the deleted contact
      setContacts((prevContacts) =>
        prevContacts.filter((contacts) => contacts.contactId !== contactId)
      );
      setContacts(getDataFromApi());
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleUpdateContact = async (contactId) => {
    console.log(contactId);
    try {
      await axios.put(
        `http://localhost:8080/api/contact/${contactId}`,
        updatedContact
      );
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contactId === updatedContact.id ? updatedContact : contact
        )
      );
      setModal(false); // Close the modal after updating
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const getDataFromApi = useCallback(async () => {
    try {
      const response = await getData();
      return response.data;
    } catch (error) {
      console.log("Error: ", error);
      return [];
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDataFromApi();
      setContacts(data);
    };
    fetchData();
  }, [getDataFromApi]);

  const openModal = (contact) => {
    setUpdatedContact({
      id: contact.id,
      firstName: contact.firstName,
      lastName: contact.lastName,
      mobile: contact.mobile,
      email: contact.email,
      accountNo: contact.accountNo,
    });
    setModal(true);
  };

  return (
    <div className="container">
      <h2>All Contacts</h2>
      <Link to="/Registration">
        <button className="btn-donate">Add New Contact</button>
      </Link>
      <Link to="/AccountRegistration">
        <button className="btn-donate">Add New Account</button>
      </Link>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Mobile</th>
            <th>Account No</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 &&
            contacts?.map((contact, index) => (
              <tr key={index}>
                <td>{contact.id}</td>
                <td>{contact.firstName}</td>
                <td>{contact.lastName}</td>
                <td>{contact.mobile}</td>
                <Link to={`/account/${contact.accountNo}`}>
                  {contact.accountNo}
                </Link>
                <td>
                  <button onClick={() => handleDeleteContact(contact.id)}>
                    Delete
                  </button>
                </td>
                <td>
                  <button onClick={() => openModal(contact)}>Update</button>
                </td>
              </tr>
            ))}
          {modal &&  (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={() => setModal(false)}>
                  &times;
                </span>
                <h2>Update Contact</h2>
                <label>First Name:</label>
                <input
                  type="text"
                  value={updatedContact.firstName}
                  onChange={(e) =>
                    setUpdatedContact({
                      ...updatedContact,
                      firstName: e.target.value,
                    })
                  }
                />
                <label>Email:</label>
                <input
                  type="email"
                  value={updatedContact.email}
                  onChange={(e) =>
                    setUpdatedContact({
                      ...updatedContact,
                      email: e.target.value,
                    })
                  }
                />
                <label>Phone Number:</label>
                <input
                  type="mobile"
                  value={updatedContact.mobile}
                  onChange={(e) =>
                    setUpdatedContact({
                      ...updatedContact,
                      mobile: e.target.value,
                    })
                  }
                />
                <label>Account Number:</label>
                <input
                  type="accountNo"
                  value={updatedContact.accountNo}
                  onChange={(e) =>
                    setUpdatedContact({
                      ...updatedContact,
                      accountNo: e.target.value,
                    })
                  }
                />
                <button onClick={() => handleUpdateContact(updatedContact.id)}>
                  Save
                </button>
              </div>
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllContacts;
