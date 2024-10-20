import React from "react";

interface CardImageProps {
  img: string;
  name: string;
}

const CardImage: React.FC<CardImageProps> = ({ img, name }) => (
  <img
    src={`http://localhost:8080/resources/${img}`}
    className="card-img-top"
    alt={`${name} image`}
  />
);

export default CardImage;
