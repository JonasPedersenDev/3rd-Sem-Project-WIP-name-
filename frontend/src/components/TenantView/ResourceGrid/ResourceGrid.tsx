import React, { useEffect, useState } from "react";
import axios from "axios";
import ResourceCard from "./ResourceCard";
import AddResourceModal from "../../CaretakerView/AddResourceModal/AddResourceModal";

interface Resource {
  name: string;
  img: string;
  description: string;
  status: string;
}

const ResourceGrid: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchResources = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/resources");
      setResources(response.data);
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleResourceAdded = () => {
    fetchResources();
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="row">
        {resources.map((resource, index) => (
          <ResourceCard key={index} resource={resource} />
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
