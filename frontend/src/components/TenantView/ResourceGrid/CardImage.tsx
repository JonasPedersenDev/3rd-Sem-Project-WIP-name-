import React from "react";

interface CardImageProps {
  img?: string;
  name: string;
}

import defaultImage from "../../../assets/deafultResourcePic.jpg";

const CardImage: React.FC<CardImageProps> = ({ img, name }) => (
  <img
    src={img ? `http://localhost:8080/resources/${img}` : defaultImage}
    onError={(e) => {
      (e.target as HTMLImageElement).src = defaultImage;
    }}
    className="card-img-top"
    alt={`${name} image`}
  />
);

export default CardImage;
