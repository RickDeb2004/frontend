import React, { useState, useEffect } from "react";

const Modal = ({ show, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        website: user.website || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!user || !user._id) {
      console.error("User ID is missing.");
      return;
    }

    try {
      // Make an API request to update the user in the database
      const response = await fetch(`http://localhost:8000/api/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        onSave(user.id, updatedUser); // Update the parent component with the new user data
        onClose(); // Close the modal
      } else {
        console.error('Failed to update user data.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (!show) return null;

  const modalStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    padding: "20px",
    backgroundColor: "#18181b",
    borderRadius: "8px",
    zIndex: 1000,
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 999,
  };

  const inputStyle = {
    width: "90%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "4px",
    border: "2px solid #FFFF00",
    backgroundColor: "#111827",
    color: "white",
  };

  const buttonStyle = {
    padding: "10px 20px",
    margin: "10px 5px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#3b82f6",
    color: "white",
  };

  return (
    <>
      <div style={overlayStyle} onClick={onClose}></div>
      <div style={modalStyle}>
        <h2 style={{ color: "white", textAlign: "center" }}>Edit User</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          style={inputStyle}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          style={inputStyle}
          placeholder="Email"
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          style={inputStyle}
          placeholder="Phone"
        />
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleInputChange}
          style={inputStyle}
          placeholder="Website"
        />
        <div style={{ textAlign: "center" }}>
          <button style={buttonStyle} onClick={handleSave}>
            Save
          </button>
          <button
            style={{ ...buttonStyle, backgroundColor: "#ef4444" }}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
