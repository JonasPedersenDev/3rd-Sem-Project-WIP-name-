import React from "react";
import { FaRegCheckCircle, FaTools, FaTimesCircle } from 'react-icons/fa';

interface CardActionProps {
  status: string;
  toggleModal: () => void;
}

const CardAction: React.FC<CardActionProps> = ({ status, toggleModal }) => {
  if (status === "available") {
    return (
      <button className="btn btn-success" onClick={toggleModal}>
        <FaRegCheckCircle /> Book Now
      </button>
    );
  } else if (status === "maintenance") {
    return (
      <button className="btn btn-warning" disabled>
        <FaTools /> Under Maintenance
      </button>
    );
  } else {
    return (
      <button className="btn btn-secondary" disabled>
        <FaTimesCircle /> Unavailable
      </button>
    );
  }
};

export default CardAction;
