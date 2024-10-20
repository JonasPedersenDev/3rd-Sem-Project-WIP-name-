import React from "react";
import CardImage from "./CardImage";
import CardBody from "./CardBody";
import CardAction from "./CardActionButton";

interface Resource {
  name: string;
  img: string;
  description: string;
  status: string;
}

interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  return (
    <div className="col-sm-2 mb-4 mb-sm-0">
      <div className="card">
        <CardImage img={resource.img} name={resource.name} />
        <CardBody
          name={resource.name}
          description={resource.description}
          status={resource.status}
        />
        <CardAction status={resource.status} />
      </div>
    </div>
  );
};

export default ResourceCard;
