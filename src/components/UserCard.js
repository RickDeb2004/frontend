import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaHeart,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Modal from "./Modal";
import ConfirmationDialog from "./ConfirmationDialoge";

const UserCard = ({ user, onDelete, onSave }) => {
  const [liked, setLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(user.id);
    setIsDialogOpen(false);
  };

  const handleSaveUser = (id, updatedUser) => {
    onSave(id, updatedUser);
  };

  const gradientVariants = {
    initial: {
      backgroundPosition: "0% 50%",
    },
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    },
  };

  const cardContainerStyle = {
    position: "relative",
    width: "300px",
    height: "360px",
    borderRadius: "16px",
    margin: "16px",
  };

  const gradientBorderStyle = {
    position: "absolute",
    inset: 0,
    borderRadius: "16px",
    background:
      "radial-gradient(circle at 0% 100%, #00ccb1, transparent), radial-gradient(circle at 100% 0%, #7b61ff, transparent), radial-gradient(circle at 100% 100%, #ffc414, transparent), radial-gradient(circle at 0% 0%, #1ca0fb, #141316)",
    zIndex: 0,
    opacity: 0.6,
    pointerEvents: "none",
  };

  const cardStyle = {
    position: "relative",
    borderRadius: "inherit",
    padding: "0",
    textAlign: "center",
    backgroundColor: "#18181b",
    zIndex: 1,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    border: "2px solid transparent",
    backgroundClip: "padding-box",
  };

  const imgContainerStyle = {
    borderBottom: "2px solid steelgray",
    padding: "16px",
    backgroundColor: "rgba(24, 24, 27, 0.9)",
    borderTopLeftRadius: "inherit",
    borderTopRightRadius: "inherit",
    height: "150px",
  };

  const imgStyle = {
    width: "120px",
    height: "100px",
    objectFit: "cover",
    margin: "0 auto",
  };

  const infoStyle = {
    color: "white",
    textAlign: "left",
    padding: "12px 16px",
    zIndex: 10,
    flexGrow: 1,
  };

  const linkStyle = {
    color: "#1ca0fb",
    textDecoration: "none",
  };

  const iconStyle = {
    marginRight: "8px",
    color: "#bbb",
  };

  const actionIconsContainerStyle = {
    borderTop: "2px solid steelgray",
    padding: "12px 0",
    backgroundColor: "rgba(24, 24, 27, 0.9)",
    borderBottomLeftRadius: "inherit",
    borderBottomRightRadius: "inherit",
    position: "relative",
  };

  const bottomGradientBorderStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "2px",
    background: "linear-gradient(to right, #00ccb1, #7b61ff, #ffc414, #1ca0fb)",
    zIndex: 2,
  };

  const actionIconsStyle = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    cursor: "pointer",
    margin: 0,
  };

  const heartIconStyle = {
    color: liked ? "red" : "white",
    stroke: liked ? "none" : "red",
  };

  return (
    <div style={cardContainerStyle}>
      <motion.div
        style={gradientBorderStyle}
        initial="initial"
        animate="animate"
        variants={gradientVariants}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      />
      <div style={cardStyle}>
        <div style={imgContainerStyle}>
          <img
            src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}
            alt={user.name}
            style={imgStyle}
          />
        </div>
        <div style={infoStyle}>
          <h3>{user.name}</h3>
          <p>
            <FaEnvelope style={iconStyle} />
            {user.email}
          </p>
          <p>
            <FaPhone style={iconStyle} />
            {user.phone}
          </p>
          <p>
            <FaGlobe style={iconStyle} />
            <a
              href={`http://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              {user.website}
            </a>
          </p>
        </div>
        <div style={actionIconsContainerStyle}>
          <div style={actionIconsStyle}>
            <FaHeart
              style={{ ...iconStyle, ...heartIconStyle }}
              onClick={handleLikeClick}
            />
            <FaEdit style={iconStyle} onClick={handleEditClick} />
            <FaTrash
              style={{ ...iconStyle, color: "red" }}
              onClick={handleDeleteClick}
            />
          </div>
          <div style={bottomGradientBorderStyle}></div>
        </div>
      </div>

      <Modal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
        onSave={handleSaveUser}
      />

      <ConfirmationDialog
        show={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default UserCard;
