import React from "react";

interface CardActionProps {
  status: string;
  toggleModal: () => void
}

const CardAction: React.FC<CardActionProps> = ({ status, toggleModal }) => {
  if (status === "available") {
    return (
      <a href="#" className="btn btn-primary" onClick={toggleModal}>
        Book
      </a>
    );
  } else if (status === "maintenance") {
    return (
      <button className="btn btn-warning" disabled>
        Under Maintenance
      </button>
    );
  } else {
    return (
      <button className="btn btn-secondary" disabled>
        Unavailable
      </button>
    );
  }
};

export default CardAction;
