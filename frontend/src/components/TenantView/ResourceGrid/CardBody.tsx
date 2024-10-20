import React from "react";

interface CardBodyProps {
  name: string;
  description: string;
  status: string;
}

const CardBody: React.FC<CardBodyProps> = ({ name, description, status }) => (
  <div className="card-body">
    <h5 className="card-title">{name}</h5>
    <p className="card-text">{description}</p>
    <p className="card-text">
      <strong>Status:</strong> {status}
    </p>
  </div>
);

export default CardBody;
