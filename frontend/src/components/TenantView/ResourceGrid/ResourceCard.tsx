import React, { useState } from 'react';
import CardImage from "./CardImage";
import CardBody from "./CardBody";
import CardAction from "./CardActionButton";
import CreateBookingModal from '../CreateBookingModal/CreateBookingModal';
import Placeholder from '../../BothView/Placeholder/Placeholder';
import Resource from '../../modelInterfaces/Resource';



interface ResourceCardProps {
  resource: Resource;
  loading?: boolean;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, loading }) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleBookingAdded = () => {
    console.log("booking added to cart")
    setIsModalOpen(false)
  }


  return (
    <div className="col-sm-2 mb-4 mb-sm-0 mt-1">
      <div className="card">
        {loading ? (
          <>
            <Placeholder width="100%" height="150px" color="secondary" />
            <Placeholder width="100%" height="1rem" color="secondary" />
            <Placeholder width="100%" height="1rem" color="secondary" />
            <Placeholder width="100%" height="1rem" color="secondary" />
          </>
        ) : (
          <>
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
          </>
        )}
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
