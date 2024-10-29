import React, { useState } from 'react';
import CardImage from "./CardImage";
import CardBody from "./CardBody";
import CardAction from "./CardActionButton";
import CreateBookingModal from '../CreateBookingModal/CreateBookingModal';

interface Resource {
  name: string;
  img: string;
  description: string;
  status: string;
  bookedDates: Date[];
}

interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleBookingAdded = () => {
    console.log("booking added to cart")
    setIsModalOpen(false)
  }


  return (
    <div className="col-sm-2 mb-4 mb-sm-0 mt-1">
      <div className="card">
        <CardImage img={resource.img} name={resource.name} />
        <CardBody
          name={resource.name}
          description={resource.description}
          status={resource.status}
        />
        <CardAction 
          status={resource.status}
          toggleModal={() => setIsModalOpen(true)}
        />
      </div>

      {isModalOpen && (
        <CreateBookingModal
          resource={resource}
          show={isModalOpen}
          onBookingAdded={handleBookingAdded}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ResourceCard;
