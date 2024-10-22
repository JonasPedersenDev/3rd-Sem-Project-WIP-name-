import React, { useState } from "react";
import ResourceCard from "./ResourceCard";
import AddResourceModal from "../../CaretakerView/AddResourceModal/AddResourceModal";

//Fake data
interface ResourceProps {
  id: number;
  name: string;
  img: string;
  description: string;
  status: string;
}

const resources: ResourceProps[] = [
  { id: 1, name: "Boremaskine", description: "En boremaskine", img: "Boremaskine.jpg", status: "available" },
  { id: 2, name: "Hammer", description: "En hammer", img: "Hammer.jpg", status: "available" },
  { id: 3, name: "Målebånd", description: "Et målebånd", img: "Målebånd.jpg", status: "unavailable" },
  { id: 4, name: "Sav", description: "En sav", img: "Sav.jpg", status: "maintenance" },
  { id: 5, name: "Skruetrækker", description: "En skruetrækker", img: "Skruetrækker.jpg", status: "available" },
];

const ResourceGrid: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleResourceAdded = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="row">
        {resources.map(resource => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
      <button onClick={() => setIsModalOpen(true)}>Add new resource</button>
      {isModalOpen && (
        <AddResourceModal show={isModalOpen} onResourceAdded={handleResourceAdded} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default ResourceGrid;
