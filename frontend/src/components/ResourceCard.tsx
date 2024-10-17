import React from "react";

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
        <img
          src={`http://localhost:8080/resources/${resource.img}`}
          className="card-img-top"
          alt={`${resource.name} image`}
        />
        <div className="card-body">
          <h5 className="card-title">{resource.name}</h5>
          <p className="card-text">{resource.description}</p>
          <p className="card-text">
            <strong>Status:</strong> {resource.status}
          </p>
          {resource.status === "available" ? (
            <a href="#" className="btn btn-primary">
              Book
            </a>
          ) : resource.status === "maintenance" ? (
            <button className="btn btn-warning" disabled>
              Under Maintenance
            </button>
          ) : (
            <button className="btn btn-secondary" disabled>
              Unavailable
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
